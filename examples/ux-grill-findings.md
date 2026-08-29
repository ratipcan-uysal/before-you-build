# Worked example — `ux-grill`

Run against eight artboards drawn from [the Quick Send decision record](design-brief-record.md).

---

> **These screens were produced in the same conversation as this review. The review is compromised.** A model that generated a design and then reviews it approves its own work — from the ordinary pull of consistency, not vanity, and it does so on precisely the decisions it reasoned hardest about. Repeat in a clean context.

## What was reviewed

Eight phone artboards at mockup fidelity, against the decision record. **The rendered result could not be seen** — the review is from source, so type sizes, contrast ratios and target sizes were measurable while optical balance, scroll behaviour and motion were not. Contrast figures below are computed, not observed.

## Conformance

| Decision | What the design does | |
|---|---|---|
| *"Confirmation hierarchy: … 5 the way out"* | The back control is **at the top of the screen** — first in reading order. The rank-five element is positionally first | **High** |
| *"Failure is visible in account history only"* | The insufficient-balance screen shows an inline error in the flow | **Medium** — not a violation. The brief never separated *notification after the fact* from *validation at submit*. It should |
| *"Recipient outranks amount"* | 28px against 26px — followed, but the margin is two pixels and size alone does not carry it | Held, fragile |

## Findings

### Home screen

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **Critical** | Two recipients named *Ayşe Demir* are separated only by a **12px account tail at 3.67:1 contrast** — the least readable text on the card, in the one place it is load-bearing | Sends to the wrong Ayşe and cannot undo it | How same-named recipients are distinguished |
| **High** | The list holds ten, about two and a half cards are visible, and **nothing indicates there are more** — no cue, no count, no *see all* | Looks for the fourth person, does not find them, uses the full flow; the feature goes unused | How many are shown and how the rest are reached |
| **Medium** | The dashed *existing home content* block occupies about 40% of the screen. A real bank home screen carries balance cards, shortcuts and campaigns | A stakeholder reads the region as far more prominent than it will be | Where the region sits on the home screen |

### Confirmation

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **High** | The finality notice — *money is sent immediately, no password* — is the **smallest text on the screen**. The signal is weakest at the moment of highest stakes | Taps without reading it; learns there was no password after the money has gone | How the point of no return is announced |
| **High** | The amount's edit affordance is an 18px icon **with no padded target**, and nothing marks the amount itself as tappable | Cannot change the amount; restarts | The amount field's tap target |
| **Medium** | The source account renders at `#A39D93` on white — **2.69:1**, far below AA | Cannot read which account it leaves from | Accessibility conformance level |

### In progress

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **High** | The back control is **faded but present**, occupying a 44px target, while the caption below says going back is closed | Presses it, nothing happens, concludes the app has frozen | Does the exit disappear, appear disabled, or cancel the send |
| **Medium** | The progress indicator is a **static SVG arc** with no animation | Reads it as a broken icon and assumes nothing is happening | — *(execution, not a decision)* |

### Insufficient balance

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **Critical** | The error says *choose another account* and **there is no account selector on the screen** — the source account block is read-only with a marked badge. The text commands an action the screen does not offer | Hunts for the path, fails, calls support | Can the source account be changed from the confirmation |
| **High** | The primary button still reads *Send* and looks fully enabled. Pressing it again with the same amount fails again | Presses three times | What the primary action does after an error |
| **Medium** | No balance is shown — correct against the brief's non-goal — so **the customer cannot tell how much to reduce it by** | Trial and error | Does *no balance* cover error messages too |

### The undecided screens

| | Finding | What a user does | Decision that closes it |
|---|---|---|---|
| **Medium** | The two placeholders have **no title bar and no navigation** — they read as documentation cards rather than screens in the flow, breaking the set's visual grammar | A stakeholder skips them as *not part of this* rather than *not yet designed* | Are undecided states marked inside the flow or set aside |

## What works

- **Undecided states ship as marked screens rather than absences.** A stakeholder looking at the set *sees* the two gaps. Most design deliverables hide them, and this is the strongest move in the deck.
- **The source account is left visibly open with a badge** rather than closed by a plausible-looking answer.
- **The recipient block is tinted and positioned first**, so a two-pixel size difference is not carrying the rank alone.

## Not assessable

Optical hierarchy (no squint test was possible — the hierarchy finding is computed, not observed) · scroll behaviour · motion and transitions · consistency with the rest of the product, which was not available.

## The result

Eleven of thirteen findings were **decisions nobody had made**, not drawing mistakes. They went back into [the decision record](design-brief-record.md), which is why that document has a version two.

The remaining two were execution: an unanimated spinner and two text colours below AA.
