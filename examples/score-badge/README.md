# Worked example — the one that gets a yes, and then loses it

The other two examples in this repository end `NOT READY` and `ASK FIRST`. Four readiness scores across them: 12, 39, 25, 25. Until this one, **no run published here had ever reached `READY`, `CONDITIONAL` or `BUILDABLE`**, which left an honest question open: is the 80-point threshold a real bar, or one nothing can clear?

This example exists to answer that, and it answers it in a way that was not planned. Read in this order:

| | | What this step added |
|---|---|---|
| 1 | [The request](00-request.md) | A platform team proposes a shared component and arrives having already answered what two previous shared components taught them |
| 2 | [`idea-grill`](01-idea-grill.md) | **`SURVIVES, NARROWED`** — in proxy mode, run by one of the teams asked to adopt it. Three of the four defects are rendering; the fourth is a stale data source a component cannot reach |
| 3 | [`readiness-score`](02-readiness-score.md) | **`CONDITIONAL`, 62/100**, no blocker fired. The first uncompromised scoring in the repository — the document came from outside the session |
| 4 | [The answers](03-answers.md) | Two questions, put to the requester, answered the same afternoon. What closing a question actually looks like |
| 5 | [`design-brief`](04-design-brief.md) | Six renderings, one open decision carried as an interim — and **the generator block**, which no example had ever produced |
| 6 | [`build-context`](05-build-context.md) | **`BUILDABLE`** — 0 blocking questions, 0 disagreements. **This verdict did not survive** |
| 7 | [The uncompromised check](06-uncompromised-check.md) | The same six files, handed to a reviewer with **nothing but their paths**. Fourteen findings in a pack that reported zero — and the reason the guard became a mechanism |
| 8 | [The check, checked](07-second-audit.md) | The write-up of that audit, audited. **Two of its fourteen no longer describe the files, one is backwards, four are overstated — and four real contradictions were missed by both passes** |

## The result that matters most

The pack in step 6 was written by a chain that carried the self-review guard and opened by naming its own compromise. It still reported **zero disagreements in a set of documents holding at least six**, and got its own arithmetic wrong twice. Step 7 is the same six files given to a reviewer with only their paths: fourteen findings, twelve of which hold.

`BUILDABLE` is withdrawn; the corrected verdict is `ASK FIRST`. `CONDITIONAL` stands — that scoring was of a document from outside the session and its arithmetic reconciles.

**Then step 8 audited step 7, and that is the part worth reading.** The delegated review was sound; the write-up of it, produced back inside the chain, was not. Two findings were left standing after the defects they named had been fixed, one was inverted, four were overstated or blamed the wrong document, and the count was repeated downstream into the repository's changelog. None of those errors were in the reviewer's report. **They entered when the findings came home.**

The lesson is narrower than "delegate the review" and less comfortable: **the delegation has to survive the return trip.** This set already knows a finding cannot be written in by the skill that produced it, and it never noticed that the skill receiving it is the compromised one.

Step 8 also found four contradictions both earlier passes missed, the sharpest being that the component is required to mark a value as out of range while being forbidden to know what the range is.

## What it turned out to show

**A request that answers nearly everything a `capability` needs scores 62** — the integration contract closed, every default failing safe, the versioning window stated, the copy approved, accessibility named with its source. Nothing was exempted, because an item leaves scope only when a document positively says so, and this one has a precise *Not this* section that exempts no rubric item.

The first reading was that the finding belonged to the rubric, and **the arithmetic did not support it.** Exempting the four items in question moves 62 to 64.3. Exempting every zero-scored item in the whole rubric gives 77.1. The largest single shortfall is not the categories a component cannot speak to — it is K3, behaviour and rules, where the request scored 15 of 24 on its own merits.

What survives is narrower: a request of this shape pays an unavoidable tax of roughly **twelve points** on categories it has nothing true to say about. Whether twelve points makes the bar wrong needs a second `capability` scoring, not a stronger sentence.

**`BUILDABLE` was not the absence of open questions — and here it was not even the absence of disagreements.** One decision is still undecided at the end — whether two kinds of missing value should look different — and the pack is buildable anyway, because the record decided the interim behaviour rather than leaving a hole. That is the distinction the verdict is for: not *everything is settled*, but *nothing open would be invented on the first day*.

## What this example does not have

No flow, no data model, no system contract — and none of them skipped. The component neither stores nor fetches, so `data-model` has no nouns to name and `api-needs` has no touchpoints to derive. A chain that ran them anyway would have produced two empty documents and a reader who trusted them.

And it still has not produced `FATAL FLAW`, `NOT BUILDABLE`, or `idea-grill`'s co-build phase. Those are labels the set can emit and this repository has never had honest occasion to. Staging one to complete the collection is the failure this whole set is built against.
