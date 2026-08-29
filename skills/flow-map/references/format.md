# Format

## The header

Three lines before the first step. They are the boundaries of what follows, and a flow whose boundaries are implicit is a flow about a slightly different feature than everyone thinks.

> **Starts:** the customer opens the app, having sent money to at least one person before
> **Ends:** money sent · abandoned before confirming · handed to the full transfer flow
> **Actors:** customer · the app · the transfer service · the receiving bank

## The steps

| # | Actor | What happens | System |
|---|---|---|---|
| 1 | Customer | Opens the app and sees the recipient list | **reads** |
| 2 | Customer | Taps a recipient | |
| 3 | System | Shows the confirmation with the last amount filled in | **reads** |
| 4 | Customer | Confirms | |
| 5 | System | Sends the money | **acts** |
| 6 | System | Shows the result | |

**One action per step.** *"The user confirms and the money is sent"* is two steps, and everything interesting happens between them — that gap is where the failure, the double tap and the timeout all live.

**Actor is the one who acts**, not the one who benefits. If the system does it while the person waits, the actor is the system.

**System is a mark, not a description.** `reads` when the step needs information it does not already have; `acts` when it changes state, spends money, or tells something else. Both when both. Nothing when neither — most user steps are blank, and that is the point: the marks show where the system is load-bearing.

## Branches

Labelled, with a condition and an ending. Never inline in the main table.

> **B1 — amount is at or above the passwordless threshold** *(from step 4)*
> 1. System hands the recipient and amount to the full transfer flow · **acts**
> 2. Customer completes verification there
> → **Terminates.** The rest of this flow does not apply.

> **B2 — customer edits the amount** *(from step 3)*
> 1. Customer changes the amount in place
> → **Rejoins at step 4.**

Conditions must be testable. *"If the user is new"* is a category; *"if the account was created less than 30 days ago"* is a condition someone can implement and someone else can check.

Every branch ends one of two ways: **rejoins at step N** or **terminates**. There is no third option, and a branch missing this line is the finding.

## Error paths

Numbered like branches, never in an appendix.

> **E1 — insufficient balance** *(at step 5)*
> - **The person is left holding:** the confirmation screen, nothing sent, the amount still on it
> - **The way out:** reduce the amount, change the source account, or leave
> → **Rejoins at step 3.**

Two fields are mandatory. **What the person is left holding** is the one that gets skipped and the one that matters: an error that leaves someone unsure whether their money moved is a support call regardless of how the system recovered. **The way out** must be something the flow actually offers — an error telling someone to change an account on a screen with no account selector is a finding, not a path.

## The diagram, if you offer one

Text first, always. A diagram is a view of the flow, not the flow: it stops being updated the moment editing it costs more than editing a list, which is immediately.

Offer Mermaid after the text, and only when the branch structure is genuinely hard to hold in the head — roughly four or more branches. Keep node labels to the step number and a few words; a diagram that repeats the whole table is two artefacts to maintain and one of them will rot.
