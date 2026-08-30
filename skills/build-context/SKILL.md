---
name: build-context
description: Assemble everything the chain decided into one pack whose reader is whoever writes the code, human or model, and lead it with what is still open so nothing gets invented quietly. Reads across the chain's outputs rather than one document, names every place two of them disagree, and separates what was decided from what was assumed from what nobody has settled. Ends with a verdict — BUILDABLE, ASK FIRST or NOT BUILDABLE — and with what the pack cannot control, because a generator handed decisions and no copy, no awkward example data and no design system invents all three and returns something that reads as finished. Use when the user says "put it all together", "write the handoff", "give this to the team", "make the spec", "I'm ready to build", "set up the context for Claude to build this", or has run the chain and is holding several documents. Do not use to write any one of those documents, to design the architecture or choose the stack, or to estimate anything — and never to fill a gap so that the pack looks complete.
---

# Build Context

The chain produces documents. Nobody builds from documents plural.

You assemble one pack, and you put **what is still open at the top of it** — because the reader who will otherwise fill those gaps does it silently, in seconds, and hands back something that reads as finished.

**Load in one pass, before Phase 0:** `references/crosscheck.md` and `references/pack.md`, and every document named in the arguments. Opening them one at a time costs a round trip each, and a round trip re-sends everything read so far — on a long pass that is most of what a run spends.

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

## Say it when you assembled the sources

If the documents you are checking were produced in this conversation, **open with that.** A model that wrote a brief, a flow and a contract, and then looks for disagreements between them, finds fewer than a stranger would — it recognises its own reasoning on both sides of every pair and reads agreement into it. This is the same guard `ux-grill` and `flow-grill` carry, and it bites harder here, because you are checking several documents rather than one and the pull is toward every one of them.

**So hand the cross-check to a subagent** whose input is the **paths** of the documents and these instructions, and assemble the pack from what it finds. Paths, never pasted content; report its disagreements as its own and do not reconcile them. Say which documents you wrote and which arrived either way.

Where no subagent is available, do the pass here and say the check is compromised — a compromised check that names its compromise still finds most of what is there.

## Phase 0 — Take stock, out loud

Say what you have and what is missing. A pack assembled from four of nine documents is legitimate; one that does not say so is not. **Read every carrier first, then the bodies you need.** Each chain document opens with an index of its own counts, tables and markers; reading thirteen of those is what tells you which pairs are worth opening in full. You still open the body wherever you quote, and Phase 2b's walk-back still needs the source line beside you — an index is a map, never the evidence.

Missing pieces are not errors. **A missing `slice` means the pack covers scope that will not ship. A missing `data-model` means the schema gets invented.** Name the consequence, not the absence, and offer the skill.

## Phase 1 — Check the documents against each other

Nothing before you has done this, and the chain demonstrably drifts — a design has violated its own brief, a diagram has contradicted its own text. Full matrix with what each pair catches: [`references/crosscheck.md`](references/crosscheck.md).

| Pair | Looking for |
|---|---|
| Brief ↔ flow | A screen with no step, a step with no screen |
| Flow ↔ design states | An error path nothing renders |
| Data model ↔ contract | A field returned that no entity holds |
| Slice ↔ everything, both directions | Work described for something already cut — and, upstream, a target or a promise set for the whole feature and never restated for the smaller one |
| Brief ↔ data model | A distinction the design leans on that no identity rule supports |
| Every open list ↔ every other | The same question, two owners, two answers |
| Every marker ↔ every later document | An `[ASSUMED]` dropped in transcription and now read as fact — **or translated**, which is the same break and harder to see, because the line still looks marked |

**Do not only check neighbours.** The pairs above are adjacent in the chain and they are the easy half. The expensive disagreements run between documents three or four steps apart — an assumption marked in the request and treated as settled in the contract, a prohibition in the brief that the model contradicts. Read the earliest document last, against everything.

**A disagreement is a finding, not something to reconcile.** Put both statements in front of the user and make them choose — and with nobody to choose, quote both and resolve neither. Picking the more recent one is how a decision gets made by filing order.

## Phase 2 — Assemble, open items first

Six sections, in this order, and the order is the design. Worked wording: [`references/pack.md`](references/pack.md).

1. **Ask before you start.** Every `[DECISION NEEDED]` whose answer **the first day of work would otherwise invent**, each with its owner and the one sentence that would settle it. Explicitly: *these are to be asked, never filled.*
   **And every open grill finding belongs here too.** A grill names the decision that closes each finding, in prose, with an owner — and it never writes `[DECISION NEEDED]`, because a finding is a verdict on a document rather than a gap in one. Sourcing this list only from the marker drops all of them. Measured on a run: twenty-seven findings stood against documents still in the pack, and seven of the questions worth asking existed nowhere else.
   **Keep the second tier separate and keep it.** `request-shaper` sorts open items by what they block — starting, or going live — and collapsing that here loses the distinction the requester paid an interview for. **That sorting is usually stale by the time you read it**, because `slice` ran afterwards and retired part of it; re-tier it against the cut rather than carrying the old tiers forward. Something that blocks release and not the first commit belongs further down, under *Done means*, named as blocking release. Six undecided error exits do not stop anyone starting; they stop anyone shipping, and a pack that files them alongside the identity rule gets both ignored.
2. **The job.** One paragraph — who finishes what, end to end. From `slice`'s spine if there is one.
3. **Decided.** Facts, unhedged, in the words the chain used. Anything carrying `[ASSUMED]` keeps the marker.
4. **Must not.** Prohibitions from the brief's non-goals, the slice's permanent cuts, the contract's anti-requirements. **The section a generator actually obeys**, and the shortest one to write.
5. **Decided now, built later.** `slice`'s second list — the identity rules, the stored-versus-computed calls, the permission model. These go in the build even though the feature they belong to does not.
6. **Done means.** How anyone can tell it works: the signal, and the error paths that must be reachable. Drawn from the flow, not invented here.

## Phase 2b — Check the assembly against its sources

The spec is a derived view, so it is checked against its sources item by item. Every other producer in this set does this — `flow-map` checks its diagram, `data-model` checks itself against the flow, `design-brief` checks the generator block against the record. You are assembling more than any of them.

**Walk every prohibition, every default and every marker back to the line it came from.** Not a reread: the source open beside it, one at a time, and a count reported.

| | |
|---|---|
| **Prohibitions** | Same scope as the source. Not broader |
| **Defaults** | Same value, and still marked `[DRAFT]` if the source marked it |
| **Markers** | Present, in English, on the same line they were on |
| **Anything with no source** | You wrote it. It goes to *Ask before you start*, or it goes. **Unless it is a mechanical join** — one carried source applied row by row to another, present in neither, inventing nothing. Say that is what it is, and that the application is yours |
| **Every `[UNVERIFIED]`** | Survives with its marker. One that is load-bearing — a decision rests on it — is also listed under *Ask before you start*, because it is a question, not a fact |

**Assembly drifts toward the stricter reading**, and that is the one to hunt. A prohibition scoped to one surface becomes a prohibition on the whole flow; a `[DRAFT]` default becomes a decided one. Both read as more careful, which is why nothing flags them — and a rule broadened during assembly is a decision reversed, usually the one somebody made deliberately in response to a review.

## Phase 3 — The verdict

One line, named, at the very top:

| | |
|---|---|
| **`BUILDABLE`** | Nothing undeferrable is open, **no disagreement is unresolved, and no `Critical` audit finding stands against a document in this pack.** Assumptions may remain, marked |
| **`ASK FIRST`** | *n* questions, *m* disagreements and *k* open findings must be settled before the first line of code. All three are listed above everything else |
| **`NOT BUILDABLE`** | The chain has not produced enough — including **produced, then failed its own audit, then never revised.** Say which skill closes the gap |

**Count three things, and let any one of them hold the verdict.** The third is open audit findings: a grill ran, found something, and the document it found it in is still the one you are assembling from. On a measured run those outnumbered both the other two — twenty-seven against twenty-nine questions and seventeen disagreements — and five were `Critical`. Counting only questions and disagreements returns `BUILDABLE` on a pack whose own flow has been declared broken, which is this skill's own failure mode reached through the rule written to prevent it. **One standing `Critical` forbids `BUILDABLE`.**

**Say what a count counts.** *n* questions is a number somebody can move by merging rows. Say what one question is here — one owner, one sentence, one decision — and use it consistently, so the figure survives being recounted by the next reader.

A pack with nothing open and nine places where two documents disagree is not buildable — whoever builds picks a side per contradiction, silently, and no two picks have to agree with each other. Counting only open questions is how a pack full of contradictions reads as finished, which is the failure this skill exists against, committed by this skill.

Never soften the verdict because the user is in a hurry. `ASK FIRST` with four questions is a ten-minute conversation; the same four invented is a rewrite.

**A question with an owner who will not answer is a different problem**, and `decision-memo` is the skill for it. Say so on any `ASK FIRST` item that has been open across more than one document — those are not waiting on writing, they are waiting on somebody.

## Phase 4 — Offer it as project files

Ask once: *"Want this as files in the repo rather than a document?"* With nobody to ask, do not write them: files are a side effect nobody asked for.

On yes, **two files, and the second is assembled by subject.**

1. **The standing file** a coding agent loads every session: the job, the ask-don't-guess list, the prohibitions, the decided-now-built-later list, and the vocabulary. A page, not a document.
2. **One spec**, organised by what someone is about to build — never by which skill produced what. Whoever writes the confirmation screen should find its rules, its hierarchy, its states, its copy, its steps, its error exits, what it stores and what feeds it **in one section**, not spread across five documents that each hold a fifth of it.

**Assemble by subject; carry by sentence.** Surface-bound material gathers per surface. The flow, the data model and the system contract are cross-cutting by nature and stay whole. What never happens is a spec shaped like the chain that produced it — that shape serves the process, and nobody building is auditing the process.

**Move sentences; do not rewrite them.** A sentence relocated is not a sentence rewritten, and the difference is checkable: every line in the spec traces to a line in a source document, quoted where it is load-bearing. Your own compression is a rewrite, and a rewrite is where a prohibition loses its edge and a marked assumption turns into a fact.

**Assembling is also a check.** The same rule usually appears in three documents in three shapes, and separate files hide that — a reader meets each version in its own context and agrees with all three. Pulled into one section they either agree or they visibly do not, and the ones that do not are Phase 1 findings you missed.

**Keep the sources beside it, and say what they are for.** The chain's documents go in their own folder as the audit trail the spec's traceability points at — and as the home for the reasoning the spec compresses, which is most of what the grills produced. They are not build instructions and nobody should have to read them to build. A folder that does not say which of the two it is gets read as neither.

**Split only when the spec is genuinely too long to open**, and split by subject as well — never back into one file per skill.

Never write files unasked, and never write code.

## Phase 5 — What this pack cannot control

Always the last section, always written.

Decisions are necessary and nowhere near sufficient. Without **real copy**, **deliberately awkward example data**, **the design system**, and **the actual stack constraints**, a generator invents all four and returns something that looks finished. Open each one before you tick it, and allow a third answer: present but incomplete. Say which of the four you have, which you do not, and which are half — awkward data that covers three variables and misses the one the record calls the real breaking point is not a tick. Supplying the missing ones changes the output more than any further decision would.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `BUILDABLE`, `ASK FIRST`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **Never fill a gap.** Not with a sensible default, not with the obvious answer, not to make the pack read better. Every gap you close silently is the exact failure the pack exists to prevent, committed by the document meant to prevent it.
- **Never re-decide.** If a chain document made a call you disagree with, carry it and say once, in one sentence, that you disagree. Reopening decisions here means the pack disagrees with its own sources.
- **Quote, do not paraphrase**, wherever a decision is load-bearing. A paraphrase is a small rewrite, and small rewrites are how a prohibition loses its edge.
- **Output to chat**, then offer to save. Never write files unprompted.
