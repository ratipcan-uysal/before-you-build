"""Exercise the generated grader against tool-call traces, without model calls."""
import importlib.util
import json
from pathlib import Path
import re
import tempfile
import unittest
from unittest.mock import patch

import yaml

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("routing_eval", ROOT / "scripts/routing_eval.py")
routing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(routing)


class RoutingTests(unittest.TestCase):
    def test_expected_skill_plus_wrong_skill_must_not_pass(self):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory) / "generated"
            with patch.object(routing, "OUT", out), patch.object(routing.sys, "argv", ["routing_eval.py"]):
                routing.main()
            for case in out.glob("route-*"):
                expected = case.name.split("-", 2)[2]
                graders = [yaml.safe_load(p.read_text().split("---")[1]) for p in (case / "graders").glob("*.md")]
                def passes(skills):
                    calls = [json.dumps({"skill": "before-you-build:" + skill}) for skill in skills]
                    return all(g["min"] <= sum(bool(re.search(g["input_match"], call)) for call in calls) <= g.get("max", float("inf")) for g in graders)
                with self.subTest(case=case.name):
                    if expected == "none":
                        self.assertTrue(passes([]))
                        self.assertFalse(passes(["work-guide"]))
                    else:
                        wrong = "work-guide" if expected != "work-guide" else "flow-map"
                        self.assertTrue(passes([expected]))
                        self.assertFalse(passes([]))
                        self.assertFalse(passes([wrong]))
                        self.assertFalse(passes([expected, wrong]))
