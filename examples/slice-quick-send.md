# Worked example — `slice`

Input: [the shaped request](request-shaper-interview.md), scored twice at [12 then 39 out of 100](readiness-score-comparison.md), plus everything the chain produced downstream of it.

> **This one ran last and should have run fourth.** `slice` did not exist when the rest of this example was produced, so the design record, the flow and the contract were all written across the full scope. What that cost is visible below and is the reason the skill now runs straight after the score.

---

## Phase 0 — Everything on the table

Twenty-three items, drawn from the request and from what the request implies without saying: the home-screen region, the ten-recipient list, the prefilled amount, passwordless sending under 10,000, hand-off above it, the web surface, the empty state, idempotency, the five-minute suspension, the remote kill switch, the remote threshold, source-account selection, the event taxonomy extension, the report breakdown, the audit log, monitoring, call-centre visibility, reversal of a mis-send, accessibility conformance, screen copy, deep links, minimum supported version, offline behaviour.

## Phase 1 — The spine

> **A customer who has sent money before sends it again to the same person.**

Then the headline held against it:

**Passwordless sending is not load-bearing.** Remove it and the job still finishes — prefilled recipient, prefilled amount, the existing verification step. The request's own problem statement is *"the whole transfer flow has to be walked from the start every time"*. It does not say *password*. The user still skips the flow; they take one step more inside it.

Cutting it takes all of this with it:

| What leaves | Where it came from |
|---|---|
| **Both go-live blockers** — the missing daily cap, and approval to open it to every retail customer | the shaped request's open list |
| The entire fraud and AML surface — the structuring pattern, the scoring shift, the alert recalibration | [`impact-radar`](../skills/impact-radar/SKILL.md) |
| **N6**, the passwordless rule enforced server-side — which [`api-needs`](api-needs-contract.md) called impossible if remote config never reaches the server | `api-needs` |
| Most of the accidental-send risk, since a verification step is itself a confirmation | `risk-interrogate` |

And the second test holds: **the hypothesis is still testable.** The success measure is monthly transfer volume. If a prefilled recipient and amount do not move it, passwordless would not have either — and the alternative was to add a fraud surface to a feature nobody uses.

## Phase 2 — The cuts, and their tests

| Cut | Whole value | Could you tell | Comes back as | |
|---|---|---|---|---|
| Passwordless sending | ✓ | ✓ | A threshold check and a server-side rule — **no migration, if the applied threshold is stored from day one** | **cut** |
| The web surface | ✓ | ✓ | A surface | **cut** |
| The source-account **picker** | ✓ *if a default is decided* | ✓ | A screen | **cut — but not the decision** |
| Deep links into the region | ✓ | ✓ | Cheap | **cut** |
| Mis-send reversal **tooling** | ✓ | ✓ | Cheap | **cut — but not the process** |
| Idempotency | ✗ — money sent twice is a defect, not a degraded experience | | | **spine** |
| The empty state | ✗ — a customer with no history gets a blank region | | | **spine** |
| The event source parameter | ✓ | **✗ — without it you cannot tell whether any of this worked** | | **spine, on the second test** |

That last row is the one worth stealing. Instrumentation is the first thing cut from every first version, and the second test forbids it.

## Phase 3 — Decided now, built later

- **Recipient identity.** Two recipients are the same recipient when the account number matches, regardless of name. Merge tooling is out of this slice. *(The decision under [`ux-grill`'s](ux-grill-findings.md) critical finding — two people called Ayşe Demir, separated by twelve-pixel text.)*
- **Applied threshold.** Every transfer stores the limit in force when it was made. The screen that shows it is out of this slice. Once someone is told *"no password will be asked"*, that is a promise, and a value computed from current config cannot answer for it later.
- **The default source account.** The picker is cut; which account the money leaves is not. One customer has several accounts, and every surface showing money has to say which.
- **Audit log retention and its owner.** A money movement creates an obligation from the first record. The tooling is deferrable.
- **Accessibility conformance level** and **minimum supported version** — both decisions wearing feature costumes.

## Phase 4 — Cuts that cost more than the build

| | To build | To add later |
|---|---|---|
| The kill switch | Hours | Impossible during the incident you need it for |
| The applied-threshold field | One field | A migration, and the real values are unrecoverable |
| The event source parameter | One parameter | [`impact-radar`](../skills/impact-radar/SKILL.md) already found this: a million existing rows with a null source |

## Phase 5 — Written so the score can read it

> *"This slice is mobile only, iOS and Android. Web is out of scope for this release."*
> *"There is no passwordless sending in this slice; every amount goes through the existing verification."*
> *"The source-account picker is out of this slice; sends come from the default account."*

**At least five of the nineteen open items leave scope with a quote attached** — the web viewport matrix, the two-tab question, the daily cap, approval for all retail customers, and deep links. **Two of the five were go-live blockers.**

---

## What running it changed

The strongest finding came from holding the headline against the spine, and **nothing in the skill said to look there.** It came out because the pass was run carefully, not because the skill made it reliable. That check is now in Phase 1: the part a request is named after, and the part waiting on an approval, are often the same part and often not load-bearing — and nobody looks, because it is what the request is called.
