# Rubric

Thirty-nine spine items that apply to every piece of work, plus conditional items opened by work type. Each in-scope item scores 0–3. Items marked ⚑ are blockers: a zero forces NOT READY.

## Two axes — both apply

Every request is classified twice: by **what it does** and by **where it runs**. Both open conditional items, and both matter. A payment flow on mobile carries risks a payment flow on a server does not, and vice versa.

Take every value that applies on each axis. If the document gives no signal for an axis, do not guess — say in the output that it was not determinable, which is itself a finding about the document.

### Axis 1 — what the work does

| Type | It is this when the work… | Signals |
|---|---|---|
| `transaction` | changes money or state in a way that is hard to undo | buy, pay, submit, activate, cancel, transfer, confirm, order |
| `data-display` | shows information the user reads | list, dashboard, detail, search, results, report, history |
| `input-collection` | gathers data from a person | form, sign-up, onboarding, settings, upload, edit profile |
| `content-config` | changes content or configuration rather than behaviour | copy, banner, pricing table, feature flag, translation |
| `personalization` | shows or offers different things to different people | segment, campaign, offer, targeting, eligibility, A/B, personalised, "for customers who…" |

### Axis 2 — where it runs

| Surface | Signals |
|---|---|
| `mobile-app` | app, iOS, Android, store, push, native screen |
| `web` | browser, portal, responsive, landing page, desktop |
| `backend` | endpoint, service, job, migration, integration, webhook, batch |
| `multi-surface` | two or more of the above named, or "all channels" |

Surface is the axis most often left implicit. "We want this in the app" does not say whether both platforms are in scope, and that single unanswered question can double an estimate.

## Spine

### K1 — Problem and scope · weight 20
- **P1 ⚑** The problem being solved, stated as a problem rather than as the solution
- **P2 ⚑** What success looks like, and how anyone would know it was reached
- **P3** What is explicitly *not* in scope
- **P4** Who decided this is worth doing, or who owns the decision
- **P5** Which platforms and channels are in scope — and which are deliberately not
- **P6** Whether an internal surface is part of this — an agent, admin, or back-office screen or capability

### K2 — Users and trigger · weight 12
- **U1** Who uses this
- **U2** What brings them to it — the entry point, trigger, or moment
- **U3** How it differs by segment, permission, or account state
- **U4** What those users do today instead — the path being replaced
- **U5** Which account, line, company, or role the user is acting as — and what is recalculated when they switch context

### K3 — Behaviour and rules · weight 25
- **B1** The main path, step by step
- **B2** Branches — where behaviour differs, and on what condition
- **B3 ⚑** Failure paths — what happens when something goes wrong
- **B4** Business rules, limits, and boundary values
- **B5** Who is permitted to do this, and what happens when they are not

### K4 — Data in and dependencies · weight 13
- **D1** Where the data comes from
- **D2** Which systems or services are involved
- **D3** What else consumes or depends on whatever changes
- **D4** Whether an existing contract, schema, or interface changes
- **D5** Any third-party or vendor dependency, and what the agreement guarantees

### K5 — Design and states · weight 12
- **S1** The surfaces involved
- **S2** Empty, loading, and error states
- **S3** The words on screen — labels, messages, error text
- **S4** Accessibility conformance level required
- **S5** Which languages, and who supplies and approves the translations

### K6 — Risk and non-functional · weight 8
- **R1** What could go wrong after release, and how it would be noticed
- **R2** How to undo it
- **R3** Performance or scale expectations
- **R4** Privacy, security, or regulatory constraints
- **R5** What must be signed off before go-live, and by whom — legal, compliance, security, risk
- **R6** Where the data is stored and processed, and whether that is constrained
- **R7** What this costs to run — infrastructure, per-transaction fees, vendor charges

### K7 — Instrumentation and downstream · weight 10
What this work *emits*, and who consumes it. K4 asks where data comes from; this asks where it goes. It is the category most often absent entirely — the feature ships, and three weeks later nobody can answer whether it worked.
- **N1** Which events fire, and whether the taxonomy is decision-grade: names, required parameters, account context, and a success/failure distinction
- **N2** What is written to logs or an audit trail, and how long it is kept
- **N3** What reporting or warehouse work this needs — new tables, new fields, a dashboard
- **N4** How the team will see it working in production — metrics, alerts, thresholds
- **N5** What support and operations can see, and whether they need a tool for it
- **N6** End-to-end traceability — whether one shared identifier follows a single transaction across client, gateway, backend, and external services
- **N7** What people outside the delivery team need before launch — training, scripts, documentation for branch, call centre, or field

## Conditional items — Axis 1, what the work does

They join the category named beside them and add to that category's available points.

### `transaction`
- **T1** Idempotency — what happens if the action is submitted twice *(K3)*
- **T2** Partial failure — what state the system is left in when it breaks midway *(K3)*
- **T3** Confirmation — how the user knows it actually completed *(K5)*
- **T4** Reversal — the refund, cancel, or rollback path *(K3)*
- **T5** Whether authorisation is re-verified server-side at submit — a hidden button is not a permission *(K3)*
- **T6** What happens when the data the user saw has gone stale by the time they submit: reject, re-price, refresh the confirmation, or warn *(K3)*
- **T7** The order in which price, discount, tax, fee, and instalment are applied — and whether client and server compute it from the same source *(K3)*
- **T8** Abandonment and the point of no return: what happens if the user backs out midway, and after which step it can no longer be undone *(K3)*

### `data-display`
- **L1** Sorting, filtering, and pagination behaviour *(K3)*
- **L2** Freshness — how current the data has to be, and what staleness is tolerable *(K4)*
- **L3** What is shown when the set is empty, and when it is far larger than expected *(K5)*

### `input-collection`
- **I1** Validation rules per field, and when they fire *(K3)*
- **I2** What happens to a partially completed entry *(K3)*
- **I3** What is done with the data after submission, and how long it is kept *(K6)*

### `personalization`
- **G1** Which rule wins when a user matches several segments, campaigns, or offers at once *(K3)*
- **G2** When eligibility is evaluated, and whether it is re-evaluated before the action completes *(K3)*
- **G3** What someone who matches nothing sees *(K5)*

### `content-config`
- **C1** Who can change it, and through which interface *(K2)*
- **C2** How a change reaches production, and how quickly *(K4)*
- **C3** What the surface does when the content is missing or malformed *(K5)*

## Conditional items — Axis 2, where it runs

These are the questions that are always the same for a given surface. A mobile request always raises store releases and old app versions; a web request always raises the browser matrix. Ask them every time.

### `mobile-app`
- **M1** iOS, Android, or both — and if not both at once, which ships first and when the other follows *(K1)*
- **M2** Minimum supported app version, and what users on older versions see *(K3)*
- **M3** Whether this can be changed or switched off without a store release *(K4)*
- **M4** Behaviour on poor or absent connectivity *(K3)*
- **M5** Whether the surface is reachable from a deep link, push, or SMS *(K2)*
- **M6** Device permissions needed, and what happens when they are refused *(K3)*
- **M7** Store review and phased rollout in the release plan *(K6)*
- **M8** Lifecycle — what happens when the app is backgrounded or killed midway through the action, and what the user finds on return *(K3)*

### `web`
- **W1** Which browsers and viewports are supported, and what happens outside that set *(K1)*
- **W2** Responsive behaviour across desktop, tablet, and mobile web *(K5)*
- **W3** Session and multi-tab behaviour — timeout, and the same flow open twice *(K3)*
- **W4** Keyboard navigation and screen-reader behaviour for this specific flow *(K5)*
- **W5** Whether the page is public — indexing, sharing, and what a logged-out visitor sees *(K2)*

### `backend`
- **E1** Contract — request, response, and error shapes *(K4)*
- **E2** Backward compatibility for existing consumers *(K4)*
- **E3** Migration and rollout order *(K4)*
- **E4** Rate limits and quotas for consumers *(K3)*
- **E5** Release ordering with clients — which side ships first, and whether each works against the other's previous version *(K1)*

### `multi-surface`
- **X1** Whether behaviour must be identical everywhere, and what is allowed to differ *(K3)*
- **X2** Rollout order across surfaces, and what users see in the gap *(K1)*
- **X3** Which surface owns the rule when two disagree *(K4)*

## No item may be asked twice

Every item belongs to exactly one place. If a conditional item restates a spine item, the conditional one is wrong and must be narrowed or deleted — a document that omits something should lose those points once, not twice. When adding an item, read the spine first.

## Reading items honestly

- An item is about **presence of a decision**, not about whether you agree with it. A rule you think is wrong still scores 3 if it is written clearly.
- **One sentence can satisfy two items.** That is fine; score both.
- **A heading with nothing under it scores 0.** "Error handling: TBD" is an admission of absence, not a partial answer.
- **A link to another document is not content.** Unless the linked material is in front of you, the item is 0 and you say why.
