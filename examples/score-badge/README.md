# Worked example — the one that gets a yes

The other two examples in this repository end `NOT READY` and `ASK FIRST`. Four readiness scores across them: 12, 39, 25, 25. Until this one, **no run published here had ever reached `READY`, `CONDITIONAL` or `BUILDABLE`**, which left an honest question open: is the 80-point threshold a real bar, or one nothing can clear?

This example exists to answer that, and it answers it in a way that was not planned. Read in this order:

| | | What this step added |
|---|---|---|
| 1 | [The request](00-request.md) | A platform team proposes a shared component and arrives having already answered what two previous shared components taught them |
| 2 | [`idea-grill`](01-idea-grill.md) | **`SURVIVES, NARROWED`** — in proxy mode, run by one of the teams asked to adopt it. Three of the four defects are rendering; the fourth is a stale data source a component cannot reach |
| 3 | [`readiness-score`](02-readiness-score.md) | **`CONDITIONAL`, 62/100**, no blocker fired. The first uncompromised scoring in the repository — the document came from outside the session |
| 4 | [The answers](03-answers.md) | Two questions, put to the requester, answered the same afternoon. What closing a question actually looks like |
| 5 | [`design-brief`](04-design-brief.md) | Six renderings, one open decision carried as an interim — and **the generator block**, which no example had ever produced |
| 6 | [`build-context`](05-build-context.md) | **`BUILDABLE`** — 0 blocking questions, 0 disagreements across 13 pairs |

## What it turned out to show

**The bar is reachable, and the rubric is still wrong about this shape.** A request that answers nearly everything a `capability` needs — the integration contract closed, every default failing safe, the versioning window stated, the copy approved, accessibility named with its source — scores **62**. Not because it is thin, but because `readiness-score` asks it about data residency, running cost, end-to-end traceability and go-live sign-off, and a read-only render component earns zero on all of them.

Nothing was exempted, because an item leaves scope only when the document positively says so. This request has a precise *Not this* section and **not one of its sentences exempts a rubric item**. The finding belongs to the rubric rather than to the request, and it is testable: the same request with four exempting sentences would score in the high seventies without changing the work by one line.

So `CONDITIONAL` here does not mean "not good enough". It means the two things genuinely missing were worth a sentence each, and the score is the wrong instrument for saying so.

**`BUILDABLE` is not the absence of open questions.** One decision is still undecided at the end — whether two kinds of missing value should look different — and the pack is buildable anyway, because the record decided the interim behaviour rather than leaving a hole. That is the distinction the verdict is for: not *everything is settled*, but *nothing open would be invented on the first day*.

## What this example does not have

No flow, no data model, no system contract — and none of them skipped. The component neither stores nor fetches, so `data-model` has no nouns to name and `api-needs` has no touchpoints to derive. A chain that ran them anyway would have produced two empty documents and a reader who trusted them.

And it still has not produced `FATAL FLAW`, `NOT BUILDABLE`, or `idea-grill`'s co-build phase. Those are labels the set can emit and this repository has never had honest occasion to. Staging one to complete the collection is the failure this whole set is built against.
