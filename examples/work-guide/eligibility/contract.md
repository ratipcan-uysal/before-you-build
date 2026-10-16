# [DRAFT] Eligibility lookup interface contract

This is a draft based on fictional evaluation input. It has no institutional approval and is not implementation-ready while CQ1–CQ3 remain unresolved. The source decides the normal lookup, authentication failure, source failure and caller timeout behavior; the draft does not select missing institutional conventions.

Input: `../../../evals/fixtures/eligibility-brief.md`, SHA-256 `ecc4d2c30ea3f30c4cea4f73aa609afb7cf210ad84b9efcdd56c5b7862da8a8d`. No source revision number was supplied; this exact content fingerprint identifies the input. Its scope, R1–R5 and reviewed F1–F3/E1–E3 are the sole product evidence. Separate approved data model, API-needs artifact, institutional standards, source interfaces and real PM approval were not supplied. No failed audit is reported in this fixture.

Portable companion: `contract.json` uses BYB contract v1, not OpenAPI. `getEligibility` is a local artifact identifier for the source-decided operation, not an additional endpoint or institutionally approved method name.

| Operation | Source requirements | Source flow |
| --- | --- | --- |
| GET /v1/eligibility | R1–R5 | F1, F2, F3, E1, E2, E3 |

## CT1 — Inputs and identity

The logical request is `{}`. There are no query/body inputs. Invoke the existing bearer middleware on every request; use only its customer identity. Never accept a customer identifier from the caller. Missing or invalid authentication returns 401 before the account source is read (R1/R2, F1/E1). Authentication secrets must not appear in examples or logs (scope). The example logical request omits transport credentials and does not describe an unauthenticated success.

## CT2 — Success and freshness

Read the authenticated customer's active flag once (F2). Return HTTP 200 with exactly `eligible` and `reason`, both required. Valid bodies are `{"eligible":true,"reason":"ACTIVE"}` and `{"eligible":false,"reason":"INACTIVE"}`; crossed pairs are invalid. No identifiers or balances are included (R1, F3, scope). Object-level enum in the portable schema preserves this correlation using the supported subset.

The value reflects the account state at that read, uses no cache, and is not rewritten by later state changes (R5). There is no write, third-party call or migration. A repeat has no business side effect, though a changed account can produce a different answer (R4/R5). No multi-write partial completion or rollback applies; no extra ordering or deduplication mechanism is asserted.

## CT3 — Failures and recovery

| Trigger | Result | Recovery |
| --- | --- | --- |
| Missing/invalid authentication | HTTP 401, exactly `{"code":"AUTH_REQUIRED"}`; no account read | No automatic retry; a later valid authenticated invocation follows CT1 |
| Account source unavailable | HTTP 503, exactly `{"code":"UNAVAILABLE"}`; no eligibility result | Manual retry permitted; never automatic |
| Caller wait reaches its limit of at most 2000 ms | Caller reports unknown outcome; no invented server status/body | Manual retry permitted; never automatic |

These are R2/E1, R3/E2 and R4/E3 respectively. Error bodies contain exactly `code`. The caller owns the timeout; source text does not establish server cancellation or a server completion deadline. With no business write, an unknown response does not create a partial write requiring compensation.

The JSON `retryable=true` for UNAVAILABLE means manual retry only, as expressly qualified in `meaning` and `error_policy`. The source says no automatic retry for AUTH_REQUIRED; it does not prohibit a new authenticated invocation after credentials are corrected.

## CT4 — Compatibility and boundaries

This is a new `/v1/eligibility` endpoint and does not change existing response shapes. No storage, authentication redesign or migration is in scope. The decided path already determines this endpoint's naming/version; no broad naming standard, future version transition rule or institutional convention is inferred.

## Open decisions and verification

- CQ1 `[UNVERIFIED]`: Integration owner must provide exact middleware and account-source interface revisions and identity/flag interfaces. Named owner unknown. Existing capabilities are fictional input assertions, not independently verified institutional facts.
- CQ2 `[DECISION NEEDED]`: Verify that each authenticated customer always has a present account and valid active flag. If that is not guaranteed, product/API decision owner must decide missing-account or invalid-data behavior. Named owner unknown.
- CQ3 `[DECISION NEEDED]`: API convention owner must supply existing behavior for query/body inputs outside the accepted shape, or product/API decision owner must decide the wire response. Neither silent ignore nor a new error is assumed. Named owners unknown.

## Validation and next consumer

Run `../../../skills/work-guide/scripts/workspace.py --root /private/tmp/contract-forward.kO7WYU validate-artifact --kind contract --file contract.json`. This checks BYB structural/schema validity, the two success examples, and each error example against its declared response schema. It does not prove service behavior, middleware feasibility, status/body semantic correctness, real approval, or cross-artifact reference resolution. References were manually checked against the exact fixture. Only managed final `check` resolves references against registered input documents; this standalone exercise does not create a ledger.

Independent `build-context` review should receive this companion, `contract.json`, `input-manifest.json`, and the fixture. `acceptance-spec` should consume CT1–CT4 and CQ1–CQ3. Those follow-on reviews are not performed in this bounded test, and no approval is recorded.
