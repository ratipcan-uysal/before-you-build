# Scoring

## Category score

For each category:

```
category points = (sum of item scores / (3 × number of in-scope items)) × category weight
```

Conditional items opened by the work type are counted in the category they belong to, so they raise both the sum and the denominator. A `transaction` document is therefore measured against more items than a `content-config` one — which is the point.

## Redistribution

When a category has **no in-scope items at all** — every item exempted by quote — the category drops and its weight is spread across the surviving categories in proportion to their existing weights.

Base weights: K1 20 · K2 12 · K3 25 · K4 13 · K5 12 · K6 8 · K7 10.

Example: a `backend-only` change where the document says *"no user-facing surface is affected"*, dropping K5 (weight 12). The remaining weights total 88, so each is multiplied by 100 / 88 ≈ 1.136:

| | before | after |
|---|---|---|
| K1 Problem and scope | 20 | 22.7 |
| K2 Users and trigger | 12 | 13.6 |
| K3 Behaviour and rules | 25 | 28.4 |
| K4 Data in and dependencies | 13 | 14.8 |
| K6 Risk and non-functional | 8 | 9.1 |
| K7 Instrumentation and downstream | 10 | 11.4 |

**K7 almost never drops.** "No reporting needed" is a decision that has to be written down and quoted like any other; a document that simply never mentions events or logging scores zero there, which is correct.

A category with *some* in-scope items never drops. It scores against the items that remain.

## Total

Sum the category points. Round to the nearest whole number, once, at the end. Never round intermediate values — a score assembled from rounded parts cannot be reconciled by a reader checking your arithmetic, and this output has to survive being checked.

## Verdict

Blockers first, then the number.

1. Did **P1**, **P2**, or **B3** score 0? → **NOT READY**. Name which.
2. Otherwise, total below 60 → **NOT READY**
3. 60–79 → **CONDITIONAL**
4. 80 or above → **READY**

A blocker overrides everything. A document can score 84 and still be NOT READY because nobody wrote down what would count as success — and that is correct, not a quirk of the model. Say so plainly when it happens.

## Coverage

Report alongside the score, as fact rather than hedge:

> Scored against a 2-page document. 27 items in scope, 6 with no evidence either way, 3 exempted by quote.

This tells the reader how much of the score is measurement and how much is absence. Never replace it with a confidence label — "medium confidence" tells nobody anything they can act on.

## Worked fragment

A `transaction` document. K3 has five spine items plus three conditional (T1, T2, T4) — eight in scope:

| Item | Score | Why |
|---|---|---|
| B1 main path | 3 | six numbered steps, each with the screen and the action |
| B2 branches | 2 | two branches written; the guest-checkout case is mentioned but not specified |
| B3 failure paths ⚑ | 0 | "handle errors gracefully" names no path and no behaviour — a heading with nothing under it |
| B4 rules and limits | 2 | minimum order value given; no upper bound, no currency rounding rule |
| B5 permissions | 0 | not mentioned |
| T1 idempotency | 0 | not mentioned |
| T2 partial failure | 0 | not mentioned |
| T4 reversal | 1 | "refunds handled by support" — a routing decision, not a defined path |

```
K3 = (3+2+0+2+0+0+0+1) / (3 × 8) × 25 = 8/24 × 25 = 8.3 of 25
```

**B3 scored 0 and the blocker fires, and the reason is the whole gate.** *"Handle errors gracefully"* is an intention, not a decision: it names no path, no state and nobody's behaviour, so a developer reading it knows exactly what they knew before. Scoring it 1 for being *mentioned* is where this rubric quietly stops measuring. It also produces the outcome the skill exists to refuse — a document admitting *"we have not worked out the error paths"* would score 0 and be blocked, while this one buys its way past the blocker with four words that say nothing. **Contentless text is silence with a heading on it.**

B2 and T4 are what a real 1 looks like: *"the guest-checkout case"* and *"refunds handled by support"* each name a thing that exists and stop short of saying how it behaves. A 1 needs a subject.
