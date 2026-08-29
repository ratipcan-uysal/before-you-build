# ux-grill — findings on 14-screens.html

## 1. What was reviewed

**These screens were drawn in the same session; the review is compromised.** Repeat in a clean context.

Reviewed: four desktop frames at wireframe fidelity, against the **partial** decision record in `08-design-brief-v1.md`. That record declares itself written without a mapped flow, so it is expected to be thin on error states — what follows includes which of those gaps survived into the drawing. Hover, scroll and loading behaviour are not assessable from static frames.

---

## 2. Conformance against the record

| Decision | What the design does | |
|---|---|---|
| **"A `[DECISION NEEDED]` must not be closed by the visuals... where a decision is open, the design shows it open"** — and the record explicitly marks the comparison basis as undecided | On screen 2 two cards carry a **reddish border**. So the drawing says "these two are bad" while the placeholder directly beneath says "what bad means has not been decided". **The decision was made in a border colour nobody argued about** | **Critical** |
| **"The three components are drawn at the same size and weight; what draws attention is not size but a state marker"** | Size is equal — that part holds. But the state marker is **colour only**: in greyscale the three cards are indistinguishable | **High** (a suggestion while no level is set — see below) |
| Record section 7: the stale-value state, and *"`[DECISION NEEDED]` after how many days does that become a warning"* | **Not drawn at all.** The "last updated" line looks identical whether it is six hours or six days old. An undecided state was delivered as an **absence** rather than a marked placeholder — the thing the record explicitly forbids | **High** |
| Record section 7: the loading state (*"the section shows its own loading state; it does not hold up the rest of the panel"*) and `flow-map` EB1 (values cannot be read) | Neither is drawn | **High** |
| `flow-map`: "no data", "could not compute" and "stale" **must be distinguishable** | Screens 3 and 4 use the same primary visual: a large grey **"—"**. The distinction lives only in the small text beneath | **High** |
| Record: *"the only thing on screen that looks tappable is 'how is this calculated'"* | Correct — but its tappability is carried by **colour alone** | **Medium** |
| Done criteria 1, 4, 7 (no blended score · date range and last update written · no reference to the buyer-facing score) | All three hold | ✓ |

---

## 3. Findings

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **Critical** | **Three numbers look alike and point in different directions.** `98.2%` is good when high, `0.4%` is good when **low**, `4.7` is out of five. All three are the same size, the same weight, side by side. Nothing on screen says which direction is good | A seller scans three large numbers and may read a high cancellation rate as a target. This screen's **only** job was to say what to fix; with the direction unclear, they fix the wrong thing | How each component's direction is carried on screen. This is a gap in the record: `08-design-brief-v1.md` decided hierarchy and reference and **never discussed direction**. Goes to `design-brief` v2 |
| **Critical** | **The drawing closes a decision that was left open.** The reddish border on screen 2 rules that those values are bad before the comparison basis exists. Every reviewer reads it as a design detail and assumes the threshold was settled | The decision gets made in a line of CSS rather than in a meeting — and the question `prior-art` K1 raised (peer group or fixed target) closes without ever being asked | That no card is marked as bad until the basis is decided. The decision belongs to Deniz; the design's job is to **show it open** |
| **High** | **"0.0%" looks flawless on screen 3.** A seller with three orders in 90 days has two components saying "not enough orders" while the cancellation component **shows a value**, because nothing was cancelled. The same three orders, treated two ways | The new seller believes their cancellation rate is perfect; then a fourth order is cancelled, the rate jumps to 25%, and they cannot see why. The record flagged this case in example content 3 as "the hardest example in the set"; the drawing produced it and did not solve it | Whether the "enough orders" threshold applies **per component or per seller**. The threshold itself is already open (`request-shaper` B3); what is open here is its grain |
| **High** | **Three states, two visuals.** "Not enough orders" and "could not compute" both begin with the same large "—", and only the small text below separates them. Squint and they are the same screen | `flow-map` declared these two **must** be distinguishable, because the seller's action differs: wait in one, tell us in the other. Looking alike, both read as "the system is broken" | Whether the two states get different primary visuals |
| **High** | **There is no stale state.** If the run has been dead for two days the screen says so only through the date on the "last updated" line, in the same grey as everything else | The seller cannot understand why yesterday's fix has not appeared and calls support — `flow-map` EA3's only point of visibility was that line, and it is not visible | After how many days staleness becomes a state (open in the record) **and** how the date is shown until then |
| **High** | **Loading and read-error are not drawn.** The record named both; `flow-map` wrote EB1 as an error path | The section looks empty and the seller starts refreshing; or the rest of the panel waits and nobody knows why | Drawing the two states. No decision is required; the drawing is what is missing |
| **Medium** | **State is carried by colour alone** (the reddish border) and **tappability by colour alone** ("How is this calculated?") | For a seller who does not see colour the three cards are identical, and the only action reads as text | The accessibility level is `[DECISION NEEDED]` in the record. **A finding against an unstated standard is a suggestion** — level first, then contrast |
| **Medium** | **Two rates and a five-point average share one card treatment.** `98.2%` and `4.7` sit side by side at the same typographic weight and read as the same kind of number | A seller tries to compare all three; they are not comparable | Whether the review component is shown as a rate or out of five |

---

## 4. What works

- **The undecided basis is visible on screen as a placeholder.** Most wireframes leave that blank and the review passes over it as "something goes here". The highlighted marker tells everyone in the review that the decision has not been made.
- **Two of four frames are error or edge cases.** In most wireframes that ratio is zero.
- **There is no blended score anywhere.** It was the easiest rule in the slice to break — adding an "overall" number would have felt natural — and it was not broken.

---

## 5. Not assessable

- **Consistency (lens 11)** — I have not seen the rest of the panel. Nothing can be said about whether this section looks like it belongs to Menzil's seller panel.
- **Scrolling and narrow viewports** — three cards sit side by side; what happens in a narrow browser window is not visible from a static frame. The record drafted a 360 px minimum width and this drawing does not test it.
- **Load order** — whether the section holds up the rest of the panel cannot be seen from the drawing.

**Decisions nobody has made:** how component direction is shown, whether the "enough orders" threshold is per component, and how staleness appears. All three go to `design-brief` v2 — they are not drawing errors, they are decisions that were never made before drawing.

**And the loop does not end here:** these findings go into the second version of the record, and from there into `build-context`. A design loop can run twice and still end somewhere nobody is holding the whole thing.
