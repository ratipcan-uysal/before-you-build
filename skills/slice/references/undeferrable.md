# What cannot be cut

Each of these looks like a feature and is a decision. Deferring the feature is fine; deferring the decision is not, because the code answers it on the first day and the answer is expensive to change.

The column that matters is the last one. If deferring costs a migration, a data backfill, or a conversation with a regulator, it was never a cut.

## Identity

**What makes two records the same thing.** Two recipients with the same name, two accounts with the same number, two uploads of the same file.

Deferred, the first implementation picks one and the picking is invisible. Duplicates accumulate under the wrong rule and the fix is a merge with rules about which of two histories survives.

**Decide now, build later:** the rule can be written in one sentence today and enforced by one comparison in code. There is no version of this that is cheaper to postpone.

## Stored versus computed

**For anything a person is shown and might be shown again.** The amount, the rate, the name as it read at the time, the rule that applied.

Deferred, the first implementation computes it, because computing is less work. Six months later the historical view is wrong and there is no data to reconstruct it from — the value that was displayed was never written down.

**Decide now, build later:** the field costs nothing to add on day one and cannot be added retroactively with real values.

## The auth and permission model

**Who may see and do what**, even when today there is exactly one user and they may do everything.

Deferred, permissions are checked in the surfaces rather than behind them, because with one user there is nothing to check. Adding a second kind of user later means finding every place a check should have been, and the ones you miss do not error.

**Decide now, build later:** a single sentence about where the check lives is enough. The roles can be one.

## Money, law, and other people's data

**Retention, consent, audit trail, deletion.** Never deferrable, only undeclared.

Deferred, the obligation still applies from the first record written. A deletion request eighteen months later covers data nobody scoped, and an audit asks about a period during which the system recorded nothing.

**Decide now, build later:** the periods and the obligation owner are a paragraph. The tooling to act on them is genuinely deferrable.

## What a person was promised

**Anything the interface states as a rule** — a limit, a guarantee, a threshold, a timing.

Deferred, the rule lives only in the screen that renders it, and the value that actually applied to a given action is not recorded anywhere. Later nobody can answer whether an action was within the rule at the time it happened.

**Decide now, build later:** store the value that applied alongside the thing it applied to.

## How to write these into a slice

Not as features. As one line each in **Decided now, built later**, with the decision stated and the build explicitly deferred:

> **Identity.** Two recipients are the same recipient when the account number matches, regardless of name. The merge tooling is out of this slice.

> **Applied threshold.** Every transfer stores the limit that was in force when it was made. The screen that shows it is out of this slice.

The test that you have written it correctly: **a person reading only this line could implement it, and would not need to ask a question to do so.**
