# readiness-score — 00-request.md

> The document being scored arrived from outside this session — it was written by the requester, not by the chain. So the self-review guard does not apply here, and this is the one scoring in the repository that is not compromised.

## Verdict: CONDITIONAL · 62/100

**No blocker fired.** P1 (problem) scored 3, P2 (success) 2, B3 (failure paths) 3 — the first document in this repository where all three clear.

**Classification — Axis 1:** `capability` (consumed by other software; a developer decides things before anyone sees a screen) + `data-display` (it renders values and carries a freshness rule). **Axis 2:** `web`. Not `multi-surface`: four hosts, all of them browser surfaces, is one surface type.

**Coverage:** 53 items in scope · **12 with no evidence either way** · **0 exempted by quote.**

That last number is the interesting one and it is explained below.

---

## Score table

| Category | Earned | Available | Weight | Contribution |
|---|---|---|---|---|
| K1 Problem and scope | 15 | 21 | 20 | 14.29 |
| K2 Users and trigger | 13 | 21 | 12 | 7.43 |
| K3 Behaviour and rules | 15 | 24 | 25 | 15.63 |
| K4 Data and dependencies | 16 | 21 | 13 | 9.90 |
| K5 Design and states | 17 | 24 | 12 | 8.50 |
| K6 Risk and non-functional | 8 | 27 | 8 | 2.37 |
| K7 Instrumentation | 9 | 21 | 10 | 4.29 |
| **Total** | | | **100** | **62** |

---

## What a strong request looks like, item by item

Worth naming, because the other examples in this repository only show the opposite.

**Four of the five `capability` items scored 3, and they include the two the rubric calls the expensive ones.** Y1 (what the integrating developer must supply) is a closed list with a default for every case. Y5 (what the host declares versus what is fixed, and the default when it declares nothing) is answered in the same paragraph: density is the host's, four things are not, and no density renders `full`. Y2 states the compatibility window as a figure — twelve months on the current major — rather than as an intention. And Y3, whether behaviour can be changed without every host shipping, is answered by **refusing** it: *"Behaviour cannot be changed remotely: it is a build-time dependency, and pretending otherwise would be a lie about what a rendered component can do."* A refusal with a reason is a decision, and it scores like one.

**B3 scored 3, which nothing else in this repository has done.** Every failure has a written behaviour: an unrecognised prop renders `full` and logs once and does not throw, an absent value renders as "not enough data" beside the two that are present, an out-of-range value renders and is marked rather than clamped.

**S3 and S4 scored 3.** The copy is given, in full, and the accessibility level is named with its source (*"the internal baseline for shared components"*) rather than assumed. A brief written from this request starts with strings instead of inventing them.

**N1 scored 3 for saying no.** *"The badge emits nothing"*, with the reason — a component emitting alongside its host produces two differently-shaped records of the same page. Silence scores zero; a written decision not to do something scores like any other decision.

---

## The five gaps

1. **P2 (success) scored 2, and `idea-grill` found why before this scoring ran.** The criterion is measurable and has a baseline — support already tags the escalations. But it counts a defect this component cannot fix: one host reads a deprecated cached field, and a badge renders faithfully whatever it is passed. Closing sentence: whether adopting the badge includes moving that host to the new source, or only changing its render.
2. **The rounding rule is named as non-overridable and never stated.** *"Colour, the rounding rule, the wording… the host may not override"* — but what the rule **is** appears nowhere, and unifying rounding is the reason the component exists. Closing sentence: one line saying what the rule is.
3. **K6 scored 8 of 27.** Nothing about performance, sign-off, data residency or running cost. Most are genuinely inapplicable to a render component — and see below, because that is not what the rubric did with them.
4. **Languages (S5) scored 0** on a component whose entire copy is fixed and supplied. Four internal surfaces in one language today is a reasonable position; it is not written down, so it scores zero.
5. **N7 scored 0.** Three teams have to integrate this and nothing says what they get: an integration page, a migration note, a worked example. For a `capability` that is the difference between adoption in a quarter and adoption in three.

---

## What this scoring says about the rubric

**Nothing was exempted, because nothing could be.** An item leaves scope only when the document positively says so, quoted. This request has a precise *Not this* section — no fetching, no links, no tooltip, no write path — and not one of those sentences exempts a rubric item. So a read-only component is scored on data residency, running cost, end-to-end traceability, and what must be signed off before go-live, and scores zero on all of them, correctly.

The effect is arithmetic: **K6 and K7 together are 18 points that a request of this shape can almost never earn**, and the ceiling for a well-written component request sits somewhere near 80 rather than at it. This is the first evidence the repository has about whether the READY threshold is reachable, and it points at the rubric rather than at the request.

Two readings, and the difference matters. Either a shape like this should be allowed to exempt items with one quoted sentence — *"no data is stored, so residency and retention do not apply"* — which the gate already permits and which the requester simply did not think to write. Or the threshold is calibrated for `transaction` work and is the wrong bar for everything else. **The first is more likely**, and it is testable: the same request with four exempting sentences would score in the high seventies without changing the work by one line.

---

## What to do next

**Ask the two questions that cost a sentence each:** what the rounding rule is, and whether the QA tool's source migration is part of adoption. The first is the reason the component exists; the second decides whether its success measure is reachable.

Neither needs `request-shaper` — this document does not need shaping, it needs two answers. That is what CONDITIONAL means and it is why the label exists.

---

## Arithmetic

```
K1 = (3+2+3+2+2+3+0) / (3 × 7)  × 20 = 15/21 × 20 = 14.2857
     P1 3 · P2 2 · P3 3 · P4 2 · P5 2 · P6 3 · W1 0
K2 = (2+1+2+3+0+3+2) / (3 × 7)  × 12 = 13/21 × 12 =  7.4286
     U1 2 · U2 1 · U3 2 · U4 3 · U5 0 · Y1 3 · W5 2
K3 = (2+3+3+2+2+0+3+0) / (3 × 8) × 25 = 15/24 × 25 = 15.6250
     B1 2 · B2 3 · B3 3 · B4 2 · B5 2 · L1 0 · Y5 3 · W3 0
K4 = (3+3+2+1+1+3+3) / (3 × 7)  × 13 = 16/21 × 13 =  9.9048
     D1 3 · D2 3 · D3 2 · D4 1 · D5 1 · Y2 3 · L2 3
K5 = (2+3+3+3+0+3+2+1) / (3 × 8) × 12 = 17/24 × 12 =  8.5000
     S1 2 · S2 3 · S3 3 · S4 3 · S5 0 · L3 3 · W2 2 · W4 1
K6 = (1+2+0+0+0+0+0+3+2) / (3 × 9) × 8 = 8/27 × 8 =  2.3704
     R1 1 · R2 2 · R3 0 · R4 0 · R5 0 · R6 0 · R7 0 · Y3 3 · Y4 2
K7 = (3+1+2+1+2+0+0) / (3 × 7)  × 10 =  9/21 × 10 =  4.2857
     N1 3 · N2 1 · N3 2 · N4 1 · N5 2 · N6 0 · N7 0

Total = 62.400 → 62
```

## Out of scope

**Empty.** Nothing was exempted, and the paragraph above is about why.
