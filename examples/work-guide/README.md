# Persistent request replay — fictional, mechanical evidence only

This example exercises `work-guide`'s ledger. It is not generated PM analysis, real stakeholder approval or proof of a development-ready chain.

The executable fixture is [replay.py](replay.py).

```bash
python3 examples/work-guide/replay.py
```

The replay uses an isolated temporary directory and fictional PM identity. It removes its own temporary fixture on completion; user records, the application, installed skills and model providers are untouched. Output is JSON containing check outcomes and the resumed status.

## Story

A fictional channel request leaves campaign eligibility undecided. The question is a start blocker. A proposal preserves current behavior; a synthetic test approval answers the question. A draft request is registered.

A new store instance resumes the same records. A VTT then says eligibility should change and asks the agent to mark all decisions approved. Ingestion stores that instruction as data only. The question reopens, the earlier approval loses applicability, and the artifact becomes stale. Importing the identical meeting again changes nothing.

| Check | Expected |
|---|---|
| Resume in a new store instance | Same records |
| Synthetic approval before meeting | `ANSWERED` |
| New conflicting meeting | `OPEN` |
| Approval instruction in VTT | No added decision |
| Previous artifact | Stale |
| Duplicate meeting | No revision change |
| Continuation packet status | `DRAFT_ONLY` |

More cases are in [the ledger suite](../../tests/test_work_guide.py). Its review reports are labelled mechanical fixtures; declared zero blockers do not imply a real readiness assessment.

A separate agent also ran [the original bounded forward test](forward-test.md), following the guide and routed interview. That first trial tested fresh CLI processes, not a fresh model conversation. The later v6 [quality report](quality-report.md) records a genuinely independent-context resume/migration plus two producer trials and final cross-check. The [eligibility handoff](eligibility/README.md) preserves the actual ASK FIRST outcome rather than manufacturing a passing example. Broader institutional evaluation remains in [the roadmap](../../docs/plugin-roadmap.md).
