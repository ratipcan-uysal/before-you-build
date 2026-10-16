# v6.0 verification report

Observed on the local development environment during this implementation. This is evidence of tested mechanics and bounded behavior, not a claim that every PM request or host/model combination is reliable.

## Repeatable local checks

| Check | Observed result | Boundary |
|---|---|---|
| Python unit/CLI suite | 71 tests passing | Synthetic approval/review fixtures, not authenticated people or semantic judgments |
| Seven profile fixtures | All recorded their selected scope; no approval invented; premature delivery blocked | Work-shape mechanics, not seven full domain analyses |
| Original meeting replay | Resume, conflict, stale approval, duplicate no-op and draft export checks pass | Synthetic source/PM data only |
| Copied skill CLI | Standalone copied scripts checked and delivered a synthetic approved archive | Not live automatic editor discovery or every operating system |
| Portable acceptance/contract | Both actual agent outputs validate | Shape/examples, not semantic truth or readiness |
| HTML presentation | 25 sections; script syntax and six file links valid; no external assets | Browser navigation, simulation and 390px/1280px widths checked; print layout not rendered |

Commands:

```bash
python3 scripts/validate.py
python3 -m unittest discover -s tests -v
python3 examples/work-guide/replay.py
python3 evals/run_profiles.py
node scripts/check-presentation.mjs
```

The test modules are [core ledger tests](../../tests/test_work_guide.py) and [delivery tests](../../tests/test_delivery.py). Profile fixtures and their executable runner are [work-shapes.json](../../evals/fixtures/work-shapes.json) and [run_profiles.py](../../evals/run_profiles.py). The full standalone walkthrough is [HTML](../../docs/presentations/before-you-build.html).

Browser QA caught and fixed a JavaScript string-quoting error before delivery. After reload, all 25 sections were navigable; the simulation moved BLOCKED → AWAITING_PM → PM_APPROVED_HANDOFF → BLOCKED, the arrow key advanced a slide, and continuous reading exposed all sections. Document width matched viewport width at 1280px and 390px. The mobile menu selected and closed correctly. The browser's file-URL policy blocked direct file navigation, so the visual trial used an explicit localhost server; serverless opening and rendered print/PDF output are not claimed as tested.

## Four new independent context trials

### 1. Acceptance production

An independent agent read the new skill and fictional eligibility source, creating thirteen SPECIFIED scenarios over all six categories. It preserved draft status and did not manufacture approval. The trial found unclear standalone registration, draft-versus-approved wording and source-revision mappings. Those instructions were corrected.

Final review subsequently found a real substantive gap: input guarantees were treated too readily as scope exclusions; a global prohibition was tested on only one path. The initial output is preserved as failed evidence in [the eligibility example](eligibility/README.md), not presented as a passing final baseline.

### 2. Contract production

A separate agent preserved the supplied endpoint, exact success/error shapes, manual-only retries, read-time freshness and caller timeout. It retained three unresolved interface/behavior questions. It found that standalone validation did not resolve cross-document refs and error examples were not schema-checked. Implementation and wording were corrected.

After revision, actual validation succeeded. Four negative probes were rejected: wrong error code, extra eligibility field in an error, missing error status and a crossed success eligible/reason pair. Unknown protocols now explicitly produce prose-only drafts. No institution-specific fact or approval was supplied by the agent.

### 3. Fresh-context resume and schema migration

A new agent copied only the earlier synthetic SQLite workspace, without reading the earlier conversation/report. Schema 1 initially failed closed. The isolated copy was backed up and explicitly migrated to schema 2. Request revision advanced 4→5; sources, questions and decisions were unchanged.

The agent recovered Q1 OPEN and D1 revision 1, retained conflicting meeting claims and asked the pending repeat-submission question without inventing an approval. It noticed two source issues not yet in the question index. That prompted an explicit resume-time source/question reconciliation instruction.

It also found doctor reported only supported schema, not the actual database version. Doctor now reports found version and current/migration-required/unsupported state; regression tests cover old/current/future/absent stores. This fixture had no answered decisions or approved artifacts; preservation of those states is tested mechanically elsewhere, not established by this agent trial.

### 4. Independent handoff

A third analytical context received the raw source plus acceptance/contract file paths and used the final assembly skill. Twelve source/representation comparisons produced one scope-handling disagreement and one acceptance coverage finding. Three existing beginning-of-development questions survived. Verdict: ASK FIRST. JSON validity and 6/6 flow references did not override those questions.

The trial also exposed over-blocking wording: a separate slice/data-model filename was treated as inherently necessary even when source content already established the relevant scope. Instructions now distinguish missing decisions from missing filenames, clarify subject-organized one-file handoff, permit evidenced UI inapplicability and count release-only findings separately. Critical findings still forbid BUILDABLE. These are corrections derived from observed behavior; a second complete independent run after every correction has not been claimed.

## What is not proved

- A full real institutional request has not been approved by a real PM and implemented by a separate coding team/agent in this release.
- No new blind v6 comparison against a strong plain prompt was run. Historical [control-group evidence](../../docs/control-group.md) concerns earlier skills.
- New automatic host selection, all current Claude/Codex combinations, Windows and corporate deployment are not certified.
- Lenses are investigation prompts, not banking/telecom legal policies. No live legal/security/fraud sign-off was obtained.
- Local actor/context identifiers can be fabricated by an operator; hashes are not signatures. Semantic claims remain dependent on actual review and evidence.
- New source invalidation is deliberately conservative within one request; its cost has not been benchmarked on large real projects.

Confidence: high for observed mechanical invariants; moderate for the narrow agent behaviors exercised; unknown for broad institutional effectiveness and relative quality/cost. See [the implementation roadmap](../../docs/plugin-roadmap.md) for the external validation still required.
