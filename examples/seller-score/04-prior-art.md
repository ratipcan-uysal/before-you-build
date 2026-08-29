# prior-art — mechanism and constraint departures

**Called by:** `request-shaper`, for the mechanism table in section 3. **The output is written into the second version of the request** — by `request-shaper`'s second pass, not by me.
**Sources opened:** only the two pages below were actually opened and read. What could not be opened is in the last section, and there are four of them.

This is not a recommendation list and it names no product to buy. What products **document** is used as evidence.

---

## Mechanism departures

### M1 — Both sources I opened keep the metrics **separate**, each with its own threshold

> Seven distinct metrics, each with a threshold: "Cancellation Rate: ≤2% · On-Time Delivery Rate: ≥90% · Valid Tracking Rate: ≥99% · Seller Response Rate: ≥95% · Negative Feedback Rate: ≤2% · Return Rate: ≤6% · Item Not Received Rate: ≤2%". And the consequence: *"If your account fails to meet **any** of these standards, you must take immediate action to improve your performance. Failure to do so may result in suppression, suspension or termination of your account."*
> — [Seller performance standards, marketplacelearn.walmart.com](https://marketplacelearn.walmart.com/guides/Policies%20%26%20standards/Performance/Seller-performance-standards)

> The second source is not one number either; it describes **two separate evaluations**: one measuring factors within the seller's control ("individual performance on factors within a seller's control — such as sending items on time") and one comparing the seller against a peer group. The dashboard shows "a detailed breakdown of your performance on the factors which determine your seller level".
> — [Seller performance, export.ebay.com](https://export.ebay.com/en/seller-performance/seller-level-and-sales)

Two independent sources do the same thing: metrics stay apart, each has its own threshold, and **any** of them falling produces the consequence. Menzil's v2 collapses three into one number against a single threshold (4.0).

The arithmetic consequence is nowhere in the request: **a good component can hide a bad one.** A seller at 5.0 on delivery, 5.0 on reviews and 2.0 on cancellations scores `0.5×5 + 0.3×2 + 0.2×5 = 4.1` and clears the threshold while sitting in the bottom band on cancellations. The request's starting point was that most complaints are about delivery; blending buries the very thing you set out to separate.

**Question:** was collapsing three components into one number a decision, or inherited from the fact that today's score is a single number? **Who answers:** Deniz. **If it stays open:** the product ships with a gate that can conceal poor performance, and the first person to notice is a customer meeting a bad seller who cleared the threshold.

**A named alternative for `slice`:** *three components, three separate thresholds, no blended score.* Without one, cutting the blend is a subtraction; with one, it is a choice.

### M2 — Evaluation runs on a **cadence**, not every night

> Metrics are "evaluated over the last 30 days or 60 days" *(Walmart, same page)*
> Evaluation is monthly: "monthly evaluation", over "recent sales" *(eBay, same page)*

Nothing I opened recalculates a score tied to an eligibility gate every night. On Menzil the score moves nightly and **the same score opens and closes the campaign gate.** This is the source of the contradiction `request-shaper` recorded as B5: a list frozen on 15 November and a threshold that moves every night cannot live in the same product.

**Question:** is the nightly recalculation for display, or for the gate decision? Do the two have to share a rhythm? **Who answers:** Deniz + the campaign owner. **If it stays open:** a seller who could enter a campaign yesterday and cannot today has nobody who can explain it.

---

## Constraint departures

### K1 — One absolute threshold, no peer group

The request is explicit: *"All sellers. No distinction by category."* The second source I opened runs a separate evaluation that compares a seller **against a peer group** ("performance in the context of a 'peer group'"), and states its purpose: to identify those with markedly higher rates of buyer problems.

A seller shipping fragile goods and a seller shipping digital codes do not produce the same delivery and cancellation rates. A single absolute threshold can punish the category rather than the seller.

**Question:** is the absence of category distinction a deliberate simplification, or was it never discussed? **Who answers:** Deniz. **If it stays open:** the set of sellers falling below 4.0 may be hard categories rather than bad sellers, and nobody can see that until the number in B9 is computed.

### K2 — The seller finds out by opening the panel

> *"Sellers receive email notifications and Seller Center alerts with recommendations"*, and sellers **cannot opt out**: "cannot unsubscribe from these communications." *(Walmart, same page)*

Menzil has no notification — `request-shaper` marked that `[ASSUMED]` because the request never mentions one. So a seller learns they cannot enter a campaign when the campaign starts (`impact-radar` #5).

**Question:** is a seller told when they fall below the threshold, when, and together with what they should do about it? **Who answers:** Deniz + Legal — the right of appeal depends on notification, since a seller who does not know cannot appeal. **If it stays open:** the right legal asked for is, in practice, unusable.

---

## The two questions that would change the shape of the work

1. **M1** — one number or three thresholds? If the answer is three, the score engine, the panel, the campaign rule and the appeal process are all designed differently, and the 50/30/20 weights disappear entirely.
2. **M2 with K2** — the rhythm of the gate decision and whether the seller is told. If both are "nightly, silently", the product produces a gate the seller cannot understand.

---

## What could not be checked

- **eBay's own threshold figures and its rule for low-volume sellers** could not be verified: two separate pages timed out repeatedly. So the question "is a different window used for sellers with few transactions" is **unsourced** here and was not written from memory. That was the external answer to `request-shaper` B3 (a seller without enough data in 90 days); it did not arrive, and the question stays with its owner.
- **Etsy** returned 403 on two different URLs and the relevant **Amazon** page returned 404. So there are two independent sources here, not four. Two sources are a pattern; nothing is generalised beyond them.
- **Seller-score documentation from marketplaces in Menzil's own market** was not searched at all. What Menzil's direct competitors do is absent from this document and unknown.
- **The Walmart page's "no variation by order volume"** was an answer to my question, not a sentence the page writes. It shows that no statement to the contrary was found, not that a statement exists. Absence was not treated as evidence, so no departure rests on it.
