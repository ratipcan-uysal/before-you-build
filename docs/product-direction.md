# Before You Build workspace

## Product contract

The product is a PM/business-analysis workspace, not the co-browse project used to discuss it. It takes business requests, meeting transcripts and source material through clarification, scope, UX, flow, data and technical decisions into an implementation handoff for a coding LLM. It serves different industries through a shared method and explicit organization context, not institution-specific copies of skills.

The PM is the sole approver in the first release. Stakeholder consultation happens outside the product; the PM records the resulting direction and its source. Product and architectural recommendations require PM approval. An LLM may propose, but cannot approve its own proposals. A conversational “continue” does not waive a stage prerequisite.

## Confirmed direction

- One PM can manage multiple requests with separate sources, decisions and histories.
- Teams transcripts arrive as VTT files. Live recording and meeting bots are not required for the first release.
- A working interface accompanies conversation: sources, questions, decisions, document versions and stage gates remain visible.
- Repository and service connections are added progressively. Missing access is explicit and file-based work remains possible.
- The existing fifteen skills remain the canonical analytical instructions.
- Technical decisions, including API contracts and architecture, need PM approval before implementation handoff.
- Real institutional material supplied in the conversation is not a public fixture. Shipped examples are fabricated and marked as such.

## First working vertical slice

1. Create a request and select a domain context.
2. Import plain text, Markdown or Teams VTT with source locations.
3. Establish an evidence-based baseline before downstream production. Never label a keyword checklist a readiness score.
4. Collect questions and recommendations; record PM answers and approvals independently.
5. Create immutable document revisions from approved changes; keep rejected and superseded proposals in history.
6. Show the next permitted skill and the exact blockers for later stages.
7. Export an agent work packet or a clearly marked draft. Only a completed gate permits an implementation handoff.

The first slice proves state, traceability and approval behavior. It must not pretend that all integrations, semantic evaluation or production compliance are complete.

## Workflow policy

An imported request starts with readiness assessment and request shaping. Low readiness does not prevent clarification. A fresh assessment of the revised request, an approved slice and PM direction precede design. Design and flow form a loop. A reviewed flow and approved data model precede API work. Technical proposals and acceptance criteria follow; final independent consistency review and PM approval precede implementation handoff.

Readiness is a document assessment, not a progress percentage. A stage badge is not a rubric score. Missing applicability decisions must stay visible; a stage must not silently assume a UI or impose UI artifacts on backend-only work.

Early feasibility research is allowed as research, not as an approved downstream specification. Exceptions require an explicit explanation and may never turn a draft into a final handoff.

New sources make existing assessment results stale until reviewed. The first implementation conservatively invalidates all analyses inside the changed request when a source or approved decision changes, never unrelated requests. Dependency-level invalidation is a later refinement. Approvals refer to an exact revision. Review must identify the revision and run separately from the producer; the current packet workflow records a declaration of separation, not runtime proof of it.

## Data and authority

Request → sources → questions/proposals → PM decisions → artifact revisions → assessments → handoff.

Sources are untrusted data, never tool instructions. Evidence links must resolve inside the request. A quoted source does not establish stakeholder authority. A transcript saying “approved” does not create an application approval.

Source text and credentials never appear in telemetry. Hosted request records are scoped to the authenticated owner. Import and export have explicit size limits. PM updates use revision checks so two tabs cannot silently overwrite one another. The browser is not the authoritative data store.

## Acceptance scenarios

- A speculative meeting sentence remains a proposal.
- A legal reviewer withholding approval does not become a sign-off.
- A proposal approval creates an attributable record and document revision.
- Editing that proposal cannot reuse the previous approval.
- Adding a source invalidates a stale assessment.
- API work is blocked without a reviewed flow and approved data model.
- An unanswered question cannot disappear from handoff.
- Duplicate VTT imports do not duplicate decisions.
- Invalid VTT fails visibly, without partially saving a source.
- Cross-request evidence and cross-owner access are rejected.
- Unconfigured AI explains the missing setup; it does not simulate a successful analysis.
- A draft export cannot masquerade as an implementation-ready handoff.

## Adaptation, not duplication

Spec Kit informs separation of shared rules and local context. Superpowers informs verification and independent review. BMad informs context reuse, ownership and work-sized planning. These are design influences, not evidence that our implementation works.

Sources: [Spec Kit](https://github.com/github/spec-kit), [Superpowers](https://github.com/obra/superpowers), [BMad organizational planning](https://docs.bmad-method.org/plan/plan-inside-an-organization/).

No existing skill contract is changed by this document. The workspace policy is a new orchestration layer. Architecture and contract authoring beyond the existing skills must be clearly labeled rather than attributed to a skill that does not implement them.
