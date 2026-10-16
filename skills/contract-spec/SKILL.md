---
name: contract-spec
description: Complete decided API needs into explicit interface contracts, error semantics and validated examples. Use for "finalize this API contract". Do not use to invent a flow, choose architecture, infer institutional standards, or implement a service.
---

# Contract Spec

Make interface decisions explicit enough that the builder need not invent them.

## Not this skill

- Deriving backend needs → `api-needs`.
- Missing entities or lifecycle rules → `data-model`.
- Missing product behavior → `request-shaper`; missing flow → `flow-map`.
- Acceptance scenarios → `acceptance-spec`; final cross-document review → `build-context`.
- Persistent approvals and source versions → `work-guide`.
- Do not choose a framework, database engine, topology or deployment architecture.

## 1. Establish authority and paradigm

Read [the contract format](references/format.md), then the exact scope, reviewed flow, approved data model, API needs and supplied organization conventions. State versions and unknowns. If the source flow has an unresolved failed audit, carry that blocker rather than designing around it.

Ask which protocol/paradigm, naming/version rules and authorization conventions bind the work when they are not supplied. With nobody to answer, leave those choices `[DECISION NEEDED]`, draft the known needs only, and do not label the contract complete. An unknown protocol means a prose-only draft, not a guessed value in the machine format. Do not assume REST or bearer authentication.

The portable BYB contract is not an OpenAPI document. If the caller needs OpenAPI, AsyncAPI or another standard, use the exact requested version and an available appropriate validator; do not rename BYB JSON and claim standards compliance. Keep the source guarantees traceable in either representation.

## 2. Specify the guarantees

For every operation or message, derive:

- The originating flow steps and requirements.
- Request/response fields, required values, identity and validation boundaries.
- Authorization and what is rechecked at the operation boundary.
- Success effects and failure effects, including partial completion.
- Error meanings, caller recovery and when retry is permitted.
- Idempotency, ordering, atomicity and consistency requirements.
- Timeout ownership and what an unknown outcome means.
- Compatibility with existing callers and version transitions.
- Valid request/response examples and explicit unresolved questions.

Separate an unknown fact from a proposal. A source can support the need for deduplication without proving an existing endpoint supports it. Name the verification owner; do not convert a proposed guarantee into a platform capability.

If two sources disagree, quote both and carry the conflict to `request-shaper`. Without a decision, keep it open and continue unaffected operations. Never pick the latest document simply because it is latest.

## 3. Validate without inventing

Use the portable validator when `work-guide` is installed. Its standalone `validate-artifact` checks the bounded schema subset, declarations, success and error examples; managed final `check` additionally resolves references against current registered documents. Unsupported schema keywords fail visibly. State which check ran; neither proves backend feasibility. With no managed request, retain source versions and reference mappings in the readable companion instead of creating a ledger implicitly.

Walk each guarantee back to the needs, flow, data or approved convention that requires it. Mark genuinely proposed decisions `[DRAFT]` and list them for PM approval. Do not add a field, operation or dependency merely to make an example work; additions go back through scope approval.

## 4. Deliver

Output the contract, exact source revisions, validated examples, compatibility notes and open questions. If any load-bearing decision remains open, say so prominently and do not call the result implementation-ready.

Pass the contract and source paths to independent `build-context` review. Pass its observable guarantees to `acceptance-spec`. PM approval is of the exact artifact revision, recorded separately by `work-guide`; a generation or validation success cannot create it.

## Operating rules

- **Language:** use the user's language; keep `[DRAFT]`, `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, schema keys and operation identifiers in English.
- **Output:** chat plus a caller-supplied path. If no path was given, offer to save; without an answer, do not write files.
- Keep unknown values open rather than selecting plausible defaults. Do not expose source credentials in examples.
- Use concise index rows and identified detail blocks. Preserve scoped prohibitions and the distinction between decided behavior and implementation freedom.
