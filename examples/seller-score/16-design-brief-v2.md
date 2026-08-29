# design-brief — decision record, v2

**Supersedes v1 on the items below only.** v1 (`08-design-brief-v1.md`) declared itself **partial**: written without a mapped flow, holding three error states. The flow ran and proved it right — v2's largest section is states.

**What produced v2:** `10-flow-grill.md` (four dangling branches, two dropped decisions) and `15-ux-grill.md` (one decision closed by the drawing, three states missing).

---

## A. The decision v1 was missing

**Component direction.** v1 settled hierarchy, reference, freshness and the empty state; it **never discussed which direction is good.** `ux-grill` found this Critical: `98.2%` is good high, `0.4%` is good low, `4.7` is out of five — and all three look alike.

**Decision:** every component **carries its own direction** beside its value. Direction is given in words, not in colour — colour may be a second layer, never the only one. A seller reading the screen in greyscale has to know which way is good.
**`[DRAFT]` copy:** `On-time delivery — higher is better` · `Seller-caused cancellations — lower is better` · `Product reviews — out of 5`

---

## B. The decision that must not be closed

**No component is marked as bad until the comparison basis is decided.** v1 wrote this as a rule; the drawing broke it with a reddish border and made the decision in a line of CSS.

v2 adds the mechanism: until the basis is decided, **the cards are not distinguished from one another.** The only thing marking a poor value is the placeholder that represents the decision. Any visual difference between one card and the others — border, background, icon, ordering — *is* the decision.

---

## C. States — the full list

| State | Decision | Source |
|---|---|---|
| Default | v1 | |
| **Loading** | The section shows its own loading state and does not hold up the rest of the panel. **Must be drawn** | decided in v1, absent from the drawing |
| **Values could not be read** | The section shows its own error and offers one retry | `flow-map` EB1 |
| **Not enough orders for this component** | "—" instead of a value, with the reason | v1 |
| **This component could not be computed** | **Not** the same "—". Two states cannot share a primary visual | `flow-map`'s distinguishability table · `ux-grill` High |
| **The seller has no values at all** (the run never reached them) | **Different** from both of the above. Three states, three appearances | `flow-map` BB1 |
| **Values are stale** | `[DECISION NEEDED]` after how many days — owner Deniz. **Until decided it is drawn as a marked placeholder**, never as an absence | `flow-map` BB2 · `ux-grill` High |
| **One component from yesterday, two from today** | This state exists if `flow-map` BA2 permits partial writes. It cannot be drawn before the write decision; **it stands as a placeholder** | `flow-grill` drift finding |

**Eight states, three absent from v1, two awaiting a decision.** The ones awaiting a decision ship as marked placeholders — not as undrawn.

---

## D. New decisions needed

| Decision | Who | What it blocks |
|---|---|---|
| Is the "enough orders" threshold **per component or per seller** | Deniz | The new-seller screen. Per component, a seller with three orders sees a value in one component and none in the other two — `ux-grill`'s "zero that looks flawless" |
| Is the review component shown out of five or as a rate | Deniz | Whether the three cards are comparable |
| Are partial writes allowed | Marketplace Core | The last state above, and `flow-grill`'s drift finding |

v1's six open decisions stand. **Nine in total.**

---

## E. Done criteria (replacing v1's)

1. Every card carries a **word** giving its direction; read in greyscale, which way is good is clear.
2. Until the comparison basis is decided, **no card is visually separated from the others** — no border, background, icon or ordering difference.
3. Each of the eight states in section C has a drawn screen; two of them are marked placeholders.
4. The "not enough orders", "could not compute" and "no values at all" screens **do not resemble each other**: squint and the three are distinguishable.
5. Loading and read-error are drawn.
6. The only thing that looks tappable is "How is this calculated", and its tappability is carried by something besides colour.
7. There is no blended score and no reference to the buyer-facing score. *(from v1, and it held)*

Six of the seven can be settled by looking, in five minutes. v1's criteria were checkable too and **two of them were broken in the drawing**; v2 writes those two with the mechanism that carries them.
