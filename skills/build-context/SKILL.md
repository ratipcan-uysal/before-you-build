---
name: build-context
description: Assemble everything the chain decided into one pack whose reader is whoever writes the code, human or model, and lead it with what is still open so nothing gets invented quietly. Reads across the chain's outputs rather than one document, names every place two of them disagree, and separates what was decided from what was assumed from what nobody has settled. Ends with a verdict — BUILDABLE, ASK FIRST or NOT BUILDABLE — and with what the pack cannot control, because a generator handed decisions and no copy, no awkward example data and no design system invents all three and returns something that reads as finished. Use when the user says "put it all together", "write the handoff", "give this to the team", "make the spec", "I'm ready to build", "set up the context for Claude to build this", or has run the chain and is holding several documents. Do not use to write any one of those documents, to design the architecture or choose the stack, or to estimate anything — and never to fill a gap so that the pack looks complete.
---

# Build Context

The chain produces documents. Nobody builds from documents plural.

You assemble one pack, and you put **what is still open at the top of it** — because the reader who will otherwise fill those gaps does it silently, in seconds, and hands back something that reads as finished.

## Who is reading this

Both readers matter and they fail differently.

**A team** asks when something is missing. The cost of a gap is a delay and a Slack thread.

**A model** does not ask. It fills the gap with the most plausible thing, commits to it, stays consistent with it for the rest of the session, and decides differently in the next one. The cost of a gap is a decision nobody made, embedded, unlabelled.

Write for the second. The first is not harmed by it.

## Not this skill

| The user wants… | Use instead |
|---|---|
| Any single document in the chain written | The skill that owns it |
| The architecture, the stack, the file layout | Whoever builds it. Say so and stop |
| How long it takes | Not in this set |
| A gap filled so the pack looks finished | Nothing. That is the failure this skill exists against |

**You are the only skill that reads more than one document.** That is where the boundary is, and it is also where the work is: the chain drifts, and nothing until now has looked across it.

## Phase 0 — Take stock, out loud

Say what you have and what is missing. A pack assembled from four of nine documents is legitimate; one that does not say so is not.

Missing pieces are not errors. **A missing `slice` means the pack covers scope that will not ship. A missing `data-model` means the schema gets invented.** Name the consequence, not the absence, and offer the skill.

## Phase 1 — Check the documents against each other

Nothing before you has done this, and the chain demonstrably drifts — a design has violated its own brief, a diagram has contradicted its own text. Full matrix with what each pair catches: [`references/crosscheck.md`](references/crosscheck.md).

| Pair | Looking for |
|---|---|
| Brief ↔ flow | A screen with no step, a step with no screen |
| Flow ↔ design states | An error path nothing renders |
| Data model ↔ contract | A field returned that no entity holds |
| Slice ↔ everything downstream | Work described for something already cut |
| Brief ↔ data model | A distinction the design leans on that no identity rule supports |
| Every open list ↔ every other | The same question, two owners, two answers |
| Every marker ↔ every later document | An `[ASSUMED]` dropped in transcription and now read as fact |

**Do not only check neighbours.** The pairs above are adjacent in the chain and they are the easy half. The expensive disagreements run between documents three or four steps apart — an assumption marked in the request and treated as settled in the contract, a prohibition in the brief that the model contradicts. Read the earliest document last, against everything.

**A disagreement is a finding, not something to reconcile.** Put both statements in front of the user and make them choose. Picking the more recent one is how a decision gets made by filing order.

## Phase 2 — Assemble, open items first

Six sections, in this order, and the order is the design. Worked wording: [`references/pack.md`](references/pack.md).

1. **Ask before you start.** Every `[DECISION NEEDED]` that cannot be deferred, each with its owner and the one sentence that would settle it. Explicitly: *these are to be asked, never filled.*
2. **The job.** One paragraph — who finishes what, end to end. From `slice`'s spine if there is one.
3. **Decided.** Facts, unhedged, in the words the chain used. Anything carrying `[ASSUMED]` keeps the marker.
4. **Must not.** Prohibitions from the brief's non-goals, the slice's permanent cuts, the contract's anti-requirements. **The section a generator actually obeys**, and the shortest one to write.
5. **Decided now, built later.** `slice`'s second list — the identity rules, the stored-versus-computed calls, the permission model. These go in the build even though the feature they belong to does not.
6. **Done means.** How anyone can tell it works: the signal, and the error paths that must be reachable. Drawn from the flow, not invented here.

## Phase 3 — The verdict

One line, named, at the very top:

| | |
|---|---|
| **`BUILDABLE`** | Nothing undeferrable is open **and no disagreement is unresolved.** Assumptions may remain, marked |
| **`ASK FIRST`** | *n* questions and *m* disagreements must be settled before the first line of code. Both are listed above everything else |
| **`NOT BUILDABLE`** | The chain has not produced enough. Say which skill closes the gap |

**Count both, and let either one hold the verdict.** A pack with nothing open and nine places where two documents disagree is not buildable — whoever builds picks a side per contradiction, silently, and no two picks have to agree with each other. Counting only open questions is how a pack full of contradictions reads as finished, which is the failure this skill exists against, committed by this skill.

Never soften the verdict because the user is in a hurry. `ASK FIRST` with four questions is a ten-minute conversation; the same four invented is a rewrite.

## Phase 4 — Offer it as project files

Ask once: *"Want this as files in the repo rather than a document?"*

On yes: the standing constraints — the prohibitions, the undeferrable decisions, the vocabulary — go where a coding agent reads project context on every session, and the rest goes beside it as the pack. This matters more than it sounds: **a pack that lives in a chat is re-read never**, and the decisions it holds are re-made every session by whoever is generating.

Never write files unasked, and never write code.

## Phase 5 — What this pack cannot control

Always the last section, always written.

Decisions are necessary and nowhere near sufficient. Without **real copy**, **deliberately awkward example data**, **the design system**, and **the actual stack constraints**, a generator invents all four and returns something that looks finished. Say which of the four you have and which you do not, and say that supplying the missing ones changes the output more than any further decision would.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[DECISION NEEDED]`, `[DRAFT]`, `BUILDABLE`, `ASK FIRST`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **Never fill a gap.** Not with a sensible default, not with the obvious answer, not to make the pack read better. Every gap you close silently is the exact failure the pack exists to prevent, committed by the document meant to prevent it.
- **Never re-decide.** If a chain document made a call you disagree with, carry it and say once, in one sentence, that you disagree. Reopening decisions here means the pack disagrees with its own sources.
- **Quote, do not paraphrase**, wherever a decision is load-bearing. A paraphrase is a small rewrite, and small rewrites are how a prohibition loses its edge.
- **Output to chat**, then offer to save. Never write files unprompted.
