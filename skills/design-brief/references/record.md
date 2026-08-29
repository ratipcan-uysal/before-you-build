# The decision record

Ten parts, in order. Examples are drawn from a one-tap repeat transfer in a banking app — rewrite them against the material in front of you.

## 1. Surfaces

Every surface the feature touches, including the ones it only borrows. Name each and say in one clause why it exists.

> **Home screen (existing)** — hosts the entry point; not owned by this feature
> **Recipient list** — a region of the home screen, not a separate screen
> **Confirmation** — the only surface this feature adds
> **Empty state** — the same region, before the customer has ever sent money

Getting this list wrong is the most expensive error in the record: a surface nobody named gets designed by whoever notices it last.

## 2. The primary job of each surface

One verb phrase per surface. *If someone did exactly one thing here and left, what was it?*

> **Recipient list** — choose who to send to
> **Confirmation** — confirm the amount is right before it leaves

If a surface needs two, either it is two surfaces or one job is secondary. Say which, explicitly. A surface with two equal jobs is the reason people describe an interface as busy without being able to say why.

## 3. Information hierarchy

Rank what appears, 1 to n, per surface. Rank forces the decision that "prominent" avoids.

> **Confirmation:** 1 recipient name · 2 amount · 3 source account · 4 the action · 5 the way out
>
> Recipient outranks amount deliberately: sending the right figure to the wrong person is unrecoverable, sending the wrong figure to the right person is a phone call.

Always give the reason for the top rank. That sentence is what a designer defends the layout with in review.

## 4. Navigation model

How someone gets in, how they get out, and what the system does when they are interrupted.

> **In:** home screen, always visible when at least one recipient exists
> **Out:** back returns to home with nothing sent; there is no partial state to preserve
> **Deep link:** `[DECISION NEEDED]` — can a push or SMS open this directly? Product decides; it changes whether the surface must work without the home screen loaded
> **Interrupted:** app killed mid-confirmation returns to home, nothing sent

The interrupted row is the one most briefs omit and most users encounter.

## 5. Input model

What the person must supply, in what order, and what may be deferred.

> **Required:** recipient, amount
> **Order:** recipient first; the amount field is unreachable until one is chosen
> **Deferrable:** none — this flow has no optional input, by design
> **Pre-filled:** the amount, from the last transfer to that recipient

Where a value is pre-filled, say where it comes from and how it is corrected. A pre-filled field the user cannot see themselves changing is a field they will get wrong.

## 6. Defaults and decision points

Every place the system decides on the user's behalf, with the cost of that default being wrong.

> **Source account** — `[DECISION NEEDED]` for customers with more than one. Product decides. Wrong default sends from the wrong account: recoverable but alarming
> **Amount** — defaults to the last one sent. Wrong default sends the wrong figure with one tap, which is why the amount is rank 2 and editable in place

A default with no stated cost has not been thought about.

## 7. System feedback

How the person knows what is happening, at each moment that matters: in progress, succeeded, failed, still pending.

> **In progress:** inline on the confirmation surface; the surface does not close until resolved
> **Succeeded:** `[DECISION NEEDED]` — the material defines failure and never defines success. In a one-tap flow this is the top cause of sending twice
> **Failed:** the material says account history only. Recorded as decided, and flagged: a failure the user does not see is a failure they repeat
> **Pending beyond five minutes:** not defined

Name the states the design must account for. Sweeping every combination is `state-matrix`.

## 8. Binding constraints

What the design cannot violate, each with its source — and say whether the source is the material or you.

> **Surface:** mobile first, web later — both must be designed, only one ships in Q3 *(material)*
> **Accessibility:** `[DECISION NEEDED]` — no level stated; assume nothing *(gap)*
> **Offline:** not defined *(gap)*
> **Design system:** not stated; assume the existing app's *(assumed)*

An assumed constraint and a mandated one look identical in a brief and are completely different in a review.

## 9. Non-goals

What this design must **not** do. The section that survives contact with a stakeholder who wants one more thing on the screen, and with a generator that will happily add it.

> Not a contacts picker — the list is derived from history only
> Not a transfer management surface — no editing, scheduling, or repeating in bulk
> Not a replacement for the full transfer flow, which remains reachable and unchanged

## 10. Done criteria

What makes this design correct, in terms someone can check.

> A customer who has sent money before can repeat a transfer without reading anything
> No one can complete a send without having seen the recipient's name and the amount together
> Every state in part 7 has a designed screen, including the ones marked `[DECISION NEEDED]` once decided

## Decisions still needed

Collect every `[DECISION NEEDED]` here rather than leaving them scattered, so a designer can see in one glance whether they can start.

| Decision | Who settles it | What it blocks |
|---|---|---|
| Source account for multi-account customers | Product | The confirmation layout |
| How success is signalled | Product + UX | The whole confirmation surface |
| Accessibility level | UX | Type scale, contrast, target sizes |
