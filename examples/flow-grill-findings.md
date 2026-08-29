# Worked example — `flow-grill`

Run against the first version of [the Quick Send flow](flow-map-quick-send.md).

---

> **This flow was produced in the same conversation as this review. The review is compromised.** A model that authored a sequence and then audits it accepts its own assumptions, most reliably on the branches it thought hardest about. `flow-map` and this skill are a natural pair and will be run back to back, which is exactly when the guard matters. Repeat it in a clean context.

## What was reviewed

Nine steps, five branches, nine error paths, as a step table and a diagram, against the shaped request and the design record. Conditions were readable because the flow came as text; a diagram alone would have left two lenses unanswerable.

## Drift from what was asked

| What was asked | What the flow does | |
|---|---|---|
| *"Mobile first, web after; both must be designed"* | **Web is absent.** One path, surface never named | **High** |
| *"Extend the existing transfer taxonomy with a source parameter"* | **Events appear nowhere** — no step, no mark. Emitting an event is a system action | **High** |
| *"The threshold is remotely adjustable"* | Step 5 evaluates it; **where it is read from is invisible** | **Medium** |

Both High findings are the **dropped** direction — the one nobody catches, because a missing thing leaves no gap in a diagram. The second has a concrete cost: an `api-needs` pass derived from this flow would have missed the analytics contract entirely.

## Findings

### The diagram contradicts the text

| | Finding | What goes wrong | Decision that closes it |
|---|---|---|---|
| **Critical** | **The B5 → B2 → B3 chain is invented.** All three are separate branches off step 5. The diagram asserts a sequence between them | A developer reading the diagram builds a flow where abandoning leads to editing the amount | Branches are drawn from their source; no arrow exists for layout convenience |
| **Critical** | **Abandonment never terminates.** B5 is drawn as a process box flowing into B2, while the text says it ends | The most common ending is not an ending in the picture | Abandonment is an ending and takes a terminator |
| **High** | **E2's rejoin to step 5 is missing from the diagram.** The text has it | Where a customer lands after an insufficient balance cannot be read from the picture | — *(the text is right; the diagram was wrong)* |
| **High** | **E2 → E4 and E3 → E5 are invented too.** All four are separate outcomes of one decision | Same fault, three places | Same decision |

### The text

| | Finding | What goes wrong | Decision that closes it |
|---|---|---|---|
| **Medium** | **Is step 7 a step or a state?** *"Exit control is removed"* — nobody acts, and what triggers step 8 is unstated | A developer skips it, or builds a separate waiting screen | Is 7 the outcome of 6, or the opening state of 8 |
| **Medium** | **"Did the list arrive?" is not testable.** Timeout, error and empty response are three different paths | Three situations collapse into one branch | The condition: which timeout, which error classes |
| **Medium** | **B1's handoff is marked `acts` and was never asked the double-run question** | Two taps on *Continue* either open the flow twice or not — unknown | — |

## Coverage

> **9 happy-path steps · 5 branches · 9 error paths · 4 endings** *(one missing from the diagram)* · **5 system touchpoints**, 2 marked `acts` — **one asked the concurrency question, one not**

The unhappy ratio is healthy for a transaction: nine against nine.

## Not assessable

- **Surface parity** — the web flow was never written, so no comparison was possible. That is a consequence of a finding, not a finding.
- **Timing** — no duration appears anywhere except E4's five minutes.

## The result

**Six of nine findings were in the diagram, not the text.** An hour before this review, `flow-map` gained a rule forbidding exactly that: *every branch in the text appears in the diagram; every path attaches where it actually occurs.*

So the rule was necessary — and adding a rule fixes nothing retroactively. Every artefact is correct against the rules that existed when it was made. What found these was not writing the rule. It was running the grill.
