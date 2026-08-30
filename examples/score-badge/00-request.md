# Request — Seller score badge, as a shared component

**From:** Sinem Aydoğan — Platform Frontend
**To:** the three teams who currently draw their own
**Date:** 12.10.2026

## Why

Four internal surfaces show a seller's score today: the seller panel, the category management console, the support console and the internal QA tool. All four draw it themselves. They disagree — two round to one decimal, one truncates, one still shows the pre-v2 twelve-month average because it reads a cached field nobody deprecated.

Support has escalated this twice: an agent reads a seller a number that does not match what the seller sees in their own panel.

We have shipped two shared components before (the address block and the order-state chip), and this is the same shape. What follows is the same set of answers those two needed.

## What it is

A read-only badge component that renders a seller's score and its three components. It fetches nothing: the host passes the values in. It owns rendering and nothing else.

## Who integrates it, and what they must supply

The host supplies the three component values, the date range, the last-calculated timestamp, and a display density (`compact` or `full`). Nothing else is accepted.

- **If the host passes no density**, it renders `full`.
- **If the host passes a value the component does not recognise**, it renders `full` and logs once per mount. It does not throw. A wrong prop must never take a host page down — that was the lesson from the order-state chip.
- **If a component value is absent**, the badge renders that component's slot as "not enough data" and still renders the other two. Absent is a value, not an error.
- **If the timestamp is older than 48 hours**, the badge shows a staleness marker. 48 is the number the seller panel already uses.

## What the host may not override

Colour, the rounding rule, the wording of the three component labels, and the staleness threshold. Those are the four things that differ across the four surfaces today, and unifying them is the entire point. Layout width and density are the host's.

## Versioning and switching it off

Semantic versioning, published to the internal registry, and **the current major is supported for twelve months after the next one ships** — the address block's window, which nobody has complained about.

Behaviour cannot be changed remotely: it is a build-time dependency, and pretending otherwise would be a lie about what a rendered component can do. A host that needs a fix takes a patch release. We publish patches within one working day for anything that renders wrong.

## Success

Today the four surfaces disagree on rounding in **3 of 4** cases and one shows a stale definition. Success is all four adopting the badge within one quarter of publication and support recording **zero** score-mismatch escalations in the quarter after that. Support tags those escalations already, so the count exists before and after.

## States

Default, compact, one component missing, all three missing, stale, and a value out of the expected range. The last one renders the number as given and marks it — we do not silently clamp, because a wrong number is a bug in the caller and hiding it makes it permanent.

## Not this

No fetching. No links. No tooltip explaining the score — that copy belongs to the seller panel and duplicating it means two texts drifting. No write path of any kind.

## Copy

Component labels are fixed: `On-time delivery`, `Seller-caused cancellations`, `Product reviews`. Missing: `Not enough data`. Stale: `Updated {n} days ago`. These are the seller panel's approved strings, reused deliberately.

## Accessibility

WCAG 2.2 AA, the internal baseline for shared components. The staleness marker cannot be colour alone; it carries text.

## Instrumentation

The badge emits nothing. Hosts already instrument their own pages, and a component that emits its own events puts a second, differently-shaped record next to theirs. If we later need adoption numbers, the registry already reports which versions are installed where.

## Open

- Whether the QA tool is in the first wave. Its owner is on leave until the 24th.
- Whether "not enough data" and "the host passed nothing" should look different. I think not; I have not tested it with anyone.
