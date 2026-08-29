# Worked example — `design-brief`

Input: [the shaped Quick Send request](request-shaper-interview.md). Output abridged to the sections that carry the decisions.

This is version two — rewritten after screens were drawn from version one and [grilled](ux-grill-findings.md). Eleven of the thirteen findings were decisions nobody had made, which is not a failure of the brief: **some decisions cannot exist until something has been drawn.**

---

## Surfaces

- **Home screen** *(existing)* — hosts the entry point, not owned by this feature
- **Quick Send region** — a region of the home screen, not a screen
- **Confirmation** — the only surface this feature adds
- **Empty state** — the same region, before the customer has ever sent money
- **Account picker** — `[DRAFT]` a new surface. The insufficient-balance error says *change the account*, and version one had no way to. A screen must offer what its errors demand.

**Confirmation was decided to be a separate surface.** The request did not say. The primary-job test settles it: the region's job is choosing a recipient, the confirmation's job is verifying an amount. Different jobs, different stakes; merged, both get weaker.

## The primary job of each

| Surface | Job |
|---|---|
| Region | Choose who to send to |
| Confirmation | See that the amount and the recipient are right before money leaves |
| Account picker | Change which account it leaves from |
| Empty state | Get to the full transfer flow |

## Information hierarchy

**Region:** 1 recipient identity · 2 that this is one tap · 3 nothing else

> **`[DRAFT]` Recipient identity is the name *and* the masked account tail, both equally legible.** In version one the tail was 12px at 3.67:1 contrast — the least readable text on the card, in the one place it was load-bearing. Two recipients named *Ayşe Demir* were indistinguishable. If a tail is still not enough, the date of the last transfer becomes a third line.

**Confirmation:** 1 recipient · 2 amount · 3 source account · 4 the action · 5 the way out

> Recipient outranks amount deliberately: the right amount to the wrong person cannot be undone; the wrong amount to the right person is a phone call.
>
> **The mechanism carrying the rank:** position (first), containment (tinted block), size (28px against 26px). All three. A two-pixel size difference does not carry a decision on its own — and in version one the amount was 32px, so the recorded decision was simply not followed, and everyone would have believed it was.
>
> **`[DRAFT]` The exit is rank five and in version one sat at the top of the screen** — first in reading order. The back control stays in the title bar, with its visual weight reduced.

## Navigation model

| | |
|---|---|
| **In** | Home screen, whenever at least one recipient exists |
| **Out** | One exit: back in the title bar. From the confirmation it returns to the region, nothing sent |
| **`[DRAFT]` While a send is in flight** | The exit is **removed, not disabled.** In version one it was greyed and still occupied a 44px target; a control that is present and inert reads as a frozen app |
| **Above the threshold** | Hands to the full flow, carrying recipient and amount |
| **Interrupted** | Killed during confirmation returns to home, nothing sent |
| **Deep link** | `[DECISION NEEDED]` — Product |
| **`[DRAFT]` Ten recipients, no "see all"** | The third card is always partly visible as the scroll cue. Reaching someone not in the list is the full flow's job; a second navigation layer ends the claim of being quick |

## System feedback

| Moment | Decision |
|---|---|
| **In progress** | Inline; the surface does not close until it resolves, and the exit is removed |
| **Succeeded** | `[DECISION NEEDED]` — Product + UX. **This screen ships in the set as a marked placeholder, never as an absence** |
| **Failed after sending** | Visible in account history only *(the requester's decision)* |
| **`[DRAFT]` Failed at submit** | Inline, in the flow. Version one did not separate these: *notification after the fact* and *validation at submit* are different decisions |
| **`[DRAFT]` The primary action after an error** | Disabled until the amount changes. Pressing the same button with the same value is the top cause of repeated failure |
| **Pending beyond five minutes** | `[DECISION NEEDED]` — Product + Backend. Also ships as a marked placeholder |
| **`[DRAFT]` The point of no return** | Carried by the button label — *"Send 750.00"*. In version one it was a 12px caption above the button: the smallest text on the screen at the moment of highest stakes. A label is read at the moment of action; a caption above it is not |

## Binding constraints

| Constraint | Source |
|---|---|
| Mobile first, web later | the request |
| Web always verifies | the request |
| **The threshold is remotely adjustable → the interface must survive it changing between sessions** | **derived** — the request states the capability, not its design consequence |
| **`[DRAFT]` "No balance" covers the region, not error messages** | An error that cannot state the shortfall cannot be acted on |
| Accessibility conformance level | `[DECISION NEEDED]` — a policy call, not a design one |
| Where the region sits on the home screen | `[DECISION NEEDED]` — Product. It competes with balance cards and campaigns |
| Design system | assumed to be the app's existing one |

## Non-goals

- Not a contacts picker — the list is derived from history only
- Not a transfer manager — no editing, scheduling or bulk actions
- Does not replace the full flow, which stays reachable and unchanged
- **In the region**, shows no balances — the region shows people, not money
- No promotional content in the region
- **`[DRAFT]`** No real institution names anywhere; example data uses invented ones

## Done criteria

- Someone who has sent money before can repeat it without reading anything
- Nobody completes a send without having seen the recipient and the amount together
- **Two recipients with the same name are distinguishable at a glance**
- Every state named above exists as a screen — undecided ones as marked placeholders
- If the list query fails the region becomes invisible, not broken
- **No error message instructs an action the screen does not offer**

## Decisions still needed

| Decision | Who settles it | What it blocks |
|---|---|---|
| How success is signalled | Product + UX | The whole confirmation surface |
| What is shown during the five-minute pending window | Product + Backend | The waiting state |
| Deep link reachability | Product | Whether the region must work standalone |
| Accessibility conformance level | UX / legal | Type scale, contrast, target sizes |
| Where the region sits on the home screen | Product | Layout and visual weight |

## What the drawing taught the brief

Version one was derived from a request and was reasonable. Version two contains decisions that only became visible once two identical cards sat side by side — *"two people share a name; how does anyone tell them apart"* is not derivable from a request, and nobody thinks of it until they see it.

That is why `design-brief` and `ux-grill` are a loop rather than a line, and why the second pass is usually the useful one.
