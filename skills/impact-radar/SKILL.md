---
name: impact-radar
description: Map what a change to something that already exists will break — the screens, contracts, stored data, reports, jobs, integrations, support scripts and old clients that depend on it, directly and indirectly. Separates loud breakage, which someone fixes in a day, from silent breakage, which surfaces at quarter end, and says for each who finds out and how long it takes. Ends with the regression surface — what to test that is not the thing you changed. Use when the user says "if I change this what breaks", "what depends on this", "blast radius", "is it safe to change", "what will this affect", or is about to modify an existing field, endpoint, rule, screen, or event. Do not use for the production failure modes of new work (risk-interrogate), to audit a flow (flow-grill), or to measure a document (readiness-score).
---

# Impact Radar

Changing something new is cheap. Changing something that already works is where the cost is, and almost all of it sits in dependents nobody listed.

You list them. Then you say which failures announce themselves and which do not.

**Load in one pass, before Phase 0:** `references/dimensions.md`. **References together; documents one at a time.** Opening five references separately costs a round trip each and every round trip re-sends everything read so far. Chain documents are the opposite case: they run past four hundred lines, a batched read of several of them overflows a single read and comes back as more turns than it saved, and each one opens with a carrier that tells you which part you need. Read the carrier, then the part.

## The distinction the whole skill turns on

**Loud breakage throws.** Someone sees an error, files a ticket, and it is fixed in a day. It is the cheap kind.

**Silent breakage keeps working and is wrong.** A report groups differently. A funnel counts a step it used to skip. An export gains a column nobody reads until an auditor does. Nothing errors, nobody is paged, and it is found at quarter end by someone who then has to explain three months of numbers.

Rank by **how it fails**, never by how central it looks. A silent dependency in a finance report outranks a loud one in a screen, every time.

## Where the damage actually is

Nobody forgets the screen showing the field. Everybody forgets the monthly report that groups by it.

**Direct dependents are found by looking. Indirect ones are found by asking**, and they are where the incidents come from — the thing that reads something derived from the thing you changed, two systems away, owned by a team that was not in the meeting.

## The self-review guard

**If the material you are working from was produced in this conversation, say so before your first dependency, and say the pass is compromised.** This pass is usually run on a request from outside, and then none of this applies. When the change was described in this conversation, the dependencies you thought about while describing it are the ones you will list, and the rest is what the radius is for.

Where a subagent is available, hand this pass to one whose entire input is the **file paths** and these instructions — paths, never pasted content. That is what the guard asks for; saying it and carrying on is the fallback, not the plan.

## Not this skill

| The user wants… | Use instead |
|---|---|
| Failure modes of something that does not exist yet | `risk-interrogate` — the test is whether the **dependent** already exists, not whether the work is new. Almost everything is new work inserted into something old, and "new work" sorts none of it |
| A flow audited for gaps | `flow-grill` |
| A document measured for completeness | `readiness-score` |
| To know whether the change is worth making | `idea-grill` |

## Phase 0 — Pin the change

Before tracing anything, state precisely **what changes and what does not**. A radius drawn around a vague change is vague everywhere.

> Not: "we're changing the transfer limit."
> This: "the per-transaction passwordless limit becomes remotely configurable. The value does not change today. Nothing about the daily total changes, because there isn't one."

**Report the class split as a number** — how many Loud, Silent, Deferred — and say what shape the artefact takes: one table, columns you name, rows numbered so later phases can point at them. Two runs of this skill on the same change should be comparable, and without a stated shape they are two incomparable documents. The split is the skill's whole thesis; *"thirty-three of forty-three show nothing on release day"* is the line the reader carries away, and nothing above asks for it.

Then say what access you have. **Without the codebase you produce the questions, not the answers** — a list of what to check and who checks it. Say which you are producing; a list of guesses presented as a map is worse than no map.

## Phase 1 — Trace the ten dimensions

Full list with what each catches: [`references/dimensions.md`](references/dimensions.md).

Direct consumers · indirect consumers · published contracts · stored data written under the old rule · work in flight when it lands · reporting and analytics · automation and alerting · human process · other teams' assumptions · clients that will not update.

The last four are where the misses are. A codebase search finds the first three and nothing else — support scripts, a partner's integration, and an app version from last year are not in the repository.

## Phase 2 — Classify each

| | |
|---|---|
| **Loud** | It errors, fails, or visibly stops |
| **Silent** | It keeps working and is now wrong |
| **Deferred** | It breaks later — at month end, on renewal, when a cache expires, when someone finally updates |

**Deferred is the worst of the three** and the one that gets left off: nothing happens on release day, everyone concludes it went well, and the failure arrives detached from its cause.

For each, one line: **who finds out, how, and after how long.** "Nobody, until a customer complains" is a legitimate and alarming answer, and writing it is the point.

## Phase 3 — What stays the same

A short list, and often the most useful thing you produce.

A change everyone believes is enormous, bounded in writing — *"nothing about the daily total, nothing about web, nothing about existing scheduled transfers"* — is what lets a release happen. Half the cost of a change is the review of everything people feared it touched.

Only list boundaries you actually checked. An unchecked reassurance is worse than silence.

**Without the codebase you cannot check any of them, and the section is still worth writing** — as boundaries somebody must confirm, each with the person who confirms it, under a heading saying how many you were able to check. Zero is a legitimate answer and writing it is the point. What is forbidden is a row from this table being quoted downstream as reassurance; say so on the table.

## Phase 4 — The regression surface

What to test **that is not the thing you changed.** The thing you changed will be tested; nobody plans that.

Draw it from the Silent and Deferred rows first — those are precisely what a test plan built around the change will miss, because the change works.

**Say where it goes.** A regression surface handed over on its own is read once and lost; `build-context` carries it into the handoff as *what must still be true afterwards*, which is the only place in the chain that keeps it. If no pack is being assembled, say plainly that this list has to reach whoever writes the tests, by name.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents.
- **Say when you are guessing, with the marker.** Without access, every dependency is a question with an owner: `[UNVERIFIED]`, and the owner named beside it. Never soften one into a finding. Without the token a reader scanning the table cannot tell a traced dependency from a guessed one, and the whole radius reads as a map.
- **Do not design the migration.** Naming what breaks is yours; deciding how to sequence, flag, or backfill belongs to whoever owns the systems.
- **Do not reopen the decision.** If the change looks unwise, one sentence at the end, once. `idea-grill` is where that argument belongs.
- **Output to chat**, then offer to save. Never write files unprompted.
