# Output

## 1. What was reviewed

Two or three lines. What form the flow was in, whether a request or brief was available to check it against, and what that limits. If you produced this flow in this conversation, that sentence comes first.

> Reviewed: a nine-step flow with four branches and six error paths, against the shaped request. Given as a step table, so conditions could be read; a diagram alone would have left lenses 5 and 8 unanswerable.

## 2. Drift from what was asked

Only when a request or brief exists. Two columns of the same table, because the two directions fail differently.

| What was asked | What the flow does | |
|---|---|---|
| "International transfers are out of scope" | Step 4 branches on recipient country | **High** — covers what was excluded |
| "Mobile and web" | One path, surface never named | **High** — drops what was included |

The second row is the one nobody catches unaided. A flow that covers too much has a visible extra box; a flow that dropped something has nothing to see.

## 3. Findings

Grouped by path — the happy path, then each branch, then each error path — so the reader can work through one at a time and fix as they go.

Give every finding an identifier, `F1` upward, so the flow's author can answer by number. Open with the index, one line each:

| | | Finding |
|---|---|---|
| **F1** | **Critical** | Branch 3 has no ending — the condition is written, the path is not |

Where every cell fits on a line, that table is the whole section. Where a finding needs a paragraph, keep the index and write the rows as blocks:

> **F1 · Critical — branch 3 has no ending.**
> Step 6 splits on whether the recipient is registered, and the unregistered side stops after the lookup.
> **What goes wrong:** the developer builds whatever the last screen happened to be, and a real person lands there.
> **Decision that closes it:** what an unregistered recipient is offered, or that the transfer is refused.

The fields are the discipline; the grid is not. Four columns of paragraph become a seven-hundred-character row, and the reader who has to fix it stops at the second one.

**Severity**

| | |
|---|---|
| **Critical** | A path leads nowhere, or a person can reach a situation the flow does not define |
| **High** | Behaviour is assumed rather than written, or a condition cannot be tested |
| **Medium** | An ambiguity somebody will probably resolve reasonably, and might not |

**What goes wrong** is where a finding proves itself. One that cannot name what a developer builds or what a person hits is a preference about drawing style — cut it.

## 4. Coverage

The counts, and the ratio.

> 9 happy-path steps · 4 branches (1 dangling) · 6 error paths · 2 endings · 11 steps marked as changing state, 3 of them asked about concurrency

The last clause is usually the finding. Every step that changes state needs the double-run question answered, and most flows answer it for none of them.

## 5. Not assessable

What you could not judge and why. A diagram without conditions cannot answer lens 5. A flow without a request cannot be checked for drift, and saying so is more useful than a review that quietly skipped it.

## Rules

- **No rewritten flow.** Not even a small one, not even in a code block. The moment you write the steps, the review is a proposal and gets argued with as one.
- **No overall verdict.** "This flow is 70% complete" invites a fight about the number instead of the dangling branch.
- **Quote the request when checking drift.** Paraphrasing loses the argument before it starts.
- **Offer to save at the end.** Never write files unprompted.
