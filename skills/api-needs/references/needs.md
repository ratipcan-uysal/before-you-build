# The need record

One per touchpoint. Examples come from a one-tap repeat transfer; rewrite them against the flow in front of you.

## Fields

| Field | What it settles |
|---|---|
| **Steps** | Which steps of the flow this serves. A need serving no step is you designing |
| **Need** | What must be available, or what must happen. In the flow's words, not in field names |
| **When** | On open · on action · in the background · before the person arrives |
| **Freshness** | How stale it may be before it is wrong, and what happens if it is |
| **Atomic with** | What must succeed or fail together with it |
| **Repeatable** | Whether running it twice is safe, and what happens if it does |
| **Feasibility** | Supported · Unconfirmed *(who confirms)* · Gap |

## Worked

> **Steps 1** · **Need:** the people this customer sends to most often, ranked · **When:** on every app open, before any interaction · **Freshness:** a day old is fine; a recipient removed yesterday still appearing is not · **Atomic with:** nothing · **Repeatable:** yes · **Feasibility:** **Unconfirmed** — the transfer service owner. Settled by: is "most frequent, ranked" something it can produce, over what window, at launch-traffic volume?

> **Steps 5** · **Need:** move an amount from one account to another · **When:** on action · **Freshness:** the balance check must be at the moment of the move, not at the moment of render · **Atomic with:** the debit and the credit are one thing or nothing · **Repeatable:** **no** — a repeat must be recognised and refused, not performed · **Feasibility:** **Supported** — the existing transfer flow does this.

## Why "when" carries the most weight

"The app needs the ranked list" is not a requirement. "The app needs the ranked list on every launch, before the person has touched anything" is — and it is a different piece of work, with a different cost, and possibly a different answer.

A need with no **when** gets built as an on-demand call and discovered as a launch-path dependency in load testing.

## Freshness, said usefully

Not "real time". Real time is a wish. Say what goes wrong when the data is old:

> A recipient list a day stale is fine. A recipient list showing an account closed last week is a failed transfer and a support call.

That sentence tells the backend team what to optimise and, more often, that they do not need to.

## Atomicity, said usefully

Name the group, not the guarantee. "Transactional" is an implementation choice; "the debit and the credit are one thing or nothing" is the requirement, and it survives whatever the team decides to build.

Where you cannot tell whether two things must be atomic, that is a **question**, not an assumption. Nobody is served by a document that quietly said no.

## Assumed capabilities

A separate short list, because these are invisible in a flow — the step reads perfectly and nothing in the sequence looks wrong.

> **"Ranked by how often you send"** — assumes something computes and stores send frequency per customer. Nothing in the request says anything does.
> **"The amount you last sent to this person"** — assumes per-recipient history is retrievable, not just per-account history.

Each one names what is assumed, and what would confirm it. These are the items most likely to send a design back for rework after the backend team reads it, and finding them is the cheapest hour in the whole exercise.
