#!/usr/bin/env python3
"""Structural checks for the before-you-build plugin.

Catches the failures that actually happen: a skill whose name drifts from its
directory, a reference link that points at a file nobody wrote, a SKILL.md that
grew past the progressive-disclosure budget, and a skill with no boundary test.

Usage: python3 scripts/validate.py
"""
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
MAX_BODY_LINES = 150
MIN_DESC, MAX_DESC = 200, 1600

errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def parse_frontmatter(text, path):
    if not text.startswith("---\n"):
        err(f"{path}: missing YAML frontmatter")
        return None, text
    end = text.find("\n---\n", 4)
    if end == -1:
        err(f"{path}: unterminated frontmatter")
        return None, text
    try:
        fm = yaml.safe_load(text[4:end]) or {}
    except yaml.YAMLError as e:
        err(f"{path}: frontmatter is not valid YAML: {e}")
        return None, text
    return fm, text[end + 5:]


# --- manifests -----------------------------------------------------------
plugin = json.loads((ROOT / ".claude-plugin/plugin.json").read_text())
market = json.loads((ROOT / ".claude-plugin/marketplace.json").read_text())
listed = {p["name"] for p in market["plugins"]}
if plugin["name"] not in listed:
    err(f"marketplace.json does not list the plugin '{plugin['name']}'")

# --- skills --------------------------------------------------------------
skill_names = set()
for skill_md in sorted((ROOT / "skills").glob("*/SKILL.md")):
    rel = skill_md.relative_to(ROOT)
    fm, body = parse_frontmatter(skill_md.read_text(), rel)
    if fm is None:
        continue

    name = fm.get("name")
    desc = fm.get("description", "")
    if name != skill_md.parent.name:
        err(f"{rel}: frontmatter name '{name}' != directory '{skill_md.parent.name}'")
    if name in skill_names:
        err(f"{rel}: duplicate skill name '{name}'")
    skill_names.add(name)

    if not MIN_DESC <= len(desc) <= MAX_DESC:
        warn(f"{rel}: description is {len(desc)} chars (target {MIN_DESC}-{MAX_DESC}) — "
             "too short triggers unreliably, too long crowds the context")
    raw_fm = skill_md.read_text().split("\n---\n", 1)[0][4:]
    for line in raw_fm.splitlines():
        if line.startswith("description:") and not line.strip().endswith(("'", '"')):
            body = line.split(":", 1)[1]
            if ": " in body and not body.strip().startswith(("'", '"')):
                err(f"{rel}: unquoted description contains ': ' — breaks YAML parsing")

    if "Do not use" not in desc and "Not for" not in desc:
        warn(f"{rel}: description states no boundary — overlapping skills mis-fire")

    n = len(body.strip().splitlines())
    if n > MAX_BODY_LINES:
        err(f"{rel}: body is {n} lines (max {MAX_BODY_LINES}) — move detail into references/")

    for target in re.findall(r"\]\((?!https?://)([^)#]+)", body):
        if not (skill_md.parent / target).exists():
            err(f"{rel}: broken link -> {target}")

if not skill_names:
    err("no skills found under skills/")

# --- trigger coverage ----------------------------------------------------
cases = yaml.safe_load((ROOT / "evals/triggers.yaml").read_text())["cases"]
expected = [c["expect"] for c in cases]
for name in sorted(skill_names):
    if expected.count(name) < 2:
        err(f"{name}: needs at least 2 trigger cases in evals/triggers.yaml")
if "none" not in expected:
    err("evals/triggers.yaml: needs at least one 'expect: none' case")

# --- report --------------------------------------------------------------
for w in warnings:
    print(f"warn  {w}")
for e in errors:
    print(f"FAIL  {e}")
print(f"\n{len(skill_names)} skill(s), {len(cases)} trigger case(s), "
      f"{len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
