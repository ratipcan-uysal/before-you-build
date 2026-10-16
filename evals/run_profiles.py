"""Exercise seven explicitly selected profiles, not LLM/domain-quality scoring."""
import importlib.util
import json
from pathlib import Path
import tempfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("profile_workspace", ROOT / "skills/work-guide/scripts/workspace.py")
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)


def main():
    fixture = json.loads((ROOT / "evals/fixtures/work-shapes.json").read_text())
    results = []
    with tempfile.TemporaryDirectory(prefix="byb-profiles-") as temporary:
        store = w.Store(Path(temporary).resolve() / ".byb")
        for case in fixture["cases"]:
            identifier = case["id"]
            store.new(identifier, "[FICTIONAL] " + case["title"], "Synthetic PM")
            def mutate(op):
                return store.mutate(identifier, store.get(identifier)["revision"], op)
            mutate({"op":"source.add", "label":"Explicit synthetic scope", "format":"text", "content":case["source"]})
            evidence = [{"source":"S1", "locator":"L1", "quote":case["source"]}]
            mutate({"op":"profile.set", "organization":"Fictional test organization", "product":case["title"],
                    "context":"Mechanical profile exercise, not semantic approval.", "required_artifacts":case["required"],
                    "exclusions":[{"kind":kind, "rationale":"Explicit exclusion in the supplied synthetic scope.", "evidence":evidence}
                                  for kind in sorted(w.KINDS - set(case["required"]))], "lenses":case["lenses"], "evidence":evidence})
            if case["first_question"]:
                mutate({"op":"question.add", "text":case["first_question"], "owner":"Synthetic scope owner", "blocking":"start", "evidence":evidence})
            state = store.get(identifier)
            gate = w.handoff_check(state)
            assert gate["status"] == "BLOCKED"
            assert state["profiles"][-1]["approval"] is None
            assert state["deliveries"] == []
            assert set(gate["required_artifacts"]) == set(case["required"])
            results.append({"case":identifier, "profile_recorded":True, "approval_invented":False, "premature_delivery_blocked":True})
    print(json.dumps({"label":fixture["label"], "cases":results}, indent=2))


if __name__ == "__main__":
    main()
