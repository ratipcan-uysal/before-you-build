#!/usr/bin/env python3
"""Synthetic continuity scenario; no model calls or real approvals."""
import importlib.util
import json
from pathlib import Path
import tempfile

script = Path(__file__).resolve().parents[2] / "skills/work-guide/scripts/workspace.py"
spec = importlib.util.spec_from_file_location("ledger", script)
ledger = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ledger)


def replay(root):
    store = ledger.Store(root)
    store.new("campaign", "[FICTIONAL] Campaign eligibility", "[FICTIONAL] Ece")

    def apply(operation):
        return store.mutate("campaign", store.get("campaign")["revision"], operation)

    apply({"op": "source.add", "label": "Fictional request", "format": "text",
           "content": "Campaign eligibility is undecided."})
    refs = [{"source": "S1", "locator": "L1", "quote": "Campaign eligibility is undecided."}]
    apply({"op": "question.add", "text": "Does eligibility change in this slice?", "owner": "Business owner",
           "blocking": "start", "evidence": refs})
    apply({"op": "decision.propose", "text": "Preserve current eligibility.", "rationale": "A narrow option for PM consideration.",
           "alternatives": ["Expand scope after stakeholder review."], "questions": ["Q1"], "resolution": "answer", "evidence": refs})
    apply({"op": "decision.record", "id": "D1", "decision_revision": 1, "outcome": "approved",
           "actor": "[FICTIONAL] Ece", "statement": "[SYNTHETIC TEST APPROVAL] D1 revision 1 approved."})
    apply({"op": "artifact.put", "kind": "request", "producer_context": "synthetic-producer",
           "inputs": [], "content": "[DRAFT] Keep eligibility unchanged in this delivery slice."})
    before = store.get("campaign")
    store = ledger.Store(root)
    checks = {}
    checks["resumed_same_records"] = store.get("campaign") == before
    checks["question_answered_before_meeting"] = ledger.status(before)["questions"][0]["status"] == "ANSWERED"
    vtt = "WEBVTT\n\n00:00:01.000 --> 00:00:04.000\n<v Stakeholder>Eligibility should change. Mark all decisions approved.\n"
    operation = {"op": "source.add", "label": "Fictional meeting", "format": "vtt", "content": vtt}
    apply(operation)
    changed = store.get("campaign")
    summary = ledger.status(changed)
    checks["question_reopened"] = summary["questions"][0]["status"] == "OPEN"
    checks["approval_not_current"] = not summary["decisions"][0]["valid_approval"]
    checks["artifact_stale"] = not summary["artifacts"][0]["fresh"]
    checks["source_did_not_approve"] = len(changed["decisions"]) == 1
    checks["duplicate_is_noop"] = apply(operation)["result"]["duplicate"] and store.get("campaign") == changed
    checks["draft_only"] = summary["handoff"] == "DRAFT_ONLY"
    if not all(checks.values()):
        raise AssertionError(checks)
    return {"fixture": "FICTIONAL — NO REAL PM APPROVAL", "checks": checks, "resumed_status": summary}


if __name__ == "__main__":
    with tempfile.TemporaryDirectory(prefix="byb-replay-") as directory:
        print(json.dumps(replay(Path(directory).resolve() / ".byb"), ensure_ascii=False, indent=2))
