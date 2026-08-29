# slice — the first release

**Input:** `05-request-shaper-v2.md` · `06-readiness-score-v2.md` (NOT READY, 25) · `04-prior-art.md`

> **The signal test fails on this slice.** Every cut has to pass "could you tell whether it worked". `readiness-score` scored the success criterion **0**: there is no current value, no target and no comparison rule, and the request handed measurement to another team. The cuts are made anyway; until that gap closes, no release here can be defended as having worked.

---

## The spine

**A seller opens their panel, sees which component their score comes from, and understands what to fix.**

The request's own sentence: *"so a seller knows what to fix."* If removing a step means that sentence can no longer be completed, it is spine.

| Piece | Does the job finish without it? | Verdict |
|---|---|---|
| Computing the three components | No | spine |
| Showing them separately in the panel | No — this *is* the job | spine |
| Defining the components (B6) | No | spine, and uncuttable |
| Computing once a day | No | spine — cheap, and harmless without a gate |
| **Blending the three into one number** | **Yes** | cut |
| **The 4.0 campaign threshold** | **Yes** | cut — the headline |
| **Storefront ranking moving to the new score** | **Yes** | cut |
| **The score the buyer sees changing** | **Yes** | cut |
| **The appeal process** | Yes | cut, but not its answerability |

**The headline test.** This request is known as "we are fixing the score", and the piece everyone will argue about is the 4.0 threshold. Held against the job, the job finishes without it — and the threshold takes with it the 15 November contradiction (B5), the urgency of the appeal (B8), the agreement text (G5), the obligation to notify (G12), and the set of sellers who fall below it overnight (B9). **The risky half is not load-bearing**, and this entire slice comes out of that one observation.

---

## In the slice

1. Three components are computed once a day: on-time delivery rate, seller-caused cancellation rate, product review average
2. Each day's value is **stored** together with the date range it was computed from
3. The seller panel shows the three components separately, with their values
4. The seller can read how each component is calculated

**Nothing the buyer sees changes.** The storefront, order details and the mobile app keep showing today's score under today's definition.

**Ten of `impact-radar`'s thirteen dependencies go quiet in this slice**, because all of them came from the same thing: the meaning of the number changing. If the meaning does not change, there is no silent breakage.

---

## Why this slice — and the alternative that lost

There was a second defensible cut: **change the score, defer the gate.** It would have addressed the request's actual grievance ("good sellers punished by product reviews") directly. It lost because changing the meaning of the number opens all thirteen `impact-radar` rows at once — storefront, past orders, month-to-month reports, older mobile versions — and none of those can be answered before 15 November.

The price of the chosen slice is plain and not hidden: **the unfairness the request describes is not fixed in this release.** A seller will see "your delivery is excellent" in the panel while the score buyers see still comes from reviews, and they will ask about it. That is not a design question; it is the price of the cut, and paying it is Deniz's decision, not mine.

In exchange the slice **produces** something: because components are computed and stored from day one, B9 (how many sellers would fall below 4.0) can be answered from real data instead of a projection. The deferred work generates the evidence the deferred decisions need.

---

## Decided now, built later

1. **Grain.** Component values are stored **per seller per day**, and every row carries the date range it was computed from. Defer this and the window length (30/60/90), the weights and the threshold all become **impossible to recompute retroactively** — each one turns into a migration. It is the single expensive engineering decision in this slice.
2. **Component definitions (B6).** The code answers this on day one; if the answer comes from whoever writes the code, the product's rule is set there silently.
3. **The score shown on a past order.** `[DECISION NEEDED]`, owner Marketplace Core + Deniz. Is the seller score on an order detail the score **as at order time**, or today's? The slice does not change the score, so the consequence is invisible here — but decide it later and it cannot be reconstructed. `impact-radar` #6.
4. **No daily value is ever overwritten.** Each day is its own row. Otherwise the report that distinguishes before and after v2 (G6) can never be written, and the data cannot be recovered.
5. **An appeal stays answerable.** The appeal *process* is not in this slice; but "why was my value X on 3 November" has to be answerable from the stored rows **from day one**. A right whose evidence was never kept cannot be granted later.
6. **Permissions.** Who can see a seller's components — the seller, support, category management — checked **server-side**. Roles can be one today.

---

## Out of this slice

**The 4.0 campaign eligibility threshold is out of scope for this release.** *Brings it back:* settling the B5 contradiction (frozen list or moving threshold) and the number in B9. *What it buys:* the 15 November contradiction, the urgency of the appeal, the agreement text, the notification obligation and the overnight drop set — all of them leave together. *Cost to resume:* a decision and a rule. **Not a migration**, because the components are stored daily.

**Blending the three components into one score is out of scope for this release.** *Brings it back:* an answer to B12 — one number or three thresholds. `prior-art` M1 gave this a named alternative, *three components, three separate thresholds*, and both independent sources it opened work that way. *What it buys:* the entire weighting argument, and the problem of a good component hiding a bad one. *Cost to resume:* cheap — any weighting, for any date, can be computed from the stored daily components.

**Storefront ranking is not moving to the new score in this release. The seller score shown to buyers does not change.** *Brings it back:* the blending decision (B12) and reporting continuity (G6). *What it buys:* the ten silently-breaking rows in `impact-radar`. *Cost to resume:* the same cutover, later. **But this cut may be a false economy, and it is recorded as one now:** two definitions live side by side for a while, the seller sees one thing in the panel and the buyer another, and if the second slice is far away that gap becomes a support load. The cut is defensible for risk, not for cheapness.

**The appeal process is out of scope for this release.** *Brings it back:* B8, and the return of the threshold — with no gate there is no outcome to appeal against. *What it buys:* a submission surface, a review queue and a retroactive correction mechanism. *Cost to resume:* it stays cheap only because of decision 5 above; if the data is not kept, an appeal process arriving later finds nothing to answer with.

**Notifying the seller is out of scope for this release.** *Brings it back:* the threshold decision. With no threshold there is no drop to announce. *Note:* `prior-art` K2 documents that outside, notification is mandatory and cannot be turned off; when the threshold returns, this comes with it rather than as a separate request.

---

## Not doing

**Today's 12-month review score is not deleted and not overwritten.** Nobody asked for it to go, and it is the only ground on which before and after v2 can be compared. Said once so that "it was gone anyway" is never a sentence in this project.

---

## What this slice does to the score

Four things leave scope with **quotable** sentences: the campaign threshold (and with it G2, G5, G8, G12), the ranking cutover (G1), blending (B12), and the appeal process (B8). It does not clear the blockers: there is still no success criterion, and this slice's own failure paths are unwritten — what happens when the nightly job fails, when a component cannot be computed, when a seller has no data in 90 days.

**One sentence on timing:** whether this slice reaches 15 November is not in this document, because estimating is not this skill's job. But 15 November belongs to the **cut** part: it is the campaign list freeze date, and the threshold is not in this release.
