# Profiles, consultations and final delivery

Read this when configuring applicability, registering stakeholder responses, checking/exporting a final handoff, inspecting change impact or upgrading an old ledger. Read [the core protocol](protocol.md) first. `SCRIPT` and `ROOT` below mean actual installed script and explicit private workspace paths; operation files contain JSON, not shell commands.

## 1. Propose the smallest complete scope

Ask for organization context, product/system boundaries, binding conventions, evidence owners and the requested delivery slice. Missing facts remain questions. Read [the selected context lenses](lenses.md) for focused questions; they do not install bank/telecom policies or imply statutory compliance. Supported lenses: `financial`, `identity`, `privacy`, `campaign`, `async`, `integration`, `migration`, `channels`, `reporting`, `operations`.

Every profile includes `request`, `scope`, `acceptance`, `handoff`. Optional kinds are `design`, `flow`, `data`, `api`, `contract`, `risk`. Each omission needs a specific rationale and source evidence. Data requires flow; API and contract require each other plus flow/data in the selected profile. This does not create a production cycle: API needs are produced before the final contract.

Illustrative full backend profile, only if source S1 really says the quoted sentence:

```json
{"op":"profile.set","organization":"User-supplied organization","product":"User-supplied product","context":"The supplied context and conventions, with unknowns stated.","required_artifacts":["request","scope","flow","data","api","contract","acceptance","risk","handoff"],"exclusions":[{"kind":"design","rationale":"This slice has no human-facing surface.","evidence":[{"source":"S1","locator":"L1","quote":"This is a backend-only change."}]}],"lenses":["integration","identity"],"evidence":[{"source":"S1","locator":"L1","quote":"This is a backend-only change."}]}
```

Show the proposal and exclusions, then wait for explicit PM direction. If no answer arrives, leave it proposed. Only then:

```json
{"op":"profile.approve","profile_revision":1,"actor":"Configured PM name","statement":"The PM's actual approval of profile revision 1 and its exclusions."}
```

Setting or approving a profile changes analysis context. Do this before producing downstream artifacts; later changes require reconciliation and new approvals. Profiles are immutable versions. New source material makes old profile approval inapplicable; propose and approve a current version rather than editing history.

## 2. Track stakeholder consultation without impersonation

```json
{"op":"consultation.request","owner":"Named security owner","question":"Does the supplied authorization rule cover this action?","blocking":"start","evidence":[{"source":"S1","locator":"L1","quote":"This is a backend-only change."}]}
```

This illustrative quote only establishes context, not an authorization requirement; actual work must quote the relevant rule. `start` blocks development, `release` blocks launch, `none` is informational. Distinguish security, legal, fraud, operations and business questions by actual owners, not invented names or obligatory departments for every task.

Import the actual response as source evidence. Show its interpretation to the PM. Only after explicit PM direction:

```json
{"op":"consultation.respond","id":"C1","response":"The actual supplied response and its scope.","outcome":"clear","evidence":[{"source":"S2","locator":"L1","quote":"Exact wording from the actual response."}],"actor":"Configured PM name","statement":"The PM's actual statement accepting this interpretation."}
```

Outcomes: `clear`, `changes_required`, `unknown`. Responses retain history and source epochs; later sources require rechecking. A PM's local record does not impersonate a stakeholder or replace a required corporate approval system. If no response/PM confirmation exists, keep the consultation open. The helper never sends messages to stakeholders.

## 3. Validate and review the selected scope

```bash
python3 SCRIPT --root ROOT validate-artifact --kind acceptance --file ACCEPTANCE.json
python3 SCRIPT --root ROOT validate-artifact --kind contract --file CONTRACT.json
python3 SCRIPT --root ROOT check --request REQUEST_ID
```

Standalone validation checks format and contract success/error examples. Managed `check` additionally checks current artifact approvals/reviews, profile approval, unresolved start questions/consultations, pending start proposals, requirement/flow reference integrity, specified acceptance coverage, all six category decisions and contract open questions. Every scoped requirement and flow step must be covered. Coverage is reference coverage, not proof that assertions are correct.

Register portable JSON in `artifact.put.structured`; its readable `content` retains decisions, citations and limitations. Exact input ids/revisions identify its source manifest. Final independent `build-context` review must compare JSON to prose and both to the underlying evidence, including exclusions, stakeholder conditions and meaningful acceptance. For a required design artifact, supply an actual design for `ux-grill`; a prose brief alone is not a reviewed mockup. Missing visuals can remain a draft but cannot be presented as a passing UX review.

Passing review verdicts: request `READY`, flow/design `PASS`, handoff `BUILDABLE`, all with zero blocking findings. `CONDITIONAL` is not silently promoted. Approval remains separate and names the exact artifact revision. Review after approval withdraws that approval; producing a dependent artifact before upstream review/approval completes will make that dependent stale.

## 4. Approve the snapshot, then export

`check` returns `BLOCKED` or `AWAITING_PM`, with blockers, exact revision and fingerprint. Present the complete handoff, independent report, exclusions and launch blockers to the PM. Do not ask them to approve a hash they have not seen represented as documents. Silence or “continue working” is not approval.

Only after their explicit authorization:

```json
{"op":"handoff.approve","fingerprint":"EXACT_FINGERPRINT_FROM_CURRENT_CHECK","actor":"Configured PM name","statement":"The PM's actual authorization of this exact implementation handoff."}
```

Apply with the same request revision that was checked. The approved state is `PM_APPROVED_HANDOFF`, not an automated completeness certification.

```bash
python3 SCRIPT --root ROOT deliver --request REQUEST_ID --out NEW_HANDOFF.zip
python3 SCRIPT --root ROOT verify-delivery --file NEW_HANDOFF.zip
```

The exclusive-created archive contains `START-HERE.md`, subject-organized `SPEC.md`, applicable readable artifacts, portable JSON, full private audit records and a SHA-256 manifest. `verify-delivery` checks archive inventory and checksums, not authorship or currentness. Do not publish this archive: it includes original sources and PM history. Inspect and redact an explicitly authorized external copy if sharing is separately requested.

The builder reads the spec, checks observable acceptance and asks rather than inventing missing decisions. Before coding, confirm the archive is still the active snapshot with the PM/live ledger. Release questions and consultations remain visible; development authorization is not launch authorization. An old export cannot revoke itself remotely.

## 5. Change and recovery

```bash
python3 SCRIPT --root ROOT impact --request REQUEST_ID --record A3
python3 SCRIPT --root ROOT status --request REQUEST_ID
python3 SCRIPT --root ROOT doctor
python3 SCRIPT --root ROOT migrate --backup NEW_BACKUP.sqlite3
```

`impact` follows tracked dependencies. Source/question/decision/consultation changes conservatively affect all analyses in this request. It does not discover external consumers; that is `impact-radar` work. New artifacts invalidate dependents through revision and attestation snapshots. Re-run only relevant production/review work, but never carry stale approval forward as current.

Migration supports schema 1 → 2 only and requires a new backup path. It makes a consistent SQLite backup before changing rows, preserves records/history and advances each request revision. Existing drafts can resume; final delivery requires the new profile, structured indexes and explicit verdicts. Unsupported future schemas fail closed. Backup collisions/failures abort migration. Never delete the old store to make an upgrade succeed. To restore, stop all writers, preserve the failed database separately, and use the explicit chosen backup; do not overwrite a user's database without authorization.

`doctor` reports Python, SQLite, workspace existence, schema support and that the helper has no network dependency. It does not authenticate an AI host, verify model access or install dependencies. Missing setup is a user-visible action, not permission to switch providers or add MCPs.
