#!/usr/bin/env python3
"""Turn evals/triggers.yaml into a live `claude plugin eval` routing suite.

The suite is generated, never committed: a second copy of the cases with nothing
binding it to the first is the drift this repo has already paid for. Run:

    python3 scripts/routing_eval.py            # writes routing-eval/
    claude plugin eval . --eval-dir routing-eval --ablation none --no-publish --runs 1 -j 4

Each case passes when the expected skill fires, or, for `expect: none`, when no
skill of this plugin fires. That measures routing on the host and model that ran
it, and nothing about output quality.

`control-wrong-skill` sends the first case's prompt but expects a different skill.
It must FAIL. If it passes, the grader is matching any Skill call and the run
measured nothing.
"""
import json
from pathlib import Path
import re
import shutil
import sys

import yaml

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "routing-eval"


def grader(skills, minimum, maximum=None):
    pattern = r'"skill"\s*:\s*"(?:[\w-]+:)?(' + "|".join(skills) + r')"'
    lines = ["---", "type: tool_used", "tool: Skill", "input_match: " + json.dumps(pattern), "min: " + str(minimum)]
    if maximum is not None:
        lines.append("max: " + str(maximum))
    return "\n".join(lines + ["---", ""])


def main():
    skills = sorted(p.parent.name for p in (ROOT / "skills").glob("*/SKILL.md"))
    cases = yaml.safe_load((ROOT / "evals/triggers.yaml").read_text())["cases"]
    only = sys.argv[1:]
    if OUT.exists():
        shutil.rmtree(OUT)
    for number, case in enumerate(cases, 1):
        expect = case["expect"]
        name = "route-%03d-%s" % (number, expect)
        if only and not any(re.fullmatch(pattern.replace("*", ".*"), name) for pattern in only):
            continue
        folder = OUT / name
        (folder / "graders").mkdir(parents=True)
        front = {"name": name, "tags": ["routing", expect], "runs": 1, "max_turns": 2,
                 "timeout_seconds": 180, "allowed_tools": ["Skill"]}
        (folder / "prompt.md").write_text("---\n" + yaml.safe_dump(front, sort_keys=False) + "---\n\n" + case["prompt"] + "\n")
        body = grader(skills, 0, 0) if expect == "none" else grader([expect], 1)
        (folder / "graders" / ("no-skill.md" if expect == "none" else "fires.md")).write_text(body)
    first = next(c for c in cases if c["expect"] != "none")
    control = OUT / "control-wrong-skill"
    (control / "graders").mkdir(parents=True)
    front = {"name": control.name, "tags": ["control"], "runs": 1, "max_turns": 2, "timeout_seconds": 180, "allowed_tools": ["Skill"]}
    (control / "prompt.md").write_text("---\n" + yaml.safe_dump(front, sort_keys=False) + "---\n\n" + first["prompt"] + "\n")
    (control / "graders" / "fires.md").write_text(grader([s for s in skills if s != first["expect"]][:1], 1))
    print("%d case(s) in %s" % (len(list(OUT.iterdir())), OUT))


if __name__ == "__main__":
    main()
