# Output template

Six sections matching the `readiness-score` rubric, plus a closing block. Written in the user's language.

## Marking assumptions

Any line you inferred rather than received starts with `[ASSUMED]`:

> `[ASSUMED]` Users reach this from the account menu.

`readiness-score` caps a marked line at 1 of 3. That is the point: an inference is worth something, but never as much as a decision. The marker is what stops a generated draft from scoring like a real one.

Mark the line, not the section. A section with two given facts and one inference has one marked line, not a warning label.

## The document

### 1. Problem and scope
What is going wrong today and for whom, stated as a problem. What success looks like and how it would be known. What is explicitly out of scope. Who owns the decision. **Which platforms and channels are in scope** — never let "the app" stand in for that answer.

Write the problem in a sentence that does not contain the solution. If you cannot, the request is a solution looking for a justification — say so here, in one line, and carry on.

### 2. Users and trigger
Who does this, what brings them to it, how it differs by segment or permission, and what they do today instead.

### 3. Behaviour and rules
The main path as numbered steps. Then branches, each with its condition. Then failure paths, each with what the user sees. Then limits and boundary values. Then permissions.

This section carries the most weight in the score and the most cost in development. If the document is going to be long anywhere, it is here.

### 4. Data and dependencies
Where the data comes from, which systems are involved, what else depends on whatever changes, and whether any existing contract changes shape.

### 5. Design and states
Surfaces involved. Empty, loading, and error states. The words on screen. Accessibility and localisation requirements.

If nobody has designed anything yet, say exactly that — *"No design exists; screens not yet decided."* That is a true statement scoring zero, which is better than a paragraph of plausible-sounding description scoring two.

### 6. Risk and non-functional
What could go wrong after release and how it would be noticed. How to undo it. Performance and scale expectations. Privacy, security, or regulatory constraints.

### 7. Instrumentation and downstream
Which events fire and with what parameters. What is logged or kept as an audit trail, and for how long. Reporting or warehouse work needed. How the team will see it working in production, and what would alert them if it stopped. What support and operations can see.

A feature with a target and no measurement is a feature nobody can defend at the review. If none of this is needed, write that as a decision — *"no reporting required; usage covered by existing transfer dashboards"* — rather than leaving the section empty.

### Still open

Three tiers, ordered by when the reader has to act. Sort by **what it blocks**, never by which rubric category it came from — categories are the author's taxonomy, and the reader is asking one question: what do I have to chase now, and what can wait.

The tiers are about **urgency**, not about whether you asked. An item you never raised can still be the most urgent thing on the page — it belongs in the first tier, marked. Only the residue collapses.

**Blocks starting** — a developer or designer cannot produce the thing without it. Any unresolved blocker item lives here by definition. Mark anything the interview never reached with °.

| Question | Who settles it | Where it came from |
|---|---|---|
| … | … | … |

**Where it came from** carries the origin of any line you did not collect yourself — `prior-art`, `risk-interrogate`, an earlier version. Phase 6 requires every incorporated line to keep its origin, and without the column there is nowhere for it to live; a finding that loses its source becomes an assertion, and a reader cannot tell an opened page from an opinion.

**Blocks go-live** — work can begin, the product cannot ship. Sign-offs, monitoring, audit retention, support tooling, training, release planning.

| Question | Who settles it | Where it came from |
|---|---|---|
| … | … | … |

**Not raised, not blocking** — the residue: never asked, and nobody waits on it. **One line per area, not one row per item.** It has to be visible and countable; it does not have to be itemised. A thirty-four row table is honest and unreadable, and an unreadable section gets skipped — which costs more than brevity would have.

> **Design and states** — on-screen copy, accessibility level, languages, responsive behaviour *(4)*
> **Risk** — performance targets, privacy review, data residency, running cost *(4)*

Close with the count across all three tiers: *"14 answered · 15 partial · 34 not raised."* The number is what stops a reader assuming the blanks were covered — the tiers tell them what to do first, the count tells them how much is left.

### Assumptions most likely to be wrong
Only if `[ASSUMED]` lines exist. Two or three, chosen by what they would cost if false — not by how uncertain you feel about them.

## Deciding what blocks what

- **Blocks starting** if someone building or designing would have to stop and ask: behaviour, rules, limits, data source, states, the main path, anything a screen depends on.
- **Blocks go-live** if the work can proceed but release cannot: sign-offs, alerting, audit retention, support tooling, training, store planning, cost approval.
- **Neither** if it can be decided at any point without anyone waiting. Those still appear under *not yet raised*; they simply are not urgent.

When unsure, ask whether someone is blocked **today**. If yes it blocks starting, whatever category it came from.

## Rules

- **A thin section stays thin.** "Not discussed" is an honest line. Padding is the failure this set exists to prevent.
- **Use their words.** A document the requester does not recognise is one they will not defend in a meeting.
- **No preamble.** No "this document describes…". Start at the problem.
- **Numbered steps for anything sequential.** Prose flows are where branches go to hide.
