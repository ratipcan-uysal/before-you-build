# Changelog

What changes about the output you get. Skills are behaviour, so a rubric that grows or a rule that tightens means the same document can come back scored differently — those changes are marked **Heads up**.

For why a decision was made rather than what changed, see [`docs/decisions.md`](docs/decisions.md).

## 1.1.0

**`state-matrix`** joins the set. Enumerates every state a surface can be in across six dimensions, marks each **Designed / Decided / Open / Unreachable**, and reports the counts. Two checks read across the finished matrix: a state with no way out is a trap, and a designed state nothing leads to is dead.

The design part of the chain is now drawn as the loop it is — `design-brief` → `state-matrix` → `ux-grill` → back to the brief. Some decisions cannot exist until something has been drawn, and the second pass is usually the useful one.

## 1.0.0 — wave one complete

**`ux-grill`** joins the set. Critiques a design that exists and returns findings with severity, never a redesign.

Two rules worth knowing before you run it:

- **It declares itself compromised if it produced the design in the same conversation.** A model that generates and then reviews approves its own work. This is not a disclaimer; it changes what the output is worth, and the pass should be repeated in a clean context.
- **Conformance runs before taste.** If a brief exists, the design is checked against it first — a screen that contradicts its own brief looks fine and passes review.

## 0.5.0

**`design-brief`** joins the set. Extracts the design decisions behind a feature before anyone opens Figma: surfaces, the single primary job of each, ranked hierarchy, navigation and input models, defaults, feedback, constraints, non-goals.

It also drafts what a UI generator would otherwise invent — copy and example content, marked `[DRAFT]` — and can emit a constraint block for generators. That block carries rank order and prohibitions and never a style adjective, because adjectives carry no constraint and send the model back to its average.

## 0.4.0

**`risk-interrogate`** joins the set. Twelve dimensions of production failure for work that is already decided, as questions grouped by who has to answer them.

**Heads up.** It refuses to restate gaps. If the material is already shaped or scored, it reads that document's open list and strikes everything already named there — an absence is a completeness finding and belongs to `readiness-score`. Expect a shorter, sharper list than a checklist would give you, and expect it to say so.

## 0.3.0

**`request-shaper`** joins the set. Turns raw notes into a document a team can start from, either by interview or, on request, as a draft with every inferred line marked.

**Heads up — a contract between two skills.** `request-shaper` marks anything it inferred `[ASSUMED]`, and `readiness-score` now caps a marked item at 1 point of 3. Documents produced by earlier drafting will score slightly lower, and that is the correct number: without the cap, one skill invents and the other scores the invention as content.

`idea-grill` gains **proxy mode** — for grilling a request that came from someone else, where "only they can answer that" is a correct answer rather than a crack, and the close becomes a question list for whoever owns it. Its lens catalogue grows to fifteen with prior art, unit economics, and permission to operate, plus channel lenses that ask where a request came from, because a request from sales fails differently from one from compliance.

## 0.2.0

**`readiness-score`** joins the set. Scores a written request 0–100 with a `READY / CONDITIONAL / NOT READY` verdict.

**Heads up — the rubric grew twice after this release.** It began at 25 items on one conditional axis. It now carries 39 spine items across seven weighted categories and two axes: what the work does, and where it runs. A document scored at 0.2.0 will score differently now, usually lower, because instrumentation, account context, calculation order, release ordering and platform scope were not asked about at all. The later number is the honest one.

Three blockers force `NOT READY` regardless of total: no stated problem, no success criterion, no failure paths. A document can score 84 and still fail.

## 0.1.0

First release. **`idea-grill`**, the `/byb` router, the method, and one worked example.

`idea-grill` was calibrated once shortly after release: it now shows the strongest available answer once a point closes — never while it is open — restates the thesis whenever a defense moves it, and stops on a maturity check rather than a turn count. Can you state the thesis, do you know what it depends on, do you know what would kill it: any no is the next target, all three yes means dialogue has taken it as far as it goes.
