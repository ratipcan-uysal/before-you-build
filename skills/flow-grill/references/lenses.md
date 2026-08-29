# Lenses

Twelve. Apply the ones the material can answer; name the ones you could not and why. The first three are found by walking the flow; the rest by reading it.

## 1. Dangling branches
A branch that neither rejoins at a named step nor terminates. It reads as finished because the box exists and the arrow leaves it.

> "B2 splits at step 4 and its last step is 'user corrects the amount'. Corrects it and then what — back to step 4, or forward to 5? Somebody decides this in code."

## 2. Unreachable steps and endings
Something in the flow that nothing leads to. Usually a leftover from a version that changed, and usually still discussed as if live.

> "Step 9 defines what happens after the receipt. No path arrives at step 9."

## 3. Missing endings
Every flow has more endings than the author drew. **Abandonment is an ending** and it is usually the most common one. A flow with only success and failure has not accounted for the person who simply stopped.

> "Three endings are drawn. Where does the person who closed the app at step 3 appear?"

## 4. Assumed success
A step that only makes sense if the previous one worked, with no path for it not doing.

> "Step 6 shows the confirmation. Step 5 sends the money. There is no path from step 5 that does not reach step 6."
> This is the most common structural fault in flows written from the happy path outward.

## 5. Untestable conditions
A branch condition nobody can implement or check. Categories masquerading as predicates.

> "'If the user is new' — new by what measure? Account age, first use of this feature, or no prior transactions? Three different branches."

## 6. Hidden steps
One step doing two things. The failure point lives in the gap the sentence closes over.

> "'The customer confirms and the money is sent' is two steps. Everything interesting — the double tap, the timeout, the partial failure — happens between them, and this flow has no between."

## 7. Actor confusion
A step attributed to the wrong actor, usually a system action written as a user action. It hides who is responsible and therefore what can fail.

> "'The user's balance is checked' — the user is not checking anything. The system is, and it can fail, and that failure has no path."

## 8. Order dependence
Steps that assume a sequence nothing enforces. Fine when the interface enforces it; a finding when it does not.

> "Steps 2 and 3 assume the recipient is chosen before the amount. What stops someone typing an amount first? If the design prevents it, say so; if it does not, this is two flows."

## 9. State across gaps
What is being held between steps, and what happens to it when the gap is interrupted. Interrupted mid-step, not between steps.

> "Between step 3 and step 4 the flow is holding a recipient and an amount. Killed at that point, what survives — nothing, a draft, a pending transfer?"

## 10. Concurrency
The same flow entered twice: double tap, retry after a timeout, two devices, two tabs, a second person on a shared account.

> "Step 5 is marked `acts`. What happens when it runs twice? If the answer is 'it cannot', what makes it so, and is that in the flow?"
> Ask this explicitly at **every** step marked as changing state. It is the question most reliably skipped.

## 11. Reversal
Where the person can go back, and what going back does to work already done.

> "Back from the confirmation is drawn. Back from step 5, after the money has moved — is that the same control doing something entirely different?"

## 12. Boundary drift
The flow silently covers something the request excluded, or silently drops something it included. **The second is invisible**, because a missing thing leaves no gap in a diagram.

> "The request says international transfers are out of scope. Step 4 branches on the recipient's country."
> "The request asks for both mobile and web. This flow has one path and never says which."

## Working them well

- **Walk before you read.** Lenses 1 to 3 come from tracing paths with a finger. Do that first; it finds the Criticals in minutes and tells you where to read carefully.
- **The strongest findings sit where two lenses meet** — a hidden step that also has assumed success, a dangling branch that was also the only path to an ending.
- **Prefer the mechanism to the label.** "Incomplete error handling" is a grade. "Step 5 has no path that does not reach step 6" is a finding somebody can fix this afternoon.
- **Never rewrite the flow.** Name what is missing and the decision that closes it. The steps belong to whoever owns the flow.
