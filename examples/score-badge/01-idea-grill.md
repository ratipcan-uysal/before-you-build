# idea-grill — proxy mode

**The request:** `00-request.md` — a shared seller score badge, from Platform Frontend to the three teams asked to adopt it.
**Who is defending:** one of those teams. They did not write the request and cannot answer for Sinem, so what they cannot settle becomes a question to take back rather than a crack in their reasoning.

---

## The request at its strongest

Four surfaces render the same number four different ways, and one of them renders a number that has been wrong since v2 shipped. Support has escalated the disagreement twice, which means it has already cost more than the component will. The rendering rules that differ — rounding, labels, staleness, colour — are exactly the rules a component can own, and the team proposing it has shipped this shape twice and is offering the same answers those two needed rather than discovering them here. Taking the render out of four codebases and putting it in one is the smallest change that makes the four agree.

---

## What holds without the requester

These do not need Sinem's time, and saying so is what keeps the meeting short.

- **The problem is measured, not asserted.** Two escalations, tagged, and a stated 3-of-4 disagreement on rounding. Nobody has to be convinced the problem exists.
- **The integration contract is closed and its defaults fail safe.** Unknown prop renders `full` and logs; a wrong prop cannot take a host page down. That is the answer the order-state chip taught, carried forward rather than relearned.
- **The prohibition list is the point of the work, not a restriction on it.** Colour, rounding, labels and staleness are precisely the four things that differ today; a component that let hosts override them would render the exercise pointless.
- **"The badge emits nothing" is a decision with a reason**, not an omission. A component emitting alongside its host's instrumentation produces two differently-shaped records of the same page.

---

## Where it cracked

**The badge unifies rendering. Three of the four defects are rendering. The fourth is not.**

The request says one surface "still shows the pre-v2 twelve-month average because it reads a cached field nobody deprecated". A component that receives its values from the host renders faithfully whatever it is passed. If the QA tool passes a number from the stale cache, the badge draws that number — in the agreed font, with the agreed rounding, and still wrong.

The defending team could not settle whether that surface is being migrated to the new source as part of adoption or only to the new component. The request does not say, and it is the difference between fixing four problems and fixing three.

That crack lands directly on the success measure. **"Zero score-mismatch escalations" is not reachable by this component alone.** If the QA tool keeps its source, a mismatch survives adoption, the metric fails, and the component is judged to have not worked when it worked exactly as designed.

---

## Questions for the owner

| Question | Who answers | Why it matters |
|---|---|---|
| Does adopting the badge include moving off the deprecated cached field, or only changing the render? | Sinem + the QA tool's owner | The difference between fixing four defects and three — and whether the success metric is reachable at all |
| If a host keeps a wrong source, is that the badge's failure? | Sinem | Decides whether "zero escalations" measures this work or somebody else's |
| Who publishes a patch within one working day, and what happens in the week they are away? | Sinem | Four surfaces now depend on one team's release. The promise is the whole reason hosts accept losing control of rounding |
| Is the QA tool in the first wave? | Its owner, back on the 24th | The request already flags this. Named here so it is not mistaken for settled |

---

## What you would be committing to

Adopting the badge means giving up local control of rounding, labels, colour and the staleness threshold, permanently, in exchange for a one-working-day patch promise from a team of unstated size. That trade is the right one when the promise holds. It is worth asking once who holds it.

---

## Verdict: SURVIVES, NARROWED

Everything load-bearing held. The problem is real and measured, the contract is closed, the defaults fail safe, and the prohibitions are the point.

It narrows on one thing: **this is a rendering-consistency component, not a score-correctness fix.** The narrowed version is the one to write down and the one to measure — *"the four surfaces render the same number identically"*, with source correctness named as a separate piece of work that adoption may or may not include.

The strongest available answer to the crack, which nobody gave in the room: *"the QA tool's migration is a precondition of its adoption, not a consequence — it moves to the new source first, and only then takes the badge."* That keeps the four-defect claim and the zero-escalation metric intact, and it costs one line in the request.

**The cheapest next step:** ask the QA tool's owner, on the 24th, which source that surface reads. One answer decides whether the success measure is reachable.

---

## Defense ledger

| # | Provocation (lens) | Outcome |
|---|---|---|
| 1 | First principles — describe the problem with no reference to the component | held: four renders of one number, two escalations |
| 2 | Definition audit — "success is zero escalations" measured how, from what | held on measurement (support tags exist, before and after), **cracked on attribution** |
| 3 | Frame challenge — is the defect rendering, or is one of them a source? | **cracked.** Three of four are rendering; the fourth is a stale field the component cannot reach |
| 4 | Stakeholder rotation (the team inheriting the dependency) — who keeps the one-day patch promise | owner-question |
| 5 | Inversion — how would you make this fail quietly? Four hosts on four versions | held: twelve-month support window, semantic versioning, registry reports installed versions |

**Next:** the narrowed thesis goes to `readiness-score`, not back to `request-shaper` — the request is already written, and written well enough that the question is whether a team can start from it.
