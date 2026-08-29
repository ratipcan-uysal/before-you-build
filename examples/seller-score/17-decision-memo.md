# Decision memo — Seller Performance Score, first release scope

**To:** Deniz Aksoy, Category Management
**From:** Marketplace Core
**Date:** 30.08.2026

## The ask

Approve this as the scope of the first release: **the three components shown separately in the seller panel.** The components are not combined into one score, the 4.0 campaign threshold is not applied in this release, and storefront ranking and the score buyers see do not change.

## Why now

The campaign list freezes on 15 November, and that date belongs to the **cut** part: the threshold is not in this release. But the decision itself cannot wait, because the slice's most expensive engineering decision — storing components daily — is taken on day one and cannot be produced retroactively. **I need an answer by Friday 4 September.**

## What we know

The request's starting point was this: *"the review belongs to the product; the score lands on the seller."* Good sellers get a low score because of something they do not control.

Combining the three components into one number has a consequence that is not written in the request: **a good component can hide a bad one.** A seller at 5.0 on delivery, 5.0 on reviews and 2.0 on cancellations scores 4.1 and clears the 4.0 threshold while sitting in the bottom band on cancellations. Both marketplace documents we opened **do not blend** their metrics: separate metrics, separate thresholds, and a consequence when any one of them falls.

Two rules about the campaign threshold cannot both hold: the score will be recalculated every night, and the campaign list will freeze on 15 November. Whether a seller who drops below the threshold after 15 November stays on the list is not written.

**What we do not know and could learn today:** how many sellers are above 4.0 today and would fall below it under the new definition. **We have not measured this.** That number decides whether this is a release or an incident.

On measurement we have nothing: no baseline, no target and no comparison rule were defined; the request handed measurement to the data team.

## Recommendation

Start with this slice. Showing sellers their three components tests the thing the request actually wants to fix: does behaviour change when a seller can see what to fix? And it tests it **without silently breaking anything** — because the meaning of the number does not change, the storefront, past orders, reports and the mobile app stay as they are. Ten of the thirteen dependencies on our list go quiet in this release.

Because components are stored daily from day one, every deferred decision becomes **computable** afterwards: which weighting, which window, which threshold — all measurable retroactively. So this release also produces the number the threshold decision needs.

## What it costs

**What we give up:** setting the threshold now means setting it without knowing how many sellers fall overnight. Blending now means hiding the weighting argument behind a single number. Moving the storefront now means putting all thirteen dependencies into one week.

**What we accept:** **this release does not fix the unfairness you described.** A seller will see in the panel that their delivery is excellent, the score buyers see will still come from reviews, and they will ask about it. Support has to be ready for that question. I am writing this as the price of the cut, not as a side effect.

**Cost to bring things back:** the threshold is a decision and a rule — **not a migration**. Blending is cheap: any weighting can be computed from the stored daily components. The storefront cutover is the same cutover, later. **One condition:** the decision to store components daily and never overwrite them has to be taken now. Defer that and everything deferred becomes a migration, and this whole memo is void.

## If nobody decides

By default the team starts on the blended score, the threshold and the storefront cutover together, as the request describes. In that case the "good component hides a bad one" problem gets solved silently in code, whoever writes the campaign rule settles the 15 November contradiction alone, and we learn how many sellers fall when the campaign starts. None of that becomes irreversible — but if the stored data is not daily, all of it becomes **impossible to compute** retroactively.

## What I need from you

**Deniz — approve the slice above by Friday 4 September.** After that we run two things in parallel: we ask the data team for the number of sellers who would fall below 4.0, and we write the definitions of the three components with you and operations — without those definitions not a single value can be computed.

**This memo does not ask** what the threshold should be, that blending will never happen, or what the mobile scope is. All three are deferred; none is cancelled.
