#!/usr/bin/env python3
"""Structural checks for the before-you-build plugin.

Catches the failures that actually happen: a skill whose name drifts from its
directory, a reference link that points at a file nobody wrote, a SKILL.md that
grew past the progressive-disclosure budget, a skill with no boundary test —
and, since v3.0, prose that describes a set the repo no longer has.

That last one is here because it happened. `state-matrix` was removed, the
sweep covered skills/ and evals/, and a dead pointer sat in a public example
and passed CI, because CI only ever read skills/. The examples are the only
evidence the chain works end to end; they rot quietly and nothing complains.

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

# Skills that once existed. A live document must not describe the set as still
# having one; a history document may name it, with the reason nearby.
RETIRED = {
    "state-matrix": "removed at v3.0 — the per-surface sweep is now ux-grill's "
                    "states lens, the project-wide constraints are design-brief's",
}

# Kebab-case terms that look like skill names and are not. Short on purpose:
# a new term costs one line here, and being made to add it is the check working.
VOCABULARY = {
    "data-display", "input-collection", "content-config",  # work-type axis
    "mobile-app", "multi-surface", "backend-only",         # surface axis
    "owner-question",                                      # idea-grill proxy outcome
}

# Skills that do not exist yet. Nameable where the set records its direction;
# an error anywhere a reader would take them for something they can run.
PLANNED = {
    # Empty, and kept: the next skill named in the chain before it is written
    # goes here, and the split below is what makes naming it early safe.
}

SKILL_SHAPED = re.compile(r"`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`")
LINK = re.compile(r"\]\((?!https?://)([^)#\s]+)\)")
HISTORY_MARKER = re.compile(r"remov|retire|supersed|replac|\bdropped\b|\bv\d+\.\d+", re.I)
NUMBER_WORD = {w: i for i, w in enumerate(
    "zero one two three four five six seven eight nine ten eleven twelve "
    "thirteen fourteen fifteen sixteen".split())}

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


def strip_fences(text):
    """Drop fenced code blocks. What is inside a fence is quoted content, not
    prose: a link there is an illustration of a link, and a skill name there is
    a document being shown rather than a claim about this repo."""
    out, fenced = [], False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            fenced = not fenced
            out.append("")
            continue
        out.append("" if fenced else line)
    return "\n".join(out)


def blocks_of(text):
    """(first_line_number, text) for each blank-line separated block."""
    out, buf, start = [], [], 1
    for i, line in enumerate(text.splitlines(), 1):
        if line.strip():
            if not buf:
                start = i
            buf.append(line)
        elif buf:
            out.append((start, "\n".join(buf)))
            buf = []
    if buf:
        out.append((start, "\n".join(buf)))
    return out


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
    raw = skill_md.read_text()
    fm, body = parse_frontmatter(raw, rel)
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
    for line in raw.split("\n---\n", 1)[0][4:].splitlines():
        if line.startswith("description:") and not line.strip().endswith(("'", '"')):
            value = line.split(":", 1)[1]
            if ": " in value and not value.strip().startswith(("'", '"')):
                err(f"{rel}: unquoted description contains ': ' — breaks YAML parsing")

    if "Do not use" not in desc and "Not for" not in desc:
        warn(f"{rel}: description states no boundary — overlapping skills mis-fire")

    n = len(body.strip().splitlines())
    if n > MAX_BODY_LINES:
        err(f"{rel}: body is {n} lines (max {MAX_BODY_LINES}) — move detail into references/")

if not skill_names:
    err("no skills found under skills/")

# --- prose: links resolve, and every skill named still exists -------------
# Live surfaces describe the set as it is. History surfaces may name a retired
# skill when the reason is in the same block or the one before. CHANGELOG.md is
# exempt: every entry sits under a version heading, so it is scoped already.
prose = sorted(
    [ROOT / "README.md", ROOT / "CHANGELOG.md"]
    + list((ROOT / "docs").glob("*.md"))
    + list((ROOT / "examples").glob("*.md"))
    + list((ROOT / "commands").glob("*.md"))
    + list((ROOT / "skills").glob("*/SKILL.md"))
    + list((ROOT / "skills").glob("*/references/*.md"))
)
for md in prose:
    rel = md.relative_to(ROOT)
    text = strip_fences(md.read_text())

    for target in LINK.findall(text):
        if ":" in target.split("/")[0]:      # mailto: and friends
            continue
        if not (md.parent / target).exists():
            err(f"{rel}: broken link -> {target}")

    if rel.name == "CHANGELOG.md":
        continue
    live = rel.parts[0] in ("skills", "examples", "commands")
    blocks = blocks_of(text)
    for i, (line_no, block) in enumerate(blocks):
        window = block + "\n" + (blocks[i - 1][1] if i else "")
        for token in sorted(set(SKILL_SHAPED.findall(block))):
            if token in skill_names or token in VOCABULARY:
                continue
            if token in RETIRED:
                if not live and HISTORY_MARKER.search(window):
                    continue
                err(f"{rel}:{line_no}: names `{token}`, {RETIRED[token]}. "
                    + ("A live document must describe the set as it is."
                       if live else
                       "Say near it that it was removed, or take it out."))
            elif token in PLANNED:
                if not live:
                    continue
                err(f"{rel}:{line_no}: names `{token}`, {PLANNED[token]}. "
                    "A skill file, an example or the router must not name a "
                    "skill the user cannot run.")
            else:
                err(f"{rel}:{line_no}: `{token}` is not a skill and not declared "
                    "vocabulary — a typo, a rename nobody swept, or a term to "
                    "add to VOCABULARY in this script")

# --- indexes point at what is on disk -------------------------------------
readme = (ROOT / "README.md").read_text()
for name in sorted(skill_names):
    if f"](skills/{name}/SKILL.md)" not in readme:
        err(f"README.md: no link to skills/{name}/ — the skill table has drifted")

examples_readme = (ROOT / "examples/README.md").read_text()
for example in sorted((ROOT / "examples").glob("*.md")):
    if example.name != "README.md" and f"]({example.name})" not in examples_readme:
        err(f"examples/README.md: does not link {example.name} — "
            "an example nobody reading the index can find")

changelog = (ROOT / "CHANGELOG.md").read_text()
if not re.search(rf"^## {re.escape(plugin['version'])}\b", changelog, re.M):
    err(f"CHANGELOG.md: no entry for version {plugin['version']} — "
        "the version was bumped and the changelog was not")

# --- counts stated in prose match what is there ---------------------------
principles = len(re.findall(r"^## \d+\. ", (ROOT / "docs/method.md").read_text(), re.M))
for md in (ROOT / "README.md", ROOT / "docs/method.md"):
    for m in re.finditer(r"\b(\w+) principles\b", md.read_text(), re.I):
        word = m.group(1).lower()
        claimed = int(word) if word.isdigit() else NUMBER_WORD.get(word)
        if claimed is not None and claimed != principles:
            err(f"{md.relative_to(ROOT)}: says {m.group(1)} principles, "
                f"docs/method.md has {principles}")

# --- trigger coverage ----------------------------------------------------
cases = yaml.safe_load((ROOT / "evals/triggers.yaml").read_text())["cases"]
expected = [c["expect"] for c in cases]
for target in sorted(set(expected)):
    if target != "none" and target not in skill_names:
        err(f"evals/triggers.yaml: expects '{target}', which is not a skill")
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
print(f"\n{len(skill_names)} skill(s), {len(prose)} prose file(s), "
      f"{len(cases)} trigger case(s), {len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
