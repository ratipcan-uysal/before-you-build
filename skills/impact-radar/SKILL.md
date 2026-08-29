---
name: impact-radar
description: Map what a change to something that already exists will break — the screens, contracts, stored data, reports, jobs, integrations, support scripts and old clients that depend on it, directly and indirectly. Separates loud breakage, which someone fixes in a day, from silent breakage, which surfaces at quarter end, and says for each who finds out and how long it takes. Ends with the regression surface — what to test that is not the thing you changed. Use when the user says "if I change this what breaks", "what depends on this", "blast radius", "is it safe to change", "what will this affect", or is about to modify an existing field, endpoint, rule, screen, or event. Do not use for the production failure modes of new work (risk-interrogate), to audit a flow (flow-grill), or to measure a document (readiness-score).
---

# Impact Radar

Changing something new is cheap. Changing something that already works is where the cost is, and almost all of it sits in dependents nobody listed.

You list them. Then you say which failures announce themselves and which do not.

## The distinction the whole skill turns on

**Loud breakage throws.** Someone sees an error, files a ticket, and it is fixed in a day. It is the cheap kind.

**Silent breakage keeps working and is wrong.** A report groups differently. A funnel counts a step it used to skip. An export gains a column nobody reads until an auditor does. Nothing errors, nobody is paged, and it is found at quarter end by someone who then has to explain three months of numbers.

Rank by **how it fails**, never by how central it looks. A silent dependency in a finance report outranks a loud one in a screen, every time.

## Where the damage actually is

Nobody forgets the screen showing the field. Everybody forgets the monthly report that groups by it.

**Direct dependents are found by looking. Indirect ones are found by asking**, and they are where the incidents come from — the thing that reads something derived from the thing you changed, two systems away, owned by a team that was not in the meeting.

## Not this skill

| The user wants… | Use instead |
|---|---|
| Production failure modes of new work | `risk-interrogate` |
| A flow audited for gaps | `flow-grill` |
| A document measured for completeness | `readiness-score` |
| To know whether the change is worth making | `idea-grill` |

## Phase 0 — Pin the change

Before tracing anything, state precisely **what changes and what does not**. A radius drawn around a vague change is vague everywhere.

> Not: "we're changing the transfer limit."
> This: "the per-transaction passwordless limit becomes remotely configurable. The value does not change today. Nothing about the daily total changes, because there isn't one."

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

## Phase 4 — The regression surface

What to test **that is not the thing you changed.** The thing you changed will be tested; nobody plans that.

Draw it from the Silent and Deferred rows first — those are precisely what a test plan built around the change will miss, because the change works.

## Operating rules

- **Language:** reply in whatever language the user is writing in.
- **Say when you are guessing.** Without access, every dependency is a question with an owner. Mark it, never soften it into a finding.
- **Do not design the migration.** Naming what breaks is yours; deciding how to sequence, flag, or backfill belongs to whoever owns the systems.
- **Do not reopen the decision.** If the change looks unwise, one sentence at the end, once. `idea-grill` is where that argument belongs.
- **Output to chat**, then offer to save. Never write files unprompted.
