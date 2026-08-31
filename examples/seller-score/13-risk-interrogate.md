# risk-interrogate — what breaks in production

## 1. What was assessed

Read: `07-slice.md` (the decisions), `09-flow-map.md`, `11-data-model.md`, `12-api-needs.md`, `01-impact-radar.md`, `04-prior-art.md`. Classification: `data-display` · `backend` · `web`.
**Not available:** system access, screens, seller counts, volumes.

**Struck, because they are already on the open lists:** the seller set definition, the partial-write decision, a second run the same day, late-arriving data, reading during a write, retention, who publishes a definition version, the comparison reference, event contents, the "enough orders" threshold, the staleness threshold, rounding, notification, the appeal process, gaming, volume and cost. Those are completeness gaps; asking again here would bury what was actually found.

The seven questions that survive are all consequences of **more than one decision taken together** — the places no single open item can see.

---

## 2. Questions by owner

| | | | Question |
|---|---|---|---|
| **Q1** | Marketplace Core | **Critical** | What stops a run that produces plausible but wrong values |
| **Q2** | Marketplace Core | **High** | How many rows one corrected order invalidates |
| **Q3** | Marketplace Core | **High** | Whether a definition bug is a new version or a recomputation |
| **Q4** | Marketplace Core | **Medium** | How long the nightly run takes, and what happens when it overruns |
| **Q5** | Product (Deniz) | **High** | What happens when a seller's own arithmetic disagrees with ours |
| **Q6** | Product (Deniz) | **Medium** | What support says to a seller who looks good in the panel and poor on the storefront |
| **Q7** | Legal | **High** | Whether a seller who wins an appeal gets the value corrected |

### Marketplace Core

> **Q1 · Critical — if a run produces plausible but wrong values, what stops it, and what corrects it once written?**
> The decisions: values are written **unconditionally** every night (A5) and **never overwritten** (`07-slice.md` decision 4). One source change is enough to drop every seller's on-time rate forty points overnight.
> **Prevents:** two decisions together producing an **irreversible wrong day**. Nothing blocks the write, hundreds of thousands of rows land, the no-overwrite rule prevents correction, and no alert exists so nobody notices. Each decision is defensible alone; together they are not.

> **Q2 · High — if one order's data is corrected afterwards, how many rows does it invalidate?**
> The decisions: every row is the result of a **90-day** window, and **a new row is written every day**.
> **Prevents:** treating one late record as one row. The effect is **every window that order falls into** — up to ninety. While a correction path is being discussed (already an open item), not knowing the radius hides the size of what looks like a small fix.

> **Q3 · High — when a bug is found in a definition, is the fix a new version or a recomputation?**
> The decisions: definition versions are **immutable** and every value records which one produced it. So when the "on time" logic turns out to have been written wrong, a new version leaves history wrong and a recomputation breaks the no-overwrite rule.
> **Prevents:** two rules locking each other. Left undecided, the first bug picks one silently, and either choice is irreversible: permanently wrong history, or history quietly rewritten.

> **Q4 · Medium — how long does the run take at today's seller count, and what happens when it does not fit the night?**
> The decision: every night, all sellers, a 90-day window.
> **Prevents:** `flow-map` BA3, overlapping runs, turning from a theoretical branch into a scheduled certainty. Not knowing the duration is what allows that.

### Product (Deniz)

> **Q5 · High — what happens when a seller does their own arithmetic and it disagrees with ours?**
> The decisions: we show the seller the **numerator and denominator** (`11-data-model.md`), and **there is no appeal process in this release** (`07-slice.md`).
> **Prevents:** showing the maths invites the argument. This slice makes the calculation visible and removes the place the argument goes — two individually correct decisions producing a class of support ticket. And `impact-radar` #11: legal already asked for a right of appeal.

> **Q6 · Medium — what does support say when a seller calls about looking good in the panel and poor on the storefront?**
> The decision: **the score buyers see does not change** while components appear in the panel. A seller with excellent delivery and poor reviews will look good in one place and poor in the other.
> **Prevents:** an inconsistency the slice produced **deliberately** (`07-slice.md` records it as the price) landing on the support team, who are the people paying for it and do not know. The open item about the support script asks when the copy changes; this asks about a new class of question being created.

### Legal

> **Q7 · High — when a seller wins an appeal, can the value be corrected?**
> The decisions: an appeal stays **answerable** (from the stored rows), but overwriting is forbidden and no correction path is defined.
> **Prevents:** delivering the wrong right. What legal asked for is not the right to an answer, it is the right to an outcome. The slice guarantees the answer and not the correction — and when the threshold arrives in a later release, a seller who won an appeal still has the wrong value.

---

## 3. Answer these five first

1. **Q1 — what stops a plausible but wrong run** *(Marketplace Core)* — the answer is as cheap as a sanity check, and its absence is an irreversible day.
2. **Q3 — is a definition bug fix a new version or a recomputation** *(Marketplace Core)* — two rules lock each other and the lock opens at the first bug.
3. **Q7 — can the value of a seller who wins an appeal be corrected** *(Legal + Marketplace Core)* — if the answer is no, the slice's decision 5 does not deliver what legal asked for.
4. **Q2 — how many rows does one corrected order affect** *(Marketplace Core)* — a single query, and it sizes the correction discussion.
5. **Q6 — what does support tell a seller who looks good in the panel and poor on the storefront** *(Deniz + Ops)* — one sentence of script, and it decides who is billed for the price this slice knowingly paid.

---

## 4. What could not be assessed

- **Blast radius** — not assessable. No document says what infrastructure the calculation job runs on or how it reads the source systems, so what else the nightly run slows down cannot be known. `api-needs` records that two needs **have no owner at all**; that dimension cannot open until those lines close.
- **Migration and coexistence** — genuinely not applicable in this slice: the score buyers see does not change, so old and new do not live side by side, they simply sit in different places. In the second slice this dimension needs a pass of its own, and `impact-radar`'s thirteen rows come back there.
- **Abuse and authorisation** — in this slice the seller submits nothing, no threshold exists and no consequence follows. There is no surface to abuse. When the threshold arrives this opens, and it should be re-run that day.
- **Human error** — there is no remotely configured number here. The one human-authored artefact is the definition version, and that is Q3 above.
