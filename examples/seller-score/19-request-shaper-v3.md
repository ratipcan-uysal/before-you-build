# Seller Performance Score — shaped request, **version 3**

**Supersedes version 2.** The finding incorporated: `07-slice.md` — a cut is also a finding that arrives after the document was written, and this pass is what carries it.

## What changed since version 2

- **Five blocking items left scope.** They did not close; they were cut. They are below in their own list, with the quote that retired each of them.
- **Three additions were marked.** After the cut, three documents required things the slice's scope list does not contain. None of them is wrong; none of them was approved.
- The count was redone.

---

## Out of scope — not closed

These were not answered. The part they belong to is not in this release, and they are out of scope **only for as long as the quote that retired them holds.** If the quote falls, the item comes back, still unanswered.

| Item | The quote that retired it |
|---|---|
| **B4** — why do product reviews stay at 20%? | *"Blending the three components into one score is out of scope for this release."* No weights, no 20% |
| **B5** — does the frozen list win, or the nightly threshold? | *"The 4.0 campaign eligibility threshold is out of scope for this release."* |
| **B12** — one blended number or three separate thresholds? | *"Blending the three components into one score is out of scope for this release."* The decision itself stands as `slice`'s condition for bringing it back |
| **B14** — is the absence of category distinction deliberate? | *"The 4.0 campaign eligibility threshold is out of scope for this release."* The peer group question returns with the threshold |
| **B2** — is mobile in scope? | *"The seller score shown to buyers does not change."* Mobile shows that score; since the score does not change, nothing changes on mobile |

**Five items**, four of which version 2 counted as blocking. `06-readiness-score-v2.md` can now mark them out of scope with a quote, and the count falls from 14 blocking to 9.

---

## Added after the cut — not approved

All three are defensible. None appears in the slice's scope list. **Adding is not forbidden; adding silently is.**

| Addition | Where | Who approves |
|---|---|---|
| **A comparison reference beside every component value** | `08-design-brief-v1.md` | Deniz. If the answer is "peer group", a second computation job appears that nobody owns (`12-api-needs.md`) |
| **The numerator and denominator of a component value are stored** | `11-data-model.md` | Deniz. Reasoned from the slice's decision 5 ("an appeal stays answerable"), but absent from the slice's own list |
| **The numerator and denominator are returned in the panel response** | `12-api-needs.md` N5 | Deniz. No screen shows them; either the field is unnecessary or the screen is incomplete |

The three sit in a chain: the screen required something, the model stored what that implied, the contract returned it, and the risk pass then asked a question premised on it being shown. Four documents, each step following from the last, none of them following from the cut.

---

## Still open

### Blocking — nobody can start (9)

B1 success criterion · B3 a seller without enough data · B6 component definitions · B7 failure paths · B8 the appeal process · B9 how many sellers fall below the threshold *(the threshold is deferred, but the number is the evidence this slice produces)* · B10 the score shown on a past order · B11 old scores · **+ approval of the three additions**

### Blocking — nobody can ship (5, from 12)

G2 the support script · G6 reports distinguishing before and after v2 · G10 retiring the existing job · G11 the regression surface · G12 → **out of scope** (notification left with the threshold)

G1, G3, G4, G5, G7, G8 and G9 left scope: all of them depended on the meaning of the number changing, and in this release it does not.

**Count: 9 answered · 9 blocking · 5 ship-blocking · 5 out of scope (quoted) · 3 unapproved additions.**

Version 2 counted fourteen blocking items. **Nine of them actually block this slice.** The other five belonged to parts already cut, and for two documents everybody counted them as blocking.
