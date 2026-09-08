# Running these skills in Codex

Nothing here is a port. Codex reads the same `SKILL.md` format, including `references/`, so the canonical files under [`skills/`](../skills/) serve both Claude Code and Codex.

## Use them in this repository

Open the repository root in Codex. The checked-in `.agents/skills` link points at the canonical [`skills/`](../skills/) directory, which is one of Codex's repository discovery locations. Codex detects the fifteen skills without an install. If a newly pulled skill does not appear, start a new task or restart Codex.

## Use them in every repository

Codex ships a `skill-installer`, and it accepts any public GitHub repository. Install one skill:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/idea-grill
```

All fifteen, in one run:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/api-needs skills/build-context skills/data-model skills/decision-memo skills/design-brief skills/flow-grill skills/flow-map skills/idea-grill skills/impact-radar skills/prior-art skills/readiness-score skills/request-shaper skills/risk-interrogate skills/slice skills/ux-grill
```

Each lands in `$CODEX_HOME/skills/<name>` — `~/.codex/skills` unless you set it otherwise. An existing destination is refused, so update by replacing that installed directory or keep a local link to this clone. Skills are available on the next task, not the current one.

Or ask Codex in words: *"install idea-grill and slice from ratipcan-uysal/before-you-build"* reaches the same script.

**Take four rather than fifteen if you work alone.** Eleven of these are organisational instruments — they route findings to named owners, and a solo builder is every owner. [`idea-grill`](../skills/idea-grill/SKILL.md), [`slice`](../skills/slice/SKILL.md), [`prior-art`](../skills/prior-art/SKILL.md) and [`flow-map`](../skills/flow-map/SKILL.md) need nobody else in the room.

## Two things that differ

**There is no `/byb`.** That router is a Claude Code slash command and does not install. It is not much of a loss: Codex picks a skill by matching its description, and these descriptions are written for exactly that, each with its triggers and an explicit *"do not use this for…"*. Describe what you are holding — a raw idea, a ticket nobody can start on, a screen to tear apart — and the right one comes up. The full routing table is in the [README](../README.md) if you would rather choose yourself.

**The chain is yours to sequence.** Nothing carries a document from one skill to the next automatically in either tool. Save each output, hand it to the next skill by path, and let the carrier index at the top of each document tell that skill what to read.

## Why there is no separate Codex repository

Codex now has two useful distribution paths: repository skills under `.agents/skills`, and plugins for a marketplace. This repository only needs the first. A second repository or a packaged plugin would duplicate the same fifteen skill directories unless the canonical tree moved, creating another release surface without changing behaviour. The repo link gives Codex native discovery while keeping one source of truth; `skill-installer` supplies the global-install path.

Revisit a packaged plugin when marketplace discovery is a product requirement rather than an installation convenience. If that happens, the package mirror needs a byte-for-byte synchronization check before it is published.

## What was verified, and what was not

Installation was run against this repo at v4.8.0: single and multi-skill, into a scratch destination, with `references/` arriving intact and frontmatter unchanged. At v4.10.0, repository discovery was checked against the installed Codex CLI by inspecting the model-visible prompt input. The first pass exposed ten of fifteen names; after tightening the trigger descriptions, the same check exposed all fifteen from `.agents/skills`. The relative links inside each `SKILL.md` resolve in both paths because the reference files stay beside them.

**Selection behaviour was not measured.** Whether Codex reaches for the right skill out of fifteen, as often as Claude Code does, is an open question — the descriptions are long by design and no run has compared the two. If a skill fires when it should not, or sits quiet when it should fire, that is worth reporting; it is the kind of thing only use finds.
