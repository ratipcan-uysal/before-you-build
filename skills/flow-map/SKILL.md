---
name: flow-map
description: Turn a shaped request, notes, or a described feature into the flow a team can build from — the happy path as numbered steps, every branch with its condition, every error path with what the user is left holding, and a mark at each point where the system has to do something. Reports coverage as counts, so a flow with twelve happy steps and one error path says so out loud. Use when the user says "map the flow", "what are the steps", "turn this into a user journey", "what happens step by step", "draw the flow for this", or has a request and nobody has written down what actually happens. Do not use to audit a flow that already exists (flow-grill), to decide what the screens should do (design-brief), to enumerate the states of a surface (state-matrix), or to derive what the system must provide (api-needs).
---

# Flow Map

You write down what happens, in order, including the parts nobody wants to write down.

The happy path takes ten minutes and everyone agrees on it. The value is in the other two thirds: where behaviour splits, and what a person is left holding when something fails.

## The rule that decides whether this was worth doing

**Every branch either rejoins the main path or terminates, and you say which.** A branch that trails off is not a flow — it is a sentence someone will resolve alone, in code, at 4pm on a Thursday.

**And no step may be "and then it works".** If a step's outcome is assumed rather than written, it is not a step; it is a wish. Name what the system does and what the person sees.

## Not this skill

| The user wants… | Use instead |
|---|---|
| A flow that exists audited for gaps | `flow-grill` |
| What the screens should do and look like | `design-brief` |
| Every state of one surface swept | `state-matrix` |
| What the system must be able to provide | `api-needs` |

You mark **where** the system has to act. Turning those marks into requirements is `api-needs`, and doing it here produces a flow nobody can read.

## Phase 0 — Establish the boundaries

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

Every error path answers two things: **what the person is left holding**, and **how they get out**. An error path with no exit is the same trap `state-matrix` looks for, found earlier and more cheaply.

## Phase 4 — Mark the system touchpoints

Go back through every step and mark the ones where the system must read, write, call something, or decide. Two marks are enough:

- **reads** — the step needs information it does not already have
- **acts** — the step changes state, spends money, or tells something else

You are marking **where**, never **what**. The moment you write a field name or an endpoint, you have started designing a contract, and that belongs to `api-needs` and to the people who own the system.

## Phase 5 — Offer the diagram

**Four or more branches: offer one.** Below that, text is easier to read and easier to keep.

> "Want a Mermaid diagram of the structure?"

It shows the shape — the spine, the branches with their conditions, and where paths end — not the table again. Node labels are the step number and a few words. A diagram that repeats the flow is a second artefact to maintain, and the one that rots is always the picture.

Mark the endings and the paths whose exit is undecided; a structure where six arrows land in the same undecided box says something a table takes a paragraph to say.

## Phase 6 — Report coverage

Counts, in one line, because they say what a wall of steps cannot:

> 9 happy-path steps · 4 branches · 6 error paths · 11 system touchpoints · 2 endings

A flow with twelve happy steps and one error path is not a flow that went well. Say so plainly when you see it — that ratio is the single most reliable sign the unhappy paths were skipped rather than absent.

Close with what you assumed and what remains open, each with who settles it.

## Operating rules

- **Language:** reply in whatever language the user is writing in.
- **Text is the artefact; a diagram is a view.** The steps are the source of truth; a diagram stops being edited long before text does.
- **Do not decide anything the material left open.** A flow that resolves an undecided rule quietly ships that rule. Mark it and name who decides.
- **Output to chat**, then offer to save. Never write files unprompted.
