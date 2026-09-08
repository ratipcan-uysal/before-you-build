# Before You Build — PM / BA workspace

An early working product, not a claim of production readiness. The canonical fifteen skills remain in the parent repository. This application adds persistent requests, evidence, explicit PM decisions and guarded handoff around them.

## What works

- Multiple owner-scoped requests with industry context and surface selection.
- UTF-8 TXT/Markdown and Teams VTT import; timestamps, speakers, content deduplication and exact evidence references.
- Separate questions, answers, proposals, rejections, revision-specific PM approvals and history.
- Immutable analysis revisions. New sources/approved decisions conservatively stale **all analyses in that request**, never other requests.
- Readiness calculated from the canonical rubric, with full item coverage, evidence checks, blocker override, assumption caps and preserved reports. An unscorable input gets no invented number.
- Request shaping → scope → UX decisions / flow → wireframes and independent reviews → data → API needs → risk questions → technical decisions → acceptance scenarios → handoff review. Backend-only work does not require screens.
- Skill work packets for a fresh external LLM conversation and structured result import. Architecture, wireframe creation and acceptance drafting are explicitly application extensions, not new canonical skills.
- Draft export and a guarded implementation handoff. No transcript or imported JSON can perform a PM approval.
- Read-only, feature-detected WebMCP state exposure; no agent-accessible approval operation.

## What this version does not claim

There is **no automatic model call**, live recording, Jira/Confluence/Figma/repository connection or automatic MCP installer. Download the stage packet, run it in a fresh LLM conversation, then import the returned JSON. There is no simulated AI success when this has not happened.

Review independence is a declaration, not runtime-proven isolation. Exact quotation and arithmetic checks cannot prove that evidence means what an assessor claims. PM review remains necessary. Structured path tests are not model-quality evaluations.

The UI renders textual wireframes and reports, not Figma frames or image attachments. A legal/security question answer is not an institutional sign-off workflow. Single-PM ownership, no team delegation, no retention/deletion UI or backup-restore facility yet. Do not treat this private pilot as institution-approved storage for regulated material.

## Run locally

Node 24 recommended. From this directory:

```sh
npm ci
npm run build
npx wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flawless_leo.sql
npm run dev
```

Apply the initial migration once per local database, not every restart. Open `http://localhost:3000`, then use **Oturum aç** for Sites' local test identity. Authentication headers are trusted only behind the Sites dispatcher; never expose a raw Worker directly as the production origin.

No model API key is needed for packet mode. Do not put credentials in requests or transcripts. Records live in D1, not browser storage. Text source limit: 120,000 characters, 40 sources per request; API body: 750,000 bytes; stored request: 1.5 MB; workspace: 100 requests.

## Verification

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run test:integration # requires local server; creates synthetic local records
```

Also run `python3 scripts/validate.py` at repository root. Lint excludes the generated shadcn primitives and its mobile hook; all application logic, route code, tests and scripts are checked. The default tests verify structural policy, not real PM judgment. No browser visual/accessibility audit has been performed.

At implementation time, production-dependency audit reported zero known vulnerabilities. Four moderate transitive development-tool findings remain in the Drizzle migration generator's old esbuild loader. No forced downgrade was applied. Do not run that dependency's development server; recheck before dependency changes.

## Packaging

The existing GitHub repository is the development source. Sites receives an isolated deployment checkout; no second development repository is needed. `node scripts/prepare-deployment-source.mjs /absolute/empty/staging-directory` copies only this app and the canonical skill sources, with per-file hashes. Generated bundles, local databases, environment files, parent documents and presentations are excluded. Build and commit that exact isolated checkout before using the Sites packaging helper. The hosted archive includes generated Drizzle migrations, never local records.

## Next product increments

1. Add resumable agent execution with structured outputs, isolated review runs, cost controls and source disclosure before any external model call.
2. Add organization context packs, stakeholder obligations and evidence-linked approval records; validate banking and telecom with separate held-out scenarios.
3. Add dependency-level invalidation, change-impact analysis and human-readable document diffs.
4. Add opt-in repository / issue tracker / design connections with scoped credentials and a PM-guided setup check.
5. Add retention, deletion, export/restore, operational monitoring, model evaluations and keyboard/mobile/assistive-technology tests before an institutional pilot.
