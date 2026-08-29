# Worked example — `readiness-score`

The same feature scored twice: [the raw request](quick-send-request.md), and [what `request-shaper` produced from it](request-shaper-interview.md).

## The comparison is not like for like — and that is the finding

| | Raw request | After shaping |
|---|---|---|
| Classification | `transaction` · `mobile-app` | `transaction` · `multi-surface` |
| Items in scope | 56 | 63 |
| Items with no evidence at all | 45 | 34 |
| Score | **12** / 100 | **39** / 100 |
| Blockers | **fired** — no failure paths | none |
| Verdict | **NOT READY** | **NOT READY** |

The shaped document is measured against *more* items, because the interview revealed that web was in scope. The raw document did not score well against a smaller list; it was scored against the **wrong** list. A score that goes up less than expected after shaping usually means the shaping found scope, and that is worth saying out loud rather than letting the reader read it as wasted effort.

## The raw request — NOT READY, 12/100

Two independent reasons, and the first outranks the second: **B3 fired** — only the happy path is written, so a blocker forces NOT READY regardless of the total.

Four items scored anything at all: the out-of-scope statement (3, and the only item in the document backed by a quotable sentence), the entry point (2), the main path (2), the surface description (2). Categories K6 (risk) and K7 (instrumentation) scored zero across every item.

Note what did **not** happen: "the existing security steps will of course be preserved" earned nothing. It reads like coverage and specifies nothing, and a model left to itself will award it credit. Refusing to is the entire job.

## The shaped document — NOT READY, 39/100

| Category | Earned | Available | Weight | Points |
|---|---|---|---|---|
| K1 Problem and scope | 19 | 27 | 20 | 14.07 |
| K2 Users and trigger | 10 | 21 | 12 | 5.71 |
| K3 Behaviour and rules | 21 | 54 | 25 | 9.72 |
| K4 Data in and dependencies | 6 | 21 | 13 | 3.71 |
| K5 Design and states | 3 | 21 | 12 | 1.71 |
| K6 Risk and non-functional | 4 | 24 | 8 | 1.33 |
| K7 Instrumentation and downstream | 5 | 21 | 10 | 2.38 |
| | | | | **38.63 → 39** |

`category = (sum of item scores / (3 × in-scope items)) × weight`. Rounded once, at the end, so a reader checking the arithmetic can reconcile it.

**Coverage:** 63 items in scope, 34 with no evidence either way, 0 exempted by quote. Reported as fact rather than as a confidence label — "medium confidence" tells nobody what to do.

**The five most critical gaps**

| Gap | What would close it |
|---|---|
| Design and states — 3 of 21 points | Loading and error states, on-screen copy, accessibility level. A designer cannot start |
| Server-side authorisation re-check | One line stating that a hidden control is not a permission. A security review returns the document without it |
| Confirmation of success | Failure is defined; **success is not**. In a one-tap flow this is the top cause of customers sending twice |
| Alerting, audit retention, traceability | All three are go-live conditions for passwordless money movement. K7 scored 5 of 21 |
| Reversal path and point of no return | "No rollback plan" is written — honest, and still zero |

**Cheapest next step:** one session with UX on states, copy and accessibility. K5 is worth 12 points and currently earns 1.71 — the highest-return single meeting available.

## What the score caught that the shaping did not

The shaped document's open list named 19 items. The score found 34 with nothing.

The interview had ended when it judged it had enough — a reasonable thing to do — and then presented a partial pass as a finished document. The measurer caught the producer. That is exactly why they are separate skills: a model that both writes and grades will approve its own work, not from vanity but from the ordinary pull of consistency.

The fix landed in `request-shaper`: sweep the full rubric before writing, and sort every item into answered, asked-and-open, or never-raised. The interview may stop early. The accounting may not.

---

Next: [the risk pass](risk-interrogate-pass.md).
