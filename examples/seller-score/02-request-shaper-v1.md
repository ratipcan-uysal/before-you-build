# Seller Performance Score v2 — shaped request

**Source:** `00-request.md` (Deniz Aksoy, Category Management) + `01-impact-radar.md`
**Mode:** autonomous — no interview was possible. Every line inferred from the request is `[ASSUMED]`; every line resting on how the outside world works is `[UNVERIFIED]`. **An unmarked line is in the request.**
**Status:** `[DRAFT]` · **version 1**

**Questions that arrived with the material:** `impact-radar` produced 13 dependency rows and a six-item regression surface. **All 13 entered the open list below** — two block starting, eleven block go-live. The regression surface is not part of this document; it goes to `build-context` and lives there as *what must still be true afterwards*.

---

## 1. Problem and scope

**Problem:** the number we call a seller's performance measures something the seller does not control. "The review belongs to the product; the score lands on the seller." Most customer complaints are about delivery, and delivery is not in the number at all.

**Success:** not written. The request names no target, no measurement and no comparison; it says "measurement is separate work, with the data team". That means the success criterion has been **handed to another team**, not defined. *(Blocking: B1)*

**In scope:** computing the score; showing components in the seller panel; the campaign eligibility rule; storefront ranking moving to the new score.

**Out of scope:** measurement and analysis (data team). The request's own sentence.

**Scope unclear:** the seller score in the mobile app. The request says "another team, they have been told" — telling someone is not a scope decision. The meaning of the number is changing, and it changes everywhere it is shown. *(Blocking: B2)*

**Platforms:** `[ASSUMED]` seller panel is web; storefront is web and mobile. The request names no surface. If that assumption holds the work is **multi-surface**, and that one line doubles an estimate.

**Who owns the decision:** Deniz Aksoy. Who owns the threshold (4.0) is not written.

---

## 2. Users and trigger

**Who:** (a) the seller — sees the score, appeals, enters campaigns or does not. (b) the buyer — sees ranked sellers on the storefront. (c) category management — builds the campaign list.

**Trigger:** no user action at all. The score is recalculated **every night, by itself**. A seller learns their score changed by opening the panel. `[ASSUMED]` Nothing notifies them of the change; the request does not mention one.

**What happens today:** the score is a 12-month review average. `[UNVERIFIED]` How often it refreshes today is not stated, so whether "every night" is new or current behaviour is unknown. Check: Marketplace Core.

**Differences by segment:** none — "all sellers, no distinction by category". None for **new sellers** either: how the score is computed for a seller with 20 days of history inside a 90-day window is not written. *(Blocking: B3)*

---

## 3. Behaviour and rules

### Separating the requirement from the mechanism

The request specifies **how** in five places. The requirement is on the left, the chosen path on the right. This is not an objection; it makes the mechanism visible as a choice, because a mechanism written as a requirement is never examined again. **Every row goes to `prior-art`** — that is the skill that reads whether this way was chosen or inherited.

| Requirement | Mechanism in the request | Decided as such? |
|---|---|---|
| The score should reflect what customers actually complain about | **One blended number**, weighted 50/30/20 | The weights are written explicitly. That it is a single blended number was never discussed — it is a number today, so it stays one |
| The score should reflect the recent past | A **90-day** window | Yes, a figure is given. Why 90 is not |
| The score should be current | **Nightly** recalculation | Yes |
| Poor performance should cost the campaign advantage | **A single 4.0 threshold**, same for everyone | Yes, and the request says this is new |
| A seller should know what to fix | Components shown **separately** in the panel | Yes |

**A tension inside the document:** the problem statement declares the review-to-seller link a defect — "the review belongs to the product; the score lands on the seller" — and v2 **keeps that link** at 20% weight. Why it is 20 rather than zero is not written. Not a contradiction, but a design decision with no answer. *(Blocking: B4)*

### A contradiction that cannot be written down either way

The request gives two rules and they cannot both hold:

- *"The score should be recalculated every night"* + *"a seller below 4.0 cannot enter campaigns"*
- *"The campaign seller list freezes on 15 November"*

After 15 November, does a seller who drops below 4.0 stay on the list or leave it? **Both answers are defensible and they are two entirely different pieces of work.** If the frozen list wins, the threshold is meaningless for the campaign's duration; if the score wins, the list is not frozen. This document writes both and leaves the decision open, because if it is not made, whoever writes the code makes it silently. *(Blocking: B5)*

### The main rule

1. Every night, the last 90 days of data is read for every seller
2. Three components are computed separately: on-time delivery rate, seller-caused cancellation rate, product review average
3. The components are combined at 50% / 30% / 20%
4. The result is written as a score out of 5
5. The panel shows the score with its components
6. Storefront ranking uses this score
7. The 4.0 threshold applies on campaign application

**Steps 2 and 3 are entirely undefined.** "On-time delivery" against which date — the promised day, the handover to the courier, a commitment window? Which cancellations are "seller-caused" — out of stock, wrong address, customer changed their mind? Is the review average per product or per seller? None of the three is a formula; each is a set of definitions, and none of them is written. *(Blocking: B6 — no code can be written without this)*

### Branches and failure paths

None in the request. The nameable ones: missing data (a new seller, a seller with no orders in the period), the nightly job failing, a component that cannot be computed, the score changing while an appeal is open. None has an answer. *(Blocking: B7)*

### Appeal

"Sellers should have a right of appeal; legal is clear about this." What the appeal is against (the score, a component, a single order), who reviews it, how long it takes, whether the outcome changes the score retroactively — none of it is written. **The only thing legal is clear about is that the right exists;** the process itself is undefined. *(Blocking: B8)*

---

## 4. Data and dependencies

- **Delivery data** — `[UNVERIFIED]` on-time delivery is queryable per seller over a 90-day window today. Check: the logistics/order data owner.
- **Cancellation data** — `[UNVERIFIED]` cancellations are held **classified** as seller-caused today. If they are not, that classification is a piece of work in itself.
- **Review data** — already used today; only the window changes.
- **Storefront ranking** — consumes the score. `impact-radar` #1.
- **Campaign system** — will enforce the 4.0 threshold; has no such rule today. `impact-radar` #5.
- **Seller panel** — component display. `impact-radar` #2.
- **Mobile app** — shows the score, different team. `impact-radar` #3.
- **The score shown on past orders** — `[UNVERIFIED]` does the order detail store it or read it live? If live, the seller score on past orders changes tonight. `impact-radar` #6. **This is the stored-versus-computed decision itself, and it will be `data-model`'s first question.**
- **The seller agreement / rules page** — `[UNVERIFIED]` if the computation is described there, the rule cannot apply until the text changes. `impact-radar` #11, owner Legal.

---

## 5. Design and states

**No design exists; screens not yet decided.**

The only surface the request implies: components shown in the seller panel. Empty state (no data), loading, cannot-compute, a score under appeal, a warning to a seller just above the threshold — none discussed. On-screen copy, accessibility level and languages: absent.

---

## 6. Risk and non-functional

- **Silent breakage:** `impact-radar`'s central finding — the **shape** of the number stays and the **meaning** changes. Most dependents break silently by construction.
- **Threshold and definition landing the same night:** a group of sellers who are above 4.0 today fall below it without changing any behaviour. How many is **computable and has not been computed**. *(Blocking: B9)*
- **The volatility of a 90-day window:** far more movement than 12 months. The same seller can cross the threshold several times a week. If campaign eligibility hangs on it, the result is a flicker. Not discussed.
- **Undo:** not written. `[ASSUMED]` the old computation can run in parallel for a period; not in the request.
- **Gaming:** 90 days and three components also define which behaviour raises the score most cheaply. Not discussed.
- **Legal:** a right of appeal is required (B8). The agreement text is `[UNVERIFIED]`.

---

## 7. Instrumentation and downstream

**The request delegates this explicitly:** "measurement is separate work, with the data team."

What is being delegated is the only mechanism that could say whether this worked. Which events fire, whether a history of score changes is kept, whether old and new scores stay comparable — none of it is written. `impact-radar` #7 and #8 already showed the silent side: one column with two definitions, and every report that compares month to month.

---

## Still open

### Blocking — nobody can start

| Question | Who settles it |
|---|---|
| B1: What measures success, what is the target, who compares what? | Deniz + data team |
| B2: Is the mobile app in scope? | Deniz + mobile team |
| B3: What is the score for a seller without enough data in 90 days? | Deniz |
| B4: Why do product reviews stay at 20% when the problem statement calls that link a defect? | Deniz |
| B5: **The contradiction** — does the frozen list win, or the nightly threshold? | Deniz + campaign owner |
| B6: Definitions of the three components — "on time", "seller-caused", review scope | Deniz + operations |
| B7: What happens when data is missing, the job fails, a component cannot be computed? | Marketplace Core + Deniz |
| B8: What is an appeal against, who reviews it, does the outcome change the score retroactively? | Legal + Deniz |
| B9: How many sellers above 4.0 today fall below it under v2? | Data team — **computable today** |
| B10 °: Does the past order store the score, or read it live? *(`impact-radar` #6)* | Marketplace Core |
| B11 °: What happens to old scores — the request's own note: "we have not discussed" | Deniz |

### Blocking — nobody can ship

| Question | Who settles it |
|---|---|
| G1: What seller movement is expected when ranking switches? *(#1)* | Ranking team |
| G2: When does the "12-month review average" copy change in the panel and the support script? *(#2, #10)* | Panel team + support |
| G3: Does a seller-facing API or export expose the score? *(#12)* | Marketplace Core |
| G4: How often do score-driven alerts fire under 90-day volatility? *(#9)* | Marketplace Core |
| G5: Does the seller agreement text have to change? *(#11)* | Legal |
| G6: Can month-to-month reports tell apart before and after v2? *(#7, #8)* | Data team |
| G7: Applications and caches in flight at cutover *(#13)* | Marketplace Core |
| G8: At what moment does campaign selection read the threshold? *(#5)* | Campaign owner |
| G9: What do older mobile app versions show? *(#3)* | Mobile team |
| G10: When does the existing job stop, is there a parallel run? *(#4)* | Marketplace Core |
| G11: Who tests the six-item regression surface? | Marketplace Core |

### Not raised, not blocking

> **Design and states** — on-screen copy, accessibility, languages, empty and error states *(4)*
> **Risk and NFR** — nightly job duration, cost at scale, gaming, data residency *(4)*
> **Instrumentation** — event taxonomy, score change history, reporting work *(3)*
> **Behaviour** — rounding rule, redistribution of weights when a component is missing, warning a seller near the threshold *(3)*

**Count: 9 answered · 11 partial · 14 not raised** · **13 items carried in from `impact-radar`.**

---

## The assumptions most likely to be wrong

1. **`[UNVERIFIED]` Cancellations are held classified as seller-caused today.** If they are not, 30% of the score is computed from data that does not exist, and this stops being a score project and becomes a data classification project. The timeline changes accordingly.
2. **`[ASSUMED]` The seller panel is web and the storefront is web and mobile.** If true, the work is multi-surface and "the mobile team has been told" does not shrink the scope — it adds a second dependency.
3. **`[UNVERIFIED]` Past orders read the score live.** If true, the seller score on past orders also changes on the night v2 lands — an outcome nobody asked for and nobody wrote down.

---

**Next:** `readiness-score`. The mechanism rows in section 3 go to `prior-art`, and whatever comes back is written into the **second version** of this document — carrying a finding is my job, answering it is not. B1–B9 are waiting on a person to decide; if that does not happen in a meeting, `decision-memo` is what it is for.
