# api-needs — what the system has to provide

**Derived from:** the 8 marks across 6 steps in `09-flow-map.md` · nouns from `11-data-model.md`.
**What I had:** the documents only. **No access to the system**, so nothing here is `Supported`.

---

## Needs

### N1 — The set of sellers to compute
- **Step:** A2 (`reads`) · **When:** nightly, at the start of the run · **Freshness:** that night's set, from that night's data
- **Atomic with:** nothing · **Repeatable:** yes
- **Feasibility:** **Unconfirmed** — Marketplace Core. Until the set is defined (`flow-grill`, High) the size of this need is unknown too: "all sellers" and "sellers with orders in the window" are two different jobs.

### N2 — The inputs of the three components, per seller and date range
- **Step:** A3 (`reads`) · **When:** nightly, per seller · **Freshness:** data closed to the end of yesterday
- **Atomic with:** the three sources need not be read together, but all three **must cover the same date range**. Components drawn from different ranges and combined into one row mean nothing
- **Repeatable:** yes, and it **has to be** — because of late-arriving data (`flow-map` EA5) the same range read twice can produce different results
- **Feasibility:** three sources, three different situations:
  - Delivery data — **Unconfirmed**, the logistics/order data owner
  - Review data — **Unconfirmed**, already in use today, only the window changes
  - **Cancellations held classified as seller-caused — `Unconfirmed — no owner`.** `request-shaper` marked this `[UNVERIFIED]`; no document names an owner. **30% of the score comes from this data.** If the classification does not exist today, this is not a score project but a data classification project — and a need with no owner is neither confirmed nor refused. It is forgotten, and comes back as the thing nobody built

### N3 — Writing the component values
- **Step:** A5 (`acts`, `emits`) · **When:** as soon as the computation finishes
- **What is written:** the value, **its numerator and denominator**, a reference to the definition version, the date range, a reference to the run, and — where no value could be produced — **the reason** (insufficient data / could not compute), which are two distinct states the design requires to be distinguishable
- **Atomic with:** are a seller's three components written **together** or one at a time? `flow-map` BA2 left this open; **the atomicity decision is that branch**
- **Repeatable:** `[DECISION NEEDED]` — the identity question in `11-data-model.md`. A second write for the same seller-day-type must be either refused or versioned; overwriting silently breaks the slice's explicit rule
- **Feasibility:** **Unconfirmed** — Marketplace Core

### N4 — Writing the run's state
- **Step:** A6 (`acts`, `emits`) · **When:** as the run ends, **and as it dies**
- **What is written:** state (started / complete / partial / failed), timestamps, how many sellers were processed
- **Atomic with:** nothing · **Repeatable:** yes
- **Feasibility:** **Unconfirmed** — Marketplace Core. `flow-grill`'s EA2 Critical closes here: if the run's state is not written, a half-finished day is visible nowhere

### N5 — The panel's read
- **Step:** B3 (`reads`) · **When:** when the seller opens the section, in a single request
- **What comes back:** the latest value of each of the three components, its numerator and denominator, the date range, the reason where there is no value, and **the time of the last completed run**
- **Freshness:** values may be up to a day old by design; **the last run time has to be current** — it is the only thing that shows staleness
- **Atomic with:** nothing · **Repeatable:** yes
- **Feasibility:** **Unconfirmed** — Marketplace Core + the panel team

### N6 — The view event
- **Step:** B4 (`emits`)
- **The need:** naming the event is not mine. These questions have to be answerable: how many sellers looked at this section · what their component values were when they did · **whether the sellers who looked have different delivery performance over the following 30 days from those who did not**
- **Fields:** seller reference, day, the three component values at that moment, the reason where a value is absent
- **Feasibility:** **Unconfirmed** — Deniz + the data team. The third question is the one that tests this slice's **only** claim to be worth building ("so a seller knows what to fix"), and `readiness-score` already scored the success criterion 0

---

## Assumed capabilities

Invisible in a flow: the step reads perfectly.

| Assumption | What settles it |
|---|---|
| **A comparison reference can be computed.** `08-design-brief-v1.md`'s central `[DECISION NEEDED]`: what tells a seller a value is bad? If the answer is "a peer group average" (`prior-art` K1 found that documented elsewhere), that means **a distribution computed per category, per component, per day** — and there is no such step in the flow and no such entity in the model | Nothing closes this line until the reference is decided. "Fixed target" costs nothing; "peer group" is a **second computation job** and `Unconfirmed — no owner`. A whole system workload hiding behind one design decision |
| All three sources use the same date range with the same meaning | The source owners. "An order on 3 August" may mean the order date on the delivery side and the cancellation date on the other |
| Late-arriving data can be detected | The source owners. `flow-map` EA5 asks how often this happens and has no answer |

---

## Anti-requirements

- **The panel does not compute components on read.** Values are the product of the run; computed in the panel, the whole of `data-model` becomes meaningless and two different numbers appear.
- **The panel does not make three requests for the section.** The three components are parts of one thing and would otherwise appear at different ages on screen.
- **The client does not know the "enough orders" threshold.** "Insufficient data" is a server decision; if the client inspects a count and decides for itself, the threshold lives in two places.
- **The client does not average the three components.** There is no blended score in this slice; a well-meaning interface producing an "overall" number brings back the cut decision, and nobody notices.
- **A run does not report partial success as complete.**

---

## Feasibility summary

**6 needs · 0 Supported · 5 Unconfirmed · 1 `Unconfirmed — no owner`** (the cancellation classification in N2), plus a second ownerless item among the assumed capabilities (the peer group reference, depending on the decision).

Zero `Supported` is a fact, not a judgement: I have not seen the system. **The two ownerless items are a different thing.** A need with no owner is neither confirmed nor refused; it is forgotten. Between them they carry thirty percent of this slice and the meaningfulness of the entire screen.

---

## Draft contract

The concrete layer is **not written**: paradigm, naming convention and versioning appear in no document and there is nobody to ask. A proposal in the wrong paradigm tells the reader the author does not know the stack, and everything above it is then read in that light.

Also, most of this slice **is not a contract**: flow A is batch work and exposes nothing outward. The only contract is the panel's read.

```
[DRAFT] A seller's performance component values
  Serves: step B3
  Asks for: seller identity
  Returns:  three components; for each, the value, numerator, denominator,
            date range, definition version, and where there is no value,
            the reason
            plus the time of the last completed run
  Open:     whether the comparison reference is part of this response or
            comes from somewhere else (a design-brief decision)
            how many distinct reasons "no value" can be
```

> **This section is a starting point for the backend team, not a specification.** Argue with it, replace it, delete it — the needs above stand without it.

**Next:** `risk-interrogate`, then `build-context`.
