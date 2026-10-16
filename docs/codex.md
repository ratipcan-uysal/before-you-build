# Running these skills in Codex

Nothing here is a port. Codex reads the same `SKILL.md` format, including `references/`, so the canonical files under [`skills/`](../skills/) serve both Claude Code and Codex.

## Use them in this repository

Open the repository root in Codex. The checked-in `.agents/skills` link points at the canonical [`skills/`](../skills/) directory. It now contains eighteen skills; discovery of the previous fifteen was measured at v4.10.0. New skills are structurally validated and exercised in bounded explicit-invocation trials, not yet measured for automatic host selection. If a newly pulled skill does not appear, start a new task or restart Codex.

## Use them in every repository

Codex ships a `skill-installer`, and it accepts any public GitHub repository. Install one skill:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/idea-grill
```

All eighteen, once this version is available on GitHub:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/api-needs skills/build-context skills/data-model skills/decision-memo skills/design-brief skills/flow-grill skills/flow-map skills/idea-grill skills/impact-radar skills/prior-art skills/readiness-score skills/request-shaper skills/risk-interrogate skills/slice skills/ux-grill skills/work-guide skills/acceptance-spec skills/contract-spec
```

Each lands in `$CODEX_HOME/skills/<name>` — `~/.codex/skills` unless you set it otherwise. An existing destination is refused, so update by replacing that installed directory or keep a local link to this clone. Skills are available on the next task, not the current one.

Or ask Codex in words: *"install idea-grill and slice from ratipcan-uysal/before-you-build"* reaches the same script.

**You can install a subset.** [`idea-grill`](../skills/idea-grill/SKILL.md), [`slice`](../skills/slice/SKILL.md), [`prior-art`](../skills/prior-art/SKILL.md) and [`flow-map`](../skills/flow-map/SKILL.md) work alone. For managed work, install `work-guide` together with the analytical skills it routes to. Its `scripts/` and `references/` must arrive together; it needs Python 3.9+ but no app server.

## Two things that differ

**There is no `/byb`.** That router is a Claude Code slash command and does not install. It is not much of a loss: Codex picks a skill by matching its description, and these descriptions are written for exactly that, each with its triggers and an explicit *"do not use this for…"*. Describe what you are holding — a raw idea, a ticket nobody can start on, a screen to tear apart — and the right one comes up. The full routing table is in the [README](../README.md) if you would rather choose yourself.

**Standalone chaining remains manual; managed work is opt-in.** `work-guide` supplies a shared skill entry point for persistent work in either host. It tells the host agent how to store sources, questions, decisions and artifact revisions, then route to the specialists. The ledger itself does not launch models or guarantee the host's skill selection. A draft packet can carry the work to a fresh context; it is not implementation authorization.

## Why there is no separate Codex repository

This repository keeps one canonical skill tree. A second repository or a packaged mirror would create another release surface without changing behavior. The repo link and existing `skill-installer` path remain the distribution approach; the work guide's helper code lives inside its skill directory so global copies remain self-contained.

Revisit a packaged plugin when marketplace discovery is a product requirement rather than an installation convenience. If that happens, the package mirror needs a byte-for-byte synchronization check before it is published.

## What was verified, and what was not

Installation was run against this repo at v4.8.0: single and multi-skill, into a scratch destination, with `references/` arriving intact and frontmatter unchanged. At v4.10.0, repository discovery was checked against the installed Codex CLI by inspecting the model-visible prompt input. The first pass exposed ten of fifteen names; after tightening the trigger descriptions, the same check exposed all fifteen from `.agents/skills`. The relative links inside each `SKILL.md` resolve in both paths because the reference files stay beside them.

**Automatic selection behaviour was not measured.** Descriptions are budgeted routing metadata, not proof of selection quality. The v6.0 executable suite exercises state transitions and final gates; bounded independent trials use explicit skill paths. See [the quality report](../examples/work-guide/quality-report.md) for the precise behavioral evidence. Existing globally installed copies are not updated by changing this clone. Model selection belongs to the chosen host; the plugin does not launch or switch providers.
