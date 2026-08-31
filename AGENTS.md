# Working in this repo

Fifteen skills for the work before code gets written. They are prose that changes how a model behaves, so an edit here is a behaviour change and gets treated as one.

Read [`docs/method.md`](docs/method.md) for the principles and [`docs/decisions.md`](docs/decisions.md) for the calls already taken with their rejected alternatives. Do not reopen those without new evidence.

## Before you commit anything

```bash
python3 scripts/validate.py
```

Green is the bar, and the checks are not decoration. Each one exists because the failure it catches happened: a dead skill name in a public example, a guard copied without the mechanism that discharges it, a rule that demands an answer in a set that mostly runs with nobody there.

## What the checks enforce

| | |
|---|---|
| `SKILL.md` body ≤ 150 lines | Everything else goes in `references/`. Progressive disclosure is the budget, not a preference |
| Description 200–1600 chars, with a stated boundary | The description is what a model matches on. A skill with no *"Do not use"* fires on its neighbours' work |
| Every skill named by at least two others | One caller is one path in, and a user who does not run that skill never reaches this one |
| Links resolve, backticked kebab-case terms exist | Prose rots quietly; a retired name in an example passed CI for a whole release once |
| A rule needing an answer says what happens when none comes | Method principle 11. Matching is a tripwire on phrasings that have appeared, not a proof — a new wording still gets through, and a reader is the only real catch |

## House rules an edit has to keep

- **Output goes to chat, and to a path when the caller gave one.** Skills run as chain steps as often as they run alone.
- **Markers stay in English in every language:** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `reads`, `acts`. Downstream skills match on them. Everything else follows the user's language.
- **A cell is a line.** Findings that need a paragraph become blocks with identifiers, and identifiers are unique to their document, not to the chain.
- **Producing and grilling never share a context.** A model that wrote something approves it on review; this is measured, not assumed.
- **No skill invents a decision to look complete.** Naming a gap is the product.

## The failure this repo keeps having

**A rule gets tightened and the example under it does not.** Three cases shipped and were caught by a run rather than by CI: a worked score that contradicted its own evidence gate, a mode description a later phase had redefined, a coverage line printing the number its own rule calls the most common error in the document. Nothing automated catches this class.

So: when you change a rule, the example under it is part of the change, and so is every published example in [`examples/`](examples/) that shows the old shape. That directory is the only end-to-end evidence the chain works, and it is the first thing to rot.

## Adding or removing a skill

A skill added or removed is a **major** version. A skill's contract changing is a **minor**. A correction that changes no behaviour is a **patch**. The version lives in `.claude-plugin/plugin.json`, the `CHANGELOG.md` heading and the README line, and CI keeps them equal.

A new skill needs a caller before it needs content. Nothing routes to a skill no other skill names.

## Using these skills from another agent

This layout is the portable one: `SKILL.md` with `name` and `description` frontmatter, detail in `references/`. See [`docs/codex.md`](docs/codex.md) for installing into Codex, which reads the same format.
