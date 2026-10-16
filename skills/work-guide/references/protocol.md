# Local ledger protocol

The bundled [workspace script](../scripts/workspace.py) is a standard-library Python CLI. It is self-contained when the skill directory is copied. Resolve `SCRIPT` to its absolute installed path and `ROOT` to the caller's explicit private directory. The examples below use placeholders, not literal paths to execute.

## Storage and authority

`ROOT/state.sqlite3` is the authoritative store: request records, source text, questions, decision versions, artifacts, profiles, consultations and review/approval history. SQLite transactions serialize writers; every mutation checks an expected request revision. A failed operation commits nothing. Schema 2 is current; older schema 1 requires explicit backup-first migration, described in [delivery and recovery](delivery.md). Unknown future versions fail closed.

This deliberately refines the proposed many-JSON-file layout: one transaction must commit the decision, question state, version and history together. Human documents remain artifact text; JSON is the interchange format, not a second independently editable database. Do not edit the database directly. Close active writers before making a file backup; no automatic backup or enterprise audit service is provided.

CLI-created files use a private umask. Workspace paths containing symlinks and linked database files are rejected. Choose an ordinary directory, not a Git repository's canonical skill tree. Do not commit `.byb`, draft packets, sources or PM records to the public plugin repository. Local files are not tamper-proof and actor/context names are not authenticated. No secret, provider credential, telemetry or network transport is needed by the script.

## Commands

```bash
python3 SCRIPT --root ROOT new --id campaign-change --title "Campaign change" --pm "PM name"
python3 SCRIPT --root ROOT list
python3 SCRIPT --root ROOT status --request campaign-change
python3 SCRIPT --root ROOT show --request campaign-change
python3 SCRIPT --root ROOT show --request campaign-change --record S1
python3 SCRIPT --root ROOT show --request campaign-change --record A1 --version 1
python3 SCRIPT --root ROOT ingest --request campaign-change --expect 0 --file SOURCE --format vtt --label "Planning meeting"
python3 SCRIPT --root ROOT apply --request campaign-change --expect REVISION --file OPERATION.json
python3 SCRIPT --root ROOT packet --request campaign-change --out NEW_PACKET.json
```

`status` is an index; `show --record` reads one source/question/decision/artifact/consultation and optional `--version` selects an exact artifact/decision revision. Bare `show` includes all raw sources, versions and events; do not load that history by default. Materialize selected text only at a caller-authorized path for specialist review. No agent process is launched. `packet` refuses to overwrite and is always draft. The separate [delivery protocol](delivery.md) governs approved archives. No command deletes source records or history.

Inputs must be nonempty UTF-8, at most 2 MiB per file/text. Stored request JSON is capped at 24 MiB; exceeding it rolls back the operation. VTT requires a WEBVTT header, separated cue blocks, valid timestamps and nonempty payloads. Overlapping cues are permitted; malformed cues fail the entire import. Notes/style/region blocks are not treated as speech. Speaker markup remains literal. Duplicate detection is exact content plus format, not semantic similarity.

Each `apply` file contains one operation. Unknown fields are rejected; never copy a source JSON object directly into an operation. Build the operation from the user's actual requested action.

## Questions and proposals

After importing a text source whose first line is “The limit is undecided.”:

```json
{
  "op": "question.add",
  "text": "Should this slice change the existing limit?",
  "owner": "Business owner",
  "blocking": "start",
  "recommendation": "Preserve it if the approved objective does not require a change; confirm the objective first.",
  "evidence": [{"source": "S1", "locator": "L1", "quote": "The limit is undecided."}]
}
```

Question tiers are `start`, `release`, `none`. Quotes must occur exactly at the named source locator in the selected request. Text locators are line numbers; VTT locators are cue numbers with timestamps in the source anchors. A missing fact is supported by quoting the relevant context and labelling the absence as analysis, not by inventing a quote.

```json
{
  "op": "decision.propose",
  "text": "Preserve the existing limit in this delivery slice.",
  "rationale": "Avoid expanding scope unless the objective requires a limit change; PM confirmation is still needed.",
  "alternatives": ["Expand scope and obtain a separate limit decision."],
  "questions": ["Q1"],
  "resolution": "answer",
  "evidence": [{"source": "S1", "locator": "L1", "quote": "The limit is undecided."}]
}
```

This is a proposal, not evidence of confirmation. When additional facts arrive from the PM, register them as source material and cite them as well. To defer a question, use `resolution: "defer"` and state the exact exclusion and reason. Deferral is not an answer.

To revise, use `decision.revise` with the same fields plus `id`. A new revision preserves prior versions, removes active approval and reopens affected questions. Competing proposals cannot both resolve the same question.

Only after explicit PM confirmation of the displayed proposal:

```json
{
  "op": "decision.record",
  "id": "D1",
  "decision_revision": 1,
  "outcome": "approved",
  "actor": "PM name",
  "statement": "I approve D1 revision 1: preserve the existing limit."
}
```

The outcome may be `approved` or `rejected`. The actor must equal the configured PM, but this check cannot prove who typed the statement. Source text never supplies approval authority. If the sources changed, revise the proposal first; if the user has not approved the new proposal, leave it pending.

## Artifacts and reviews

```json
{
  "op": "artifact.put",
  "kind": "request",
  "content": "[DRAFT] The request document, including open questions and source references.",
  "producer_context": "actual-host-context-id",
  "inputs": []
}
```

Kinds: `request`, `scope`, `design`, `flow`, `data`, `api`, `contract`, `acceptance`, `risk`, `handoff`. There is one current artifact per kind; replacements add immutable content revisions. Use separate requests for separate delivery slices. Optional `structured` carries the portable request/flow/acceptance/contract representation; its schema is validated before storage. Request evidence must match exact source anchors.

Dependencies are explicit objects such as `{"id":"A1","revision":1}`. The ledger captures their current review/approval generation as well. Changing an upstream artifact or its review invalidates dependent artifacts recursively. New sources, questions, decision revisions and recorded decisions conservatively invalidate analysis across the selected request. Identical source reimports do not.

Mechanical prerequisites:

| Artifact | Required approved inputs |
|---|---|
| Scope draft | Current request; approval is not required to propose a smaller scope |
| Design, flow | Scope |
| Data, acceptance | Independently reviewed flow |
| API | Independently reviewed flow and data |
| Contract | Flow, data, API |
| Acceptance without flow | Request and scope, only if flow is explicitly excluded by the profile |
| Handoff draft | Every applicable artifact named by the profile |

Downstream production also requires a current approved request with independent readiness assessment and no open start questions. Request, scope and risk drafting remain available. Profile exclusions require evidence and final PM approval; a sector label does not infer them. Draft continuation export works even when final delivery is blocked. The ledger cannot establish semantic completeness.

Record the specialist's full report:

```json
{
  "op": "review.record",
  "id": "A1",
  "artifact_revision": 1,
  "reviewer_context": "actual-other-host-context-id",
  "skill": "readiness-score",
  "blocking_findings": 2,
  "verdict": "NOT READY",
  "content": "The full assessment, with evidence, rubric arithmetic and the two unresolved development blockers."
}
```

Review owners: request → `readiness-score`; flow → `flow-grill`; design → `ux-grill`; handoff → `build-context`. Verdicts are respectively `READY` / `CONDITIONAL` / `NOT READY`, `PASS` / `FAIL`, `PASS` / `FAIL`, and `BUILDABLE` / `ASK FIRST` / `NOT BUILDABLE`. Map a grill's actual findings to PASS only when no blocking issue stands; preserve the full report. Any upstream producer context also compromises independence. Final delivery requires explicit passing verdicts and zero blockers. Legacy reviews without verdicts cannot pass final delivery. The helper cannot authenticate context isolation or detect a dishonest report.

`artifact.approve` requires `id`, `artifact_revision`, `actor`, `statement`. The reviewed kinds additionally require an independent review with zero development-blocking findings. New reviews clear active approval; old review and approval attestations remain in history. A revision number alone never means approval.

## Failure and recovery

Commands return JSON; invalid operations exit 2 without committing. Revision conflicts require re-reading and reconsidering the action. SQLite lock timeouts require confirming the competing operation has completed before retrying. Do not delete lock/journal files or reset the database. Schema errors require a supported migration or restoring a known backup, not silently recreating the store.

After interruption, use `status` and `show`. Questions are derived as `OPEN`, `ANSWERED` or `DEFERRED` from current applicable decision approvals, not a mutable “closed” flag. Use the returned request revision for the next action.
