> Historical first forward-test output. The final review found a missing-input-guarantee disagreement and incomplete global-prohibition acceptance. Preserved as evidence, not a passing baseline. Paths normalized for this repository.

# [DRAFT] Eligibility acceptance package — local revision AC-v1

This fictional package is derived solely from `../../../evals/fixtures/eligibility-brief.md`, supplied without a revision identifier. The source snapshot SHA-256 is `ecc4d2c30ea3f30c4cea4f73aa609afb7cf210ad84b9efcdd56c5b7862da8a8d`. References below use `eligibility-brief.md (that snapshot)` plus its local ids. The fixture's reviewed fictional flow is source material, not institutional approval. No real PM approval or independent final review has been supplied. No UI decisions are needed for the explicitly backend-only slice. This package does not authorize implementation.

The structured scenarios are in `acceptance.json`. `SPECIFIED` describes whether an outcome follows from the supplied fictional statements; the whole artifact remains `[DRAFT]`.

## Source mapping

R1–R5 and F1–F3/E1–E3 retain the source ids. The following document-local ids identify previously unnumbered source statements without altering them:

- C1: “The endpoint name is decided: GET /v1/eligibility. The customer identity comes exclusively from the middleware; there are no query/body inputs and the portable request object is {}.”
- C2: “A 200 response has exactly eligible (boolean) and reason (ACTIVE or INACTIVE); both are required. Error bodies have exactly code. No response adds customer identifiers or balances.”
- C3: “Authentication secrets must not appear in examples or logs.”
- C4: “No UI, money movement, stored write, migration or third-party call is part of this slice.”

Existing authentication and storage are binding scope constraints; this package does not propose redesigns. The source states this is a new endpoint with no existing response shape changes. Deployment migrations and existing endpoint changes are excluded; they are not invented runtime scenarios.

## Scenario index

| ID | Case | Category | Status |
|---|---|---|---|
| AC1 | Active account | happy | SPECIFIED |
| AC2 | Inactive account | alternative | SPECIFIED |
| AC3 | Missing authentication | permission | SPECIFIED |
| AC4 | Invalid authentication | permission | SPECIFIED |
| AC5 | Account source unavailable | error | SPECIFIED |
| AC6 | Caller deadline | boundary | SPECIFIED |
| AC7 | Retry source failure | recovery | SPECIFIED |
| AC8 | Retry timeout | recovery | SPECIFIED |
| AC9 | State changes after read | boundary | SPECIFIED |
| AC10 | Subsequent fresh read | alternative | SPECIFIED |
| AC11 | Customer isolation | permission | SPECIFIED |
| AC12 | Authentication secret exclusion | permission | SPECIFIED |
| AC13 | Read-only scope | happy | SPECIFIED |

## Scenarios

### AC1

Given successful middleware authentication and an account active at read time, when the caller invokes GET /v1/eligibility with request {} and receives the result before timeout, then the customer's active flag is read once without cache and HTTP 200 contains exactly `{"eligible":true,"reason":"ACTIVE"}`. No customer identifiers or balances appear. Source: R1/R5/C1/C2; F1/F2/F3.

### AC2

Given successful authentication and an account inactive at read time, when the caller invokes the same endpoint and receives the result before timeout, then its active flag is read once without cache and HTTP 200 contains exactly `{"eligible":false,"reason":"INACTIVE"}`. No customer identifiers or balances appear. Source: R1/R5/C1/C2; F1/F2/F3.

### AC3

Given missing authentication, when the caller invokes the endpoint, then HTTP 401 contains exactly `{"code":"AUTH_REQUIRED"}`, no account read occurs, and no automatic retry occurs. Source: R2/C2; F1/E1.

### AC4

Given authentication classified as invalid by the supplied middleware, when the caller invokes the endpoint, then HTTP 401 contains exactly `{"code":"AUTH_REQUIRED"}`, no account read occurs, and no automatic retry occurs. Middleware validity rules are not redesigned. Source: R2/C2; F1/E1.

### AC5

Given successful authentication and an unavailable account source, when the endpoint is invoked and its failure response arrives before timeout, then HTTP 503 contains exactly `{"code":"UNAVAILABLE"}`, with no eligibility value and no automatic retry. Source: R3/C2; F1/F2/E2.

### AC6

Given successful authentication and no result available throughout the caller's 2000 millisecond wait, when its deadline is reached, then waiting does not continue beyond 2000 milliseconds, the result is unknown, manual retry is permitted, and no automatic retry occurs. The number comes directly from R4; no server timeout or response status is inferred. Source: R4; F1/F2/E3.

### AC7

Given an earlier 503 UNAVAILABLE and a now available source with an active account, when the caller manually retries with successful authentication and a timely response, then the retry reads current state without cache, returns exactly `{"eligible":true,"reason":"ACTIVE"}` with HTTP 200, and causes no business side effect. Source: R1/R3/R4/R5/C2; E2/F1/F2/F3.

### AC8

Given an earlier caller timeout and a now available source with an inactive account, when the caller manually retries with successful authentication and a timely response, then the retry reads current state without cache, returns exactly `{"eligible":false,"reason":"INACTIVE"}` with HTTP 200, and causes no business side effect. Source: R1/R4/R5/C2; E3/F1/F2/F3.

### AC9

Given a lookup read that observed active, followed by a change to inactive before the timely response, when the response returns, then HTTP 200 contains exactly `{"eligible":true,"reason":"ACTIVE"}`. The subsequent state change does not rewrite the response. This boundary is the read event, not an invented freshness interval. Source: R1/R5/C2; F2/F3.

### AC10

Given an earlier active response and a subsequent inactive account state, when the authenticated caller invokes the lookup again and receives a timely response, then a new read without cache produces exactly `{"eligible":false,"reason":"INACTIVE"}` with HTTP 200. The earlier response remains unchanged; repetition has no business side effect. Source: R1/R4/R5/C2; F1/F2/F3.

### AC11

Given authenticated customer A is inactive and customer B is active, when A invokes the endpoint with {} and no query/body inputs, then only A's middleware-identified account is read. B's account is not read; the timely HTTP 200 response is exactly `{"eligible":false,"reason":"INACTIVE"}`. A/B are fictional relational labels, not identifiers added to the response. Source: R1/C1/C2; F1/F2/F3.

### AC12

Given a fictional invalid bearer credential and inspectable invocation logs/examples, when the supplied middleware rejects the invocation, then no authentication secret appears in logs or examples. The artifact intentionally contains no actual credential. This does not mandate that logs be created. Source: C3; F1/E1.

### AC13

Given successful authentication and a timely source result, when the caller invokes the lookup, then no stored write, money movement, or third-party call occurs. The operation is read-only with no business side effect. Source: R4/C4; F1/F2/F3.

## Category decisions and coverage

All six categories apply. Happy: normal lookup (R1). Alternative: inactive state and a subsequent changed state (R1/R5). Error: source unavailability (R3). Boundary: caller deadline and the moment of read (R4/R5). Permission: identity isolation, failed authentication, and authentication secret handling (R1/R2/C3). Recovery: manual retry after failure/timeout (R3/R4). No category is excluded.

Computed from acceptance.json: 13 scenarios, all SPECIFIED; 0 BLOCKED. Categories: happy 2, alternative 2, error 1, boundary 2, permission 4, recovery 2. Referenced requirements: R1–R5 (5/5), plus C1–C4 (4/4 mapped constraints). Referenced flow steps: F1/F2/F3/E1/E2/E3 (6/6). Coverage is a derived reference count, not proof of semantic completeness. This producer walked each asserted result back to the source; that is not an independent review.

Observed portable validation: process exit 0 with `{"valid":true,"kind":"acceptance","boundary":"Portable BYB schema and example validation, not semantic approval or OpenAPI validation."}`. No semantic or PM approval follows from this result.

## Open questions and limits

No missing product decision was necessary to specify the supplied binary-account flow. No BLOCKED scenario was introduced merely because there is no real PM approval. Approval of this exact artifact is absent and cannot be manufactured in this fictional evaluation.

The source does not define malformed account-source data, a missing account, or a late response handling protocol after the caller has stopped waiting. These are not declared reachable branches of the supplied active-flag flow. No response code, fallback eligibility value, cancellation mechanism, or retry backoff is invented for them. If the source owner adds these behaviors to scope, request-shaper must carry the decisions before this acceptance package is revised. This is an explicit scope limit, not a declaration that those conditions are impossible.

Unsupported assertions excluded during derivation: a server HTTP timeout status, a selected authentication format beyond the supplied middleware, a retry interval/limit, unspecified status codes for unexpected query/body inputs, and physical storage techniques.

For an independent final review, provide this artifact, acceptance.json, and the source path to build-context in a separate context. No independent review was run here. The bounded evaluation permits portable validation only; no managed workspace or approval ledger was initialized or registered.
