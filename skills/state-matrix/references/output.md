# Output

## 1. Scope

One or two lines: which surfaces, what material you worked from, and what that limits. A sweep against a written description can find states; only a design can tell you whether they are handled.

## 2. The matrix, one per surface

| State | Reached when | What it must resolve | Status |
|---|---|---|---|
| Empty — first use | The customer has never sent money | Whether this invites or explains | **Designed** |
| Empty — all removed | Every recipient has aged out of the list | Whether it differs from first use | **Open** — Product |
| Partial | Recipients loaded, balances did not | Whether the surface degrades or blocks | **Open** — Product + Backend |

- **Reached when** is a trigger, not a category. "Error state" is a bucket; "the counterparty bank does not respond within the timeout" is a row somebody can act on.
- **What it must resolve** is the question the state poses — never your answer to it. Deciding is `design-brief`'s job, and answering here quietly turns a sweep into a design.
- **Status** is one of **Designed** (a screen exists), **Decided** (written down, no screen), **Open** (nobody has decided — name who must), **Unreachable** (cannot occur, with the reason).

Order rows by consequence, not by dimension. A rare state that loses money sits above a common state that looks untidy, and say which is which.

## 3. Traps

Every state a user can enter and not leave, however rare.

> **Partial load with a failed retry** — the surface shows stale content, the retry control has gone, and the only exit is force-quitting the app.

A trap is a finding even when the state itself is well designed. It is the one check that reads across the whole matrix rather than down a column.

## 4. Unreachable and dead states

Two lists, both short and both worth writing.

- **Designed but unreachable** — a screen exists and nothing leads to it. Either a trigger is missing or the screen is dead.
- **Reachable but claimed impossible** — someone wrote "cannot happen" and you found the path. Quote them, then give the path.

## 5. Counts

The headline, and the reason to run this at all.

> **34 states · 11 designed · 6 decided · 16 open · 1 unreachable**
> Of the 16 open, 9 sit on the confirmation surface.

Counts turn "we have probably covered the edge cases" into a number somebody has to answer for. Put the concentration in a clause — a surface carrying most of the open states is where the next hour goes.

Never present a percentage as a score. This is a checklist with owners, not a grade.

## Rules

- **No invented answers.** A state whose behaviour nobody has decided is **Open**, even when the answer seems obvious. The obvious answer is what this skill exists to stop being assumed.
- **No padding.** A dimension with nothing to say gets a line saying so. Rows invented to fill a matrix are how a reader learns to skim it.
- **Hand the open ones onward.** Close by pointing the Open rows at `design-brief`, which is where deciding happens.
- **Offer to save at the end.** Never write files unprompted.
