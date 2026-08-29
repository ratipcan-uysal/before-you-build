# before-you-build

**Building is cheap now. Deciding what to build is still the bottleneck.**

A set of Claude Code skills for the work that happens before a single line of code: challenge the idea, shape the request, measure whether it is actually ready, and extract the design decisions that make the difference between a screen that looks right and one that *is* right.

These skills are deliberately hard to please. A model asked to review something will usually find a way to approve it — that is the failure this repo is built against.

## Install

```bash
/plugin marketplace add ratipcan-uysal/before-you-build
/plugin install before-you-build
```

Then just describe what you have. The skills trigger on their own, or run `/byb` to be routed.

## Where to start

There is no single front door. What you reach for depends on what landed on your desk.

| What arrived | Can you argue with it? | Start here |
|---|---|---|
| An idea nobody has committed to — yours | yes | `idea-grill` |
| A request from a business unit or a client | on their behalf | `idea-grill` in proxy mode — the output is the questions to take back to them |
| A half-formed request that needs writing up | — | `request-shaper` |
| A document from another team, and the question is "is this enough?" | — | `readiness-score` |
| A decision made above you | no | `risk-interrogate` — you cannot debate it, you can still say what will break |
| A change to something that already exists | no | `impact-radar` |

Most of the work inside an organisation is the rows where the answer is *no*. The set is built for those too, not only for the founder defending their own idea.

## The chain

```mermaid
flowchart TD
    idea([a raw idea]) --> IG[idea-grill]
    IG -->|survives| RS[request-shaper]
    RS --> SC{readiness-score}
    SC -->|not ready| RS
    SC -->|risks unclear| RI[risk-interrogate]
    RI --> RS
    SC -->|ready| FM[flow-map]
    FM --> FG[flow-grill]
    FG --> DB[design-brief]
    DB --> SM[state-matrix]
    SM --> UX[ux-grill]
    UX --> DM[decision-memo]
    DM --> out([now build it])
    change([changing something that already exists]) --> IR[impact-radar]
    IR --> RS

    classDef shipped fill:#1f6f43,stroke:#0d3a23,color:#fff
    classDef planned fill:#2b2b2b,stroke:#555,color:#bbb,stroke-dasharray:4 3
    class IG,RS,SC shipped
    class RI,FM,FG,DB,SM,UX,IR,DM planned
```

Nothing forces you to run the whole chain. Most sessions use one skill.

## Skills

| Skill | Answers | |
|---|---|---|
| [`idea-grill`](skills/idea-grill/SKILL.md) | Should we build this at all? | ✅ |
| [`request-shaper`](skills/request-shaper/SKILL.md) | What exactly are we building? | ✅ |
| [`readiness-score`](skills/readiness-score/SKILL.md) | Is it ready to build? (0–100 + verdict) | ✅ |
| `design-brief` | What should the screens actually do? | soon |
| `ux-grill` | Is this design right? | soon |
| `risk-interrogate` | What breaks in production? | soon |
| `flow-map` | What happens, in what order, including the unhappy paths? | planned |
| `flow-grill` | Is the flow logically complete? | planned |
| `state-matrix` | Which states did we forget? | planned |
| `impact-radar` | If I change this, what do I break? | planned |
| `decision-memo` | How do I get a decision made? | planned |

**Producing** and **grilling** are always separate skills. A model that generates a design and then reviews it will approve its own work — not from vanity, but from the ordinary pull of consistency. `design-brief` decides; `ux-grill` attacks. They never run in the same breath.

## See it working

[A full `idea-grill` session](examples/idea-grill-session.md) — a fictional team wants to add an AI support chatbot. Four questions later it turns out they have a screen problem, not a chatbot problem, and they had never looked at their own ticket data.

## The method

Eight principles the skills are built on — steelman before you strike, one question at a time, silence is never consent, named verdicts instead of vibes. [`docs/method.md`](docs/method.md).

The one worth stealing even if you never install this: **if the document does not say it, it scores zero.** Something counts as out of scope only when the document positively says so, quoted. Absence is never coverage.

## Status

`v0.3` — `idea-grill`, `readiness-score`, and `request-shaper` are complete and in use. The rest of wave one (`risk-interrogate`, `design-brief`, `ux-grill`) is being written now; wave two follows. This repo is public from the first commit, so you are seeing it get built.

Each skill ships with its trigger and boundary tests in [`evals/triggers.yaml`](evals/triggers.yaml), checked in CI. Boundary tests matter more than trigger tests: eleven skills with overlapping descriptions fail by firing the wrong one, and the user never finds out why the answer was off.

## Origin

Built by **Ratip Can Uysal**.

Distilled from a private toolkit developed over years of enterprise product analysis — the kind of work where a request that looks finished turns out, three weeks into development, not to have been. This is the methodology rewritten from scratch, in the open, with none of the corporate specifics that made the original unpublishable. What survived the move is the part that was never company-specific anyway: how to refuse to fill a gap, and how to tell someone their idea did not hold.

Issues and skill proposals welcome.

## License

MIT — see [LICENSE](LICENSE).
