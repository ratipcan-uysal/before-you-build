---
name: design-brief
description: Extract the design decisions behind a feature before anyone opens Figma or asks an AI to generate a screen — surface inventory, the single primary job of each surface, information hierarchy, navigation and input models, defaults, system feedback, binding constraints, and explicit non-goals. Implementation-independent — no pixels, no colours, no adjectives. Optionally emits a second output, a constraint block a UI generator will actually obey. Use when the user says "what should the screens do", "what screens do we need", "write the brief for the designer", "turn this into a design spec", "before we open Figma", "make a prompt for v0 or Figma Make", or has a shaped request and nobody has decided how it should be experienced. Do not use to critique a design that already exists (ux-grill), to write the request itself (request-shaper), or to measure completeness (readiness-score).
---

# Design Brief

AI can produce a screen in seconds. It cannot produce the **decisions** that make the screen right, and without them what comes back is plausible and wrong — a layout that answers a question nobody asked.

You produce those decisions. Not pixels, not a palette, not "clean and modern". Which surfaces exist, what each one is *for*, what a person must see first, what they must supply, what is decided for them, and how they know what happened.

## What a decision looks like

A decision names a choice and what it rejects. Everything else is decoration.

| Not a decision | A decision |
|---|---|
| "The interface should be intuitive" | "The list is the entry point; the amount field is not reachable without choosing a recipient first" |
| "Modern, clean design" | "Recipient name outranks amount in the hierarchy — a mis-tap on the wrong person costs more than a mistyped figure" |
| "Good error handling" | "Failures interrupt: the user is told in the flow, not in a notification they may not see" |

If a line could appear in a brief for any other product, delete it.

## This is not an interview

`request-shaper` asks and waits. You **decide from the material** and mark what you cannot decide as `[DECISION NEEDED]`, naming who settles it. A designer with a marked brief can start; a designer waiting for a conversation cannot.

Ask a question only when a decision is both undetermined and load-bearing — the kind that changes the surface inventory rather than one field on it. Two questions is a lot.

**And when the material is a slice, anything you require that its scope list does not contain is an addition.** Say so on the line, and name who approves it. A brief that decides a screen needs something the cut did not include — a comparison figure, a second value, a state that implies new data — has grown the scope of work somebody approved as smaller, and it does it in the most reasonable-sounding way there is: the screen genuinely does not work without it. Measured on a full run, an addition made here was carried into a data model and then into a contract, each step reasonable, and nobody who approved the cut ever saw it. You are not forbidden from adding; you are forbidden from adding silently.

## Not this skill

| The user wants… | Use instead |
|---|---|
| A critique of a design that already exists | `ux-grill` |
| The request itself written up | `request-shaper` |
| A measure of how complete the document is | `readiness-score` |

You name the states the design must **account for**. Checking that each one was actually drawn is `ux-grill`'s job, and doing it here means the producer is checking its own work.

## Phase 0 — Read and classify

Work from whatever exists — a shaped request, a flow, notes, a ticket. Classify as `readiness-score` does: what the work does, and where it runs. Surface matters more here than anywhere else, because a decision that is right on a phone is often wrong in a browser.

If the material does not say what happens in the flow, stop and say so. A design brief written on top of undecided behaviour invents the behaviour, and the invention ships.

**Name the error paths before you decide anything.** List every failure the material describes and, for each, what the person is left holding and how they get out. This is the input that decides the quality of the brief: a measured pass on a real feature put every finding about an error state — the retry that stays enabled, the message ordering an action the screen does not offer, the value hidden by a prohibition the exit needs — in the half of the review that a mapped flow would have answered first, while the identity, placement and contrast findings were untouched by it.

**A request's error table is usually shorter than the flow's.** If the material lists fewer than a handful, say plainly that running `flow-map` first will change what this brief contains, and let the user choose. Do not map the flow yourself — that is a different skill and doing it here means the producer invents the behaviour it then designs for.

**If they choose to carry on without one, the record says so at the top and calls itself partial.** Not a hedge — a scope line: *"written without a mapped flow; the states below are the ones the material named, and a second version will be needed."* A record that is missing most of its error states and does not say so is read as the finished set of decisions, and the states nobody wrote are then the states nobody draws. Measured on a full chain run, the second version's largest section was error states, every one of them traceable to the flow rather than to the request — that section is what the silent version of this document leaves out.

## Phase 1 — Build the record

Ten parts, in this order. Structure and worked wording: [`references/record.md`](references/record.md).

Surfaces · the primary job of each · information hierarchy · navigation model · input model · defaults and decision points · system feedback · binding constraints · non-goals · done criteria.

Two tests do most of the work:

**The primary-job test.** For each surface: *if someone did exactly one thing here and left, what was it?* One verb phrase. If you need two, either it is two surfaces or one job is secondary — say which.

**The hierarchy test.** Rank what appears, 1 to n. If two things are rank 1, neither is. Ranking forces the decision that "prominent" avoids.

## Phase 2 — Mark what you could not decide

Every `[DECISION NEEDED]` carries who settles it and what it blocks. Group them at the end rather than scattering them, so a designer can see in one glance whether they can start.

Do not mark something as needing a decision when the material decides it and you missed it. Re-read first.

## Phase 3 — Draft what a generator would otherwise invent

Marking a gap and stopping is not enough when you could have filled it. Propose — in one block at the end, never as an interview — the things a generator will otherwise fabricate.

**Two markers, and they mean different things.**

| | |
|---|---|
| `[DECISION NEEDED]` | You cannot decide this. It is a product or business call whose consequences you are not positioned to weigh. Someone must answer it. |
| `[DRAFT]` | You have proposed something usable. It needs a nod, not a meeting. |

**Draft the copy.** Every label, button, error, empty state, and confirmation string. Copy is a product decision, not a visual one, so it is yours to propose. Approving twelve strings takes three minutes; writing them from nothing takes a meeting that does not get scheduled. Mark the block `[DRAFT]` and say plainly that unapproved copy which reaches a screenshot becomes approved copy by default.

**Draft the example content.** Three records, and at least one deliberately awkward for this domain — the name that is far too long, the single-word entry, the two entries that look identical. Generators design for the convenient case unless handed the inconvenient one.

**Draft only the states you can derive**, and say so. Naming the moments that need feedback is yours; checking that each one was actually drawn belongs to `ux-grill`, and taking it over means the producer marks its own work.

**Draft the project-wide constraints.** Theme, text scaling, minimum viewport, motion, truncation, number formatting. Each has a defensible default, each applies to every surface, and each is otherwise rediscovered on the fourth screen by a state sweep — late, and answered differently every time.

**Never draft the design system.** Inventing tokens for someone's existing app is exactly what makes a brief easy to dismiss. Say instead what the generator needs and how to supply it: exported tokens, a screenshot of two existing screens, or a component list.

## Phase 4 — The generator block (offer, do not assume)

Ask once: *"Want this as a constraint block for a UI generator?"* On yes, follow [`references/generator.md`](references/generator.md).

It is not the brief reformatted. Generators obey structure, order, and prohibitions; they ignore adjectives and quietly invent around gaps. The block states surfaces, the primary job, ranked element order, required states, and explicit prohibitions — and never contains a style adjective, because "modern and clean" is the instruction that produces the generic result the user is trying to escape.

**Check the block against the record before handing it over**, decision by decision. Every ranked order, every prohibition, every state must trace to something you wrote above; anything in the block that the record does not contain is you designing, and anything the record contains that the block drops is a decision that will be silently reinvented by the generator.

**And it always closes with what it cannot control.** Decisions are necessary and not sufficient: without real copy, awkward example data, the full state set, and access to the design system, a generator invents all four and the result reads as finished. Ten minutes of strings and three deliberately awkward records change the output more than anything else the user can do — and they will skip it unless told.

## Where this goes

The record is one document and nobody builds from documents plural. When the chain has produced others — a flow, a data model, a set of needs — `build-context` assembles them into one pack and checks them against each other, which is where a design that quietly contradicts its own flow gets caught. Offer it; do not assemble anything here.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **No visual specification.** No colours, spacing, type scale, or component names from a library the material never mentioned. You decide *what must be true*; a designer decides how it looks. Crossing that line makes the brief easy to dismiss.
- **Every constraint names its source.** "Accessibility AA" because a policy requires it, or because you assumed it — those are different, and a designer needs to know which.
- **A constraint nobody else imposes goes to `prior-art`.** You cannot tell from inside whether it is an insight or an assumption; that skill reads what comparable things document and asks the owner.
- **A constraint that rests on the outside world is `[UNVERIFIED]`.** What a platform permits, what a regulator requires, what integrators expect, what comparable products do — you have not checked any of it, and a decision built on a half-remembered capability is worse than one built on nothing, because it looks settled. Name the check: the platform documentation, legal, the vendor. This applies hardest to constraints that **deviate** from what is usually done: a deliberate deviation is an insight and an accidental one is an oversight, and only the person who checked can tell you which.
- **Non-goals are load-bearing.** What the design must *not* do is the section that survives contact with a generator and with a stakeholder who wants one more thing on the screen.
- **Output to chat**, then offer to save. Never write files unprompted.
