# readiness-score — 02-request-shaper-v1.md

> **The document being scored was produced in this same session, and this measurement is compromised.** A model that wrote a request and then scores it knows what every line was *meant* to say and scores the intent rather than the text. It shows up hardest in the `[ASSUMED]` cap: the author of an inference is the reader least able to see it as one. The evidence gate was applied literally — every "not discussed", "not written" and "awaiting a decision" scored zero — but that is not a correction. **Repeat this in a clean context.**

## Verdict: NOT READY · 25/100

**Two blockers fired:** P2 (success criterion) scored 0 and B3 (failure paths) scored 0. The total is below 60 anyway; either one alone was enough.

**Classification — Axis 1:** `data-display` (the score is shown, ranking orders by it) + `personalization` (the 4.0 threshold decides campaign eligibility) + `input-collection` (an appeal is a submission from a person). **Axis 2:** `backend` (the nightly job) + `web` (`[ASSUMED]` seller panel) + `multi-surface` (two named).

**`mobile-app` was not taken, and that was a choice:** the document never says the work runs on mobile, only that the score appears there and the scope is unclear. Rather than treat that ambiguity as scope, it is scored as a gap in P5. Someone arguing the other way opens eight `mobile-app` items and the score falls further.

**Coverage:** 61 items in scope · **36 with no evidence either way** · 1 exempted by quote.

**Capped items (nothing but `[ASSUMED]` behind them):** P5 (surfaces), R2 (undo). Both scored at most 1.

**A note on the `[UNVERIFIED]` lines:** almost every marked claim in this document is **internal** — "are cancellations held classified as seller-caused", "does the order detail store the score". `prior-art` does not close those; it reads what is published outside. Their closer is the owner named beside them, and the answers are a day's work. The one outward-facing marked claim is not the blended score itself but its mechanism, and that goes to `prior-art`.

---

## Score table

| Category | Earned | Available | Weight | Contribution |
|---|---|---|---|---|
| K1 Problem and scope | 9 | 27 | 20 | 6.67 |
| K2 Users and trigger | 11 | 18 | 12 | 7.33 |
| K3 Behaviour and rules | 6 | 39 | 25 | 3.85 |
| K4 Data and dependencies | 10 | 30 | 13 | 4.33 |
| K5 Design and states | 1 | 27 | 12 | 0.44 |
| K6 Risk and non-functional | 5 | 24 | 8 | 1.67 |
| K7 Instrumentation | 2 | 18 | 10 | 1.11 |
| **Total** | | | **100** | **25** |

K2 stands on its own (11 of 18): who, when, and what happens today are all written. Every other category, including the heaviest, is empty.

---

## The five most critical gaps

1. **The three components have no definitions (B6).** The weights (50/30/20), the window (90 days) and the threshold (4.0) are written precisely; **what is being measured is not.** "On-time delivery" against which date — the promised day, the courier handover, a commitment window? Which cancellations count as seller-caused? The closing sentence: for each component, a definition of the form "this event, in this date range, over this denominator". Without it nobody can compute a single score — and whoever picks the definition sets the product's rule.
2. **No success criterion (P2 — blocker).** The document hands this to another team. What is handed away is the only mechanism that could say whether the work succeeded. The closing sentence: today's value, the target, and who compares what to what.
3. **No failure paths (B3 — blocker).** What happens when the nightly job fails, a component cannot be computed, a seller has no data in 90 days — none of it written. The closing sentence: what the weights do when a component is missing, and the choice between writing no score and leaving the previous one.
4. **The contradiction is not settled (G2 = 1).** "Recalculated every night" and "the list freezes on 15 November" cannot both be delivered. The document writes both and leaves it open — honest, and not content. The closing sentence: at what moment the threshold is read, and whether falling off a frozen list exists at all.
5. **Design scores 1 of 27.** The screen where a seller sees their components is the centre of the request — "so a seller knows what to fix" — and there is not one decision about it. What closes this is not a sentence; it is `design-brief`.

---

## What to do next

**The cheapest move is B9: how many sellers fall below 4.0 today.** The data team can compute it from existing data this afternoon, and one number tells you whether this is a release or an incident. If the number is large, the threshold decision — including the B5 contradiction — becomes an entirely different conversation.

But that is not what moves the score: **nine of the nine blocking items are waiting on a person to decide**, not on someone to write. Running `request-shaper` again will not close them; `decision-memo` is how those decisions get made.

And **this scope does not fit one release**: the score engine, the panel display, the campaign threshold, the appeal process and the ranking cutover are written as one piece of work. A low score does not measure size; `slice` measures size, and it should run whatever the verdict.

---

## Arithmetic

```
K1 = (3+0+2+2+1+1+0+0+0) / (3 × 9) × 20 = 9/27 × 20 = 6.6667
     P1 3 · P2 0 ⚑ · P3 2 · P4 2 · P5 1(capped) · P6 1 · W1 0 · E5 0 · X2 0
K2 = (3+3+2+3+0+0) / (3 × 6)      × 12 = 11/18 × 12 = 7.3333
     U1 3 · U2 3 · U3 2 · U4 3 · U5 0 · W5 0
K3 = (2+0+0+2+0+1+0+1+0+0+0+0+0) / (3 × 13) × 25 = 6/39 × 25 = 3.8462
     B1 2 · B2 0 · B3 0 ⚑ · B4 2 · B5 0 · L1 1 · G1 0 · G2 1 · I1 0 · I2 0 · W3 0 · E4 0 · X1 0
K4 = (2+2+3+1+0+2+0+0+0+0) / (3 × 10) × 13 = 10/30 × 13 = 4.3333
     D1 2 · D2 2 · D3 3 · D4 1 · D5 0 · L2 2 · E1 0 · E2 0 · E3 0 · X3 0
K5 = (1+0+0+0+0+0+0+0+0) / (3 × 9) × 12 = 1/27 × 12 = 0.4444
     S1 1 · S2 0 · S3 0 · S4 0 · S5 0 · L3 0 · G3 0 · W2 0 · W4 0
K6 = (2+1+0+1+1+0+0+0) / (3 × 8)   × 8  = 5/24 × 8  = 1.6667
     R1 2 · R2 1(capped) · R3 0 · R4 1 · R5 1 · R6 0 · R7 0 · I3 0
K7 = (0+0+0+1+0+1) / (3 × 6)       × 10 = 2/18 × 10 = 1.1111
     N1 0 · N2 0 · N4 0 · N5 1 · N6 0 · N7 1     (N3 exempt)

Total = 25.402 → 25
```

**What scored 3:** P1 (the problem stated as a problem, in the requester's own words), U1, U2, U4 (three actors, a trigger that is not a user action, today's definition), D3 (dependents by name, with how each breaks and who owns it — the section carried in from `impact-radar` is the strongest thing in the document).

**What scored 0:** every instance of "not discussed", "not written", "awaiting a decision" and "none in the request". Naming a gap is honest and it is not content.

---

## Out of scope

**One item, with its quote:**

> N3 (reporting and warehouse work) — *"Measurement (what the score change did to sales) is separate work, with the data team."*

The exemption is **narrow**: that sentence gives the business-impact analysis to another team. It does not cover the event taxonomy (N1) or the audit trail (N2). Those are in scope and scored zero.
