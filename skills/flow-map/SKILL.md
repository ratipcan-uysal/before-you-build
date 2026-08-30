---
name: flow-map
description: Turn a shaped request, notes, or a described feature into the flow a team can build from — the happy path as numbered steps, every branch with its condition, every error path with what the user is left holding, and a mark at each point where the system has to do something. Reports coverage as counts, so a flow with twelve happy steps and one error path says so out loud. Use when the user says "map the flow", "what are the steps", "turn this into a user journey", "what happens step by step", "draw the flow for this", or has a request and nobody has written down what actually happens. Do not use to audit a flow that already exists (flow-grill), to decide what the screens should do (design-brief), or to derive what the system must provide (api-needs).
---

# Flow Map

You write down what happens, in order, including the parts nobody wants to write down.

The happy path takes ten minutes and everyone agrees on it. The value is in the other two thirds: where behaviour splits, and what a person is left holding when something fails.

**Load in one pass, before Phase 0:** `references/format.md` and `references/completeness.md`. **References together; documents one at a time.** Opening five references separately costs a round trip each and every round trip re-sends everything read so far. Chain documents are the opposite case: they run past four hundred lines, a batched read of several of them overflows a single read and comes back as more turns than it saved, and each one opens with a carrier that tells you which part you need. Read the carrier, then the part.

## The rule that decides whether this was worth doing

**Every branch either rejoins the main path or terminates, and you say which.** A branch that trails off is not a flow — it is a sentence someone will resolve alone, in code, at 4pm on a Thursday.

**And no step may be "and then it works".** If a step's outcome is assumed rather than written, it is not a step; it is a wish. Name what the system does and what the person sees.

## Not this skill

| The user wants… | Use instead |
|---|---|
| A flow that exists audited for gaps | `flow-grill` |
| What the screens should do and look like | `design-brief` |
| What the system must be able to provide | `api-needs` |

You mark **where** the system has to act. Turning those marks into requirements is `api-needs`, and doing it here produces a flow nobody can read.

## Phase 0 — Establish the boundaries

**What you read, and which part of it.** The scope list of a slice if one exists — that is what bounds the flow. From a shaped request: the behaviour-and-rules section and whatever error table it carries. From a decision record: its error paths and its states, not its hierarchy or its copy. Say what you were given; anything outside those parts is not this skill's material and opening it costs more than it returns.

Before the first step, settle three things and write them at the top. Guessing any of them produces a flow that is subtly about a different feature.

- **Where it starts** — the trigger, and what is already true when it fires.
- **Where it ends** — what counts as done, and there is usually more than one ending. A flow with one ending has not thought about abandonment.
- **Who is in it** — the person, the system, and any third party. A third party that can fail is an actor, not a detail.

If the material does not settle these, ask once, then proceed and mark what you assumed.

## Phase 1 — The happy path

Numbered steps, one action each. Format and conventions: [`references/format.md`](references/format.md).

Each step carries the actor, what happens, and — where the system must do something — a mark. A step that hides two actions inside one sentence hides a failure point too: *"the user confirms and the money is sent"* is two steps, and everything interesting is between them.

## Phase 2 — Branches

For every step, one question: **can this go more than one way?**

Each branch gets a condition ("if the amount is above the threshold"), its own steps, and an ending — rejoins at step N, or terminates here. Conditions are testable: "if the user is new" is a category; "if the account was created less than 30 days ago" is a condition.

## Phase 3 — Error paths

Not an appendix. Numbered alongside the branches, because they are where the work is.

Sweep for them rather than recalling them: [`references/completeness.md`](references/completeness.md) — what fails, what times out, what the user abandons, what arrives twice, what was true when the screen loaded and false when they acted.

Every error path answers two things: **what the person is left holding**, and **how they get out**. An error path with no exit is a trap, and this is the cheapest place to find one.

**Then read the column down and say which of these the person must be able to tell apart.** Two failures that leave someone holding the same thing with the same way out do not need separate treatment, and giving them separate treatment is noise. Two that leave different things, or different exits, **must** be distinguishable — and if the interface shows both as *something went wrong*, one of the exits is unreachable.

This is a product decision and it has no other owner. The codes and statuses underneath belong to whoever builds the system; which failures a person is required to distinguish does not, and a flow that lists nine errors without answering it hands the question to whoever writes the error handler, at the end, alone.

## Phase 4 — Mark the system touchpoints

Go back through every step and mark the ones where the system must read, write, or call something. Three marks, and a step may carry more than one:

- **reads** — the step needs information it does not already have
- **acts** — the step changes state, spends money, or tells something else
- **emits** — the step produces an analytics or business event

**A step that only decides carries none of them** — comparing two values it already holds is not a touchpoint, and stretching a mark to cover it double-counts the read that fetched them. Where such a step is what the whole feature turns on, say so in words; it belongs in the flow, not in the marks.

`emits` earns its own mark rather than folding into `acts` because analytics is the thing that gets left out. A flow with no way to carry it produces an `api-needs` pass that never asks for it, a build that ships without it, and a target nobody can verify three months later.

You are marking **where**, never **what**. The moment you write a field name or an endpoint, you have started designing a contract, and that belongs to `api-needs` and to the people who own the system.

**Count the marks by walking the table, and report marks and steps as separate numbers.** A step can carry two or three, so the two totals differ and mixing them is the most common error in this document — *"nine touchpoints"* over a table holding nineteen marks on ten steps reads as precision and is arithmetic. **Branches and error paths carry marks too, and they are the ones left out of the count** — on a measured run they held six of fourteen. And say what you counted: marks, carriers, or write sites are three different numbers, and the next skill builds its work list from whichever one you published.

**Show the working, not the total.** List each mark type with the step numbers that carry it — `acts 2, 6, 9, 12, 13, 16 = 6` — and the count of marked steps beside the count of marks. A total on its own is a number nobody can check, and this is the line of the document most likely to be wrong: the warning above has not been enough on its own, because a wrong total looks exactly like a right one. Written as step numbers it cannot drift from the table without the table being wrong too, and the next two skills both build their work list from these marks.

**These marks feed two skills, not one.** `api-needs` turns them into what the system must provide; `data-model` turns them into what it must remember, and runs first, because a contract written over nouns nobody has defined is a contract over guesses. Offer both when you hand the flow over — a flow that only ever reaches `api-needs` gets a schema invented for it downstream.

## Phase 5 — Offer the diagram

**Four or more branches: offer one.** Below that, text is easier to read and easier to keep.

> "Want a diagram of the structure?"

It shows the shape — the spine, the branches with their conditions, and where paths end — not the table again. Node labels are the step number and a few words. A diagram that repeats the flow is a second artefact to maintain, and the one that rots is always the picture.

**Mark every node with whether it has been designed.** Drawn · undecided · nothing yet. This works in any tool — a class in Mermaid, a colour on a board, a pen on a whiteboard — and it is what makes the diagram say something the step table cannot: the happy path runs solid left to right and the bottom two rows are entirely dashed. The product that exists and the product still to be built, in one picture, at different weights.

Where a canvas tool is available, the screens themselves can be the nodes. Where one is not, the marking carries the same finding, which is why the marking is the rule and the canvas is a convenience.

**Then check the diagram against the steps, item by item, before handing it over.** A drawing loses what a list holds, and it does so invisibly, because the drawing is internally consistent. Three checks, and each has failed in practice:

- **Every branch and error path in the text appears in the diagram.** Collapsing steps for space is fine; collapsing a step that owns a branch orphans that branch, and the orphan looks like a stray arrow rather than a missing path.
- **Every decision shows all of its exits, each labelled.** A decision with one drawn exit is the same dangling branch this skill forbids in the text, drawn.
- **Every path is attached where it actually occurs.** Hanging four unrelated failures off one decision because they fit there is a lie about when they happen, and it is the kind a reader believes.

## Phase 6 — Report coverage

Counts, in one line, because they say what a wall of steps cannot:

> 9 happy-path steps · 4 branches · 6 error paths · 11 system touchpoints · 2 endings

A flow with twelve happy steps and one error path is not a flow that went well. Say so plainly when you see it — that ratio is the single most reliable sign the unhappy paths were skipped rather than absent.

Close with what you assumed and what remains open, each with who settles it.

## The carrier

The chain carries documents forward and nothing indexes them, so a document read by three skills is opened three times in full. Open yours with a short index — **not a summary.** A summary is a rewrite, and a rewrite is where a prohibition loses its edge; an index is a map to what a later skill will quote, and it sends them to the line rather than through the document.

**Index what your readers take, not what you are proudest of.** Measured: a carrier listing a flow's touchpoint table, error paths and endings let the next skill skip nothing, because what that skill actually needed was the event payloads, and those were scattered through the branch blocks. If a reader still has to open most of the document, the index is indexing the wrong thing. Name the readers and name what each one takes.

**Open with the carrier.** The counts in one line, and where four things are: the touchpoint table, **the payload of every `emits` step** — what each event carries, gathered in one place rather than left scattered through the branch blocks — the error-path table with its endings, and any ending that is conditional on an open decision. `data-model` and `api-needs` build their entire work list from the first two, and the second is the one that decides whether they can skip the prose.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **Text is the artefact; a diagram is a view.** The steps are the source of truth; a diagram stops being edited long before text does.
- **Do not decide anything the material left open.** A flow that resolves an undecided rule quietly ships that rule. Mark it and name who decides.
- **Output to chat**, then offer to save. Never write files unprompted.
