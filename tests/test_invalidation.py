"""Invalidation policy and source reconciliation, applied in the order real work arrives: late."""
import unittest

import test_delivery as td
from test_work_guide import w

TIERS = ("start", "release", "none")


class InvalidationTests(unittest.TestCase):
    # Borrow the delivery fixture without inheriting, and so re-running, its tests.
    setUp, tearDown, state, op = td.DeliveryTests.setUp, td.DeliveryTests.tearDown, td.DeliveryTests.state, td.DeliveryTests.op
    evidence, profile, artifact, seed = td.DeliveryTests.evidence, td.DeliveryTests.profile, td.DeliveryTests.artifact, td.DeliveryTests.seed

    def evidence_of(self, index, line=1):
        source = self.state()["sources"][index]
        return [{"source": source["id"], "locator": "L" + str(line), "quote": source["anchors"][line - 1]["text"]}]

    def question(self, tier, label):
        return self.op({"op": "question.add", "text": "Synthetic " + tier + " question " + label + "?", "owner": "PM",
                        "blocking": tier, "evidence": self.evidence()})["result"]["id"]

    def propose(self, question, label="Synthetic answer."):
        return self.op({"op": "decision.propose", "text": label, "rationale": "Synthetic.", "alternatives": ["Other."],
                        "questions": [question], "resolution": "answer", "evidence": self.evidence()})["result"]["id"]

    def record(self, decision):
        return {"op": "decision.record", "id": decision, "decision_revision": w.current(w.find(self.state()["decisions"], decision))["revision"],
                "outcome": "approved", "actor": "Synthetic PM", "statement": "[TEST ONLY] Approve " + decision + "."}

    def respond(self, consultation, outcome="clear"):
        return {"op": "consultation.respond", "id": consultation, "response": "Synthetic reply.", "outcome": outcome,
                "evidence": self.evidence(), "actor": "Synthetic PM", "statement": "[TEST ONLY] Accept reply."}

    def world(self):
        """A fully approved request with one answered question and one consultation per tier."""
        self.__dict__.pop("profile", None)  # a previous subtest's world replaced it
        required = self.profile()
        self.decision_by_tier, self.consultation_by_tier = {}, {}
        for tier in TIERS:
            decision = self.propose(self.question(tier, "base"))
            self.op(self.record(decision))
            self.decision_by_tier[tier] = decision
            self.consultation_by_tier[tier] = self.op({"op": "consultation.request", "owner": "Owner " + tier, "question": "Synthetic " + tier + "?",
                                                      "blocking": tier, "evidence": self.evidence()})["result"]["id"]
        self.op(self.respond(self.consultation_by_tier["start"]))
        self.profile = lambda full=True: required
        gate = self.seed()
        self.assertEqual(gate["status"], "AWAITING_PM", gate["blockers"])

    def artifact_id(self, kind):
        return w.latest(self.state(), kind)["id"]

    def cases(self):
        """(policy key, setup operations, final operation, artifact it touches). Builders read live state."""
        late = {"op": "source.add", "label": "Late note", "format": "text", "content": "Late synthetic note."}
        profile = lambda: {"op": "profile.set", "organization": "Fictional org", "product": "Fixture", "context": "Revised synthetic context.",
                           "required_artifacts": self.state()["profiles"][-1]["required_artifacts"], "exclusions": self.state()["profiles"][-1]["exclusions"],
                           "lenses": ["integration"], "evidence": self.evidence(2)}
        approve_profile = lambda: {"op": "profile.approve", "profile_revision": len(self.state()["profiles"]), "actor": "Synthetic PM", "statement": "[TEST ONLY]"}
        flow_review = lambda: {"op": "review.record", "id": self.artifact_id("flow"), "artifact_revision": 1, "reviewer_context": "second-reviewer",
                               "skill": "flow-grill", "verdict": "PASS", "blocking_findings": 0, "content": "[SYNTHETIC] Second passing review."}
        cases = [(("source.add", None), [], lambda: late, None),
                 (("profile.set", None), [], profile, None),
                 (("profile.approve", None), [profile], approve_profile, None),
                 (("artifact.put", None), [], lambda: {"op": "artifact.put", "kind": "risk", "content": "[SYNTHETIC] risk v2", "producer_context": "author-risk",
                                                       "inputs": [{"id": self.artifact_id("request"), "revision": 1}]}, "risk"),
                 (("review.record", None), [], flow_review, "flow"),
                 (("artifact.approve", None), [flow_review], lambda: {"op": "artifact.approve", "id": self.artifact_id("flow"), "artifact_revision": 1,
                                                                       "actor": "Synthetic PM", "statement": "[TEST ONLY]"}, "flow"),
                 (("handoff.approve", None), [], lambda: {"op": "handoff.approve", "fingerprint": w.handoff_check(self.state())["fingerprint"],
                                                          "actor": "Synthetic PM", "statement": "[TEST ONLY]"}, None),
                 (("reconcile.propose", None), [lambda: late], lambda: self.reconcile_all(), None),
                 (("reconcile.approve", None), [lambda: late, lambda: self.reconcile_all()],
                  lambda: {"op": "reconcile.approve", "id": "R1", "actor": "Synthetic PM", "statement": "[TEST ONLY]"}, None)]
        for tier in TIERS:
            cases += [(("question.add", None), [], lambda t=tier: {"op": "question.add", "text": "Late " + t + "?", "owner": "PM", "blocking": t, "evidence": self.evidence()}, None),
                      (("consultation.request", None), [], lambda t=tier: {"op": "consultation.request", "owner": "Late " + t, "question": "Late?", "blocking": t,
                                                                            "evidence": self.evidence()}, None),
                      (("decision.propose", None), [lambda t=tier: ("question", t)], lambda: ("propose",), None),
                      (("decision.revise", tier), [], lambda t=tier: {"op": "decision.revise", "id": self.decision_by_tier[t], "text": "Revised.", "rationale": "Synthetic.",
                                                                       "alternatives": ["Other."], "questions": w.current(w.find(self.state()["decisions"], self.decision_by_tier[t]))["questions"],
                                                                       "resolution": "answer", "evidence": self.evidence()}, None),
                      (("decision.record", tier), [lambda t=tier: ("question", t), lambda: ("propose",)], lambda: self.record(self.state()["decisions"][-1]["id"]), None),
                      (("consultation.respond", tier), [], lambda t=tier: self.respond(self.consultation_by_tier[t]), None)]
        cases = [c for c in cases if c[0] != ("consultation.respond", "start")]
        for outcome in ("clear", "changes_required", "unknown"):
            cases.append((("consultation.respond", "start/" + outcome), [],
                          lambda o=outcome: self.respond(self.consultation_by_tier["start"], o), None))
        return cases

    def reconcile_all(self):
        pending = self.state()["pending_reconcile"]
        ids = [d["id"] for d in self.state()["decisions"]] + ["profile", self.consultation_by_tier["start"]] + [a["id"] for a in self.state()["artifacts"]]
        return {"op": "reconcile.propose", "sources": pending["sources"],
                "unaffected": [{"id": i, "reason": "The late note does not mention it.", "evidence": self.evidence_of(-1)} for i in ids]}

    def run_step(self, build):
        value = build()
        if isinstance(value, dict):
            return self.op(value)
        if value[0] == "question":
            self.question(value[1], "late")
        else:
            self.propose(self.state()["questions"][-1]["id"])

    def test_every_operation_obeys_the_policy_table(self):
        exercised = set()
        for key, setup, final, touched in self.cases():
            with self.subTest(case=key):
                self.tearDown()
                self.setUp()
                self.world()
                for step in setup:
                    self.run_step(step)
                before = self.state()
                fresh_before = {a["id"] for a in before["artifacts"] if w.fresh(before, a)}
                valid_before = {d["id"] for d in before["decisions"] if w.decision_valid(before, d)}
                self.run_step(final)
                after = self.state()
                effects = w.INVALIDATION[key]
                self.assertEqual(after["context_revision"] - before["context_revision"], int("artifacts" in effects))
                self.assertEqual(after["source_epoch"] - before["source_epoch"], int("approvals" in effects))
                fresh_after = {a["id"] for a in after["artifacts"] if w.fresh(after, a)}
                valid_after = {d["id"] for d in after["decisions"] if w.decision_valid(after, d)}
                if "artifacts" in effects:
                    self.assertEqual(fresh_after, set())
                else:
                    spared = fresh_before - set(w.impact(after, self.artifact_id(touched))["affected_records"]) if touched else fresh_before
                    self.assertLessEqual(spared, fresh_after)
                touched_decision = final().get("id") if key[0] in {"decision.revise", "decision.record"} else None
                if "approvals" in effects:
                    self.assertEqual(valid_after, set())
                else:
                    self.assertLessEqual(valid_before - {touched_decision}, valid_after)
                exercised.add(key)
        self.assertEqual(exercised, set(w.INVALIDATION))

    def test_late_nonblocking_events_keep_the_handoff_awaiting_pm(self):
        self.world()
        self.question("none", "late")
        self.question("release", "late")
        self.op({"op": "consultation.request", "owner": "Operations", "question": "Training?", "blocking": "release", "evidence": self.evidence()})
        decision = self.propose(self.state()["questions"][-1]["id"])
        self.op(self.record(decision))
        for tier in ("release", "none"):
            self.op(self.respond(self.consultation_by_tier[tier]))
        gate = w.handoff_check(self.state())
        self.assertEqual(gate["status"], "AWAITING_PM", gate["blockers"])
        self.assertEqual(gate["release_consultations"], ["C4"])

    def test_late_clear_answer_to_a_start_consultation_keeps_approvals(self):
        self.world()
        consultation = self.op({"op": "consultation.request", "owner": "Security", "question": "Boundary?", "blocking": "start",
                                "evidence": self.evidence()})["result"]["id"]
        self.assertIn("Unsettled stakeholder consultation: " + consultation, w.handoff_check(self.state())["blockers"])
        self.op(self.respond(consultation))
        gate = w.handoff_check(self.state())
        self.assertEqual(gate["status"], "AWAITING_PM", gate["blockers"])
        self.op(self.respond(consultation, "changes_required"))
        self.assertFalse(any(w.fresh(self.state(), a) for a in self.state()["artifacts"]))

    def test_late_start_question_blocks_without_discarding_approvals(self):
        self.world()
        question = self.question("start", "late")
        gate = w.handoff_check(self.state())
        self.assertEqual(gate["blockers"], ["Open development question: " + question])
        self.assertTrue(all(w.accepted(self.state(), a) for a in self.state()["artifacts"]))

    def test_reconciliation_carries_unaffected_records_with_one_pm_approval(self):
        self.world()
        self.op({"op": "source.add", "label": "Security reply", "format": "text", "content": "Security: the boundary is fine."})
        self.assertEqual(w.handoff_check(self.state())["status"], "BLOCKED")
        self.assertTrue(all(q["status"] == "OPEN" for q in w.status(self.state())["questions"]))
        self.op(self.reconcile_all())
        self.op({"op": "reconcile.approve", "id": "R1", "actor": "Synthetic PM", "statement": "[TEST ONLY] The reply changes none of these."})
        gate = w.handoff_check(self.state())
        self.assertEqual(gate["status"], "AWAITING_PM", gate["blockers"])
        self.assertTrue(all(q["status"] == "ANSWERED" for q in w.status(self.state())["questions"]))
        self.assertEqual(w.current(w.latest(self.state(), "flow"))["carried"][0]["reconcile"], "R1")
        self.assertIsNone(self.state()["pending_reconcile"])

    def test_partial_reconciliation_leaves_affected_work_stale(self):
        self.world()
        self.op({"op": "source.add", "label": "Flow change", "format": "text", "content": "The lookup step now needs a retry."})
        proposal = self.reconcile_all()
        flow = self.artifact_id("flow")
        proposal["unaffected"] = [e for e in proposal["unaffected"] if e["id"] != flow]
        with self.assertRaises(w.Invalid):  # data depends on the flow that is now affected
            self.op(proposal)
        downstream = set(w.impact(self.state(), flow)["affected_records"])
        proposal["unaffected"] = [e for e in proposal["unaffected"] if e["id"] not in downstream]
        self.op(proposal)
        self.op({"op": "reconcile.approve", "id": "R1", "actor": "Synthetic PM", "statement": "[TEST ONLY] Only the flow side changes."})
        self.assertTrue(w.accepted(self.state(), w.latest(self.state(), "request")))
        self.assertFalse(w.fresh(self.state(), w.latest(self.state(), "flow")))
        self.assertIn("Missing, stale or unapproved artifact: flow", w.handoff_check(self.state())["blockers"])

    def test_reconciliation_needs_the_pm_and_the_new_source(self):
        self.world()
        self.op({"op": "source.add", "label": "Reply", "format": "text", "content": "Reply text."})
        proposal = self.reconcile_all()
        old_evidence = dict(proposal, unaffected=[dict(proposal["unaffected"][0], evidence=self.evidence())])
        with self.assertRaises(w.Invalid):
            self.op(old_evidence)
        self.op(proposal)
        with self.assertRaises(w.Invalid):
            self.op({"op": "reconcile.approve", "id": "R1", "actor": "Agent", "statement": "not the PM"})

    def test_another_source_voids_a_pending_proposal(self):
        self.world()
        self.op({"op": "source.add", "label": "First", "format": "text", "content": "First reply."})
        self.op(self.reconcile_all())
        self.op({"op": "source.add", "label": "Second", "format": "text", "content": "Second reply."})
        with self.assertRaises(w.Invalid):
            self.op({"op": "reconcile.approve", "id": "R1", "actor": "Synthetic PM", "statement": "[TEST ONLY]"})
        self.assertEqual(self.state()["pending_reconcile"]["sources"], ["S2", "S3"])

    def test_other_changes_forfeit_reconciliation(self):
        self.world()
        self.op({"op": "source.add", "label": "Reply", "format": "text", "content": "Reply text."})
        decision = self.decision_by_tier["start"]
        result = self.op({"op": "decision.revise", "id": decision, "text": "Changed.", "rationale": "Synthetic.", "alternatives": ["Other."],
                          "questions": w.current(w.find(self.state()["decisions"], decision))["questions"], "resolution": "answer", "evidence": self.evidence()})
        self.assertTrue(result["result"]["reconcile_forfeited"])
        self.assertIsNone(self.state()["pending_reconcile"])
        with self.assertRaises(w.Invalid):
            self.op({"op": "reconcile.propose", "sources": ["S2"], "unaffected": [
                {"id": self.artifact_id("request"), "reason": "Unrelated.", "evidence": self.evidence_of(-1)}]})

    def test_conditional_request_without_blockers_passes_and_with_blockers_fails(self):
        self.seed(False)
        request = w.latest(self.state(), "request")
        for blocking, passes in ((0, True), (1, False)):
            self.op({"op": "review.record", "id": request["id"], "artifact_revision": 1, "reviewer_context": "another-" + str(blocking),
                     "skill": "readiness-score", "verdict": "CONDITIONAL", "blocking_findings": blocking, "content": "[TEST] CONDITIONAL."})
            self.assertEqual(w.reviewed(w.latest(self.state(), "request")), passes)


if __name__ == "__main__":
    unittest.main()
