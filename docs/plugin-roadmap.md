# Plugin-first PM/BA implementation roadmap

Status: v6.0 local plugin workflow implemented. Broad institutional and cross-host quality claims remain unproven. The separate application is parked. No new repository, UI runtime, provider adapter or marketplace mirror was introduced.

## Product contract

Turn a selected delivery slice into a source-backed, consistent, testable and explicitly PM-authorized developer/coding-agent handoff. Unknown facts stay visible. Readiness arithmetic cannot override missing approval or critical findings. Development and launch authorization are different.

AI recommends with alternatives; PM decides after collecting needed stakeholder views. Source claims do not grant approval. Actor/context records are local attestations, not authenticated corporate identities. No prose toolkit guarantees every real request is complete; the product exposes what evidence cannot establish.

## Implemented phases

| Phase | Implementation | Evidence and boundary |
|---|---|---|
| 0. Contracts/evaluation | Narrow boundaries, seven work-shape fixtures, fixed discovery budget | Structural/mechanical regression; not a new cross-model superiority benchmark |
| 1. Persistent core | SQLite transactions, expected revisions, evidence, proposals, approvals and history | Restart, collision, rollback, isolation and dependency tests |
| 2. Meeting intake | Text/Markdown/VTT, line/cue evidence, source authority isolation | Conflicting fictional VTT trial; no meeting bot or speaker inference |
| 3. Guided analysis | Routing, single-question interview, early scope, design/flow loop, lenses, consultations | Fresh independent context resumes old records; PM gates remain explicit |
| 4. Acceptance/contracts | Two producers, schemas, success/error examples, source manifests | Independent realistic fixture trials found and corrected instruction defects |
| 5. Handoff/change | Applicable-artifact gates, independent verdicts, traceability, final PM fingerprint, ZIP, impact | Positive/negative gates and independent analytical cross-check |
| 6. Distribution/recovery | Self-contained skill, backup-first migration, doctor, guide and offline HTML | Copied CLI test and fresh-context migration; not every editor/platform certified |

## Architecture and delivered surfaces

- Specialists produce or review; the work guide coordinates state and routing.
- Python/SQLite records are authoritative; documents, JSON and ZIP are derived views.
- Required artifacts and exclusions come from a PM-approved profile, not a guessed industry checklist.
- Validators enforce shape, examples, reference coverage and freshness; independent review assesses meaning.
- A passing check yields AWAITING_PM. Separate exact-snapshot approval enables PM_APPROVED_HANDOFF.
- New evidence invalidates current applicability; old documents and exports retain historical identity.
- [User guide](user-guide.md), [delivery protocol](../skills/work-guide/references/delivery.md), [HTML presentation](presentations/before-you-build.html), [quality report](../examples/work-guide/quality-report.md).

## Completion criteria now enforced

No open development question, unresolved required stakeholder consultation, stale required artifact, missing explicit passing review, uncovered requirement/flow step, blocked acceptance scenario or open contract decision passes the mechanical gate. PM-approved exclusions allow irrelevant analyses to be omitted. A later review invalidates earlier artifact approval.

The gate cannot detect a fabricated review or a scenario naming the right id but testing the wrong behavior. Independent cross-document review must inspect those. Its analytical verdict does not replace PM authorization. Missing institutional interfaces are evidence gaps, not something a nonempty JSON string resolves.

## Remaining validation, not hidden implementation claims

1. Run sanitized real bank/telecom/enterprise requests with actual PMs and independent domain reviewers. Measure critical omissions, unsupported decisions and unnecessary blocking.
2. Repeat with target host/model versions and actual editor discovery. Explicit invocation does not measure automatic routing; copied CLI execution does not certify every operating system.
3. Compare against strong plain-prompt baselines with identical sources, budgets and blind judges. Historical control-group results concern earlier skills, not the complete v6 workflow.
4. Give approved real handoffs to independent coding teams/agents; measure returned questions, invented business choices, traceable tests and revisions. Mechanical fixtures cannot establish production handoff quality.
5. Measure cost and latency per approved slice, not token count per document. No invented efficiency claim is attached.

These require independent users, institutional evidence or additional provider runs; they are not marked complete because repository tests passed. No production source, credential, stakeholder sign-off or PM authorization was invented while the user was away.

## Deliberate non-goals

Native VS Code extension; resumed app development; automatic model switching; MCP/provider installation; authenticated corporate approval service; real-time meeting bot; automatic publishing/commits/pushes; universal completeness certification.

## Repeat verification

```bash
python3 scripts/validate.py
python3 -m unittest discover -s tests -v
python3 examples/work-guide/replay.py
python3 evals/run_profiles.py
```

The [quality report](../examples/work-guide/quality-report.md) separates repeatable checks from bounded agent observations and documents corrections.
