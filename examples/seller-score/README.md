# Worked example — changing a seller score

A marketplace wants to change what a seller's score means. Twenty documents later the release that gets proposed does not change the score at all.

This is the second worked example in this repository, and it is deliberately a different shape from [the first one](../README.md). That one starts with a new feature and a raw idea. This one starts where most work inside an organisation actually starts: **something already exists, and somebody wants it changed.** The entry point is `impact-radar` rather than `idea-grill`, and the argument the chain keeps returning to is not whether the idea is good — it is that the shape of the number stays the same while its meaning changes, which is the definition of breaking something silently.

Read in this order:

| | | What this step added |
|---|---|---|
| 1 | [The request](00-request.md) | Category management asks for a three-component score, a 90-day window, a nightly recalculation and a 4.0 campaign threshold. One page, one contradiction, and a great deal of silence |
| 2 | [`impact-radar`](01-impact-radar.md) | **13 dependencies, ten of them silent.** The number keeps its shape and changes its meaning, so most things that depend on it keep working and are wrong |
| 3 | [`request-shaper`](02-request-shaper-v1.md) | All 13 of those rows enter the open list. The request's five mechanisms are separated from the requirements under them, and one contradiction is written down as unwriteable either way |
| 4 | [`readiness-score`](03-readiness-score-v1.md) | **25/100, NOT READY**, two blockers. Opens by declaring itself compromised, because the same session wrote the document it is scoring |
| 5 | [`prior-art`](04-prior-art.md) | Two sources opened, and **neither blends its metrics**. Which surfaces an arithmetic nobody had noticed: at 50/30/20, a seller in the bottom band on cancellations still clears 4.0 |
| 6 | [`request-shaper` second pass](05-request-shaper-v2.md) | The departures are carried into the request rather than answered. Three new blocking items, one assumption promoted to an open question |
| 7 | [`readiness-score` again](06-readiness-score-v2.md) | **25/100. Unchanged** — and that is the finding: the second pass added four departures and moved nothing, because questions are not content |
| 8 | [`slice`](07-slice.md) | The headline is cut. The job finishes without the threshold, and the threshold takes the contradiction, the appeal urgency, the legal text and the overnight drop with it |
| 9 | [`design-brief`](08-design-brief-v1.md) | **Declares itself partial**, because no flow has been mapped. Finds that a value with no reference teaches a seller nothing — and refuses to decide what the reference is |
| 10 | [`flow-map`](09-flow-map.md) | Two flows, 12 steps, 7 error paths, and the arithmetic written as step numbers so it can be checked |
| 11 | [`flow-grill`](10-flow-grill.md) | Four dangling branches, an error path with no ending, and three decisions the flow dropped from its own sources |
| 12 | [`data-model`](11-data-model.md) | Names an entity the flow changes and never mentions, and adds the field the slice's own promise requires |
| 13 | [`api-needs`](12-api-needs.md) | 0 supported, and **one need with no owner at all** — thirty percent of the score rests on data nobody has claimed |
| 14 | [`risk-interrogate`](13-risk-interrogate.md) | Six questions, every one of them a consequence of two decisions taken together. Sixteen candidates were struck for already being on an open list |
| 15 | [The screens](14-screens.html) | Four frames drawn from the partial record, including two edge cases |
| 16 | [`ux-grill`](15-ux-grill.md) | **The drawing closed a decision the record left open** — a red border deciding what "bad" means before anyone defined it. And three numbers pointing in three directions, all drawn alike |
| 17 | [`design-brief` v2](16-design-brief-v2.md) | Eight states, three of which v1 never had. The record was right and the drawing ignored it, so v2 writes the mechanism as well as the rank |
| 18 | [`decision-memo`](17-decision-memo.md) | One page asking one named person to approve one thing — shipping a release that does not fix the unfairness it was asked to fix |
| 19 | [`build-context`](18-build-context.md) | Thirteen pairs checked. **14 questions, 5 disagreements, 0 questions lost** |
| 20 | [`request-shaper` third pass](19-request-shaper-v3.md) | The cut travels back into the request: five items leave scope with the quote that retired each, three additions made downstream are marked as unapproved |

## What this example is for

Examples where everything goes well teach nothing. Here is what this one shows:

- **A question carried all the way.** Every one of `impact-radar`'s thirteen rows and every one of `prior-art`'s four departures appears in the final pack. The cross-check reports **questions lost: 0** — which is a line worth having only because an earlier run of this chain lost one, and nothing noticed until the last document.
- **A second pass that changes nothing, correctly.** Step 7 re-scores the request after four departures are written into it and the number does not move. Questions are not content, and a skill that measures decisions has to say so even when it looks like no progress.
- **The producer breaking its own record, again.** Step 16 finds the drawing deciding, in a border colour, something the record explicitly marked as undecided. Nothing looks broken. This is the second time in two worked examples that a design has quietly contradicted its own brief.
- **Scope moving in both directions after the cut.** Step 20 retires five open items that belonged to cut parts — for two documents everyone counted fourteen blockers where nine actually blocked — and marks three requirements that appeared *after* the cut, each one reasonable, none approved. Both directions were found by `build-context` and both produced changes to the skills themselves.

## Two things this example does not do

**It does not run `idea-grill`.** The change was decided before the request was written, and grilling a settled decision wastes the reader's time. The routing table sends a change to something that already exists to `impact-radar`.

**It does not finish.** The verdict is `ASK FIRST` with fourteen questions and five disagreements, and four of those questions have been open across more than one document — which means they are waiting on a person, not on more writing. That is the honest end of a chain run, and the memo in step 18 is what a chain does about it.
