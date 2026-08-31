---
name: slice
description: Cut a defined request down to a first slice worth shipping on its own, and say precisely what falls out and what brings it back. Finds the one job a person must be able to finish end to end, then tests every candidate cut against whether anyone still gets whole value, whether you could tell it worked, and whether the deferred part comes back cheaply or comes back as a migration. Separates cutting the build from cutting the decision — a deferred feature is a smaller build, a deferred decision is one made silently by whoever writes the code. Writes its exclusions as quotable declarations so readiness-score can mark them out of scope with evidence. Use when the user says "what ships first", "cut this down", "what is in v1", "this is too big", "what is the MVP", "help me scope this", or has a request nobody can build in the time available. Do not use to argue whether the thing is worth building at all (idea-grill), to measure whether it is defined enough (readiness-score), to write the request itself (request-shaper), or to estimate how long any of it takes.
---

# Slice

A first version is not the whole thing with the hard parts removed. That is the same product, later, and nobody can use it in the meantime.

A slice is a cut through every layer that leaves one person able to finish one job. Everything else waits, in writing, with a way back.

**Load in one pass, before Phase 0:** `references/undeferrable.md`. **References together; documents one at a time.** Opening five references separately costs a round trip each and every round trip re-sends everything read so far. Chain documents are the opposite case: they run past four hundred lines, a batched read of several of them overflows a single read and comes back as more turns than it saved, and each one opens with a carrier that tells you which part you need. Read the carrier, then the part.

## The one rule

**Cut the build, never the decision.**

A deferred feature is a smaller build. A deferred decision is a decision — made silently, by whoever writes the code, and when that is a model it is made instantly and never mentioned. *"Multiple accounts come later"* is a plan. *"What makes two recipients the same recipient, later"* is not postponing anything: the first line of code answers it, and the answer becomes a migration.

So every cut produces two lists. What is not being **built** yet, and what has already been **decided** and merely gets built later.

## Not this skill

| The user wants… | Use instead |
|---|---|
| To argue whether this is worth building at all | `idea-grill` |
| To know whether the request is defined enough | `readiness-score` |
| The request itself written up | `request-shaper` |
| How long any of it takes | Not in this set. Say so plainly |

You run **after** `readiness-score` and before everything downstream. Slicing an undefined request cuts guesses; designing before slicing produces screens, flows and contracts for things that will not ship.

## Phase 0 — Put everything on the table

**What you read, and which part of it.** The request's body and its open list — the open list is where most candidates live. From a score: the blocker lines and the out-of-scope section, not the arithmetic. From `prior-art`: the named alternative, if it produced one. Nothing else, and say which scoring you read.

One line each, no ordering, no judgement yet. Include what the request **implies** but does not say — the second surface, the empty state, the failure the flow will need. A cut made against a partial list is not a cut, it is an oversight with a confident name on it.

If nothing has scored the material, say the list is probably short and offer `readiness-score` first.

## Phase 1 — Find the spine

**One person, one job, start to finish.** Say it in a sentence with a subject and a verb: *"a customer who has sent money before sends it again to the same person."*

Everything on the spine ships. Everything else is a candidate.

**The test: remove a step and the job cannot be finished.** If the job survives without it, it is not spine — however obviously good, however nearly free.

The common failure is a spine drawn **along** a layer rather than through them. *"The backend first"* completes no job for anyone, produces no signal, and is the version of slicing that feels responsible and teaches nothing.

**And check the mechanism against the job.** Requests specify *how* — an SMS, a code, a screen, a notification — and the how is a choice wearing a requirement's clothes. Hold each one against the job sentence and ask whether the job finishes without it. Cutting a mechanism is often the largest cut available, because a mechanism drags its own failure paths, its own secrets and its own surfaces behind it, and all of them leave together. If the requester decided the mechanism deliberately, say so and leave it; if it arrived as an assumption nobody examined, that is the cut to propose. **Ask `prior-art` for the alternative before you cut one**: it reads how the problem is already solved and hands back a named replacement. Without one you are proposing a subtraction, and a subtraction is argued down in the room by whoever wanted the mechanism; with one you are proposing a choice.

**Then check the headline against the spine.** The thing the request is named after, the part everyone is arguing about, the piece waiting on an approval — hold it up to the job and ask whether the job finishes without it. It often does, and when it does, that single cut is worth more than every other cut combined: it takes the blocking approvals, the risk surface and the hardest dependency with it, and usually leaves the hypothesis still testable. A request whose risky half is not load-bearing is the most common shape there is, and nobody looks, because the risky half is what the request is called.

## Phase 2 — Cut, and test every cut

Four questions per candidate. A cut that fails one is not made yet.

1. **Does anyone still get whole value?** Half a job delivered is nothing delivered. If cutting it leaves someone unable to finish, it was spine and you mislabelled it.
2. **Could you tell whether it worked?** Name the signal *before* the cut — and **check that the signal exists**, rather than that one is nameable. A measure with no current value and no target is not a signal, it is a sentence: *"first-contact resolution will improve"* answers nothing after release, because nothing says what it is now. If `readiness-score` scored the success criterion **0 or 1**, or scored it higher without a current value and a target being named, this test **fails** and the cut is made anyway with that said out loud. Zero alone is the wrong trigger: a metric that is named and has no baseline is the textbook 1, and that is exactly the shape this test exists to catch. **Say which scoring you read**, too — a chain scores more than once, and slicing the second version against the first version's score is a measurement of a document you are not cutting. Passing it on a metric another skill has already called missing is how two skills quietly agree that an unmeasurable slice is measurable.
3. **Does it come back cheaply, or as a migration?** A deferred screen is a screen. A deferred decision about what is stored is a migration — see the rule above.
4. **Who notices it is missing, and how?** *"They see nothing"* is a design decision nobody has made, not a cut.

**Say what each cut buys.** A cut with no named saving is a preference wearing a schedule.

## Phase 3 — What cannot be cut

Things that look like features and are decisions in costume. These go into the slice as decisions even when the feature they belong to is deferred. Full list with what each one costs when deferred: [`references/undeferrable.md`](references/undeferrable.md).

- **Identity rules** — what makes two records the same thing. Decided once, or migrated forever.
- **Stored versus computed**, for anything a person is shown and might be shown again.
- **The auth and permission model**, even when there is exactly one user today.
- **Anything touching money, law or someone else's data** — retention, consent, audit trail. Never deferrable, only undeclared.

## Phase 4 — The cuts that cost more than the build

Slicing advice assumes building is the expensive part. Check it rather than assuming it, because the assumption has been wrong twice in living memory: once when the deferred work needs a compatibility path, and again now that a generator can produce a second surface in an afternoon while re-establishing the context to add it later costs a day.

For each cut, ask what **resuming** it costs: reloading the context, a second design pass, a migration, a version people are already running. When resuming costs more than building, the cut is a false economy and should be named as one rather than quietly reversed later.

## Phase 5 — Write it so the score can read it

`readiness-score` marks an item out of scope only when the document positively says so, and quotes the sentence that says it. **Your exclusions are those sentences.** Write them as declarations, not intentions.

**And sign every one of them.** A declaration you wrote is a proposal in the grammar of a decision — it reads as the organisation speaking, and downstream it becomes a scoring exemption with evidence attached. Each exclusion carries who proposed it (you), who has to approve it, and whether they have. Unapproved is the normal state and saying so costs nothing; leaving it off is how a cut nobody agreed to arrives four documents later as settled scope.

> Not: *"we'll probably do web later"*
> This: *"This slice is mobile only. Web is out of scope for this release."*

A well-cut slice **moves the out-of-scope section from empty to full**, because the open items belonging to the deferred parts leave scope with a quote attached. The total may not move at all: a blocker pins the verdict regardless, and part of any rise is the denominator shrinking rather than evidence appearing. Judge the cut by the exclusions it produced, not by the number.

**But the request does not update itself, and nothing downstream reads your document as the scope.** Both halves of that are structural, and both were measured on a full run.

Backwards: the request's open list still carries the items belonging to the parts you cut, and a reader four documents later counts fourteen blockers where ten actually block. **Say which open items your exclusions retire, by name, and say that `request-shaper`'s second pass is what rewrites the list** — you do not edit someone else's document, and an exclusion nobody transcribes retires nothing.

Forwards: **the *In the slice* list is the scope of record.** Downstream producers read it and add to it — a reference point a screen needs, a field a model needs, a value a contract returns — each addition reasonable on its own, none of them approved by whoever approved the cut. Say the list is the record, so that a later document adding to it has something to declare against. The first producer to read it is `design-brief`, and it reads it as scope rather than as suggestion.

## The output

| Section | What goes in it |
|---|---|
| **In the slice** | The spine, and what survived Phase 2 |
| **Decided now, built later** | Phase 3 — the decision, not the feature |
| **Out of this slice** | Each with its quotable sentence, who approves it, whether they have, and what brings it back |
| **Not doing** | Permanent cuts, said out loud once so nobody re-proposes them monthly |

**Every row of Phase 0's list ends in one of these four**, and the last thing you do is check that. A row that appears on the opening table and nowhere else is not a decision, it is an oversight with a table around it — and downstream nothing will ever quote it out of scope, so it sits in the score at zero forever.

## The carrier

The chain carries documents forward and nothing indexes them, so a document read by three skills is opened three times in full. Open yours with a short index — **not a summary.** A summary is a rewrite, and a rewrite is where a prohibition loses its edge; an index is a map to what a later skill will quote, and it sends them to the line rather than through the document.

**Index what your readers take, not what you are proudest of.** Measured: a carrier listing a flow's touchpoint table, error paths and endings let the next skill skip nothing, because what that skill actually needed was the event payloads, and those were scattered through the branch blocks. If a reader still has to open most of the document, the index is indexing the wrong thing. Name the readers and name what each one takes.

**Open with the carrier.** The spine sentence, the counts in each of the four sections, and where the exclusion sentences are — those are what `readiness-score` quotes and what the next `request-shaper` pass rewrites. Nothing else in this document is read by more than one reader.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents. In a language that inflects, the token keeps its shape and the suffix hangs off it: `READY`'dir, `[ASSUMED]`'lı. What costs a reader is half-translation. `Kritik` in one paragraph and `Critical` in the next is two labels to them and two terms to a grep.
- **One word per thing, chosen once.** The markers are fixed; the rest of the vocabulary is yours. Whatever word you settle on for `touchpoint`, for a carrier, for a blast radius, hold it to the end of the document, and name it in the carrier — a chain that renames the same thing in every document gets read once.
- **A cell is a line, not a paragraph.** Past roughly fifteen words a table stops being scannable and turns into prose with pipes in it. This set's own examples reached 84 words in one cell and 748 characters in one row, which neither a terminal nor a phone renders readably. Keep the claim in the cell and number the rows so anything downstream can point at one. When the reasoning will not fit, write those rows as blocks instead: the identifier and the claim as a heading line, each column as a labelled line under it. Do not cut what you found down to fit a grid.
- **Never cut to a number.** Cutting to fit a date produces a slice with a hole in the middle. Cut to a job, then say what the job will take to finish; if that does not fit the date, that is the finding.
- **Never cut something nobody raised.** Removing what the requester never asked for is not slicing, it is quietly narrowing the request, and it is found in the review. **And never widen one either.** Replacing a mechanism with another — a substitution rather than a subtraction — is the most powerful move here and the four tests do not cover it: none of them asks who the change now reaches who never asked to be reached. Add that question by hand, and say plainly that a substitution needs the requester's assent in a way a cut does not.
- **Say when nothing should be cut.** Some requests are already a slice. Saying so is a real answer, and it is more useful than a ceremonial cut that removes the empty state.
- **Output to chat**, then offer to save. Never write files unprompted.
