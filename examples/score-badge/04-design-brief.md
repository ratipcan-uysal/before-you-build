# design-brief — decision record

**Scope:** `00-request.md` plus the two answers in `03-answers.md`.
**Classification:** `capability` · `data-display` · `web`.

> **Written with no flow mapped, and it does not need one.** The rule is that a record written without a flow declares itself partial, because the states it is missing are the ones a flow produces. Here there is no sequence to map: nothing happens over time, nothing fails partway, nobody is interrupted. A host renders the component with values it already has. The six states below are the whole behaviour, and `flow-map` would return an empty branch table.

---

## 1. Surfaces

| Surface | Why it exists | Owner |
|---|---|---|
| **The badge, `full`** | The default rendering: three components with their values | This component |
| **The badge, `compact`** | The same information where a host has one line, not three | This component |
| **The four host pages** | Where it appears. Not owned here — layout width and placement are the host's | Four host teams |

There is no third density and no configuration surface. A component with a settings screen is a product.

---

## 2. The primary job of each surface

- **`full`** — see which component of a seller's score needs attention
- **`compact`** — see that a seller's score exists and is current, in one line

They are two jobs, not one job at two sizes, and that is the reason both exist. A host choosing `compact` is saying its page is not the place where somebody acts on the number.

---

## 3. Information hierarchy

**`full`:** 1 the three component values · 2 each component's label · 3 the staleness marker when present · 4 the date range

The three values share rank 1 and stay there: which one matters is a property of the seller, not of the design. *Mechanism:* equal size, equal weight, equal spacing; nothing is emphasised by default. The badge has no opinion about which component is bad, because **it is not told** — it receives values and no thresholds, and inventing an opinion would put a judgement in four surfaces that the score's owner never made.

**`compact`:** 1 the value the host asked for · 2 the staleness marker · 3 nothing else.

**The staleness marker outranks the date range** deliberately. A number that is 50 hours old is wrong in a way a date range never conveys — the range says what was measured, the marker says whether it is current, and only the second changes what a support agent should say out loud.

---

## 4. Navigation model

**There is none, and that is a decision.** No links, no tooltip, no expansion. In: the host renders it. Out: there is nowhere to go. The request's *Not this* is the navigation model — a tooltip explaining the score would duplicate copy that belongs to the seller panel, and two copies of one explanation drift.

---

## 5. Input model

Nothing is supplied by a person. The **host** supplies three component values, a date range, a last-calculated timestamp and a density.

**Nothing on this surface may read as actionable.** Every element is inert: no hover state, no cursor change, no focus ring on anything that does not receive focus. A badge that looks pressable in four consoles generates four support tickets asking what happens when you press it.

---

## 6. Defaults and decision points

| Decision | Made | Cost of being wrong |
|---|---|---|
| Density when the host declares none | `full` | The denser rendering in a narrow slot is ugly; the sparser one in a wide slot loses no information. Fail toward information |
| An unrecognised density | Render `full`, log once per mount, never throw | The order-state chip's lesson. A wrong prop taking down a host page is the one failure that stops teams adopting shared components at all |
| Rounding | **Half up, one decimal, on the value as passed** *(`03-answers.md`)* | It is the reason the component exists |
| Staleness threshold | 48 hours, fixed, not host-overridable | Already the seller panel's number; a second threshold would recreate the disagreement being removed |
| A value outside the expected range | Render as given and mark it | Clamping hides a caller's bug and makes it permanent |

---

## 7. System feedback

There is no system here to give feedback: the component neither fetches nor writes. What it has instead is **six renderings**, and every one of them is a state the host can produce:

`full` · `compact` · one component absent · all three absent · stale · a value out of range.

Absent is not an error and does not look like one. A component that could not be computed and a component the host chose not to pass are, on screen, the same thing — **`[DECISION NEEDED]`**, owner Sinem, and the request already flags it as untested with anyone. Until it is decided, both render as "not enough data" and the record says the two are not distinguished rather than pretending it was considered.

---

## 8. Binding constraints

| Constraint | Source |
|---|---|
| WCAG 2.2 AA | *material* — "the internal baseline for shared components" |
| The staleness marker carries text, never colour alone | *material* |
| Colour, rounding, labels and the staleness threshold are not host-overridable | *material* |
| Width and placement are the host's | *material* |
| No fetching, no links, no tooltip, no write path | *material* |
| Design system | *assumed* — the internal component library the address block and order-state chip use |

**Decided once for every rendering** *(all `[DRAFT]`)*: dark appearance supported, and no state carried by colour alone · at the largest text setting the three components stack in `full` and `compact` truncates its label before its value · minimum width 220 px for `compact`, 320 px for `full` · no motion · a value never truncates, a label may · rates are written to one decimal with no thousands separator.

---

## 9. Non-goals

- No opinion about whether a value is good. The component is not given thresholds and must not infer them.
- No tooltip, no link, no expansion, no "learn more".
- No third density, no theming hook, no slot for host content.
- No events. The host instruments its own page.
- No fetching, ever. A component that can fetch is a component that can be slow, and four hosts inherit that.

---

## 10. Done criteria

1. Greyscale the badge: every state is still distinguishable, including stale.
2. A 37-character label truncates and its value does not.
3. All six renderings exist as drawn states, and the absent-value one is marked where the `[DECISION NEEDED]` sits.
4. Nothing on the surface has a hover state, a cursor change, or a focus ring.
5. `compact` at 220 px and `full` at 320 px hold without horizontal scroll.
6. A value of 11.4 out of 5 renders as 11.4, marked — not clamped, not hidden.

---

## Decisions still needed

| Decision | Who | What it blocks |
|---|---|---|
| Whether "not enough data" and "the host passed nothing" look different | Sinem | The absent-value rendering, and only that one |

One. The request answered the rest.

---

## Generator block

```
SURFACE: Seller score badge, density=full
PRIMARY JOB: see which component of a seller's score needs attention

ELEMENTS, IN RANK ORDER:
1. three component values - equal size, equal weight, equal spacing;
   none emphasised, because the component is not told which is bad
2. each component's label, subordinate to its value
3. staleness marker, present only when the timestamp is over 48 hours old,
   carrying text and not colour alone
4. the date range, the least prominent thing on the surface

REQUIRED STATES:
- default: three values present
- one absent: that slot reads "Not enough data", the other two render normally
- all three absent: three slots read "Not enough data"; the badge still renders
- stale: default plus the marker
- out of range: the value renders as given, marked; never clamped
- NOT DECIDED: "not enough data" versus "host passed nothing" are not
  distinguished - do not invent a second treatment

INPUT:
- required: three component values, date range, timestamp, density
- order: none; all supplied at once by the host
- pre-filled: nothing. The component fetches nothing

MUST NOT:
- render any hover state, cursor change, focus ring, link or tooltip
- imply a judgement about a value: no red, no green, no arrow, no
  "good"/"poor", no threshold line, no ranking against anything
- clamp, hide or re-derive a value it was passed
- add a third density, a theming hook or a slot for host content
- use a real company name or logo in example content
- emit an event

CONSTRAINTS:
- surface: browser, inside four internal consoles
- accessibility: WCAG 2.2 AA; no state carried by colour alone
- design system: the internal component library used by the address block
  and the order-state chip - not supplied here, so output is a layout study

CONTENT:
- copy: labels "On-time delivery", "Seller-caused cancellations",
  "Product reviews"; absent "Not enough data"; stale "Updated {n} days ago"
  - all approved, reused from the seller panel, not [DRAFT]
- example data:
  1. 98.2% / 0.4% / 4.7, updated 3 hours ago
  2. 61.0% / 11.3% / 4.9, updated 5 days ago - two poor components,
     excellent reviews, and stale
  3. - / 0.0% / -, updated 2 hours ago - a new seller whose zero
     cancellations look flawless because nothing was ever cancelled
```

**What this block cannot control:** the design system is not supplied, so the output is a layout study and not a design. Everything else it usually cannot control, it has: the copy is real and approved rather than `[DRAFT]`, the example data includes the awkward cases, and every state is named including the undecided one. That is the difference between a generator returning something plausible and a generator returning something reviewable — and the result still has to go to `ux-grill`, in a context that did not produce it.
