# Decisions

Why this set is shaped the way it is. One entry per decision that had a real alternative — what was chosen, what was rejected, and why. Principles live in [`method.md`](method.md); this is the record of the calls made.

Kept in the repo rather than in anyone's head, because the most reliable reader of a decision record is the person who made the decision, six weeks later, about to make it again differently.

---

**Written from scratch, not adapted.** The set was distilled from a private toolkit that already worked. It was rewritten clean rather than sanitised, because that toolkit is soaked in one employer's context — real request documents, an internal API inventory, a question bank seeded from actual production incidents. Sanitising would have been faster and would have carried assumptions nobody could see any more.

**Skills in English, output in the user's language.** Turkish would have reached a real and underserved audience; English reaches more people and makes trigger matching more predictable, since descriptions are what the model matches against. One line per skill gets the second half back.

**One repo that is both plugin and marketplace.** `/plugin marketplace add` installs it in one step and updates automatically. A plain skills repo would be simpler to read and would push installation and updating onto the user.

**`SKILL.md` stays under 150 lines; detail lives in `references/`.** Lens catalogues, rubrics and output formats are read only when the phase that needs them is reached. Self-contained files would be easier to skim on GitHub and would pay their full cost on every trigger. CI enforces the limit, because it is the rule that erodes first.

**Grills are dialogic; producers are one-shot.** A grill asks one question and stops, because thinking happens in the pause. A producer that asked one question at a time would be abandoned halfway. `request-shaper` is the exception in both directions: it interviews, but in rounds of options rather than one open question, because it is extracting what the user already knows rather than making them think.

**Producing and grilling never share a skill, and never share a context.** A model that generates and then reviews approves its own work — from the ordinary pull of consistency, not vanity. This was proved during development: a design was generated from a brief and reviewed in the same session, and the brief's central decision had been violated in the drawing without the review catching it. `ux-grill` now declares the compromise when it applies.

**Silence scores zero.** In `readiness-score`, an item the document does not mention gets nothing; out of scope requires a quoted sentence. Partial credit for things a reasonable reader would assume is the single change that would make the score comfortable and worthless.

**`request-shaper` marks inferences `[ASSUMED]`; `readiness-score` caps a marked item at 1 of 3.** Without that contract the pair collude: one invents, the other scores the invention as content, and the user trusts a number built on nothing.

**Conditional items open on two axes, not one.** What the work does (transaction, data-display, input-collection, content-config, personalization) and where it runs (mobile-app, web, backend, multi-surface). A single work-type axis was tried first and put `backend-only` beside `transaction`, which is a category error — a backend change can perfectly well be transactional. Surface is also the axis documents leave implicit most often.

**`design-brief` decides and marks; it does not interview.** Two producing skills that both ask questions make the user answer twice. It drafts what it can, marks `[DECISION NEEDED]` with an owner for what it cannot, and hands over something a designer can start from.

**The design part is a loop.** `design-brief` → draw → `state-matrix` → `ux-grill` → back to `design-brief`. Some decisions cannot exist until something is drawn: "two recipients share a name, how does anyone tell them apart" is not derivable from a request. The second pass is usually the useful one.

**Tone is fixed: sharp but constructive.** Configurable intensity was considered and rejected — it adds mode handling to every skill and requires the harshest setting to be tested separately, for a preference most users would set once and forget.

**CI tests triggers and boundaries, not output quality.** Eleven skills with adjacent descriptions fail by firing the wrong one, and the user never learns why the answer was off. Output-quality evals need fixtures that cost as much as the skills do; they wait until the set stops changing weekly.

**Verdicts come from a closed set with published definitions.** `READY / CONDITIONAL / NOT READY`, `SURVIVES / SURVIVES, NARROWED / UNRESOLVED / FATAL FLAW`. A summary drifts toward whoever spoke last; a label can be argued with.

**No confidence hedges.** Coverage is reported as fact — "27 items in scope, 6 with no evidence either way" — because "medium confidence" tells nobody what to do next.

**The draft contract goes as far as real operations, but only after asking.** The first version stopped at shape — what is asked for and what comes back, no verbs or paths — on the grounds that naming is where a contract conversation dies. That was too cautious: a shape-only document still leaves the concrete conversation to be had, and a wrong concrete proposal is corrected in five minutes while a vague one costs a meeting. So the concrete layer exists, gated on one question: which paradigm, which naming convention, how versioning works. Unanswered or mixed, it stops at shape and says why — a proposal in the wrong paradigm is worse than none, because it tells the reader the author does not know the stack. Asking rather than assuming is the same move `design-brief` makes with design tokens, which it never invents.

**`api-needs` will propose a draft contract, which crosses the set's own line.** Everywhere else the rule is what and why, never how — naming endpoints and field shapes is designing, and designing the backend belongs to the people who own it. The exception is deliberate: a product manager who arrives with only a list of needs is negotiating from a weaker position than one who arrives with something concrete to argue against. The risk is that an experienced backend team reads a proposed contract as overreach, so the need must stand on its own and the draft must be a separate section that can be deleted without losing anything.

**API needs are derived from the flow, not from the screens.** Screens tell you about reads. Flows tell you about writes, sequencing and failure — which is where the hard questions live: what has to be atomic, what can be retried, what happens when step four succeeds and step five does not. Deriving from `design-brief` alone was the original plan and would have produced a read-shaped view of the problem.

**Output follows the user's language; markers do not.** Prose adapts, but `[ASSUMED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `reads`, `acts` and every other status token stay in English. This reverses an earlier call to translate everything, and the reason is mechanical rather than stylistic: markers are consumed downstream — `readiness-score` caps an item because it matched `[ASSUMED]`, `api-needs` reads the touchpoint marks `flow-map` wrote. A translated marker is a broken contract that fails silently, and it makes one finding look like two different things across two documents. It also matches how the vocabulary is already used in practice: a term whose translation reads worse is left in English.

**`state-matrix` was removed at v3.0.** The probation below was written before the condition was met, and then two arguments for keeping it failed under their own test. The granularity claim was wrong: `risk-interrogate`'s rule that every question must name something in the material already forces surface-level specificity, and its own worked example is a surface-level question about this same feature. The producer-must-not-sweep argument defended separation from `design-brief`, not existence — the work moved to `ux-grill`, which is a checker, so the principle holds. What remained was one finding the others would plausibly have reached, against the standing cost of a boundary that must be defended, tested and kept from drifting. The per-surface sweep is now `ux-grill`'s states lens; the project-wide constraints are `design-brief`'s.

The original entry, kept because the reasoning it records is what made the removal easy:

**`state-matrix` stays separate from `design-brief`, and is on probation.** Two rounds of narrowing took the project-wide constraints out of it and banned rows phrased as checks, which left the thinnest skill in the set: conditions a surface's own dependencies create. Folding it into `design-brief` was considered and rejected — the brief is the producer, and a producer that also sweeps is checking its own decisions, which is the failure this set is built against. It survives because the granularity is the point: `risk-interrogate` answers at feature level and nobody can draw "data integrity", while "the threshold never arrived" is a screen. If a real run puts its overlap with `risk-interrogate` above half, merge them.
