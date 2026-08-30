# The method

Eleven principles. The skills in this repo are what they look like when they are made executable.

## 1. Steelman before you strike

You have not earned the right to attack an idea until you can state it better than the person who brought it. The most common way to be wrong while feeling right is to defeat a weak version of an argument and mistake that for a result.

The dialogue grill does this literally: `idea-grill` cannot fire a question until it has written the argument better than its owner. The document grills do the same move against a written artefact — `ux-grill` and `flow-grill` open on conformance, checking the thing against the decisions it came from before applying any taste of their own. Both are the same refusal: you do not get to attack the version that is easiest to beat.

## 2. One question at a time

Twenty questions in one message do not make someone think. They make them triage — answer the three easy ones, skim past the hard one, and feel like they have engaged.

Thinking happens in the pause after a single sharp question. So the dialogue skills ask one thing and stop. This is slower, and it is the entire point.

## 3. Silence is not consent

The most damaging thing a language model does with an incomplete document is fill the gap plausibly. Ask it whether a spec covers error handling and it will find something reassuring to say.

So the measuring skills invert the default: **if the document does not say it, the score is zero.** Something may only be marked out of scope when the document positively says so, quoted. Absence never counts as coverage — and "the model probably knows what they meant" is not evidence.

This single rule is the difference between a readiness score that is worth acting on and one that is theatre.

## 4. Say what would change the answer

"Needs more detail" is not a finding. "Needs the retry policy for the payment callback, because without it the failure path is undefined" is.

Every gap this set reports comes with what would close it. If a finding does not tell you what to go and do, it has not finished being a finding.

## 5. Named verdicts, not vibes

Summaries drift toward whoever spoke last. Verdicts do not. Each measuring skill ends in one of a small closed set of labels with published definitions, so the same input produces the same call — and so people can disagree with the call rather than with a paragraph.

## 6. One skill, one job

Two skills that both "review the design" will fight, and the one that fires will be an accident of phrasing. Every skill here has a stated boundary and names the skill that owns what it refuses to do.

The unglamorous corollary: a skill that finds a problem outside its remit reports it and hands off. It does not helpfully solve it.

## 7. Critique and creation must not share a context

A model asked to produce something and then judge it will approve its own work. Not from vanity — from the ordinary pull of consistency.

So producing and grilling are always separate skills, run separately. `design-brief` decides, `ux-grill` attacks. Merging them would be more convenient and would destroy the value of both.

## 8. Load only what the moment needs

Each `SKILL.md` stays under 150 lines: when to trigger, the phase flow, the output shape, the hard rules. Lens catalogues, rubrics, and templates live in `references/` and are read only when the phase that needs them is reached.

Cheaper to run, easier to maintain, and possible for someone else to contribute to.

## 9. A derived view is checked against its source

Every second representation loses something. A diagram drawn from a step list collapses steps, and the collapse hides a branch. A screen drawn from a decision record honours four decisions and quietly inverts the fifth. Nothing looks wrong in either case, because the derived artefact is internally consistent — it is only inconsistent with the thing it came from, and nobody is holding both.

So a skill that produces a second view of something checks it against the first, item by item, before handing it over. `ux-grill` does this by design — conformance before taste — and it is the reason that skill catches what a general critique cannot.

This is not a rule about being careful. Exhortation does not survive contact with a long task; a named check placed in the phase that produces the artefact does.

---

## 10. The set works from the material, and marks where the material rests on the world

Almost every skill here reads only what someone brought. Exactly one does not: `prior-art` opens documentation, and it is built as the exception rather than as a licence — every line it writes must cite a page it actually opened, and a claim it cannot source is a line it does not write.

That boundary is deliberate. A model summarising what it half-remembers about an SDK, a law or a competitor sounds exactly as confident as one reading a document, and telling the two apart afterwards is impossible — which is the failure this whole set is built against.

But a boundary is only safe when it is visible. So a claim about the world outside the material carries `[UNVERIFIED]` and names the check that would settle it: *the platform documentation*, *legal*, *the vendor*, *whoever has built this before*. Unmarked, such a claim is indistinguishable from a decision somebody made, and it is precisely the kind that survives untouched into code — because everyone downstream assumes the person upstream looked.

## 11. A rule that needs a person needs a branch for when there is none

Half of these skills are run unattended — piped from another skill, scheduled, or invoked by someone who has gone to bed. Measured across one full chain, **eight skills carried a rule that hands the decision to a user who is not there**: *their call, every time* · *let the user choose* · *ask once, then proceed* · *put both statements in front of the user and make them choose*.

None of them is wrong. All of them stop.

What happens next is worse than stopping: the run invents the answer, silently, and nothing in the output says a default was taken. On the measured chain the largest single decision in a document — whether forty unanswerable items became open questions or capped assumptions, which moves the score without moving what anyone knows — was taken that way, by a rule that had delegated it to nobody.

**So every rule that requires an answer states what happens when no answer comes**, and the run says which default it took. The default is not always the same: leave it open, declare the record partial, draw the diagram, stop at the shape layer. Choosing it is a design decision and belongs in the file, not in whoever happens to be running.

The same applies to a guard. `build-context`'s self-review guard covers the cross-check and stops one phase short of the pass that walks the assembly back against its own sources — which is self-review by definition, performed by the only reader it has.

## Why this set critiques more than it generates

Producing a plausible first draft is the thing language models are already best at. You do not need this repo for that.

What they are worst at, left alone, is refusing: refusing to fill a gap, refusing to agree, refusing to call something ready when it is not. That resistance is what these skills add — and it is why the balance tilts toward pressure over production, on purpose.
