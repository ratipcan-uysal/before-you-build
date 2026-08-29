# Worked example — `request-shaper`

Input: [the raw Quick Send request](quick-send-request.md). Abridged; the shape of each move is intact.

---

## Phase 0 — what the input already answers

> Classified as `transaction` · `mobile-app`. 56 items in scope.
>
> Already answered, so I will not ask again: out of scope is stated and quotable, the entry point, the main path in rough form, the surface, and the infrastructure claim.
>
> **19 items have nothing at all.** Starting with the blockers, so that if you stop after one round the document is still not automatically NOT READY.

## The first round — blockers, and a contradiction

Choice questions came as options; facts were left open. Two of the four:

> **What is the real problem?** The request says the flow is too long — that is a complaint, not a problem. Today, how many screens does a customer pass through to send money to someone they know, and *where do they drop out*? Do you have funnel data, or is this from the survey comments?

> **This is not a gap, it is a contradiction, which is why I cannot decide it.** Two sentences sit side by side and cannot both be true:
> *"the customer should get a fast experience without being asked for a password"*
> *"Our existing security steps will of course be preserved"*
> Which holds? (a) verification is removed entirely, (b) removed below an amount threshold and unchanged above it, or (c) nothing changes and only recipient selection is faster.

Answers: no funnel data — survey comments and competitor parity. Threshold model, option (b).

## What the interview produced

Fifteen questions over four rounds. Decisions came as options with the trade-off written into each; amounts, volumes and counts were always asked in the open, because offering options for a number records your guess as the user's decision.

Two moments worth naming:

**An answer changed the classification.** Asked which platforms, the answer was "mobile and web". That turned a single-surface request into `multi-surface` and opened eight items — browser matrix, multi-tab, responsive behaviour, parity rules, rollout order. Said so immediately, while the requester was still in the room to push back on the scope they had just doubled.

**Two answers contradicted each other ten minutes apart.** *"No passwordless send on web"* is a rule difference; *"same rules everywhere, only the appearance changes"* forbids one. Neither could be written. Resolved in front of the user: list, ordering and amount logic are shared; verification is surface-specific.

## The output

Seven sections matching the readiness rubric. The parts that carry the most weight:

**Behaviour** — five numbered steps, a branch table (below threshold, above threshold, web, empty state), a failure table (insufficient balance, closed recipient account, counterparty timeout with a five-minute auto-return, duplicate submission blocked as idempotent), and the limits: **10,000 per transaction, no daily cap, remotely adjustable.**

**Risk** — the passwordless surface written up plainly, including the combination the requester chose: per-transaction cap with no daily total, amount pre-filled, failures visible only in account history.

> Said once, then written as asked: on a stolen unlocked device, sub-threshold taps can drain the balance without a password, and the customer will not notice until they look at their statement. The decision is theirs. Arguing it further is `idea-grill`'s job, not this one's.

## Still open — three tiers, not thirty-four rows

Sweeping the whole rubric found 34 items with nothing. Listing 34 table rows would be honest and unread, so they are sorted by **when the reader has to act** — never by rubric category, which is the author's taxonomy rather than the reader's question.

**Blocks starting** ° = never raised in the interview

| Question | Who settles it |
|---|---|
| Which account does the money leave from, and what does a customer with several see? | Product |
| Is authorisation re-verified server-side at submit? ° | Backend |
| How does the customer know a send **succeeded**? ° | Product + UX |
| Does the existing transfer service support an idempotency key? | Backend |
| On-screen copy; loading and error states | UX |

**Blocks go-live**

| Question | Who settles it |
|---|---|
| Is "no daily cap" approved as it stands? | Risk |
| Audit log content and retention ° | Compliance + Backend |
| What support sees, and whether they need a tool ° | Operations |

**Not raised, not blocking**

> **Behaviour** — stale data at submit, calculation order, abandonment and point of no return, device permissions, multi-tab *(5)*
> **Risk** — performance targets, privacy review, data residency, running cost *(4)*
> **Data** — downstream consumers, contract changes, vendor, rule ownership across surfaces *(4)*

**14 answered · 15 partial · 34 not raised**

That last count is the point. A reader who sees only the questions that were asked assumes everything else was covered — and that assumption holds right up until someone tries to build it.

---

Next: [scoring this document](readiness-score-comparison.md).
