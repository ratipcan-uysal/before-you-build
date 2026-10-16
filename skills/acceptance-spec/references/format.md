# Acceptance output contract

The human artifact starts with scope/revisions, an index of scenarios, identified scenario blocks, category decisions, coverage and open questions. This is a derived view of existing decisions, not a new authority.

The portable JSON shape is:

```json
{
  "schema": "byb.acceptance.v1",
  "scenarios": [{
    "id": "AC1",
    "requirements": ["R1"],
    "flow_steps": ["F1"],
    "category": "happy",
    "given": ["The supplied source's actual initial condition."],
    "when": "The specified action occurs.",
    "then": ["The observable result explicitly supported by R1."],
    "status": "SPECIFIED",
    "open_questions": []
  }],
  "coverage_decisions": [
    {"category":"happy","applicable":true,"rationale":"The normal path is in scope."},
    {"category":"alternative","applicable":false,"rationale":"Replace with the actual scoped exclusion; this template is not evidence."},
    {"category":"error","applicable":true,"rationale":"Use the decided failure paths."},
    {"category":"boundary","applicable":true,"rationale":"Use the decided limits."},
    {"category":"permission","applicable":true,"rationale":"Use the decided permission model."},
    {"category":"recovery","applicable":true,"rationale":"Use the decided retry/recovery behavior."}
  ]
}
```

This shape illustration intentionally does not pass final coverage: the applicable error/boundary/permission/recovery categories have no scenarios yet. Populate them from actual decisions or justify genuine exclusions. Do not copy the placeholders into a completed artifact.

Scenario categories are exactly `happy`, `alternative`, `error`, `boundary`, `permission`, `recovery`. Each needs one explicit applicability decision. A category cannot simultaneously be excluded and have a specified scenario. A `BLOCKED` scenario names the unresolved decision and cannot count as covered. A `SPECIFIED` scenario cannot contain open questions.

Requirements come from the request's optional structured index:

```json
{"schema":"byb.request.v1","requirements":[{"id":"R1","statement":"The exact requirement.","critical":true,"evidence":[{"source":"S1","locator":"L1","quote":"The exact source wording."}]}]}
```

Flow references come from:

```json
{"schema":"byb.flow.v1","steps":[{"id":"F1","description":"The exact step.","kind":"happy","requirements":["R1"]}]}
```

Flow kinds are `happy`, `branch`, `error`. A profile explicitly excluding flow permits empty scenario `flow_steps`; otherwise every actual step needs acceptance coverage. Empty flow references are not permission to omit an existing flow.

In managed work, `work-guide` owns the scoped request and exact artifact revisions; its final `check` resolves these ids against those sources. Standalone `validate-artifact` checks shape, not source correspondence. A standalone companion must state `[DRAFT]` or supplied approval state, source path/identity and revision, and a mapping such as `R1 → request.md / R1 / revision 3; F1 → flow.md / F1 / revision 2`. Bare machine ids resolve only through this manifest. Do not create managed records without a persistence request. The structured index and prose must describe the same statements; independent `build-context` review checks that correspondence and meaningful assertions, which a reference-counting validator cannot prove.
