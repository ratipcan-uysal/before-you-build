# Rubric

Twenty-five spine items that apply to every piece of work, plus conditional items opened by work type. Each in-scope item scores 0–3. Items marked ⚑ are blockers: a zero forces NOT READY.

## Work types — signals

Take every type that applies; a document can be more than one.

| Type | It is this when the work… | Signals in the text |
|---|---|---|
| `transaction` | changes money or state in a way that is hard to undo | buy, pay, submit, activate, cancel, transfer, confirm, order, book |
| `data-display` | shows information the user reads | list, dashboard, detail, search, results, report, history |
| `input-collection` | gathers data from a person | form, sign-up, onboarding, settings, upload, edit profile |
| `content-config` | changes content or configuration rather than behaviour | copy, banner, campaign, pricing table, feature flag, translation |
| `backend-only` | has no user interface at all | endpoint, job, migration, integration, webhook, batch, sync |

If the document gives no signal for any type, do not guess one. Score the spine alone and say in the output that no work type was determinable — that is itself a finding about the document.

## Spine

### K1 — Problem and scope · weight 20
- **P1 ⚑** The problem being solved, stated as a problem rather than as the solution
- **P2 ⚑** What success looks like, and how anyone would know it was reached
- **P3** What is explicitly *not* in scope
- **P4** Who decided this is worth doing, or who owns the decision

### K2 — Users and trigger · weight 15
- **U1** Who uses this
- **U2** What brings them to it — the entry point, trigger, or moment
- **U3** How it differs by segment, permission, or account state
- **U4** What those users do today instead — the path being replaced

### K3 — Behaviour and rules · weight 25
- **B1** The main path, step by step
- **B2** Branches — where behaviour differs, and on what condition
- **B3 ⚑** Failure paths — what happens when something goes wrong
- **B4** Business rules, limits, and boundary values
- **B5** Who is permitted to do this, and what happens when they are not

### K4 — Data and dependencies · weight 15
- **D1** Where the data comes from
- **D2** Which systems or services are involved
- **D3** What else consumes or depends on whatever changes
- **D4** Whether an existing contract, schema, or interface changes

### K5 — Design and states · weight 15
- **S1** The surfaces involved
- **S2** Empty, loading, and error states
- **S3** The words on screen — labels, messages, error text
- **S4** Accessibility and localisation requirements

### K6 — Risk and non-functional · weight 10
- **R1** What could go wrong after release, and how it would be noticed
- **R2** How to undo it
- **R3** Performance or scale expectations
- **R4** Privacy, security, or regulatory constraints

## Conditional items

Opened only by the detected type. They join the category named beside them and add to that category's available points.

### `transaction`
- **T1** Idempotency — what happens if the action is submitted twice *(K3)*
- **T2** Partial failure — what state the system is left in when it breaks midway *(K3)*
- **T3** Confirmation — how the user knows it actually completed *(K5)*
- **T4** Reversal — the refund, cancel, or rollback path *(K3)*

### `data-display`
- **L1** Sorting, filtering, and pagination behaviour *(K3)*
- **L2** Freshness — how current the data has to be, and what staleness is tolerable *(K4)*
- **L3** What is shown when the set is empty, and when it is far larger than expected *(K5)*

### `input-collection`
- **I1** Validation rules per field, and when they fire *(K3)*
- **I2** What happens to a partially completed entry *(K3)*
- **I3** What is done with the data after submission, and for how long it is kept *(K6)*

### `content-config`
- **C1** Who can change it, and through which interface *(K2)*
- **C2** How a change reaches production, and how quickly *(K4)*
- **C3** What the surface does when the content is missing or malformed *(K5)*

### `backend-only`
- **E1** Contract — request, response, and error shapes *(K4)*
- **E2** Backward compatibility for existing consumers *(K4)*
- **E3** Migration and rollout order *(K4)*
- **E4** Observability — what is logged, measured, or alerted on *(K6)*

## Reading items honestly

- An item is about **presence of a decision**, not about whether you agree with it. A rule you think is wrong still scores 3 if it is written clearly.
- **One sentence can satisfy two items.** That is fine; score both.
- **A heading with nothing under it scores 0.** "Error handling: TBD" is an admission of absence, not a partial answer.
- **A link to another document is not content.** Unless the linked material is in front of you, the item is 0 and you say why.
