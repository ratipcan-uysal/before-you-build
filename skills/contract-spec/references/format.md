# Portable interface contract

The machine representation is **BYB contract v1**, a deliberately bounded interface-decision format. It is not OpenAPI, AsyncAPI, or a complete implementation of JSON Schema. It can accompany those formats, not impersonate their validation.

Required root fields:

```json
{
  "schema": "byb.contract.v1",
  "protocol": "http",
  "operations": [{
    "id": "getEligibility",
    "name": "GET /eligibility",
    "requirements": ["R1"],
    "flow_steps": ["F1"],
    "request_schema": {"type":"object","properties":{},"required":[],"additionalProperties":false},
    "response_schema": {"type":"object","properties":{"eligible":{"type":"boolean"}},"required":["eligible"],"additionalProperties":false},
    "errors": [{"code":"AUTH_REQUIRED","meaning":"Caller lacks the required authentication; no eligibility result is returned.","retryable":false,"status":"401","response_schema":{"type":"object","properties":{"code":{"type":"string","enum":["AUTH_REQUIRED"]}},"required":["code"],"additionalProperties":false},"example":{"code":"AUTH_REQUIRED"}}],
    "authorization": "Use the exact supplied authorization rule, not this placeholder.",
    "idempotency": "Use the supplied effect/deduplication rule.",
    "consistency": "Specify the supplied freshness/atomicity/ordering guarantees.",
    "timeout": "Specify who times out and what an unknown outcome means.",
    "compatibility": "State which existing clients must remain compatible.",
    "error_policy": "Specify complete wire-level error shape/status mapping here or in an explicitly linked standards contract; do not leave it implicit.",
    "examples": [{"request":{},"response":{"eligible":true}}]
  }],
  "open_questions": ["Illustrative shape only: no protocol, endpoint, auth or timing decision is established by this example."]
}
```

This is a shape example, not a recommended design or completed contract. All material decisions must come from the actual source or an explicit PM-approved proposal. In managed work, open questions prevent final handoff even if the JSON is structurally valid.

`protocol` is `http`, `event` or `rpc`. Operation names carry the exact endpoint, topic/message or method identity. Operation ids are unique. Requirement/flow references resolve against the registered current request and flow. Source versions are carried by the artifact's input manifest, not guessed from prose.

Every operation requires all displayed fields. Error codes must be unique within that operation. Each error supplies its wire status (HTTP code or the decided protocol status), response schema and example; the example is validated against that schema. An empty error list still requires an explicit `error_policy` explaining the decided behavior; it is not evidence that failure is impossible. Success payloads are validated against request/response schemas. Error completeness, status/body meaning, authorization feasibility and compatibility remain semantic review responsibilities.

## Supported schema subset

Types: `object`, `array`, `string`, `integer`, `number`, `boolean`, `null`. Keywords: `type`, `properties`, `required`, `additionalProperties` (boolean only), `items`, `enum`, `minimum`, `maximum`, `minLength`, `maxLength`, `description`. Object schemas require `properties`; array schemas require `items`. Extra properties default to forbidden. Unknown keywords, external references, unsupported combinators and nesting of sixteen or more levels fail visibly. Bounds must match their type and must not invert.

Do not silently remove an unsupported constraint to get green validation. Use the requested standard's validator, or mark the unresolved representation and keep the contract open. Standalone `validate-artifact` validates shape and examples; only managed `check` resolves requirement/flow references against registered inputs. Neither runs a service, proves compatibility, or verifies backend guarantees.

Unknown protocol: output a prose-only `[DRAFT]` with the known needs and the missing decision; do not emit a machine contract with an invented enum value. Standalone source identity, revisions, approval state and the mapping from local ids to document/id/revision belong in the readable companion. In managed work, the artifact input manifest carries them.

## Readable companion

Keep: input revisions; operation index; field semantics; authorization; errors and wire mapping; partial failures and recovery; consistency/retry; compatibility and migration obligations; evidence or PM decision for each guarantee; open questions. Never leave guarantees only in an unreferenced appendix.
