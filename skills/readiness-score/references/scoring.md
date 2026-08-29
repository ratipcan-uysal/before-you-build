# Scoring

## Category score

For each category:

```
category points = (sum of item scores / (3 × number of in-scope items)) × category weight
```

Conditional items opened by the work type are counted in the category they belong to, so they raise both the sum and the denominator. A `transaction` document is therefore measured against more items than a `content-config` one — which is the point.

## Redistribution

When a category has **no in-scope items at all** — every item exempted by quote — the category drops and its weight is spread across the surviving categories in proportion to their existing weights.

Example: a `backend-only` change where the document says *"no user-facing surface is affected"*, dropping K5 (weight 15). The remaining weights total 85, so each is multiplied by 100 / 85 ≈ 1.176:

| | before | after |
|---|---|---|
| K1 Problem and scope | 20 | 23.5 |
| K2 Users and trigger | 15 | 17.6 |
| K3 Behaviour and rules | 25 | 29.4 |
| K4 Data and dependencies | 15 | 17.6 |
| K6 Risk and non-functional | 10 | 11.8 |

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
| B3 failure paths ⚑ | 1 | "handle errors gracefully" — mentioned, not specified |
| B4 rules and limits | 2 | minimum order value given; no upper bound, no currency rounding rule |
| B5 permissions | 0 | not mentioned |
| T1 idempotency | 0 | not mentioned |
| T2 partial failure | 0 | not mentioned |
| T4 reversal | 1 | "refunds handled by support" — a routing decision, not a defined path |

```
K3 = (3+2+1+2+0+0+0+1) / (3 × 8) × 25 = 9/24 × 25 = 9.4 of 25
```

B3 scored 1, not 0, so the blocker does not fire — but it is the first line of the critical-gaps section, because a 1 here is worth less than the number suggests. Say that in the output rather than letting the arithmetic speak alone.
