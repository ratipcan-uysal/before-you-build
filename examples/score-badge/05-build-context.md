# BUILD CONTEXT — Seller score badge

> **This verdict did not survive.** The same six documents were handed to a reviewer holding only their file paths. It returned fourteen findings — of which twelve hold, six are contradictions between documents, and two attack figures this pack reports as zero. A second audit later added four more contradictions that both passes had missed. The corrected verdict is `ASK FIRST`. See [`06-uncompromised-check.md`](06-uncompromised-check.md) and [`07-second-audit.md`](07-second-audit.md).
>
> This document is left exactly as it was written, because a pack that quietly becomes right teaches nobody anything about how it was wrong.

# Verdict: BUILDABLE — 0 blocking questions, 0 unresolved disagreements

> The request arrived from outside this session. The grill, the score and the record were produced here, so the cross-check between them is compromised in the usual way and says so — but the document all three were checked **against** is not this chain's work, which is the one thing that makes this pack lighter than the others in this repository.

**The chain:** idea-grill (proxy) · readiness-score · the requester's answers · design-brief. Four documents, no flow, no data model, no contract — and none of them missing. This component neither stores nor fetches: there are no nouns for `data-model` to name and no system needs for `api-needs` to derive. Saying that is different from having skipped them.

`BUILDABLE` does not mean nothing is open. It means **nothing that is open would be invented on the first day**, and where a decision is genuinely undecided the record carries it as a marked placeholder rather than a gap.

---

## 1. Ask before you start

**Empty, and that is the finding of this pack.**

The request arrived answering the questions this list normally holds, and the two it did not answer — the rounding rule, and whether adoption includes the source migration — were put to the requester and answered in a single afternoon (`03-answers.md`). Both would otherwise have been invented by the first line of code: rounding silently, and the migration by being left out.

One decision remains undecided and it is **not** on this list, because the record decided the interim behaviour rather than leaving a hole: whether "not enough data" and "the host passed nothing" should look different. Until Sinem decides, both render as "not enough data" and the brief says so. A builder is not blocked; a reviewer can see the decision is open.

---

## 2. Disagreements

**None.** Thirteen pairs checked across four documents.

Two are worth naming because they came close and resolved:

- `idea-grill` narrowed the thesis to **rendering consistency**, which put the request's four-defect claim and its zero-escalation measure in doubt. `03-answers.md` resolved it in the direction the grill said was strongest and nobody had given: source migration is a **precondition** of adoption, not a consequence. The claim and the measure both survive, and they survive for a written reason.
- The request fixes the rounding rule as non-overridable without stating it. The score caught it, the answer states it, and the brief carries it verbatim: half up, one decimal, on the value as passed.

---

## 3. The job

A host page renders a seller's score and its three components identically to every other host page. Four internal surfaces, one rendering.

---

## 4. Decided

**What it is** — a read-only component. It fetches nothing, writes nothing, links nowhere and emits nothing. The host supplies three component values, a date range, a last-calculated timestamp and a density.

**What the host declares and what is fixed** — density is the host's, and so are width and placement. **Colour, rounding, the three labels and the 48-hour staleness threshold are not overridable**, because those four are what differ across the four surfaces today.

**Defaults that fail safe** — no density renders `full`; an unrecognised density renders `full`, logs once per mount, and **never throws**; an absent value renders as "not enough data" beside the components that are present; a value outside the expected range renders as given and marked, never clamped.

**Rounding** — half up, one decimal, on the value as passed. The badge does not re-derive anything.

**Versioning** — semantic, published to the internal registry, current major supported for **twelve months** after the next ships. Behaviour cannot be changed remotely; it is a build-time dependency and the request refuses to pretend otherwise. A wrong rendering is fixed by a patch release within one working day.

**Copy** — approved and reused from the seller panel, **not `[DRAFT]`**: `On-time delivery` · `Seller-caused cancellations` · `Product reviews` · `Not enough data` · `Updated {n} days ago`.

**Accessibility** — WCAG 2.2 AA, the internal baseline for shared components. No state carried by colour alone; the staleness marker carries text.

---

## 5. Must not

- **No opinion about whether a value is good.** No red, no green, no arrow, no threshold line, no ranking. The component is not given thresholds and must not infer them.
- No hover state, cursor change, focus ring, link or tooltip. Nothing on this surface is actionable.
- No clamping, hiding or re-deriving a value it was passed.
- No third density, no theming hook, no slot for host content.
- No fetching, ever. A component that can fetch is one that can be slow, and four hosts inherit that.
- No events. The host instruments its own page.
- No real company name or logo in example content.

---

## 6. Decided now, built later

- **The absent-value rendering** is decided as an interim — both causes render alike — and the distinction is marked open. Deciding it later costs one rendering and no migration.
- **Nothing else defers**, because there is nothing stored. The list that is usually the longest in this pack is the shortest here, and the reason is structural rather than virtuous.

---

## 7. Done means

**The success measure is written, has a baseline, and is now reachable by the work it measures**: four surfaces adopting within one quarter of publication, and zero support-tagged score-mismatch escalations in the quarter after. Support tags those already, so the before exists.

**The six done criteria** in `04-design-brief.md`: greyscale distinguishability including stale · a 37-character label truncates and its value does not · all six renderings exist, the undecided one marked · nothing has a hover state, cursor change or focus ring · `compact` holds at 220 px and `full` at 320 px · 11.4 out of 5 renders as 11.4, marked.

**Blocking go-live, not the first commit:**
- Who publishes a patch within one working day, and what happens in the week they are away (`idea-grill`, owner-question). Four surfaces now depend on one team's release, and that promise is why hosts accept losing control of rounding.
- What the three integrating teams get: an integration page, a migration note, a worked example. `readiness-score` scored this zero and for a `capability` it is the difference between adoption in a quarter and adoption in three.
- **The QA tool's source migration has no schedule**, its owner returns on the 24th, and the one-quarter adoption target assumes it happens inside the quarter. Nobody has said when.
- Languages: four internal surfaces in one language is a reasonable position and is not written down.

---

## 8. The assembly checked against its sources

| Check | Result |
|---|---|
| Prohibitions (7) at the same scope as their source | 7/7, none broadened |
| Defaults at the same value, still `[DRAFT]` if the source marked them | 5/5. **The copy is not `[DRAFT]` and was not marked as such** — it arrived approved, which no other example in this repository has |
| Markers on the same line, in English | `[DECISION NEEDED]` 1 · `[ASSUMED]` 1 (the design system) |
| Anything with no source | None |

**Cross-check: 13 pairs, 0 disagreements, 0 questions lost.**

---

## 9. What this pack cannot control

| | Status |
|---|---|
| **Real copy** | **Present and approved.** Not drafted here and not invented by a generator |
| **Awkward example content** | **Present** — two poor components with excellent reviews, and a new seller whose zero cancellations look flawless |
| **The full state set** | **Present** — six renderings, the undecided one marked |
| **The design system** | **Absent.** Named (the library the address block and order-state chip use) and not supplied, so a generator's output is a layout study |

Three of the four, which is the highest this repository has managed. The fourth is the one a document cannot carry.

---

*Four source documents in this folder. They are the audit trail, not build instructions.*
