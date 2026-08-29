# Worked example — `api-needs`

Input: [the Quick Send flow](flow-map-quick-send.md), nine touchpoints — 3 `reads` · 2 `acts` · 4 `emits`.

**No access to the system.** The request says *"the existing transfer infrastructure will be used"* — that is the requester's expectation, not a confirmation. Until something says otherwise, every need is **Unconfirmed**, and that is not softened: a list where everything is quietly assumed to work is the document that produces the week-three conversation.

---

## Needs

| | Need | When | Freshness | Repeatable | Feasibility |
|---|---|---|---|---|---|
| **N1** | The people this customer sends to most often, ranked — human identity, system identity, **and the amount last sent to each** | **On every app open**, before any interaction | A day stale is fine; a recipient whose account closed yesterday still appearing is not | yes | **Unconfirmed** — transfer service owner |
| **N2** | The passwordless threshold currently in force | At step 5 **and again at step 7** | **Must be current at the moment of send, not at render** | yes | **Unconfirmed** — risk + platform |
| **N3** | The accounts this customer can send from | When the picker opens | — | yes | **Unconfirmed** |
| **N4** | Move an amount from an account to a recipient | Step 7 | Balance checked at the moment of the move | **no** | **Supported** — the existing transfer flow does this |
| **N5** | The same logical send arriving twice is performed once | Step 7 | — | — | **Unconfirmed** — backend |
| **N6** | The passwordless rule enforced where the client cannot change it, surface rule included | Step 7 | — | — | **Unconfirmed** — backend + security |
| **N7** | Four events on the existing taxonomy, with a source parameter and **a success/failure distinction** | 3 · 4 · 6 · 8 | — | yes | **Unconfirmed** — analytics |
| **N8** | Open the full transfer flow **pre-populated** with recipient and amount | B1 | — | yes | **Unconfirmed** — owner of that flow |

**Atomicity, in one place only:** N4 — the debit and the credit are one thing or nothing. No other need requires it; that was checked, not assumed.

## Assumed capabilities

Invisible in the flow — the step reads perfectly. The design takes these for granted and nothing says anything provides them.

1. **"Ranked by how often you send"** — assumes something computes and stores send frequency per customer. The request says nothing does.
2. **"The amount last sent to this person"** — assumes per-recipient history, not just per-account history.
3. **A masked account tail usable as identity** — assumes the recipient record carries a displayable identifier.
4. **The threshold readable server-side** — assumes remote configuration reaches the server, not only the client. **If it does not, N6 is impossible**: the rule cannot be enforced where the client cannot reach it, and the only real protection on passwordless money movement disappears.

The fourth is two decisions colliding — *the threshold is remotely adjustable* and *the rule must be enforced server-side*. Each is reasonable alone; together they create a precondition nobody checked.

## What the client must not have to do

- **A second call** for the last amount when a recipient is tapped — the list must carry it, or one tap becomes two round trips
- **Compute the ranking on the device**, which means holding history there
- **Enforce the threshold client-side only** — N6 is exactly this in the positive
- **Fetch balances to render the region** — the brief's non-goal
- Hold **any secret or limit** that must live on the device to work

## Feasibility

**1 Supported · 7 Unconfirmed · 0 Gap.** Even the Supported one has its idempotency half open.

One meeting closes seven: transfer service owner, backend, analytics. An hour. Order: N1 · N2 with N6 together · N5 · N7 · N8.

---

# Draft contract

> **This section is a starting point for the backend team, not a specification.** It is a guess at a shape, made by someone who does not own this system. Argue with it, replace it, or delete it — the needs above stand without it.

**Conventions were asked for, not assumed:** REST · resource-noun, kebab-case paths · version in the path. What follows follows those three. Where your existing endpoints say otherwise, they win.

No status codes and no error catalogue — failure paths live in the flow, and error semantics are the part a backend team most reasonably owns.

```
[DRAFT] GET /v1/quick-send/recipients
  Serves: N1 · step 2
  Returns:
    recipients[]
      recipientId          identity to the system
      displayName          identity to a human
      maskedAccount        the distinguishing digits
      lastAmount           value, currency
  Open: what "ranked" is computed from, and over what window
  Open: are closed recipients filtered server-side, or does the client meet them
  Note: lastAmount comes with the list — tapping a recipient must not
        require a second call

[DRAFT] GET /v1/transfer-limits?surface=mobile
  Serves: N2 · steps 5 and 7
  Returns:
    passwordlessMax      value, currency
  Open: is this readable server-side, or distributed to clients only —
        the whole of N6 depends on the answer
  Open: is the surface difference resolved here or at send

[DRAFT] GET /v1/accounts?capability=transfer
  Serves: N3 · B3
  Returns:
    accounts[]
      accountId
      displayName
      maskedAccount
  Note: no balance — the brief's non-goal

[DRAFT] POST /v1/transfers
  Serves: N4 · N5 · N6 · step 7
  Asks for:
    sourceAccountId
    recipientId
    amount               value, currency
    surface              mobile or web
    idempotencyKey       something that lets a repeat of this exact
                         request be recognised as the same one
  Returns:
    transferId
    status               completed or pending
  Open: is the outcome returned synchronously or reported later — the
        flow's five-minute return path depends on it
  Open: does the threshold check sit inside this call or in front of it
  Open: does the client generate the idempotency key, or the server demand one
```

**One item that is probably not a service call:**

```
[DRAFT] Handoff to the full transfer flow
  Serves: N8 · B1
  Carries: recipientId, amount
  Note: likely an in-app navigation contract rather than an endpoint.
        Whether that flow can be entered pre-populated was never asked.
```

**Events are a separate contract** — the counterpart is the analytics team, not the backend:

```
[DRAFT] Four events on the existing transfer taxonomy
  quick_send_region_viewed     · step 3
  quick_send_recipient_tapped  · step 4
  quick_send_confirmed         · step 6
  quick_send_completed         · step 8 · distinguishing success from failure
  Shared parameter: source = quick_send
  Open: does the existing taxonomy distinguish failed transfers — if not,
        the +30% target counts failures as wins
```

---

**Handover:** the needs belong to the product side, the contract to the backend side. The fastest version of this conversation is one where both sides know which is which before it starts.
