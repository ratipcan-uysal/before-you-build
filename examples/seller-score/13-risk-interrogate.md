# risk-interrogate — what breaks in production

## 1. What was assessed

Read: `07-slice.md` (the decisions), `09-flow-map.md`, `11-data-model.md`, `12-api-needs.md`, `01-impact-radar.md`, `04-prior-art.md`. Classification: `data-display` · `backend` · `web`.
**Not available:** system access, screens, seller counts, volumes.

**Struck, because they are already on the open lists:** the seller set definition, the partial-write decision, a second run the same day, late-arriving data, reading during a write, retention, who publishes a definition version, the comparison reference, event contents, the "enough orders" threshold, the staleness threshold, rounding, notification, the appeal process, gaming, volume and cost. Those are completeness gaps; asking again here would bury what was actually found.

The six questions that survive are all consequences of **more than one decision taken together** — the places no single open item can see.

---

## 2. Questions by owner

### Marketplace Core

| | Question | Prevents |
|---|---|---|
| **Critical** | The decisions: values are written **unconditionally** every night (A5) and **never overwritten** (`07-slice.md` decision 4). If a source change makes a run produce plausible but wrong values — every seller's on-time rate dropping forty points overnight — what stops it, and what corrects it once written? | Two decisions together produce an **irreversible wrong day**: nothing blocks the write, hundreds of thousands of rows land, the no-overwrite rule prevents correction, and no alert exists so nobody notices. Each decision is defensible alone; together this |
| **High** | The decisions: every row is the result of a **90-day** window, and **a new row is written every day**. If one order's data is corrected afterwards, how many rows does it invalidate? | The effect of one late record is not one row but **every window that order falls into** — up to ninety. While a correction path is being discussed (already an open item), not knowing the radius hides the size of what looks like a small fix |
| **High** | The decisions: definition versions are **immutable** and every value records which one produced it. So when a **bug** is found in a definition — the "on time" logic was written wrong — is the fix a new version (history stays wrong) or a recomputation (the no-overwrite rule is broken)? | Two rules lock each other. Left undecided, the first bug picks one silently, and either choice is irreversible: permanently wrong history, or history quietly rewritten |
| **Medium** | The decision: every night, all sellers, a 90-day window. How long does the run take at today's seller count, and what happens when it does not fit the night? | Not knowing the duration can turn `flow-map` BA3 (overlapping runs) from a theoretical branch into a scheduled certainty |

### Product (Deniz)

| | Question | Prevents |
|---|---|---|
| **High** | The decisions: we show the seller the **numerator and denominator** (`11-data-model.md`), and **there is no appeal process in this release** (`07-slice.md`). What happens when a seller does their own arithmetic and it disagrees with ours? | Showing the maths invites the argument. This slice makes the calculation visible and removes the place the argument goes — two individually correct decisions producing a class of support ticket. And `impact-radar` #11: legal already asked for a right of appeal |
| **Medium** | The decision: **the score buyers see does not change** while components appear in the panel. A seller with excellent delivery and poor reviews will look good in the panel and poor on the storefront. What does support say when they call? | The slice produced this inconsistency **deliberately** (`07-slice.md` records it as the price). The people paying it are the support team, and they do not know. The open item about the support script asks when the copy changes; this asks about a new class of question being created |

### Legal

| | Question | Prevents |
|---|---|---|
| **High** | The decisions: an appeal stays **answerable** (from the stored rows), but overwriting is forbidden and no correction path is defined. When a seller wins an appeal, can the value be **corrected**? | The right legal asked for is not the right to an answer, it is the right to an outcome. The slice guarantees the answer and not the correction — and when the threshold arrives in a later release, a seller who won an appeal still has the wrong value |

---

## 3. Answer these five first

1. **What stops a plausible but wrong run** *(Marketplace Core)* — the answer is as cheap as a sanity check, and its absence is an irreversible day.
2. **Is a definition bug fix a new version or a recomputation** *(Marketplace Core)* — two rules lock each other and the lock opens at the first bug.
3. **Can the value of a seller who wins an appeal be corrected** *(Legal + Marketplace Core)* — if the answer is no, the slice's decision 5 does not deliver what legal asked for.
4. **How many rows does one corrected order affect** *(Marketplace Core)* — a single query, and it sizes the correction discussion.
5. **What does support tell a seller who looks good in the panel and poor on the storefront** *(Deniz + Ops)* — one sentence of script, and it decides who is billed for the price this slice knowingly paid.

---

## 4. What could not be assessed

- **Blast radius** — not assessable. No document says what infrastructure the calculation job runs on or how it reads the source systems, so what else the nightly run slows down cannot be known. `api-needs` records that two needs **have no owner at all**; that dimension cannot open until those lines close.
- **Migration and coexistence** — genuinely not applicable in this slice: the score buyers see does not change, so old and new do not live side by side, they simply sit in different places. In the second slice this dimension needs a pass of its own, and `impact-radar`'s thirteen rows come back there.
- **Abuse and authorisation** — in this slice the seller submits nothing, no threshold exists and no consequence follows. There is no surface to abuse. When the threshold arrives this opens, and it should be re-run that day.
- **Human error** — there is no remotely configured number here. The one human-authored artefact is the definition version, and that is the third question above.
