# Worked example — `risk-interrogate`

Run against [the shaped Quick Send request](request-shaper-interview.md), after it had been scored.

## What was assessed

The shaped request, seven sections. Classified `transaction` · `multi-surface`. **Not available:** the API contract, any screens, the existing fraud rules, or the real behaviour of the transfer service.

## What was struck before anything was written

The document already carries its own open list. Audit retention, minimum app version, support tooling, the ranking window, the reversal path — all named there.

Those are **completeness gaps**, and `readiness-score` already scored them zero. Repeating them here would have buried the questions that a completeness check structurally cannot find. Six of sixteen draft questions went in the bin for this reason.

What survives is traceable to a **decision someone made**, not to a blank someone left.

## Questions by owner

### Backend

| | Question | Prevents |
|---|---|---|
| **Critical** | Is the 10,000 threshold — and the "no passwordless on web" rule — enforced **server-side**, or is it a client difference? If one endpoint serves both surfaces, would it accept a mobile-shaped request originating from web? | A modified client, or a direct API call, bypassing the threshold entirely |
| **Critical** | The counterparty responds at **minute six**, after the five-minute auto-return has already refunded. Does the late confirmation race the reversal? | The same transfer landing twice, and manual reconciliation to unpick it |
| **High** | What is the idempotency key — recipient plus amount plus a time window? If a customer genuinely wants to send 500 twice in a row, does the second get swallowed? | A legitimate transfer silently dropped, and the customer trying a third time |

### Security and Risk

| | Question | Prevents |
|---|---|---|
| **Critical** | The threshold is **remotely adjustable**. Who can change it, is there a second pair of eyes, and what stops 100,000 going live in place of 10,000? | One mistyped value propagating to production in minutes |
| **Critical** | On a stolen unlocked device: per-transaction cap, no daily total, amounts pre-filled, failures invisible. What is the maximum extractable in ten minutes, and does that number sit inside the bank's fraud tolerance? | Discovering the answer from an incident rather than from a model |

### Legal and Compliance

| | Question | Prevents |
|---|---|---|
| **High** | Recipient names are rendered on the **home screen** — visible to anyone glancing at an unlocked phone, and in every screenshot and screen share. Does the existing privacy notice cover displaying one customer's transfer history back to them this way? | A compliance objection arriving after the home screen is designed and built |

### Mobile

| | Question | Prevents |
|---|---|---|
| **High** | The list query runs on **every app open**, not every transfer. If it degrades, what happens to the home screen — does the app still open? | An optional widget taking down the entry point of the whole app |

### Data and Analytics

| | Question | Prevents |
|---|---|---|
| **High** | Does the existing transfer taxonomy distinguish **failed** transfers from successful ones? If not, the +30% target counts failures as wins. | Declaring success from a number that cannot support the claim |

## Answer these five first

Ranked by cost of being wrong against how cheaply it can be settled now — not by severity alone.

1. **Server-side enforcement of the threshold and the surface rule** — one engineer, one afternoon, and it closes four other questions
2. **Change control on the remote threshold** — cheap to answer, most expensive to get wrong
3. **Recipient names on the home screen** — the answer could change the home screen, so it has to be asked before UX starts
4. **The minute-six response** — needs design, so asking late means solving late
5. **Alerting on sub-threshold volume** — inexpensive to build, and the only early warning that exists in production

## What could not be assessed

- **Blast radius** — the material never says which service backs the recipient list, so there is no way to know what else it is shared with.
- **Scale and cost** — no figure for current app opens, so the read load and cost of a query that runs on every session cannot be estimated.
- **Dependency failure, in detail** — no API contract, so no specific question about timeouts, retries or fallback.

This section is not an apology. It turns the gaps into someone's task, and it stops a reader concluding that silence meant safety.

> One sentence on the decision itself, said once: the absence of a daily total is the only risk here that scales. Then dropped — reopening a settled decision is `idea-grill`'s job, not this one's.
