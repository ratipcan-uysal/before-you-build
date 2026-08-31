# ux-grill — findings on 14-screens.html

## 1. What was reviewed

**These screens were drawn in the same session; the review is compromised.** Repeat in a clean context.

Reviewed: four desktop frames at wireframe fidelity, against the **partial** decision record in `08-design-brief-v1.md`. That record declares itself written without a mapped flow, so it is expected to be thin on error states — what follows includes which of those gaps survived into the drawing. Hover, scroll and loading behaviour are not assessable from static frames.

---

## 2. Conformance against the record

| | | Contradiction |
|---|---|---|
| **C1** | **Critical** | An open decision is closed by a border colour |
| **C2** | **High** | The state marker is colour only |
| **C3** | **High** | The stale state is not drawn |
| **C4** | **High** | Loading and read-error are not drawn |
| **C5** | **High** | Two required-distinct states share one visual |
| **C6** | **Medium** | The one tappable thing is tappable by colour |
| **✓** | | Done criteria 1, 4 and 7 all hold |

> **C1 · Critical — an open decision is closed by a border colour.**
> **Decision:** *"A `[DECISION NEEDED]` must not be closed by the visuals... where a decision is open, the design shows it open"* — and the record explicitly marks the comparison basis as undecided.
> **What the design does:** on screen 2 two cards carry a **reddish border**. The drawing says "these two are bad" while the placeholder directly beneath says "what bad means has not been decided". **The decision was made in a border colour nobody argued about.**

> **C2 · High — the state marker is colour only.** *(A suggestion while no accessibility level is set — see below.)*
> **Decision:** *"The three components are drawn at the same size and weight; what draws attention is not size but a state marker"*.
> **What the design does:** size is equal, so that part holds. But the state marker is **colour only**: in greyscale the three cards are indistinguishable.

> **C3 · High — the stale state is not drawn.**
> **Decision:** record section 7, the stale-value state, and *"`[DECISION NEEDED]` after how many days does that become a warning"*.
> **What the design does:** **not drawn at all.** The "last updated" line looks identical whether it is six hours or six days old. An undecided state was delivered as an **absence** rather than a marked placeholder — the thing the record explicitly forbids.

> **C4 · High — loading and read-error are not drawn.**
> **Decision:** record section 7, the loading state (*"the section shows its own loading state; it does not hold up the rest of the panel"*) and `flow-map` EB1, values cannot be read.
> **What the design does:** neither is drawn.

> **C5 · High — two states that must be distinguishable share one visual.**
> **Decision:** `flow-map` — "no data", "could not compute" and "stale" **must be distinguishable**.
> **What the design does:** screens 3 and 4 use the same primary visual, a large grey **"—"**. The distinction lives only in the small text beneath.

> **C6 · Medium — the one tappable thing is tappable by colour.**
> **Decision:** *"the only thing on screen that looks tappable is 'how is this calculated'"*.
> **What the design does:** correct — but its tappability is carried by **colour alone**.

> **✓ Done criteria 1, 4 and 7 hold.** No blended score · date range and last update written · no reference to the buyer-facing score.

---

## 3. Findings

| | | Finding |
|---|---|---|
| **F1** | **Critical** | Three numbers look alike and point in different directions |
| **F2** | **Critical** | The drawing closes a decision that was left open |
| **F3** | **High** | "0.0%" looks flawless on screen 3 |
| **F4** | **High** | Three states, two visuals |
| **F5** | **High** | There is no stale state |
| **F6** | **High** | Loading and read-error are not drawn |
| **F7** | **Medium** | State and tappability are both carried by colour alone |
| **F8** | **Medium** | Two rates and a five-point average share one card treatment |

> **F1 · Critical — three numbers look alike and point in different directions.**
> `98.2%` is good when high, `0.4%` is good when **low**, `4.7` is out of five. All three are the same size, the same weight, side by side. Nothing on screen says which direction is good.
> **What a user does:** scans three large numbers and may read a high cancellation rate as a target. This screen's **only** job was to say what to fix; with the direction unclear, they fix the wrong thing.
> **Decision that closes it:** how each component's direction is carried on screen. This is a gap in the record: `08-design-brief-v1.md` decided hierarchy and reference and **never discussed direction**. Goes to `design-brief` v2.

> **F2 · Critical — the drawing closes a decision that was left open.**
> The reddish border on screen 2 rules that those values are bad before the comparison basis exists. Every reviewer reads it as a design detail and assumes the threshold was settled.
> **What a user does:** the decision gets made in a line of CSS rather than in a meeting — and the question `prior-art` K1 raised, peer group or fixed target, closes without ever being asked.
> **Decision that closes it:** that no card is marked as bad until the basis is decided. The decision belongs to Deniz; the design's job is to **show it open**.

> **F3 · High — "0.0%" looks flawless on screen 3.**
> A seller with three orders in 90 days has two components saying "not enough orders" while the cancellation component **shows a value**, because nothing was cancelled. The same three orders, treated two ways.
> **What a user does:** the new seller believes their cancellation rate is perfect; then a fourth order is cancelled, the rate jumps to 25%, and they cannot see why. The record flagged this case in example content 3 as "the hardest example in the set"; the drawing produced it and did not solve it.
> **Decision that closes it:** whether the "enough orders" threshold applies **per component or per seller**. The threshold itself is already open (`request-shaper` B3); what is open here is its grain.

> **F4 · High — three states, two visuals.**
> "Not enough orders" and "could not compute" both begin with the same large "—", and only the small text below separates them. Squint and they are the same screen.
> **What a user does:** `flow-map` declared these two **must** be distinguishable, because the seller's action differs: wait in one, tell us in the other. Looking alike, both read as "the system is broken".
> **Decision that closes it:** whether the two states get different primary visuals.

> **F5 · High — there is no stale state.**
> If the run has been dead for two days the screen says so only through the date on the "last updated" line, in the same grey as everything else.
> **What a user does:** the seller cannot understand why yesterday's fix has not appeared and calls support — `flow-map` EA3's only point of visibility was that line, and it is not visible.
> **Decision that closes it:** after how many days staleness becomes a state (open in the record) **and** how the date is shown until then.

> **F6 · High — loading and read-error are not drawn.**
> The record named both; `flow-map` wrote EB1 as an error path.
> **What a user does:** the section looks empty and the seller starts refreshing; or the rest of the panel waits and nobody knows why.
> **Decision that closes it:** drawing the two states. No decision is required; the drawing is what is missing.

> **F7 · Medium — state and tappability are both carried by colour alone.**
> The reddish border carries state; "How is this calculated?" carries its own tappability.
> **What a user does:** for a seller who does not see colour the three cards are identical, and the only action reads as text.
> **Decision that closes it:** the accessibility level is `[DECISION NEEDED]` in the record. **A finding against an unstated standard is a suggestion** — level first, then contrast.

> **F8 · Medium — two rates and a five-point average share one card treatment.**
> `98.2%` and `4.7` sit side by side at the same typographic weight and read as the same kind of number.
> **What a user does:** a seller tries to compare all three; they are not comparable.
> **Decision that closes it:** whether the review component is shown as a rate or out of five.

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
