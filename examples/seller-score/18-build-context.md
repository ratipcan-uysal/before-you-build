# BUILD CONTEXT — Seller Performance Score, first slice

# Verdict: ASK FIRST — 14 questions, 5 disagreements

> **This pack, and sixteen of the seventeen documents it checks, were produced in the same session.** A model looking for disagreements between things it wrote recognises its own reasoning on both sides and reads agreement into it. What follows is real; **repeat in a clean context for what is not here.** The only document that arrived from outside is `00-request.md`.

**The chain:** impact-radar · request-shaper (v1, v2) · readiness-score (v1, v2) · prior-art · slice · design-brief (v1 partial, v2) · flow-map · flow-grill · data-model · api-needs · risk-interrogate · ux-grill · decision-memo. Nothing missing. **`17-decision-memo.md` has not been approved**; this pack describes the slice the memo proposes, it does not assume the memo was accepted.

---

## 1. Ask before you start

**To be asked, never filled.** Each of these, unanswered, gets answered silently on the first day by whoever writes the code.

| # | Question | Who | What an answer closes |
|---|---|---|---|
| A1 | **Definitions of the three components:** "on time" against which date · which cancellations are "seller-caused" · what the review scope is | Deniz + operations | **Not one value can be computed** without this |
| A2 | **What tells a seller a value is bad:** a fixed target, their own past, or a peer group | Deniz | The whole screen. Without a reference a seller reads "92%" and learns nothing — which is what this slice exists to prevent. If the answer is peer group, **a second computation job appears that nobody owns** |
| A3 | **The "enough orders" threshold**, and whether it is **per component or per seller** | Deniz | The new-seller screen. Per component, a seller with three orders sees "0.0%" (flawless) in one and "no data" in two |
| A4 | A second write for the same seller-day-type: **new version or refusal** | Marketplace Core | The identity rule. The lock between "never overwritten" and rerunning |
| A5 | Is a run **per day or per trigger** | Marketplace Core | Both the overlapping-run question and A4 resolve from this |
| A6 | If a source cannot be read: **write nothing, or write partially** | Marketplace Core + Deniz | The atomicity of the write, and whether a "one component from yesterday" state exists on screen |
| A7 | The seller score shown on a past order: **as at order time, or today's** | Marketplace Core + Deniz | Invisible in this slice (the score does not change), but **decide it later and it cannot be reconstructed** |
| A8 | The definition of the **seller set** to compute | Deniz + Marketplace Core | The run's duration, and whether the overlapping-run risk is real |
| A9 | When late data makes yesterday's value wrong, **is there a correction path** | Deniz + Marketplace Core | One corrected order affects **up to ninety rows**; with no correction path, a seller who wins an appeal keeps the wrong value |
| A10 | **What stops** a plausible but wrong run | Marketplace Core | Unconditional writes plus a no-overwrite rule together produce an **irreversible day** |
| A11 | A definition bug fix: **new version (history stays wrong) or recomputation (the rule is broken)** | Marketplace Core + Deniz | Two rules lock each other; the lock opens at the first bug |
| A12 | **`[UNVERIFIED]` Are cancellations held classified as seller-caused today — and who owns that data?** | **No owner named** | An entire component of the score. Without the classification this is not a score project but a data classification project. **`api-needs` recorded it as `Unconfirmed — no owner`**: an ownerless need is neither confirmed nor refused, it is forgotten |
| A13 | Are the numerator and denominator **shown to the seller** | Deniz | Disagreement D3 — three documents assume three different things |
| A14 | The retention period, and what happens to values when a seller leaves | Legal | The slice says "applied from day one"; with no number it cannot be applied |

**A2, A4, A9 and A12 stayed open across more than one document.** Those do not close by writing; they stay open until somebody decides — `decision-memo` is for that, and one has been written (for scope).

---

## 2. Disagreements

Not reconciled. Choosing the more recent one is deciding by filing order.

| # | One document says | Another says | |
|---|---|---|---|
| **D1** | `07-slice.md` lists what is in the slice: compute · store · show three components · explain how. **It does not mention a reference** | `08-design-brief-v1.md` requires a reference beside every value that makes it interpretable; `12-api-needs.md` notes that if that is a peer group, a second computation job appears | A requirement added after the cut. The design's reasoning is strong (a number without a reference does not do its job) but **Deniz approved the slice and nobody approved the reference** → **A2** |
| **D2** | `07-slice.md`'s "decided now" list has six items: grain · definitions · past-order score · no overwriting · appeal answerability · permissions. **Numerator and denominator are not among them** | `11-data-model.md` decides the numerator and denominator are stored, reasoning from the slice's item 5 | The derivation is defensible, but an item was added to the slice's list and the slice was not updated. **`flow-map` A5 does not write them either** — three documents, three different things |
| **D3** | `12-api-needs.md` N5: the panel's response **returns** the numerator and denominator | `08-design-brief-v1.md` and `16-design-brief-v2.md` never mention them on screen; `14-screens.html` does not show them | The contract returns a field no surface displays — either the field is unnecessary or the screen is incomplete. And `13-risk-interrogate.md` asks a risk question **premised on them being shown** ("a seller does their own arithmetic and it disagrees") → **A13** |
| **D4** | `07-slice.md` decision 6: **"who can see a seller's components — checked server-side"** | `09-flow-map.md` flow B has **no** authorisation step; `12-api-needs.md` N5 asks only for "seller identity" and states no authorisation need | **Dropped.** A developer working from the flow does not write that check. A decision the slice made is absent from two downstream documents |
| **D5** | `05-request-shaper-v2.md`'s open list counts 14 blocking items — among them B4 (why reviews stay at 20%), B5 (the 15 November contradiction), B12 (blending), B14 (category distinction) | `07-slice.md` **cut** the parts those four belong to: no weights, no threshold, no blending | All four are **meaningless** for this slice, and no document rewrote the open list for the smaller scope. A reader of this pack sees 14 blocking items where 10 actually block. **The open list has to be re-sorted once after the cut** |

**No question vanished.** `01-impact-radar.md`'s thirteen rows entered `request-shaper` v1, `prior-art`'s four departures entered v2, and both sets are here.

---

## 3. The job

A seller opens the seller panel, sees the three components of their performance separately, and understands which one needs attention. One person, one job, end to end. Nothing the buyer sees changes.

---

## 4. Decided

**Scope** — Three components are computed once a day and stored; the seller panel shows them separately. **No blended score. No campaign threshold. The storefront does not change. The score buyers see does not change. No appeal process. No notification.** `[ASSUMED]` The seller panel is web.

**Flow** — 12 steps, 5 branches, 7 error paths, two separate flows (nightly calculation · the seller reading): `09-flow-map.md`. System marks: `reads A2, A3, B3 = 3` · `acts A5, A6 = 2` · `emits A5, A6, B4 = 3` — 8 marks across 6 steps, verified against the table.

**Data** — A component value is stored per seller × day × component type; every row references a definition version and carries its date range. **A published definition version cannot be edited.** No daily value is ever overwritten. A row can exist without a value: *"insufficient data" is not an absence, it is a stored state.*

**Screen** — The three components are the same size; what draws attention is a state marker, not size. Every component **carries its direction in words** (`On-time delivery — higher is better`). **Until the comparison basis is decided, no card is visually separated from the others** — a border, background, icon or ordering difference *is* the decision. The date range and last calculation time are written on screen.

**What is documented elsewhere** *(verified by opening sources, `04-prior-art.md`)* — Both independent sources opened **do not blend** their metrics: separate metrics, separate thresholds, *"fails to meet **any** of these standards"*. Evaluation runs on a cadence (30/60 days, monthly), not nightly. One compares the seller against a **peer group**. One sends mandatory notifications the seller cannot turn off.

---

## 5. Must not

- **No blended score is shown.** The client does not average the three components — a well-meaning "overall" number brings back the cut decision and nobody notices.
- No reference to the buyer-facing score, and no "this will change soon".
- Nothing is said about ranking, campaign eligibility or a threshold.
- No appeal route is shown — there is no process; showing a route that does not exist is the worst error available.
- No predictions: "fix this much and you get that".
- No charts and no time series. No onboarding or promotional cards.
- **The panel does not compute components on read** — values are the product of the run.
- **The panel does not make three requests for the section** — the components cannot appear at different ages.
- **The client does not know the "enough orders" threshold** — it is a server decision.
- **A run does not report partial success as complete.**
- **Today's 12-month review score is not deleted and not overwritten.** Nobody asked for it to go, and it is the only ground for comparing before and after v2.

---

## 6. Decided now, built later

1. **Grain.** Component values are stored **per seller per day**, each row carrying the date range it was computed from. Defer this and the window length, the weights and the threshold all become impossible to recompute retroactively — each becomes a migration.
2. **Component definitions.** The code answers this on day one; if the answer comes from whoever writes the code, the product's rule is set there silently → **A1**.
3. **The score shown on a past order** — `[DECISION NEEDED]` → **A7**. Invisible in this slice; undecidable retroactively later.
4. **No daily value is ever overwritten.** Otherwise the report distinguishing before and after v2 can never be written.
5. **An appeal stays answerable.** No process; but *"why was my value X on 3 November"* has to be answerable **from day one**. `11-data-model.md` says that requires the numerator and denominator → **D2, A13**.
6. **Permissions.** Who can see the components is checked **server-side**; roles can be one today. → **D4: neither the flow nor the contract carries this.**

---

## 7. Done means

**There is nothing that shows it worked.** `readiness-score` scored the success criterion **0** and `slice`'s signal test failed: no baseline, no target and no comparison rule are written anywhere. This pack does not fill that gap. `12-api-needs.md` N6 wrote the question that has to be answerable — *do sellers who looked have different delivery performance over the next 30 days* — and the event itself was never defined.

**The screen's checklist** — the seven items in `16-design-brief-v2.md` section E: direction carried in words · no card separated before the basis is decided · all eight states drawn · the three "no value" screens do not resemble each other · loading and read-error drawn · the one tappable thing marked by something besides colour · no blended score.

**Error paths that must be reachable** — the seven in `09-flow-map.md`, in particular: a run that dies midway **marks the half-written day** · a component that cannot be computed still shows the others · stale values are visible.

**Blocking go-live** *(not blocking the start)*: measurement events and a baseline · the support script, and **what is said to a seller who looks good in the panel and poor on the storefront** · production monitoring and alerting · who tests the six-item regression surface in `01-impact-radar.md` · who publishes a definition version.

---

## 8. The assembly checked against its sources

| Check | Result |
|---|---|
| Prohibitions (11) at the same scope as their source | 11/11 matched, none broadened |
| Defaults at the same value, still marked `[DRAFT]` | Copy carried as `[DRAFT]`; no draft was promoted to a decision |
| Markers on the same line, in English | `[ASSUMED]` 1 · `[UNVERIFIED]` 1 · `[DECISION NEEDED]` 14. The `[UNVERIFIED]` cancellation classification **correctly** became `Unconfirmed — no owner` in `api-needs` |
| Anything with no source | None. There is no decision in this pack that I wrote |
| Load-bearing `[UNVERIFIED]` also in the question list | 1/1 → **A12** |

**Cross-check: 13 pairs checked, 5 disagreements, 1 dropped decision (D4), 4 open items rendered meaningless (D5). Questions lost: 0.**

---

## 9. What this pack cannot control

| | Status |
|---|---|
| **Real copy** | **Present**, `[DRAFT]` — in `08-design-brief-v1.md` and `16-design-brief-v2.md`. Unapproved, the generator's invented copy reaches a screenshot and becomes the copy |
| **Deliberately awkward example content** | **Present** — three records, one with two poor components and excellent reviews, one a new seller with three orders whose cancellation rate looks flawless |
| **The design system** | **Absent.** With no tokens the output is a layout study |
| **Stack constraints** | **Absent.** Paradigm, naming and versioning are unknown, so `12-api-needs.md` deliberately did not write a concrete contract |

Supplying the two missing ones changes the result more than any further decision.

---

*The source documents are in this folder, 00 through 19. They are not build instructions: they are the audit trail and the home of the reasoning this pack compresses. Nobody should have to read them to build.*
