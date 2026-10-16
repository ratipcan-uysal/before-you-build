# FICTIONAL evaluation — eligibility lookup

All organizations, decisions and approvals below are synthetic test input, not real PM authorization. The exercise may produce draft artifacts only; do not install anything or call a live backend.

## Decided scope and constraints

A backend-only lookup tells an authenticated customer whether their account is active. No UI, money movement, stored write, migration or third-party call is part of this slice. The account source and authentication middleware already exist in this fictional test setting. The coding agent must not redesign authentication or storage.

R1: A request authenticated by the supplied bearer middleware reads that customer's account only; it returns eligible=true and reason=ACTIVE when active, otherwise eligible=false and reason=INACTIVE.
R2: Missing or invalid authentication returns HTTP 401 with JSON {"code":"AUTH_REQUIRED"}; no account read occurs and there is no automatic retry.
R3: Unavailable account source returns HTTP 503 with JSON {"code":"UNAVAILABLE"}; no eligibility value is returned. A manual retry is permitted, never automatic.
R4: The caller waits at most 2000 milliseconds, then treats the result as unknown and may retry manually. The lookup is read-only; repetition causes no business side effect.
R5: The response reflects the account state at the lookup read. A later account state change does not rewrite an earlier response. No cache is used in this slice.

The endpoint name is decided: GET /v1/eligibility. The customer identity comes exclusively from the middleware; there are no query/body inputs and the portable request object is {}. A 200 response has exactly eligible (boolean) and reason (ACTIVE or INACTIVE); both are required. Error bodies have exactly code. No response adds customer identifiers or balances. This is a new endpoint; no existing response shape changes. Authentication secrets must not appear in examples or logs.

## Reviewed fictional flow

F1 (happy, R1): Invoke the supplied bearer middleware.
F2 (happy, R1/R5): Read the authenticated customer's account active flag once.
F3 (branch, R1): Return the corresponding eligible/reason pair.
E1 (error, R2): On authentication failure, return 401 AUTH_REQUIRED without performing F2.
E2 (error, R3): On account-source failure, return 503 UNAVAILABLE without an eligibility result.
E3 (error, R4): On caller timeout, report unknown outcome; manual retry only.

The fictional review declares these paths decided; it does not supply an actual institutional approval. For this exercise, derive acceptance or contract artifacts from these exact statements and expose any remaining necessary decision without choosing it silently.
