"""Synthetic acceptance/contract/delivery invariants, not model quality scores."""
import copy
import json
from pathlib import Path
import sqlite3
import shutil
import subprocess
import sys
import tempfile
import unittest
import zipfile

from test_work_guide import w


def acceptance_data(flow=True):
    return {"schema": "byb.acceptance.v1", "scenarios": [{"id": "AC1", "requirements": ["R1"],
            "flow_steps": ["F1"] if flow else [], "category": "happy", "given": ["Account active."],
            "when": "The account lookup completes.", "then": ["Return eligible=true."], "status": "SPECIFIED", "open_questions": []}],
            "coverage_decisions": [{"category": c, "applicable": c == "happy",
                                     "rationale": "Synthetic mechanical fixture: only one declared condition is under test."}
                                    for c in sorted(w.delivery.CATEGORIES)]}


def contract_data():
    return {"schema": "byb.contract.v1", "protocol": "http", "open_questions": [], "operations": [{
        "id": "getEligibility", "name": "GET /eligibility", "requirements": ["R1"], "flow_steps": ["F1"],
        "request_schema": {"type": "object", "properties": {}, "required": [], "additionalProperties": False},
        "response_schema": {"type": "object", "properties": {"eligible": {"type": "boolean"}}, "required": ["eligible"], "additionalProperties": False},
        "errors": [{"code": "UNAVAILABLE", "meaning": "No result.", "retryable": True, "status": "503",
                    "response_schema": {"type": "object", "properties": {"code": {"type": "string", "enum": ["UNAVAILABLE"]}},
                                        "required": ["code"], "additionalProperties": False}, "example": {"code": "UNAVAILABLE"}}],
        "authorization": "Supplied bearer middleware.", "idempotency": "Read-only; no business effects.",
        "consistency": "Account value at read time.", "timeout": "2000 ms; unknown result; manual retry.",
        "compatibility": "New endpoint; no existing shape changes.", "error_policy": "503 with JSON {code: UNAVAILABLE}; no eligible value.",
        "examples": [{"request": {}, "response": {"eligible": True}}]}]}


class DeliveryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name).resolve() / ".byb"
        self.store = w.Store(self.root)
        self.store.new("fixture", "[FICTIONAL] Mechanical delivery", "Synthetic PM")
        self.op({"op": "source.add", "label": "Synthetic scope and rule", "format": "text",
                 "content": "When account is active, return eligible=true.\nThe test excludes artifacts named by the synthetic profile; this is not a production readiness claim."})

    def tearDown(self):
        self.temp.cleanup()

    def state(self):
        return self.store.get("fixture")

    def op(self, value):
        return self.store.mutate("fixture", self.state()["revision"], value)

    def evidence(self, line=1):
        source = self.state()["sources"][0]
        return [{"source": "S1", "locator": "L" + str(line), "quote": source["anchors"][line - 1]["text"]}]

    def profile(self, full=True):
        required = sorted(w.KINDS - {"design"}) if full else sorted(w.delivery.MANDATORY)
        exclusions = [{"kind": k, "rationale": "Explicit synthetic test scope exclusion.", "evidence": self.evidence(2)} for k in sorted(w.KINDS - set(required))]
        self.op({"op": "profile.set", "organization": "Fictional org", "product": "Fixture", "context": "Synthetic test, no live systems.",
                 "required_artifacts": required, "exclusions": exclusions, "lenses": ["integration"] if full else [], "evidence": self.evidence(2)})
        self.op({"op": "profile.approve", "profile_revision": 1, "actor": "Synthetic PM", "statement": "[TEST ONLY] Approve this profile."})
        return required

    def artifact(self, kind, dependencies, structured=None):
        inputs = [{"id": w.latest(self.state(), k)["id"], "revision": w.current(w.latest(self.state(), k))["revision"]} for k in dependencies]
        operation = {"op": "artifact.put", "kind": kind, "content": "[SYNTHETIC FIXTURE] " + kind,
                     "producer_context": "author-" + kind, "inputs": inputs}
        if structured is not None:
            operation["structured"] = structured
        self.op(operation)
        item = w.latest(self.state(), kind)
        if kind in w.REVIEWERS:
            verdict = {"request": "READY", "flow": "PASS", "design": "PASS", "handoff": "BUILDABLE"}[kind]
            self.op({"op": "review.record", "id": item["id"], "artifact_revision": 1, "reviewer_context": "independent-" + kind,
                     "skill": w.REVIEWERS[kind], "blocking_findings": 0, "verdict": verdict,
                     "content": "[SYNTHETIC TEST] Declared passing review; not actual semantic evaluation."})
        self.op({"op": "artifact.approve", "id": item["id"], "artifact_revision": 1,
                 "actor": "Synthetic PM", "statement": "[TEST ONLY] Approve exact artifact."})

    def seed(self, full=True):
        required = self.profile(full)
        self.artifact("request", [], {"schema": "byb.request.v1", "requirements": [{"id": "R1", "statement": "When account is active, return eligible=true.", "critical": True, "evidence": self.evidence()}]})
        self.artifact("scope", ["request"])
        if full:
            self.artifact("flow", ["scope"], {"schema": "byb.flow.v1", "steps": [{"id": "F1", "description": "Read active and return eligible=true.", "kind": "happy", "requirements": ["R1"]}]})
            self.artifact("data", ["flow"])
            self.artifact("api", ["flow", "data"])
            self.artifact("contract", ["flow", "data", "api"], contract_data())
            self.artifact("risk", ["request"])
        self.artifact("acceptance", ["flow"] if full else ["request", "scope"], acceptance_data(full))
        self.artifact("handoff", sorted(set(required) - {"handoff"}))
        return w.handoff_check(self.state())

    def approve_handoff(self):
        gate = w.handoff_check(self.state())
        return self.op({"op": "handoff.approve", "fingerprint": gate["fingerprint"], "actor": "Synthetic PM", "statement": "[TEST ONLY] Final exact snapshot approval."})

    def test_full_delivery_requires_separate_final_pm_approval(self):
        gate = self.seed()
        self.assertEqual(gate["blockers"], [])
        self.assertEqual(gate["status"], "AWAITING_PM")
        with self.assertRaises(w.Invalid):
            w.export_delivery(self.state(), self.root.parent / "premature.zip")
        self.approve_handoff()
        self.assertEqual(w.handoff_check(self.state())["status"], "PM_APPROVED_HANDOFF")

    def test_small_scope_can_explicitly_exclude_unneeded_artifacts(self):
        gate = self.seed(full=False)
        self.assertEqual(gate["blockers"], [])
        self.assertEqual(gate["coverage"]["flow_steps"], 0)

    def test_no_profile_cannot_be_ready(self):
        self.assertEqual(w.handoff_check(self.state())["status"], "BLOCKED")

    def test_profile_requires_evidence_for_every_exclusion(self):
        with self.assertRaises(w.Invalid):
            self.op({"op": "profile.set", "organization": "x", "product": "x", "context": "x", "required_artifacts": sorted(w.delivery.MANDATORY),
                     "exclusions": [], "lenses": [], "evidence": self.evidence()})

    def test_profile_cannot_drop_contract_while_requiring_api(self):
        required = sorted(w.KINDS - {"contract"})
        with self.assertRaises(w.Invalid):
            self.op({"op": "profile.set", "organization": "x", "product": "x", "context": "x", "required_artifacts": required,
                     "exclusions": [{"kind": "contract", "rationale": "not needed", "evidence": self.evidence()}], "lenses": [], "evidence": self.evidence()})

    def test_wrong_pm_cannot_approve_final_snapshot(self):
        gate = self.seed(False)
        with self.assertRaises(w.Invalid):
            self.op({"op": "handoff.approve", "fingerprint": gate["fingerprint"], "actor": "Agent", "statement": "approve"})

    def test_stale_fingerprint_rejected(self):
        self.seed(False)
        with self.assertRaises(w.Invalid):
            self.op({"op": "handoff.approve", "fingerprint": "old", "actor": "Synthetic PM", "statement": "approve"})

    def test_new_source_invalidates_delivery(self):
        self.seed(False)
        self.approve_handoff()
        self.op({"op": "source.add", "label": "Developer feedback", "format": "text", "content": "A newly discovered product decision is unresolved."})
        self.assertEqual(w.handoff_check(self.state())["status"], "BLOCKED")
        self.assertEqual(w.status(self.state())["handoff"], "DRAFT_ONLY")

    def test_delivery_archive_integrity_and_no_overwrite(self):
        self.seed()
        self.approve_handoff()
        path = self.root.parent / "delivery.zip"
        w.export_delivery(self.state(), path)
        self.assertTrue(w.verify_delivery(path)["valid_checksums"])
        with self.assertRaises(FileExistsError):
            w.export_delivery(self.state(), path)
        with zipfile.ZipFile(path) as source:
            files = {n: source.read(n) for n in source.namelist()}
        files["SPEC.md"] = b"tampered"
        corrupted = self.root.parent / "corrupted.zip"
        with zipfile.ZipFile(corrupted, "w") as archive:
            for name, value in files.items():
                archive.writestr(name, value)
        with self.assertRaises(w.Invalid):
            w.verify_delivery(corrupted)

    def test_start_consultation_blocks_and_source_claim_does_not_close_it(self):
        self.op({"op": "consultation.request", "owner": "Security", "question": "Review the boundary.", "blocking": "start", "evidence": self.evidence()})
        self.seed(False)
        self.assertTrue(any("consultation" in b for b in w.handoff_check(self.state())["blockers"]))

    def test_release_consultation_does_not_automatically_block_development(self):
        self.op({"op": "consultation.request", "owner": "Operations", "question": "Prepare training.", "blocking": "release", "evidence": self.evidence()})
        self.assertEqual(self.seed(False)["blockers"], [])

    def test_consultation_response_needs_pm_record_and_retains_history(self):
        self.op({"op": "consultation.request", "owner": "Security", "question": "Review boundary.", "blocking": "start", "evidence": self.evidence()})
        base = {"op": "consultation.respond", "id": "C1", "response": "Unknown", "outcome": "unknown", "evidence": self.evidence(), "actor": "Agent", "statement": "not PM"}
        with self.assertRaises(w.Invalid):
            self.op(base)
        base.update(actor="Synthetic PM", statement="[TEST] Recorded opinion only.")
        self.op(base)
        base.update(outcome="clear", response="Boundary confirmed in synthetic source.")
        self.op(base)
        self.assertEqual(len(self.state()["consultations"][0]["responses"]), 2)

    def test_reviewer_cannot_have_produced_an_upstream_input(self):
        self.seed(False)
        handoff = w.latest(self.state(), "handoff")
        self.op({"op": "review.record", "id": handoff["id"], "artifact_revision": 1, "reviewer_context": "author-request",
                 "skill": "build-context", "verdict": "BUILDABLE", "blocking_findings": 0, "content": "[TEST] Compromised reviewer."})
        self.assertFalse(w.reviewed(w.latest(self.state(), "handoff")))

    def test_failing_verdict_cannot_be_overruled_by_zero_count(self):
        self.seed(False)
        request = w.latest(self.state(), "request")
        self.op({"op": "review.record", "id": request["id"], "artifact_revision": 1, "reviewer_context": "another",
                 "skill": "readiness-score", "verdict": "NOT READY", "blocking_findings": 0, "content": "[TEST] Contradictory declaration."})
        self.assertFalse(w.reviewed(w.latest(self.state(), "request")))

    def test_missing_scenario_and_unknown_trace_refs_fail_coverage(self):
        self.seed()
        state = self.state()
        req = w.current(w.latest(state, "request"))["structured"]
        flow = w.current(w.latest(state, "flow"))["structured"]
        acceptance = acceptance_data()
        acceptance["scenarios"][0]["requirements"] = ["R999"]
        coverage = w.delivery.coverage(req, flow, acceptance)
        self.assertTrue(any("unknown" in e for e in coverage["errors"]))
        self.assertTrue(any("R1" in e for e in coverage["errors"]))

    def test_blocked_scenario_does_not_count_as_covered(self):
        self.seed(False)
        req = w.current(w.latest(self.state(), "request"))["structured"]
        data = acceptance_data(False)
        data["scenarios"][0].update(status="BLOCKED", open_questions=["Need a decision."])
        result = w.delivery.coverage(req, None, data)
        self.assertEqual(result["covered_requirements"], 0)
        self.assertTrue(result["errors"])

    def test_contract_examples_are_type_checked(self):
        data = contract_data()
        data["operations"][0]["examples"][0]["response"]["eligible"] = "yes"
        with self.assertRaises(ValueError):
            w.delivery.validate("contract", data)

    def test_unknown_schema_keyword_not_silently_ignored(self):
        data = contract_data()
        data["operations"][0]["response_schema"]["oneOf"] = []
        with self.assertRaises(ValueError):
            w.delivery.validate("contract", data)

    def test_unknown_required_property_and_inverted_bounds_rejected(self):
        for schema in ({"type": "object", "properties": {}, "required": ["missing"]},
                       {"type": "integer", "minimum": 10, "maximum": 1}):
            with self.assertRaises(ValueError):
                w.delivery.schema_valid(schema)

    def test_duplicate_keys_and_nonfinite_json_rejected(self):
        for index, content in enumerate(('{"op":"source.add","op":"decision.record"}', '{"value":NaN}')):
            path = self.root.parent / (str(index) + ".json")
            path.write_text(content)
            with self.assertRaises(w.Invalid):
                w.read_json(path)

    def test_explicit_migration_preserves_old_records_and_backup(self):
        conn = sqlite3.connect(self.store.db)
        state = self.state()
        state["schema"] = 1
        for key in ("profiles", "consultations", "deliveries"):
            state.pop(key)
        conn.execute("UPDATE requests SET payload=? WHERE id='fixture'", (json.dumps(state),))
        conn.execute("PRAGMA user_version=1")
        conn.commit()
        conn.close()
        with self.assertRaises(w.Invalid):
            self.state()
        backup = self.root.parent / "backup.sqlite3"
        result = self.store.migrate(backup)
        self.assertEqual(result["schema"], 2)
        self.assertEqual(self.state()["sources"], state["sources"])
        self.assertEqual(self.state()["revision"], state["revision"] + 1)
        previous = sqlite3.connect(backup)
        self.assertEqual(previous.execute("PRAGMA user_version").fetchone()[0], 1)
        previous.close()

    def test_impact_reports_transitive_dependents(self):
        self.seed()
        state = self.state()
        flow = w.latest(state, "flow")
        result = w.impact(state, flow["id"])
        self.assertIn(w.latest(state, "contract")["id"], result["affected_records"])
        self.assertIn(w.latest(state, "handoff")["id"], result["affected_records"])

    def test_error_examples_reject_wrong_code_extra_field_and_missing_status(self):
        for mutation in (lambda e: e["example"].update(code="WRONG"),
                         lambda e: e["example"].update(eligible=True),
                         lambda e: e.pop("status")):
            data = contract_data()
            mutation(data["operations"][0]["errors"][0])
            with self.assertRaises(ValueError):
                w.delivery.validate("contract", data)

    def test_unknown_protocol_and_malformed_category_fail_cleanly(self):
        for value in ("unknown", [], None):
            data = contract_data()
            data["protocol"] = value
            with self.assertRaises(ValueError):
                w.delivery.validate("contract", data)
        data = acceptance_data()
        data["scenarios"][0]["category"] = []
        with self.assertRaises(ValueError):
            w.delivery.validate("acceptance", data)

    def test_large_finite_integer_is_not_float_overflow(self):
        w.delivery.schema_valid({"type": "integer", "minimum": 10 ** 400})
        w.delivery.instance_valid(10 ** 401, {"type": "integer", "minimum": 10 ** 400})

    def test_release_consultation_survives_export_and_is_readable(self):
        self.op({"op": "consultation.request", "owner": "Operations", "question": "Training date?", "blocking": "release", "evidence": self.evidence()})
        self.seed(False)
        self.assertEqual(w.record_view(self.state(), "C1")["owner"], "Operations")
        self.assertEqual(w.handoff_check(self.state())["release_consultations"], ["C1"])
        self.approve_handoff()
        path = self.root.parent / "release.zip"
        w.export_delivery(self.state(), path)
        with zipfile.ZipFile(path) as archive:
            self.assertIn("Open launch consultations: C1", archive.read("START-HERE.md").decode())

    def test_missing_explicit_verdict_blocks_final_delivery(self):
        self.seed(False)
        state = self.state()
        w.current(w.latest(state, "request"))["review"]["verdict"] = None
        self.assertTrue(any("Explicit independent" in b for b in w.handoff_check(state)["blockers"]))

    def test_missing_structured_traceability_blocks_final_delivery(self):
        self.seed(False)
        state = self.state()
        w.current(w.latest(state, "acceptance"))["structured"] = None
        self.assertEqual(w.handoff_check(state)["status"], "BLOCKED")

    def test_coverage_category_exclusion_cannot_hide_present_scenario(self):
        self.seed(False)
        state = self.state()
        data = acceptance_data(False)
        for entry in data["coverage_decisions"]:
            if entry["category"] == "happy":
                entry["applicable"] = False
        result = w.delivery.coverage(w.current(w.latest(state, "request"))["structured"], None, data)
        self.assertTrue(any("contradicts" in e for e in result["errors"]))

    def test_contract_open_question_blocks_final_delivery(self):
        self.seed()
        state = self.state()
        w.current(w.latest(state, "contract"))["structured"]["open_questions"] = ["Missing institutional interface."]
        self.assertIn("contract contains open questions", w.handoff_check(state)["blockers"])

    def test_doctor_reports_found_schema_without_migrating(self):
        for version, status in ((1, "migration_required"), (2, "current"), (99, "unsupported")):
            conn = sqlite3.connect(self.store.db)
            conn.execute("PRAGMA user_version=" + str(version))
            conn.close()
            report = self.store.doctor()
            self.assertEqual(report["schema_found"], version)
            self.assertEqual(report["workspace_status"], status)
        empty = w.Store(self.root.parent / "not-created")
        self.assertEqual(empty.doctor()["workspace_status"], "not_initialized")
        self.assertFalse(empty.root.exists())

    def test_migration_backup_collision_preserves_legacy_store(self):
        conn = sqlite3.connect(self.store.db)
        conn.execute("PRAGMA user_version=1")
        conn.close()
        backup = self.root.parent / "existing.backup"
        backup.write_text("keep me")
        with self.assertRaises(FileExistsError):
            self.store.migrate(backup)
        self.assertEqual(backup.read_text(), "keep me")
        self.assertEqual(self.store.doctor()["schema_found"], 1)

    def test_copied_skill_cli_checks_and_delivers_without_repository_imports(self):
        self.seed(False)
        copied = self.root.parent / "installed-skill"
        shutil.copytree(Path(w.__file__).resolve().parent.parent, copied)
        script = copied / "scripts" / "workspace.py"
        def run(*args):
            result = subprocess.run([sys.executable, str(script), "--root", str(self.root), *args],
                                    cwd=str(self.root.parent), text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            return json.loads(result.stdout)
        self.assertEqual(run("check", "--request", "fixture")["status"], "AWAITING_PM")
        self.approve_handoff()
        path = self.root.parent / "copied-skill.zip"
        self.assertEqual(run("deliver", "--request", "fixture", "--out", str(path))["status"], "PM_APPROVED_HANDOFF")
        self.assertTrue(run("verify-delivery", "--file", str(path))["valid_checksums"])


if __name__ == "__main__":
    unittest.main()
