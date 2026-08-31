# Worked example — `data-model`

Input: [the Quick Send flow](flow-map-quick-send.md) — 3 `reads` · 2 `acts` · 4 `emits` — and [the needs derived from it](api-needs-contract.md).

> **This ran after `api-needs`, and should have run before it.** The draft contract in that document was written over nouns nobody had defined. Nothing in it turned out wrong, but it was standing on ground that had not been surveyed.

---

## Phase 0 — The nouns, taken from the flow

`Customer` · `Account` · `Recipient` · `Transfer` · `Threshold` · `Event`

And the pass stops on the first one, because a name on that list may not be a thing:

> **Is `Recipient` an entity, or a query over `Transfer`?** The request says the list comes from *"the customer's past transfer records, ranked by frequency"* — derived. `api-needs` N1 asks for *"the amount last sent to each"* and its second assumed capability says *"recipient-level history, not account-level"* — stored. **Nobody has decided, and the direction of everything else depends on it.** `[DECISION NEEDED]` — the requester and the backend owner.

## Phase 1 — Five questions, per entity

### `Recipient`

> **Identity:** **`[DECISION NEEDED]`** — account number alone, or account number and name? This is the decision underneath [`ux-grill`'s](ux-grill-findings.md) critical finding. *"Two people called Ayşe Demir, separated by a twelve-pixel account suffix at 3.67:1"* reads as a rendering fault. It is not. The design could not distinguish them because nothing had said what makes two recipients the same recipient
> **Lifecycle:** Created by a completed transfer. Changed by the next one. **Ended by nothing** — someone you stopped sending to never leaves, they fall below rank ten
> **Copy or reference:** **`[DECISION NEEDED]`** — is the name on the card frozen from the last transfer, or read live from the account? Frozen, and a person who changes their name shows as the old one. Live, and every past receipt changes with them
> **Existence:** An account identifier is required; **a name is not** — sends to a bare IBAN are possible. What the card shows then is undecided

### `Transfer`

> **Identity:** Is the idempotency key. `api-needs` left N5 **Unconfirmed**; the same question asked from the data side is *what makes two submissions the same transfer*
> **Lifecycle:** Created at step 7. **Changed by E4's five-minute automatic reversal** — so a transfer changes state after it exists. That is a state machine: pending → completed / reversed / failed. **No document in the chain contains it**
> **Copy or reference:** Recipient name and amount: copies, because a receipt must not change. And one more nobody wrote down — **the applied threshold is stored on the transfer.** Otherwise *"was this within the limit at the time"* has no answer a year later, and E8 makes that concrete: the threshold can change between the screen and the send
> **Retention:** **`[DECISION NEEDED]`** — a financial record with a statutory period. Owner: compliance

## Phase 2 — Relationships that carry a rule

- **`Customer` 1—n `Account` — this one reaches the screen.** The cardinality forces every surface showing money to say which account, and forces the flow to contain a step where it is chosen. The flow has one (`B3`). The design does not — which is `ux-grill`'s second critical finding, and it is this rule being broken.
- **`Account` 1—n `Transfer` — can break.** The account closes; the transfers remain. **Forbidden:** a transfer cannot be reassigned to another account.
- **"At most ten people" is a display limit, not a data limit.** The request says *"maybe we'll make it fifteen"*. Written down because a generator will cheerfully turn it into a constraint.

## Phase 3 — Stored or computed

| | |
|---|---|
| Frequency ranking | Computed |
| Amount last sent to each | Computed — safe, because `Transfer` stores its own amount |
| **The applied threshold** | **Stored.** The person was told *"no password will be asked"*, which is a promise about a rule. Computed from current config, last year's transfer appears to have broken a rule that did not exist then |
| The recipient name on the card | Stored — it was shown to someone |

## Phase 4 — Checked against the flow

| Sweep | Result |
|---|---|
| Step 2 `reads` | If `Recipient` is not an entity, this reads **a query over `Transfer`**. The flow says *"fetches the recipient list"*, as though it were a thing |
| Step 5 `reads` | **Mismatch** — one `reads` in the flow, two sources in the model: `Transfer.amount` and `Config.threshold` |
| Step 7 `acts` | Creates a `Transfer` ✓ — **and if `Recipient` is stored, updates its frequency and last amount too. A second write nobody named** |
| `emits` 3 · 4 · 6 · 8 | Reference or copy — decided nowhere |
| Every entity names its creating step | **`Recipient` has no creating step in this flow** — it comes from a previous transfer. So it arrives from outside, and that is an undeclared dependency |

> **6 checks · 4 mismatches.**

---

## What running it changed

The pass produced a false positive against its own rule. Phase 4 said *"an `acts` with nothing to write is not an act"*, which flagged `B1` — the step that hands off to the full transfer flow and writes nothing. But `flow-map` marks `acts` for changing state, spending money **or telling something else**, and a hand-off is the third. A skill two days old carried a rule that contradicted a skill written before it, and the contradiction surfaced on the first real run rather than in review. The sweep now asks for what a step writes **or what it tells**.
