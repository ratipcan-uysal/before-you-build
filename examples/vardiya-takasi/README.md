# Worked example — a shift swap for store staff

A supermarket chain's HR partner asks for in-app shift swapping. Its request is the best-written one in this repository, and the chain still returns **NOT READY, 44/100** — twice, from two scorers that never saw each other.

This is the third worked example and it differs from the other two in three ways. **The request was written to be strong on purpose**: a measured problem (61% of managers' manual roster corrections are swaps; 1,840 payroll mismatches a quarter), three numeric success criteria, a six-rule eligibility list drawn from labour law, five declared non-goals, and the author's own section listing what she had not decided. **It ran in Turkish**, so it is the first test of the rule that output follows the user's language while markers stay in English. And it ran on `transaction` · `mobile-app`, an axis pair no published example had exercised.

Every skill ran in its own clean context, unattended, handed only file paths. Each returned its document and an attack on the skill file that produced it. Documents are published as they came back, on v4.7.0. Their attacks became [v4.8.0](../../CHANGELOG.md), and the findings that drove them are in [`bulgular.md`](bulgular.md), in Turkish.

Read in this order:

| | | What this step added |
|---|---|---|
| 1 | [The request](00-talep.md) | Bereket Market, 480 stores, 9,100 staff. Swaps already happen on WhatsApp; the manager retypes them into the roster by hand |
| 2 | [`impact-radar`](01-impact-radar.md) | **40 dependants, 31 of them silent on release day.** The feature breaks its own success metric: once the roster write is an integration, the 61%→15% target falls for free or never moves |
| 3 | [`idea-grill`](02-idea-grill.md) | Proxy mode, 11 provocations, 7 cracked. Its sharp ones came from dividing the request's numbers by their own base: four swaps per store per week, half an hour per correction |
| 4 | [`prior-art`](03-prior-art.md) | The only randomised evidence tested swapping **without** manager approval, and the incumbent product makes approval a switch. Its first success metric may be contradicted by the mechanism |
| 5 | [`readiness-score`](04-readiness-score-v1.md) | **44/100, NOT READY.** Blocker B3: the request has a rejection branch and no failure path. 57 items in scope, 27 with no evidence |
| 6 | [`readiness-score`, independent](04b-readiness-score-independent.md) | Same request, a scorer that saw nothing of step 5. **Same axes, same 44, same blocker, same 38 under the alternative reading** |
| 7 | [`request-shaper`](05-request-shaper.md) | Autonomous, nobody to interview. 47 open items with owners, 26 of them blocking a start. Its carrier counted seven `[ASSUMED]`; the body held ten |
| 8 | [`slice`](06-slice.md) | One shift, to a named colleague, rules checked on the server, manager approves, pilot stores. Out go the pool and its list surface. **Eighteen legal calls landed in a section called "decided now, built later"** |
| 9 | [`design-brief`](07-design-brief.md) | 7 surfaces, 24 states, 14 `[DECISION NEEDED]`. Declares itself a layout study — the app exists and nobody could see it. Finds a second irreversible moment five documents never named |
| 10 | [`flow-map`](08-flow-map.md) | 21 steps · 6 branches · 19 error paths · 8 endings · 30 marks on 24 steps. Renamed its branches to avoid colliding with the slice's identifiers, and said so |
| 11 | [`flow-grill`](09-flow-grill.md) | 22 findings, 7 Critical. Its sharpest drift sat under a heading that read *"the two additions we did not make"* — decisions taken, filed as not done |
| 12 | [`data-model`](10-data-model.md) | 10 entities, 5 of them imported with no creating step. One hand-off with its own error path recorded as clean, because the rule said hand-offs write nothing |
| 13 | [`risk-interrogate`](11-risk-interrogate.md) | 12 questions survived, 26 struck. Five Critical, and no lens for the risk the material named itself: a system computing a legal decision and stamping it |
| 14 | [The screens](12-ekranlar.html) | 33 artboards drawn from the record, 23 of its 24 states. [Three decisions the brief did not make](12-ekranlar-notlar.md), one of them a rank list contradicting its own mechanism sentence |
| 15 | [`ux-grill`](13-ux-grill.md) | 9 conformance contradictions and 22 findings across 33 frames. Three belong to the record, not the drawing — and the format had nowhere to put them |
| 16 | [`decision-memo`](14-decision-memo.md) | One page asking the roster system's owner for a written commitment on the write endpoint by a derived date. Nobody named "Deniz" was invented |
| 17 | [`api-needs`](15-api-needs.md) | 32 needs on three planes. Six of eight ownerless needs collapse into one missing thing: the event pipeline three documents discuss and none assigns |
| — | [The findings](bulgular.md) | 27 gaps in the set, three of them structural, that this run surfaced and v4.8.0 closed or recorded |

## What this example is for

- **A strong request still fails, and the reasons are specific.** 44 is not a verdict on the writing. It measures nine decisions nobody had taken, and the document says which nine.
- **The score reproduces when the document is good.** Two independent scorings landed on the same number, the same blocker and the same alternative. On a thin request the bank run spread 18 to 22. Classification variance tracks the document, not the weights.
- **The set found its own faults in the seams.** An honest sentence scoring lower than the guess it contains. Three files whose examples contradicted their rules. Three skills hitting the same missing authority order. Nothing in the chain automated; all of it from reading the attacks.
- **Turkish held.** English markers inside Turkish prose, every document choosing a term once and holding it, and no half-translation. Only the suffix rule never fired, because the documents kept every English token in label position.

## Two things this example does not do

**It does not run `build-context`.** The last skill costs as much as the four before it, and the run had already found what it was going to find. So the pack that would have closed the chain is the one document here that does not exist, and the memo in step 16 is what a chain does about it.

**It does not show the fixed shapes.** Several of these documents carry the faults the run caught: a coverage line with the combined figure `flow-map` now forbids, a carrier count that disagrees with its body, a finding filed under a heading that hides it. They are left that way because a worked example that shows the corrected behaviour on the run that found the fault is evidence of nothing.
