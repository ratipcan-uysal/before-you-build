# Attack lenses

Fifteen lenses, ordered as an **escalation ladder**. Tier 1 finds problems that are cheap to fix; Tier 3 asks whether the idea should exist. Opening at Tier 3 reads as nihilism and shuts the conversation down before it produces anything.

Never work down the list in order. Each turn, pick the lens that cuts the **weakest link in the defense as it currently stands**. Most grills use four to seven lenses total.

The phrasings below are illustrations, not scripts. Rewrite each one in the user's own terms — a provocation that quotes their words back at them is far harder to dodge than a generic one.

## Tier 1 — Frame and assumptions (cheap to fix)

**1. Frame challenge** — is this even the right question?
> "You are solving for X. Who decided X was the problem? What happens to this whole idea if the real problem is Y?"

**2. Assumption excavation** — what has to be true for this to work?
> "List what must hold for this to succeed. Now: which of those is the one you have the least evidence for?"

**3. First principles** — delete the solution, find the problem.
> "Forget the feature. Describe the problem in one sentence, with no reference to your solution. Does the solution still follow?"

**4. Definition audit** — the load-bearing word nobody defined.
> "You said this makes onboarding 'better'. Better measured how? If you cannot name the number, how will you know this worked?"
> **And where they did name numbers, divide them by each other before you accept them.** A total over its own base — per store, per week, per person — turns a headline into a rate somebody has to recognise, and a rate nobody recognises is a definition problem the total was hiding. On a measured run every sharp finding in the session came out of one such division.

**5. Prior art** — has someone already solved this?
> "Who has built this already, and what did they learn? If a product exists that does 80% of it, what makes building beat buying?"
> The cheapest lens in the catalogue and the most often skipped. A good answer here can end the conversation in five minutes, either way.

## Tier 2 — Structure and consequences

**6. Inversion** — how would you guarantee failure?
> "If I wanted this to fail quietly, what would I do? Is any of that already true here?"

**7. Stakeholder rotation** — attack from a specific hostile seat.
> Rotate through: the skeptical finance lead, the engineer who has to maintain it, the customer who did not ask for it, the competitor who benefits, the regulator who reads it later, the support agent who takes the calls.
> "Argue against this the way the engineer who inherits it would. What is their strongest objection?"

**8. Second-order effects** — and then what?
> "It ships and works exactly as designed. What happens next? And after that? Who or what does it quietly make worse?"

**9. Base rate** — how does this class of thing usually go?
> "How often does this kind of bet actually pay off in this kind of organization? What makes you the exception rather than the average?"

**10. Unit economics** — does the value exceed what it costs to deliver?
> "Per user, per transaction, per month — what does this cost to run, and what does it return? At what volume does that flip?"
> Distinct from opportunity cost: that asks what else you could do, this asks whether the thing pays for itself at all.

## Tier 3 — Existential (use late)

**11. Opportunity cost** — what does this displace?
> "Doing this means not doing something else. What is that something else, and are you sure this beats it?"

**12. Premortem** — it already failed.
> "It is six months from now and this is the thing nobody wants to talk about. Write the autopsy. What does it say?"

**13. Falsification** — is this a hypothesis or a belief?
> "What evidence would make you drop this? If nothing would, we are not evaluating an idea — we are defending a commitment."

**14. Permission to operate** — is this even allowed?
> "Is there a rule, a licence, or a contract that makes this impossible as described? Not 'how would we comply' — could we be told no?"
> Only the kill version belongs here. *How* to comply is an execution question and belongs to `risk-interrogate`.

**15. Reversibility** — what does being wrong cost?
> "If this is wrong, when do you find out, and what does it cost to undo? Is this a door you can walk back through?"

## Choosing well

- **Follow the crack, not the ladder.** If a Tier 1 answer exposed a fragile assumption, stay there until it holds or breaks.
- **Do not repeat a lens that already landed cleanly.** Re-asking a question the user answered well reads as not listening.
- **Escalate only when the lower tiers hold.** Reaching Tier 3 on an idea that already failed Tier 1 is piling on.
- **One lens per turn.** Two lenses in one message is two questions wearing a coat.
- **Merit only — and merit includes the mechanism the value rests on.** Where the thing being sold *is* a calculation, a rule, or an eligibility test, whether that test can be computed at all is not an operational question to be handed on: an idea whose central mechanism cannot be performed has failed here, not downstream. The boundary holds for what happens around a working mechanism.
- **Merit only.** These lenses ask whether the idea should exist. Security posture, privacy compliance, operational cost at scale, and monitoring are execution questions — they belong to `risk-interrogate`, which runs after the decision, not instead of it. The exception is when one of them is fatal rather than merely hard: "we would not be permitted to do this at all" kills an idea and belongs here.
