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
Every gap, with the question, who settles it, and — critically — whether it was raised at all.

| Question | Who settles it | What it blocks | Status |
|---|---|---|---|
| … | … | … | asked / not raised |

Both states belong here. A reader who sees only the questions you asked assumes everything else was covered, and that assumption survives right up until someone tries to build it. Close the section with the count: *"12 answered, 7 asked and open, 34 not yet raised."*

### Assumptions most likely to be wrong
Only if `[ASSUMED]` lines exist. Two or three, chosen by what they would cost if false — not by how uncertain you feel about them.

## Rules

- **A thin section stays thin.** "Not discussed" is an honest line. Padding is the failure this set exists to prevent.
- **Use their words.** A document the requester does not recognise is one they will not defend in a meeting.
- **No preamble.** No "this document describes…". Start at the problem.
- **Numbered steps for anything sequential.** Prose flows are where branches go to hide.
