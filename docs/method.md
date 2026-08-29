# The method

Nine principles. The skills in this repo are what they look like when they are made executable.

## 1. Steelman before you strike

You have not earned the right to attack an idea until you can state it better than the person who brought it. The most common way to be wrong while feeling right is to defeat a weak version of an argument and mistake that for a result.

Every critical skill in this set opens by constructing the strongest version of what it is about to attack.

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

## Why this set critiques more than it generates

Producing a plausible first draft is the thing language models are already best at. You do not need this repo for that.

What they are worst at, left alone, is refusing: refusing to fill a gap, refusing to agree, refusing to call something ready when it is not. That resistance is what these skills add — and it is why the balance tilts toward pressure over production, on purpose.
