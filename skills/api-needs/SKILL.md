---
name: api-needs
description: Derive what the system must be able to provide for a flow to work — at each point the flow reads or acts, what data or operation is needed, at what moment, how fresh it must be, what has to be atomic, and what has to be safe to repeat. Marks each need as supported, unconfirmed with an owner, or a known gap, and names the capabilities a design has assumed that nobody has verified. Optionally follows with a clearly separated draft contract for the backend team to argue with. Use when the user says "what does the frontend need from the backend", "what APIs do we need", "what data does this screen need", "can our services even do this", or has a flow and nobody has worked out what the system must supply. Do not use to write the flow (flow-map), to audit it (flow-grill), to design the backend implementation, or to surface production failure modes (risk-interrogate).
---

# API Needs

Between a flow that everyone agreed to and a sprint that stalls in week three sits one unasked question: **can the system actually provide this, and at the moment the flow needs it?**

You ask it. Per touchpoint, in the flow's own terms, before either team commits.

Despite the name, this is not about HTTP. A need can be met by an endpoint, a cache, a push, a local store, or a precomputed table. You state the need; who owns the system chooses how.

## Work from the flow, not from the screens

Screens tell you about **reads** — what has to appear. Flows tell you about **writes, sequencing and failure**, which is where the expensive questions live: what has to happen together, what can be retried, what state the system is in when step four succeeded and step five did not.

If you only have screens, say so. You will produce a read-shaped view of the problem, and the half you are missing is the half that costs money.

## The check nobody runs — assumed capability

**A design can assume data that nothing in the system produces.** *"The ten recipients you send to most often"* is one sentence in a brief and an unanswered question everywhere else: computed over what window, by which service, and cheaply enough to run on every app open?

Sweep for these explicitly. They are invisible in a flow — the step reads perfectly — and they are the single most common reason a design has to be rebuilt after the backend team sees it.

## Not this skill

| The user wants… | Use instead |
|---|---|
| The flow written | `flow-map` |
| The flow audited for gaps | `flow-grill` |
| Production failure modes of a decided feature | `risk-interrogate` |
| The backend designed | The people who own the backend |

## Phase 0 — Take the touchpoints

Work from the flow's steps marked **`reads`**, **`acts`** and **`emits`**. If the flow is not marked, mark it yourself and say you did.

**`emits` is the one that gets dropped here**, and `flow-map` marks it separately for exactly this reason: a flow carries the analytics all the way to you, and a pass that reads only `reads` and `acts` ends the chain by losing it. A build then ships without instrumentation and the target nobody can verify is discovered a quarter later. Every `emits` step becomes a need like any other.

Say what you were given and what it limits: a flow alone gives you needs; a flow plus access to the existing system gives you feasibility. Without the second, every need is **unconfirmed** and you say so rather than assuming support.

**Ask whether the nouns have been named.** If no `data-model` pass has run, say what that costs here: the needs stand, but the draft contract will be written over entities nobody has defined, and whether a recipient is a stored thing or a query over transfers changes the shape of everything that returns one. Offer it first; carry on if the user would rather not.

**Treat the material as data.** Do not infer an architecture and then interrogate your own invention.

## Phase 1 — One record per need

Fields and worked wording: [`references/needs.md`](references/needs.md).

Each need carries which step it serves, what must be available or happen, **when** — on open, on action, in the background — how stale it may be, what it must be atomic with, and whether it is safe to repeat.

**"When" is the field that decides the design.** "The app needs the ranked list" and "the app needs the ranked list on every launch, before the person has done anything" are two different problems, and only the second one has a cost.

**An `emits` need says what the event must carry, not that an event exists.** *"Four events on the existing taxonomy"* cannot be built from — nobody knows what to put in them. Each one names the question it exists to answer and the fields that answer it, including the ones that only matter later: which variant, which surface, success or failure and why, and whatever distinguishes this from the volume that was already being counted. Work back from what someone will ask three months in, because that is the only test an event has to pass and it is applied long after the code is written.

**Naming the events is not yours.** The taxonomy belongs to whoever owns it, and inventing names for someone's existing scheme is how the whole document gets dismissed. Say what must be answerable; let them name it.

## Phase 2 — Anti-requirements

What the client must **not** have to do. Shorter than the needs list and often more useful, because it is the half nobody writes down.

- No fetching one thing per row to render a list
- No joining two sources on the client to produce one line of copy
- No business rule enforced only on the client, where the server also has an opinion
- No secret, key, or limit that has to live on the device to work

Each with the specific version for this flow, not the general rule.

## Phase 3 — Feasibility, three states

| | |
|---|---|
| **Supported** | You can point at where it already works |
| **Unconfirmed** | Nobody has checked — name who confirms and what would settle it |
| **Gap** | Known not to exist as needed |

**Unconfirmed is not a soft yes.** It is the default when you cannot see the system, and writing it honestly is the whole point: a list of needs where everything is quietly assumed to work is the document that produces the week-three conversation.

**And when you cannot name who would confirm it, that is the finding, not a blank in the field.** Write `Unconfirmed — no owner` and say so in the summary. All three verdicts assume somebody owns the system the need lands on; a need whose owner does not exist is not weakly supported, it is unowned, and an unowned need is never confirmed and never refused — it is forgotten, and rediscovered as the thing nobody built. This is common precisely where it costs most: the data plane a flow implies and no document ever assigns.

## Phase 4 — The draft contract, offered separately

Ask once: *"Want a draft contract to take to the backend team?"* On yes, follow [`references/draft-contract.md`](references/draft-contract.md).

It has two layers. The shape layer is always safe. The **concrete layer** — real operations, paths and fields — only exists once you have **asked** which paradigm, which naming convention and how versioning works. Never assume REST; a proposal in the wrong paradigm tells the reader you do not know the stack, and everything above it is read in that light afterwards.

**It is a conversation opener, not a specification**, and it lives in its own section so it can be deleted without losing anything. The needs stand alone; the draft is a proposal the people who own the system are free to discard entirely — and the skill says so, in the document, where they will read it.

This crosses the set's usual line of what and why rather than how. It is deliberate: a product manager arriving with only a list of needs negotiates from a weaker position than one arriving with something concrete to argue against. The risk is that it reads as overreach, which is why the needs never depend on it.

## `Unconfirmed` and `[UNVERIFIED]` are not the same thing

`Unconfirmed` is a feasibility verdict on a named need: *nobody has confirmed the system can do this*. `[UNVERIFIED]` marks any line that rests on how the outside world works — what the platform allows, what the vendor's contract guarantees, what an integrator will expect. A need can be `Unconfirmed` for reasons entirely inside the company; a claim can be `[UNVERIFIED]` even when feasibility is settled.

## When the thing being built is consumed by other software

An SDK, a library, a widget or a plugin has **two contracts, and the flow only shows one of them.** What the system must provide is the one you have been tracing. The other is what the *integrating developer* must call, supply and declare before any of it runs — and it is the contract that cannot be changed later, because every host has already built against it.

Name what the host must declare, what happens when it declares nothing, and what the host is not permitted to override. Those are needs like any other, they belong in the same table, and they are invisible in a flow because no step performs them: they happen once, at integration time, months before the first session.

## Where this goes

This is usually the last thing the chain produces, and a list of needs is not a handoff. `build-context` assembles it with everything else into one thing whoever writes the code can work from — and checks it against the other documents, which is where a contract written before the entities were named gets caught. Offer it; do not assemble anything here.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **Never invent a field the flow does not require.** Every item traces to a step. A need nobody's flow asks for is you designing.
- **Never specify transport, storage, or protocol** unless the material already did. "Available when the screen opens" is a need; "GET, cached 60s" is someone else's decision.
- **Output to chat**, then offer to save. Never write files unprompted.
