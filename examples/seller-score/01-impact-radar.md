# impact-radar — what a new seller score breaks

**Access:** the request document only. No codebase, no schema, no report inventory, no panel. **So this is a checklist, not a map:** every row below is `[UNVERIFIED]` and carries the person who can confirm it. Guesses are not promoted to findings; there is not one unmarked line.

## What changes and what does not

**Changing:** the score's **inputs** (product reviews only → delivery 50% + cancellations 30% + reviews 20%), its **window** (12 months → 90 days), its **refresh rhythm** (unstated → nightly), and a **new consequence** attached to it (below 4.0, no campaigns — no such rule exists today).

**Not changing, per the request:** the scale (out of 5), where it is shown, who sees it.

There is a trap in that, and it is the centre of this radius: **the shape of the number stays the same and its meaning changes.** A 4.2 still reads as 4.2 and now measures something else. Anything that keeps its shape while changing its meaning breaks silently by construction.

---

## Dependents

### Found by looking

| # | Dependent | How it breaks | Who finds out, and when |
|---|---|---|---|
| 1 | **Storefront ranking** — the request says it "already uses the current score" `[UNVERIFIED]` ranking team | **Silent.** Ranking keeps working and orders by something else. Sellers who deliver well rise overnight, sellers with good reviews fall | Nobody. Sellers call when traffic drops, weeks later |
| 2 | **Seller panel — score display** `[UNVERIFIED]` panel team | **Loud** while the new components are added; **Silent** if the old "12-month review average" explanatory copy stays | The seller, on seeing the screen contradict itself |
| 3 | **Seller score in the mobile app** — "another team, they have been told" | **Silent.** Same number, different meaning. Telling someone does not remove a dependency | Nobody. The mobile team knowing does not update the versions people are running (row 10) |
| 4 | **The job that computes the score today** `[UNVERIFIED]` Marketplace Core | **Loud.** It is being rewritten | The team, on day one |

### Found by asking

| # | Dependent | How it breaks | Who finds out, and when |
|---|---|---|---|
| 5 | **Campaign selection** — the 4.0 threshold is a new rule and **the list freezes on 15 November** | **Deferred and Loud together.** On the night v2 lands, a group of sellers who are above 4.0 today fall below it. If the campaign list freezes against that threshold, an excluded seller finds out **when the campaign starts** | The seller, at campaign launch. Category management, when the seller calls |
| 6 | **The seller score shown on past orders** `[UNVERIFIED]` — does the order detail store the score, or read it live? | **Silent, and this is the irreversible part.** If it reads live, the seller score on an order from last year changes tonight. The score the customer saw when they ordered is not written down anywhere | Nobody, until a seller appeals or an audit asks |
| 7 | **Score rows written under the old rule** — every score computed on a 12-month window | **Silent.** Old rows under the old rule, new rows under the new one. One column, two definitions | Whoever compares month to month |
| 8 | **Every report comparing this month to last month** | **Silent, and this whole dimension is silent.** October and November average seller scores stop being comparable; the numbers keep arriving and start meaning something else | Finance or category reporting, at quarter end |
| 9 | **Alerts and automation keyed to the score** `[UNVERIFIED]` — is there anything like "email the seller when the score drops"? | **Loud, or a silent flood.** A 90-day window is far more volatile than a 12-month one: the same seller can cross the threshold several times a week. An alert tuned to the old volume either goes quiet or screams | The seller receiving it; or nobody |
| 10 | **The support script** — "your score is the average of your reviews over 12 months" | **Silent.** The agent keeps saying what they correctly learned, and is wrong for a fortnight | The seller, arguing with the agent |
| 11 | **The seller agreement and rules page** `[UNVERIFIED]` Legal | **Deferred.** If how the score is computed is written there, the new rule cannot apply until the text changes. Legal already asked for a right of appeal, so there is a textual side to this | Legal, if asked; if not, the first seller who appeals |
| 12 | **Seller-facing API or report export** `[UNVERIFIED]` — does anything expose the score outwards? | **Silent.** Same shape, different meaning — silent by construction | The seller who built the integration. Never |
| 13 | **Work in flight when it lands** — campaign applications open, appeals in progress, ranking caches warm on the first night | **Deferred.** A release is not a moment; it is a window with people inside it | Nobody; it shows up as inconsistency |

---

## What I **checked** does not change

This section is short, because I have no access to the codebase and **an unchecked reassurance is worse than silence.**

From the request's own sentences: the 5-point scale, the places the score is shown (no new surface), and the absence of category distinction (all sellers under one rule).

Beyond those there is nothing I can say is untouched, and I am leaving it that way.

---

## Regression surface — what to test that is **not** what you changed

Drawn from the Silent and Deferred rows, because the thing you changed will be tested and what escapes is always the half that keeps working.

1. The seller score shown on a past order **does not change** after v2 lands (row 6). If it does, that is a decision, not an accident.
2. The month-end seller score report can **tell apart** rows from before and after v2 (rows 7, 8).
3. Storefront ranking shows the **expected** seller movement on the first night — no surprise jumps (row 1).
4. A seller who has just crossed 4.0 gets the **right** answer on a campaign application, and the order of evaluation against the 15 November freeze is defined (row 5).
5. What a support agent sees matches what the seller sees (rows 2, 10).
6. No score-driven notification fires **several times a week** under a 90-day window's volatility (row 9).

**This list goes to `build-context`** and is carried in the pack as *what must still be true afterwards*. If no pack is being assembled, it has to reach whoever writes the tests, by name — a regression surface handed over on its own is read once and lost.

---

## Two recommendations, both about method

**Trace by announcing.** Rows 9 and 12 are not found by searching. They are found by saying "we are changing what the seller score means" and waiting a day. Whoever replies "we hooked something to that" is the dependency.

**One sentence, once:** landing the threshold (4.0) and the definition (v2) on the same night puts the two most expensive rows in this radius (5 and 8) into one evening. I say that as sequencing, not as an objection to the change — designing the migration is not this skill's job.

**Next:** `request-shaper`. The `[UNVERIFIED]` rows above and their owners have to enter that document's *still open* list, because a dependency list on its own is part of no document.
