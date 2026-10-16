# Fictional eligibility handoff — a deliberate ASK FIRST

This is an actual bounded independent-agent trial, not a manufactured happy-path showcase. The [raw fixture](../../../evals/fixtures/eligibility-brief.md) supplied scope, five numbered requirements, interface constraints and six flow steps, but no real institutional interfaces or PM approval.

Two separate agents produced [acceptance prose](acceptance.md), [acceptance JSON](acceptance.json), [contract prose](contract.md), [contract JSON](contract.json) and a [contract input manifest](input-manifest.json). A third independent context received only the file paths and produced [the handoff](handoff.md).

## What happened

- Both portable JSON files validated. Acceptance had thirteen SPECIFIED scenarios and six referenced flow steps. SPECIFIED is not approved.
- The contract preserved three open matters: supplied integration interfaces, missing/invalid account guarantees and unexpected query/body behavior.
- Independent final review returned ASK FIRST. It retained those three questions, found one scope-handling disagreement and one incomplete global-prohibition acceptance check.
- The acceptance producer treated unspecified missing-account behavior as future scope; the contract correctly kept its guarantee unresolved. The final reviewer did not choose a side silently.
- A general no-secret-in-logs rule was observed only on authentication rejection. Referencing the constraint did not prove all-path acceptance.
- No PM or stakeholder approval was recorded. No service was built, installed or called.

## Corrections, not rewritten history

Skill instructions now distinguish unsupported input guarantees from genuine exclusions, require global prohibitions to be covered across their scope, and separate missing filenames from missing decision content. Standalone shape validation versus managed cross-reference checking is explicit. Error payload examples now have schemas and statuses; the contract agent reran validation and four negative probes successfully after that correction.

The initial acceptance and independent handoff are preserved, including their defects and unresolved outcome. They are not silently rewritten to look like a successful later run. Filesystem paths were normalized for publication; original output hashes and line labels describe the temporary trial files before publication notices, not normalized copies. The raw source hash remains unchanged.

## Recheck the machine shape

From this repository's root, use an explicit private scratch root; standalone validation does not create it:

```bash
python3 skills/work-guide/scripts/workspace.py --root /ABSOLUTE/PRIVATE/SCRATCH validate-artifact --kind acceptance --file examples/work-guide/eligibility/acceptance.json
python3 skills/work-guide/scripts/workspace.py --root /ABSOLUTE/PRIVATE/SCRATCH validate-artifact --kind contract --file examples/work-guide/eligibility/contract.json
```

This checks shape and examples, not a complete managed ledger, actual backend support, PM authority or semantic completeness. See [the quality report](../quality-report.md).
