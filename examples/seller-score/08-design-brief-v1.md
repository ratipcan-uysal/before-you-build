# design-brief — decision record, v1 · **partial**

> **Written without a mapped flow; this record is partial.** The states below are the ones the material named, and **a second version will be needed.** The error paths I have are three: the nightly job failing, a component that cannot be computed, a seller without data in 90 days. That is far below what a flow produces. Once `flow-map` has run, the largest section of this record will be error states — and that section is exactly what a version of this document that did not declare itself partial would quietly leave out.

**Scope:** the first slice in `07-slice.md`. No blended score, no threshold, storefront unchanged, no appeal, no notification.
**Classification:** `data-display` · `web` (`[ASSUMED]` the seller panel is web — the request names no surface).

---

## 1. Surfaces

| Surface | Why it exists | Owner |
|---|---|---|
| **Seller panel — existing entry point** | The route into the performance section; this feature borrows a navigation it does not own | The existing panel |
| **Performance section** | Shows the three components separately. **The only surface this slice adds** | This feature |
| **Component explanation** | "How is this calculated" — whether it is a separate screen or inline is a decision (see 4) | This feature |

**Not in the slice and therefore not here:** the score buyers see, the storefront, the campaign screen, an appeal form, a notification. None of them is being designed.

---

## 2. The primary job of each surface

- **Performance section** — see which of the three components needs attention
- **Component explanation** — learn what a component counts

The primary job is **not** "see your score". There is no blended score to show in this slice, and the request's own sentence is "so a seller knows what to fix". The surface is not a dashboard; it is a pointer.

---

## 3. Information hierarchy

**Performance section:** 1 the three component values · 2 the **reference that makes each value interpretable** · 3 the date range they were computed from · 4 the route to how they are calculated

**The reason for rank 1, and this record's central problem:** all three components share the rank. By this skill's own rule, if two things are rank 1 then neither is — **and I am leaving it that way deliberately, because which one comes first is not a decision, it is a calculation.** What should stand out is the component the seller needs to attend to, and which one that is differs per seller. So the ordering is not fixed; it is **data-dependent**: the component in the worst state stands out.

That forces rank 2, and there is no decision there:

**`[DECISION NEEDED]` — what makes a component value "bad"?** Owner: Deniz. This slice has no threshold (cut) and no per-component target (B12 open). With no reference, a seller reads "on-time delivery: 92%" and **learns nothing** — which is precisely what this slice exists to prevent. Three known options, and they are three different products: (a) a fixed target, (b) the seller's own past value, (c) a peer group average — `prior-art` K1 found the last one documented elsewhere ("performance in the context of a 'peer group'"). **This screen cannot be drawn until it is decided;** draw it anyway and whoever draws it has chosen the reference.

*The mechanism carrying rank 1:* the three components are drawn at the same size and the same weight; what draws attention is not size but a **state marker**. Permanently enlarging one component is a claim about a fixed priority, and no such priority exists.

---

## 4. Navigation model

- **In:** the seller panel's existing navigation. `[ASSUMED]` Performance is a section of its own; the request does not say so.
- **Out:** the panel's normal navigation. Nothing is saved on this surface, so there is no draft to preserve.
- **Component explanation:** `[DECISION NEEDED]` inline or a separate page — owner UX. If separate, there is one more surface and the inventory changes.
- **Interruption:** none. It is a reading surface; nothing is left half-done.

---

## 5. Input model

**The seller supplies nothing.** No form, no filter, no date picker in this slice.

**Must read as actionable:** only the route to "how is this calculated". **Must not:** the component values, the date range, the reference indicator. A number that looks tappable is a promise that something happens, and nothing does.

---

## 6. Defaults and decision points

| Decision | Made | Cost of being wrong |
|---|---|---|
| Period shown | Last 90 days, **and the actual date range is written on screen** | Without the range, a seller assumes today; the value was computed last night |
| Freshness | The last calculation time is on screen | Without it, a seller cannot understand why today's fix has not appeared, and calls support |
| Rounding | `[DECISION NEEDED]` owner Deniz — 92.4% or 92%. Show a decimal and sellers will track the decimal | The wrong precision promises an accuracy that does not exist |
| No data | `[DECISION NEEDED]` owner Deniz (B3) — does the component say "cannot be computed", show "—", or does the section not appear at all | Showing zero is the worst of them: absent data and bad performance look identical |

---

## 7. System feedback

| Moment | What happens |
|---|---|
| Values loaded | Three components, their references, the date range and the last calculation time |
| Loading | The section shows its own loading state; it does not hold up the rest of the panel |
| No data at all (new seller) | `[DECISION NEEDED]` — above |
| One component could not be computed | The other two are shown and the missing one **says it is missing**. It is not silently hidden |
| The nightly job failed, values are from the day before | The last calculation time already shows this; **`[DECISION NEEDED]`** after how many days does that become a warning — owner Deniz |
| A value dropped | No feedback at all in this slice. Notification was cut (`07-slice.md`), and the panel does not show change either |

The last row is deliberate and it has a price: a seller only learns things are getting worse if they go and look.

---

## 8. Binding constraints

| Constraint | Source |
|---|---|
| No blended score is shown | *material* (`07-slice.md`) |
| This surface makes no reference to the score buyers see | *this record* — two definitions live side by side and the screen must not conflate them |
| Every value appears with the date range it was computed from | *material* (slice decision 1) |
| Accessibility level | `[DECISION NEEDED]` — stated nowhere |
| Design system | *assumed* — the existing seller panel's |

**Decided once for every surface** *(all `[DRAFT]`)*: a dark appearance is supported and state is never carried by colour alone · at the largest text setting the three components stack and are not clipped · minimum width 360 px · reduced motion removes transitions · a long component name wraps rather than truncating · rates are written in one form and take no thousands separator.

---

## 9. Non-goals

- Shows no blended score. There is no such number in this slice.
- Makes no reference to the score buyers see, and does not say "this will change soon".
- Predicts nothing: no "fix this much and you get that".
- Says nothing about ranking or campaign eligibility — neither is in the slice.
- Shows no appeal route. There is no process; showing a route that does not exist is the worst error available.
- No charts and no time series: daily values are stored, and not shown in this slice.

---

## 10. Done criteria

Written so that someone can hold them against a screen and answer yes or no in seconds:

1. There is **no blended score** on the screen — looking for a single "overall" number is futile.
2. The three components are the same size; the one in the worst state stands out **through a state marker, not through size**.
3. Beside every component there **is** a reference that makes the value interpretable — or, because the reference has not been decided, a **marked placeholder**. One or the other; never an empty space.
4. The date range and the last calculation time are written on screen.
5. A component with no data does not show a zero.
6. The only thing on screen that looks tappable is "how is this calculated".
7. There is not one word about the score buyers see.

---

## Decisions still needed

| Decision | Who | What it blocks |
|---|---|---|
| What makes a component value bad — a target, its own past, a peer group | Deniz | **The whole screen.** With no reference the surface does not do its job |
| What is shown when there is no data | Deniz | The empty state |
| Rounding and precision | Deniz | How values are written |
| After how many days a stale value becomes a warning | Deniz | The freshness indicator |
| Explanation inline or separate page | UX | The surface inventory |
| Accessibility level | UX | Contrast, target size, text scaling |

---

## `[DRAFT]` copy

Unapproved copy that reaches a screenshot becomes approved copy.

- Section title: `Performance`
- Subtitle: `Your orders between {start} and {end}`
- Component names: `On-time delivery` · `Seller-caused cancellations` · `Product reviews`
- Freshness: `Last updated: {date time}`
- Explanation route: `How is this calculated?`
- No data: `You do not have enough orders in this period for this component.`
- Cannot compute: `This value could not be calculated right now. The other components are current.`
- Reference placeholder (until decided): `[DECISION NEEDED] — comparison basis not decided`

## Example content

1. `On-time delivery 98.2% · Seller-caused cancellations 0.4% · Product reviews 4.7` — the seller for whom everything is fine
2. `On-time delivery 61.0% · Seller-caused cancellations 11.3% · Product reviews 4.9` — **two components poor, reviews excellent.** The exact inverse of the seller the request describes, and the case this slice exists to surface
3. `On-time delivery — · Seller-caused cancellations 0.0% · Product reviews —` — a new seller with 3 orders in 90 days: two components have no data, one looks perfect because nothing was cancelled. **A zero that looks flawless**, and the hardest example in the set

---

**Next:** `flow-map`. Then the second version of this record — and its largest section will be the error states this one had three of.
