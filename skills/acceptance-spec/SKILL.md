---
name: acceptance-spec
description: Derive traceable acceptance scenarios from decided requirements and flows, including failures and boundaries. Use for "write acceptance tests" or "make this testable". Do not use to invent business rules, score readiness, or implement tests.
---

# Acceptance Spec

Turn decisions into observable outcomes, not a list of optimistic user stories.

## Not this skill

- Missing behavior or a raw request → `request-shaper`.
- Missing journey → `flow-map`; a broken existing journey → `flow-grill`.
- Backend capabilities → `api-needs`; concrete interface guarantees → `contract-spec`.
- Final consistency and handoff → `build-context`; persistent records → `work-guide`.
- Do not implement an automated test suite or certify readiness here.

## 1. Establish the exact inputs

Read [the output contract](references/format.md), then the approved delivery scope, request, flow, applicable UX decisions and constraints. State which revisions and approvals were supplied. Unapproved material can produce a marked draft, not an approved acceptance baseline.

Use stable requirement ids from the request and step ids from the flow. If none exist, propose document-local ids without changing the statements; record the mapping in the output. Across files, cite document, local id and revision. Never renumber a referenced requirement silently.

If a needed source is absent, say what cannot be specified, ask for that source, and with nobody to answer leave the affected scenario `BLOCKED`. Do not fill an outcome to make the matrix complete.

## 2. Derive scenarios

For each in-scope requirement and reachable flow branch, specify:

- The relevant starting state and permissions.
- One action or event.
- The observable result, including state/data changes and prohibited side effects.
- The exact requirement and flow-step references.
- What evidence or decision supports any value, timeout or boundary.

Sweep happy paths, alternatives, errors, boundary values, permissions and recovery. Mark a category inapplicable only with a specific reason traceable to the scope; “not mentioned” is not a reason. Never insert arbitrary performance targets or threshold examples that become accidental rules.

A source saying “read the account flag” does not prove every account/flag exists or is valid. If an expected outcome relies on an unstated input guarantee, expose that verification/decision; do not silently classify the missing case as future scope. Global prohibitions (for example, no secrets in logs) need acceptance across their stated scope, not only one convenient failure path.

Separate business acceptance from implementation technique. “No duplicate financial effect” is acceptance; a particular database index is not, unless it is an explicit binding constraint. Ask `contract-spec` to resolve contract disagreements rather than choosing a preferred response code here.

Where a scenario needs an answer, state the missing decision in `open_questions`, mark it `BLOCKED`, and keep expected behavior visibly undecided. An unattended run leaves it blocked and continues independent scenarios.

## 3. Check the derived view

Walk each expected result back to its source statement. Report unsupported results as gaps, not additions. Reconcile both directions: every scoped requirement has a scenario, and every scenario belongs to a supplied requirement. A final baseline requires those requirements to be approved; a draft retains their unapproved status. Include nonfunctional and negative assertions, not only screen clicks.

Report coverage counts from the actual ids, not from manually maintained totals. Numerical coverage is not proof that assertions are good. A scenario referencing a requirement while testing something else is still a semantic defect.

## 4. Output

Produce readable scenarios and the portable structured representation defined in the reference. Keep `[DRAFT]` until the PM approves the precise artifact revision. Name unanswered questions, any unsupported assertions removed, and category exclusions.

For an existing managed `work-guide` request, register the structured artifact with exact current inputs. Its final `check` resolves references, category coverage and blocked cases across registered documents. Standalone `validate-artifact` checks shape only, not source correspondence. Without a managed request, keep revisions and reference mappings in the companion prose; do not create a ledger merely because the helper is installed. If validation did not run, say so.

For final independent review, route the acceptance artifact and its source paths to `build-context`. Do not claim that the producer's walk-back was an independent review. For uncovered product decisions, route to `request-shaper` and carry findings, not invented answers.

## Operating rules

- **Language:** use the caller's language; keep `[DRAFT]`, `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `SPECIFIED`, `BLOCKED` and schema keys in English.
- **Output:** chat and the output path supplied by the caller. If no path is supplied, offer to save; without an answer, do not create files.
- **A cell is a line.** Long scenario reasoning belongs in identified blocks; the matrix is only an index.
- New source decisions require a new artifact revision. Do not overwrite the approved baseline or imply a launch approval.
