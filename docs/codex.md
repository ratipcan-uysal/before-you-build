# Running these skills in Codex

Nothing here is a port. Codex reads the same layout Claude Code does — a `SKILL.md` carrying `name` and `description` frontmatter, with the detail in `references/` — so the skills install and run unchanged. What follows is the install path and the two things that behave differently.

## Install

Codex ships a `skill-installer`, and it takes any public GitHub repo. One skill:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/idea-grill
```

All fifteen, in one run:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo ratipcan-uysal/before-you-build --path skills/api-needs skills/build-context skills/data-model skills/decision-memo skills/design-brief skills/flow-grill skills/flow-map skills/idea-grill skills/impact-radar skills/prior-art skills/readiness-score skills/request-shaper skills/risk-interrogate skills/slice skills/ux-grill
```

Each lands in `$CODEX_HOME/skills/<name>` — `~/.codex/skills` unless you set it otherwise. A destination that already exists is refused, so removing a directory is how you reinstall. Skills are available on the next turn, not the current one.

Or ask Codex in words: *"install idea-grill and slice from ratipcan-uysal/before-you-build"* reaches the same script.

**Take four rather than fifteen if you work alone.** Eleven of these are organisational instruments — they route findings to named owners, and a solo builder is every owner. [`idea-grill`](../skills/idea-grill/SKILL.md), [`slice`](../skills/slice/SKILL.md), [`prior-art`](../skills/prior-art/SKILL.md) and [`flow-map`](../skills/flow-map/SKILL.md) need nobody else in the room.

## Two things that differ

**There is no `/byb`.** That router is a Claude Code slash command and does not install. It is not much of a loss: Codex picks a skill by matching its description, and these descriptions are written for exactly that, each with its triggers and an explicit *"do not use this for…"*. Describe what you are holding — a raw idea, a ticket nobody can start on, a screen to tear apart — and the right one comes up. The full routing table is in the [README](../README.md) if you would rather choose yourself.

**The chain is yours to sequence.** Nothing carries a document from one skill to the next automatically in either tool. Save each output, hand it to the next skill by path, and let the carrier index at the top of each document tell that skill what to read.

## Why there is no Codex plugin

Codex has a plugin system that mirrors Claude Code's: `codex plugin marketplace add owner/repo`, then `codex plugin add`. A plugin bundles skills through a `.codex-plugin/plugin.json` with a `skills` pointer, and shipping one here would replace the command above with two short ones, plus version pinning and upgrades.

It is not shipped, and the reason is a constraint that was measured rather than assumed. **A plugin cannot live at the marketplace root.** Pointing the marketplace entry at `.`, `./` or an empty path finds nothing; the same manifest in a subdirectory is found immediately. And installing copies only that subdirectory — a `skills` pointer of `../../skills/` resolves, the plugin installs, and it arrives carrying no skills at all.

So a plugin means the fifteen skills live under `plugins/before-you-build/skills/`: either a second copy with nothing keeping it in step with the first, or a move that changes every path in this repo and the Claude Code marketplace that reads them. A duplicated tree is the drift this set has already paid for three times, and it would be the whole product rather than a metadata file. The move is defensible and is not being made for one install command.

Reopen it if Codex allows a root-level plugin, or if enough people are installing skill by skill for the ergonomics to be worth the churn.

## What was verified, and what was not

Installation was run against this repo at v4.8.0: single and multi-skill, into a scratch destination, with `references/` arriving intact and frontmatter unchanged. The relative links inside each `SKILL.md` resolve after install, because the reference files travel with it.

**Selection behaviour was not measured.** Whether Codex reaches for the right skill out of fifteen, as often as Claude Code does, is an open question — the descriptions are long by design and no run has compared the two. If a skill fires when it should not, or sits quiet when it should fire, that is worth reporting; it is the kind of thing only use finds.
