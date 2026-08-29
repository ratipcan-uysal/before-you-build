# Sweeping for what is missing

Recall produces the errors you have seen. Sweeping produces the ones you have not. Run these against every step before declaring the flow done.

## The seven questions, per step

1. **What if it fails?** The call errors, the service is down, the rule rejects it.
2. **What if it is slow?** Slower than the person will wait, and slower than the timeout. These are two different paths — one ends in abandonment, the other in an unknown outcome.
3. **What if they leave?** Backgrounded, killed, navigated away, phone died. Mid-step is the interesting case, not between steps.
4. **What if it happens twice?** Double tap, retry after a timeout, two devices, the same flow in two tabs.
5. **What if what they saw is no longer true?** The price changed, the recipient closed their account, the balance moved, the offer expired between render and confirm.
6. **What if they are not allowed?** Permission was revoked, the session expired, the limit was reached, the account was frozen — mid-flow, not at the start.
7. **What if something upstream is missing?** The list is empty, the field is null, the third party returned success with no payload.

Not every question produces a path on every step. Most produce none. But a step where **none** of the seven applies is usually a step that is doing nothing, and worth deleting.

## Structural checks, across the whole flow

**Every branch rejoins or terminates.** No exceptions, no trailing sentences.

**Every ending is reachable.** An ending nothing leads to is a leftover from an earlier version of the flow.

**Every error path has an exit that the flow offers.** Not an exit in principle — a step that exists.

**Abandonment is an ending.** A flow whose only endings are success and failure has not accounted for the person who simply stopped, and that is usually the most common ending of all.

**Concurrency is asked once per state change.** Every step marked `acts` gets question 4 explicitly, and the answer is written down even when it is "cannot happen, because the control is removed after the first press".

## The ratio test

Count them at the end. A flow with nine happy-path steps and one error path did not have one error; it had one that came to mind.

There is no correct ratio, but the shape is diagnostic. Transactional flows typically produce more error paths than happy steps. A display flow produces fewer. If a payment flow comes out with two error paths, the sweep was skipped — go back to question 1 and work down.
