# Seller Performance Score v2 — shaped request, **version 2**

**Supersedes version 1.** It stands alone; every section below is complete. Lines marked `» v2` changed in this version.
**Mode:** autonomous · **Status:** `[DRAFT]`
**Findings incorporated:** `04-prior-art.md` — four departures (M1, M2, K1, K2). **They were carried, not answered:** a departure is a question for whoever chose the mechanism. Putting it in the document is my job; settling it is Deniz's.

## What changed since version 1

- **No open item closed.** Four sharpened, four added.
- The mechanism table in section 3 now sits beside what opened sources document. The most expensive line in the request — one blended number — is visible as a choice; in version 1 it read as a requirement.
- One `[ASSUMED]` line became an open item with an owner: whether the seller is notified is no longer an assumption, it is **G12**.
- **B3 was taken to an external source and the answer did not arrive:** whether comparable products use a different window for low-volume sellers could not be verified, because two pages could not be opened. The item stays open and now also records that the external route was tried.

---

## 1. Problem and scope

**Problem:** the number we call a seller's performance measures something the seller does not control. "The review belongs to the product; the score lands on the seller." Most customer complaints are about delivery, and delivery is not in the number at all.

**Success:** not written; the request delegates measurement to the data team. What is delegated is the only mechanism that could say whether this worked. *(B1)*

**In scope:** computing the score · component display in the seller panel · the campaign eligibility rule · storefront ranking moving to the new score.

**Out of scope:** *"Measurement (what the score change did to sales) is separate work, with the data team."*

**Scope unclear:** the seller score in the mobile app. Telling a team is not a scope decision. *(B2)*

**Platforms:** `[ASSUMED]` seller panel web; storefront web and mobile. The request names no surface.

**Who owns the decision:** Deniz Aksoy. The threshold has no named owner.

---

## 2. Users and trigger

**Who:** seller · buyer · category management.

**Trigger:** no user action; the score recalculates every night by itself. A seller learns of a change by opening the panel.

**» v2 — notification:** version 1 recorded this as `[ASSUMED]`. One opened source documents that sellers are sent email and panel alerts and **cannot opt out**: *"cannot unsubscribe from these communications"* ([Walmart](https://marketplacelearn.walmart.com/guides/Policies%20%26%20standards/Performance/Seller-performance-standards)). Whether Menzil notifies is no longer an assumption; it is an open item. *(G12)*

**What happens today:** a 12-month review average. `[UNVERIFIED]` today's refresh frequency is unknown.

**Differences by segment:** none — "all sellers, no distinction by category". None for new sellers either. *(B3)*

---

## 3. Behaviour and rules

### Requirement, mechanism, and what is documented elsewhere

`» v2` — the right-hand column is new in this version. Where no source was opened the cell is empty; nothing was guessed.

| Requirement | Mechanism in the request | What the opened sources document |
|---|---|---|
| The score should reflect what customers complain about | **One blended number**, 50/30/20 | **Neither independent source blends.** Walmart keeps seven metrics with individual thresholds and acts when *"any of these standards"* fails. eBay runs two separate evaluations. *(M1)* |
| The score should reflect the recent past | **90 days** | Walmart 30/60 days; eBay monthly. The window length is not the departure — the **rhythm** is *(M2)* |
| The score should be current | **Nightly** recalculation | Nothing I opened recalculates a gate-bearing score nightly *(M2)* |
| Poor performance should cost the campaign advantage | **A single 4.0 threshold**, same for all | eBay additionally compares against a **peer group**: "performance in the context of a 'peer group'" *(K1)* |
| A seller should know what to fix | Components shown separately | eBay's dashboard shows "a detailed breakdown of your performance on the factors which determine your seller level" — aligned |
| *(absent from the request)* A seller should learn they have dropped | **Nothing** — they open the panel | Walmart sends mandatory alerts that cannot be turned off *(K2)* |

**» v2 — the arithmetic of blending.** Nowhere in the request: a good component can hide a bad one. A seller at 5.0 on delivery, 5.0 on reviews and 2.0 on cancellations scores `0.5×5 + 0.3×2 + 0.2×5 = 4.1` and clears the threshold. The request set out to separate; blending buries what it wanted separated. **This is not an objection — it is the consequence of a decision, and the decision has not been made.** *(B12)*

### The contradiction

*"Recalculated every night"* + *"below 4.0 cannot enter campaigns"* + *"the campaign seller list freezes on 15 November."*

After 15 November, does a seller who drops below the threshold stay on the list? Both answers are defensible; they are two different pieces of work. `» v2`: `prior-art` M2 shows where this comes from — outside, the gate decision is made on a **cadence**, not continuously. *(B5)*

### The main rule

1. Every night, the last 90 days of data is read for every seller
2. Three components are computed separately: on-time delivery, seller-caused cancellations, product reviews
3. They are combined at 50% / 30% / 20%
4. The result is written out of 5
5. The panel shows it with its components
6. Storefront ranking uses it
7. The 4.0 threshold applies on campaign application

**Steps 2 and 3 are entirely undefined.** "On time" against which date; which cancellations count as seller-caused; whether the review average is per product or per seller. Each is a set of definitions, not a formula. *(B6 — not one value can be computed without this)*

### Branches, failure paths, appeal

None in the request. Nameable: a seller with no data, the nightly job failing, a component that cannot be computed, the score moving while an appeal is open. *(B7)* What an appeal is against, who reviews it, whether the outcome applies retroactively: undefined. *(B8)*

---

## 4. Data and dependencies

Delivery data `[UNVERIFIED]` · the seller-caused classification of cancellations `[UNVERIFIED]` · review data (already used today) · storefront ranking · campaign system · seller panel · mobile app · the score shown on past orders `[UNVERIFIED]` · the seller agreement text `[UNVERIFIED]`.

Detail and failure modes are in `01-impact-radar.md`; all thirteen rows are in the open list below.

---

## 5. Design and states

**No design exists; screens not yet decided.** The only implied surface is component display in the panel. Empty, loading and error states, on-screen copy, accessibility and languages: none discussed.

`» v2` — one more possible surface: the notification to a seller who falls below the threshold (G12) is a surface, and nobody has designed it.

---

## 6. Risk and non-functional

- The shape of the number stays and the meaning changes: most dependents break **silently**.
- Threshold and definition land the same night; how many sellers fall is uncomputed. *(B9)*
- A 90-day window is more volatile than 12 months; if campaign eligibility hangs on it, the result flickers.
- `» v2` **Blending can hide a bad component** *(B12)*.
- `» v2` **A single absolute threshold can punish a category**: fragile goods and digital codes do not produce the same rates *(B14)*.
- Undo is `[ASSUMED]`. Gaming not discussed. Legal requires an appeal; the agreement text is `[UNVERIFIED]`.

---

## 7. Instrumentation and downstream

Business-impact measurement is out of scope (quote in section 1). In scope and unwritten: the event taxonomy, whether a history of score changes is kept, whether old and new scores stay comparable, production monitoring.

---

## Still open

### Blocking — nobody can start

| Question | Who settles it | Source |
|---|---|---|
| B1: What measures success, what is the target? | Deniz + data team | v1 |
| B2: Is mobile in scope? | Deniz + mobile team | v1 |
| B3: A seller without enough data in 90 days? **External route tried, unverified** | Deniz | v1 · `prior-art` last section |
| B4: Why do reviews stay at 20%? | Deniz | v1 |
| B5: **The contradiction** — frozen list or nightly threshold? | Deniz + campaign owner | v1 · sharpened by `prior-art` M2 |
| B6: Definitions of the three components | Deniz + operations | v1 |
| B7: Failure paths | Marketplace Core + Deniz | v1 |
| B8: The appeal process | Legal + Deniz | v1 |
| B9: How many sellers fall below the threshold — **computable today** | Data team | v1 |
| B10 °: Does a past order store the score? | Marketplace Core | `impact-radar` #6 |
| B11 °: What happens to old scores? | Deniz | v1 |
| **» B12: One blended number or three separate thresholds? Was blending a decision or an inheritance?** | **Deniz** | **`prior-art` M1** |
| **» B13: Is the nightly calculation for display or for the gate? Must they share a rhythm?** | **Deniz + campaign owner** | **`prior-art` M2** |
| **» B14: Is the absence of category distinction deliberate? Was a peer group considered?** | **Deniz** | **`prior-art` K1** |

### Blocking — nobody can ship

G1 ranking cutover · G2 panel and support copy · G3 seller-facing API · G4 alert frequency · G5 agreement text · G6 reports distinguishing before and after · G7 work in flight at cutover · G8 when campaign selection reads the threshold · G9 older mobile versions · G10 retiring the existing job · G11 who tests the regression surface · **» G12: Is a seller told when they fall below the threshold, when, and with what they should do?** *(owner Deniz + Legal — `prior-art` K2; **a seller who does not know cannot appeal**, so this item is tied to B8)*

### Not raised, not blocking

> **Design** — on-screen copy, accessibility, languages, empty and error states *(4)*
> **Risk** — nightly job duration, cost at scale, gaming, data residency *(4)*
> **Instrumentation** — event taxonomy, score change history *(2)*
> **Behaviour** — rounding, weight redistribution when a component is missing, warning a seller near the threshold *(3)*

**Count: 9 answered · 15 partial · 13 not raised** · 13 items from `impact-radar`, **4 from `prior-art`**.

---

## The assumptions most likely to be wrong

1. **`[UNVERIFIED]` Cancellations are held classified as seller-caused today.** If not, 30% of the score comes from data that does not exist and this becomes a data classification project.
2. **`[ASSUMED]` The seller panel is web, the storefront web and mobile.** If true, the work is multi-surface.
3. **`[UNVERIFIED]` Past orders read the score live.** If true, the first night of v2 also changes the score on past orders.

---

**Next:** re-scoring is meaningful — three new blocking items opened and none closed, so the score should be expected to **fall**. Then `slice`: `prior-art` M1 handed it a named alternative (*three components, three separate thresholds*), so cutting the blend is now a choice rather than a subtraction.
