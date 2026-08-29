---
name: data-model
description: Decide what the system must remember, before anyone writes a schema — the entities, what makes two records the same thing, who owns them, what creates and ends them, which relationships carry a rule, and what is stored rather than computed. Takes its nouns from a mapped flow rather than from brainstorming, and checks itself back against that flow step by step — every step that reads must have something to read, every step that acts must have something it writes. Product decisions only, no physical schema. Use when the user says "what are the entities", "what do we need to store", "design the data model", "what does the database need to hold", "what tables do we need", or is about to hand a build to a generator that will otherwise invent the schema and encode the wrong product decisions in it. Do not use to decide what the system must provide (api-needs), to map what happens in what order (flow-map), to write the request itself (request-shaper), or to choose types, indexes, engines or migrations — those belong to whoever builds it.
---

# Data Model

Ask a generator to build and it will produce a schema that works. Working is not the test.

A schema is a stack of product decisions wearing storage clothes. Copy the recipient's name onto the transfer and history holds: a receipt from March still says what it said in March. Reference the recipient instead and history is rewritten — rename them today and every past receipt changes with them. Both schemas work. Both survive review. Only one matches what the business means, and nothing in the code records which was chosen.

You make those decisions before anyone writes the schema, so that the person or the model who writes it is implementing a decision rather than making one by accident.

## Decisions that look like storage

| Looks like a storage question | Is a product decision |
|---|---|
| One table or two | Whether these are the same kind of thing |
| Field or reference | Whether history survives a rename |
| Nullable or required | Whether the thing can exist before this is known |
| Soft delete or hard | Whether *gone* means gone, and to whom |
| Computed or stored | Whether the past keeps its own answer |
| One-to-many or many-to-many | Almost always a rule nobody wrote down |

The test: if the answer is the same for every product, it is storage and not yours. If it changes what the product means, it is yours and nobody else will make it deliberately.

## Not this skill

| The user wants… | Use instead |
|---|---|
| What the system must provide — calls, freshness, atomicity | `api-needs` |
| What happens, in what order | `flow-map` |
| The request itself written up | `request-shaper` |
| Types, indexes, engines, migrations, table names | Whoever builds it. Say so and stop |

`api-needs` names the verbs; you name the nouns, and you go first. A contract over undefined nouns is a contract over guesses, and every endpoint inherits the guess.

## Phase 0 — Take the nouns from the flow

Do not brainstorm entities. **Read the flow and take what it touches.** Every step marked `reads` needs something to read; every step marked `acts` writes something. Those are the candidates, and they arrive with evidence attached.

A noun one step touches is usually a field. A noun several steps touch, that outlives the flow, is an entity.

If there is no flow, say what you are doing instead — pulling nouns out of prose, which is guessing with better manners — and offer `flow-map` first. Then carry on if the user wants it anyway; a marked guess beats a delay.

## Phase 1 — Five questions per entity

Not a field list. Field lists are the part a generator does well without help.

1. **What makes two records the same thing?** *"Same name and same account number is the same recipient"* is a decision, and so is the opposite. Skipping it is how duplicates arrive.
2. **Who does it belong to, and what happens when they leave?** Deletion, export and retention are one question asked three ways. The answer is usually a policy someone else owns — name them.
3. **What creates it, what changes it, what ends it?** Each is a step in some flow. If you cannot name the step, either the flow is incomplete or the entity is not real.
4. **When something it copied changes, does this change too?** The rename question. Answer it per field, not per entity — a transfer may want the recipient's name frozen and their account live.
5. **What must be true for it to exist at all?** Stated as a rule a person can argue with, not as `NOT NULL`.

`[DECISION NEEDED]` for what you cannot settle, with an owner. `[ASSUMED]` for what you inferred. An unmarked inference here becomes a migration later.

**A field the slice's scope list does not contain is an addition, however well it follows from the flow.** Mark it as one and name who approves it. Storage decisions are where scope grows most quietly: the field is small, the reasoning is sound, and it arrives already justified by a decision somebody else made. On a measured run a stored value was added here to satisfy a promise the slice had made, and the contract downstream then returned it to a screen that had never asked for it.

Worked answers, and the traps each question catches: [`references/entities.md`](references/entities.md).

## Phase 2 — Relationships that carry a rule

Most relationships are plumbing and get one line. Write up only the ones that constrain something:

- **A cardinality that reaches the screen.** *"One customer, many accounts"* means every surface showing money must say which account, and the flow needs a step where that is chosen. If the flow has no such step, you have found a gap in the flow, not in the model.
- **A relationship that can break.** What happens to the transfer when the account closes. What the list shows when the recipient is gone.
- **A relationship that is really a state.** *"A customer has many sessions"* is usually one current session and a log of old ones, and modelling it as a plain collection loses the word *current*.

Say what each rule **forbids**, not only what it allows. A permission with no prohibition constrains nothing.

## Phase 3 — Stored or computed

Cheap rule first: anything derivable from other data is computed unless there is a reason.

Then the trap that outranks it: **computed today, wrong tomorrow.** A figure derived from live data answers today's question about the past. A receipt showing a fee computed from the current rate makes last year's receipt a lie, and nobody notices until an auditor does.

So: **anything a person was shown, and might be shown again, is stored** — the amount, the rate, the name as it read at the time, the rule that applied. Everything else may be computed.

## Phase 4 — Check it against the flow

The model is a derived view of the flow, so it is checked against its source item by item. Reading it over and agreeing with yourself is not a check.

| Sweep | A mismatch means |
|---|---|
| Every `reads` step names the entity and field it reads | A step reading something no entity holds — one of the two is wrong |
| Every `acts` step names what it writes, **or names what it tells** | `flow-map` marks `acts` for changing state, spending money *or* telling something else. A hand-off writes nothing here and is still an act — the mismatch to chase is an `acts` that neither writes nor tells |
| Every `emits` step says whether the event carries a reference or a copy | The rename question again; analytics is where it gets answered by accident |
| Every entity names the step that creates it | An entity nothing creates is imported from elsewhere, and that is an undeclared dependency |

Report the counts the way `flow-map` reports coverage. Unmatched rows are findings, not tidying.

## Phase 5 — Offer the diagram

At four or more entities, ask once whether they want one. Conventions, and the same check applied to the drawing: [`references/diagram.md`](references/diagram.md).

A diagram drawn from the table and never checked back against it drops exactly the rules Phase 2 exists to record — cardinality survives the redraw, the prohibition attached to it does not.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **No physical schema.** No types, lengths, indexes, engines, migrations or table names. A generator picks those better than you can, from a stack you have not been told about, and putting them in a product document is how the document gets dismissed whole.
- **Never invent an entity to make the model tidy.** A join table nobody's flow touches is a guess about implementation. If the relationship needs one, whoever builds it will know.
- **An entity nobody can name is not an entity.** If the material calls it three things, that is a finding — put the three names in front of the user and make them choose one.
- **Output to chat**, then offer to save. Never write files unprompted.
