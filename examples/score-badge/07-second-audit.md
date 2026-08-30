# The check, checked

`06-uncompromised-check.md` was written by the same chain that wrote everything it audits. It reports someone else's findings, which is not the same as being someone else — and it had never been audited by anyone.

So the folder went out a second time, to a reviewer holding **only the eight file paths** and no knowledge that a first audit existed. It was asked to verify `06` item by item against the files it names.

**It found that two of `06`'s fourteen findings describe defects that are not in the files, one is backwards, four are overstated or misattributed, and four real contradictions were missed entirely.**

---

## What it found in `06`

### Two findings that no longer exist, and the reason is a principle applied unevenly

`06` items 1 and 2 say `03` claims 65 and `02` claims three capability items. Both files now say 64 and four. Both were **corrected in place** after `06` was written, and `06` marks each `*(Corrected.)*`.

That is the inconsistency: `06`'s own line says the correction was recorded *"rather than by editing `05`, because a pack that quietly becomes right is a pack nobody learns anything from"* — and then two documents were quietly edited. The distinction drawn at the time was that arithmetic is simply wrong while a verdict is a judgement worth preserving. It is a defensible line and it was never stated, so what a reader sees is a principle honoured in one document and abandoned in two.

**And the headline count inherits it.** "Fourteen findings", repeated in this folder's index and in the repository's changelog, includes two that cannot now be confirmed against the files they name. Twelve can.

### One finding that is backwards

`06` item 14 says the "3 of 4" rounding count *"does not survive `03`'s answer"*. `03` says the opposite: *"the disagreement is entirely in the other three surfaces"* — three of four, which is the request's figure. **`03` supports the count.**

There is a real tension and `06` cites the wrong document for it: `00` says *"two round to one decimal, one truncates, one still shows the pre-v2 twelve-month average"*, which leaves at most two rounding disagreements, against its own *"3 of 4"* four paragraphs later.

### Four overstatements

- **"Two questions lost"** names one — the QA tool's first wave, appearing in two documents. The finding is real at one.
- **"The two errors the reviewer found in `02`"** produces one, and per the item above that one is itself wrong.
- **Items 5 and 6 blame the wrong document.** `06` says `05` broadened the focus-ring prohibition and dropped the `[DRAFT]` markers in assembly. `04` states the unqualified prohibition twice on its own, and restates 220 px and 320 px unmarked in its own done criteria. The drift starts in the brief, so the reasoning — *"assembly drifting toward the stricter reading"* — points at the wrong step.
- **Item 7** says one prohibition has no source. It appears in `04`'s generator block, and `04` is one of the sources `05` names. The item's force depends on a generator block not counting as source material, which `06` never argues.

### And a count `06` never resolves

*"Four of the fourteen are contradictions a builder would have to resolve"* — its contradictions section holds six, and it never says which four.

---

## Four contradictions both audits missed

The sharpest is the first, and it is the same shape as the finding `06` was proudest of.

1. **The out-of-range state needs a bound the component is forbidden to have.** `00` requires *"a value out of the expected range… renders the number as given and marks it"*, and `04`'s done criterion makes it concrete: *"A value of 11.4 out of 5 renders as 11.4, marked"*. But `04` says the component *"receives values and no thresholds"* and *"is not given thresholds and must not infer them"*. Marking 11.4 requires knowing the maximum is 5. A builder cannot implement the state without inventing the bound the pack forbids.
2. **"Emits nothing" against "logs once per mount".** `00` and `05` both say the badge emits nothing; `00` and `05` also both say an unrecognised prop *"logs once per mount"*. `04` goes furthest: *"There is no system here to give feedback: the component neither fetches nor writes."* No logger appears in the input list, which is closed with *"Nothing else is accepted."* `02` scored the emits-nothing decision a 3 without reconciling the two.
3. **`05` reports "0 blocking questions" and then blocks.** Its own go-live section: *"The QA tool's source migration has no schedule… Nobody has said when."* `03` makes that migration a precondition of adoption, and `05` still calls the success measure *"now reachable by the work it measures"* — a measure requiring four surfaces to adopt within a quarter through an unscheduled precondition.
4. **The `web` classification is an unmarked assumption.** `02` rules out `multi-surface` on the grounds that *"four hosts, all of them browser surfaces, is one surface type"*. `00` never says any of the four is a browser surface; it calls two of them consoles. `04` marks its design-system assumption and not this one, and the Axis 2 classification rests on it.

---

## And an arithmetic claim that does not survive

`02` argued that the gap to READY belonged to the rubric, on the grounds that K6 and K7 are eighteen points a component request cannot earn, and that four exempting sentences would put it *"in the high seventies"*.

Recomputed from `02`'s own item scores: four exemptions give **64.3**. All five of K6's zeros give **65.4**. Every zero-scored item in the entire rubric — twelve of them — gives **77.1**, and holding the two `02` itself calls genuine gaps gives **74.9**. None reaches 80. And the largest single shortfall is **K3 at 9.38**, larger than either K6 or K7 alone: behaviour and rules, where the request scored 15 of 24 on its own merits.

**The claim was wrong in the direction that flattered the finding.** `02` now states the recomputed figures and a narrower reading: a request of this shape pays an unavoidable tax of roughly twelve points on categories it cannot speak to, and the rest of the distance to 80 is work it did not do. Whether twelve points makes the bar wrong is not settled by one scoring.

---

## What this says

The first audit was worth everything it cost: twelve of its fourteen findings hold, including four contradictions that would have reached a builder. The change at 4.4.0 is vindicated by it.

**And the write-up of that audit, produced back inside the chain, degraded it.** Two findings were left standing after the defects were fixed, one was inverted, four were overstated, and the count was repeated downstream into the changelog. Not one of those errors was in the reviewer's report. They entered when the findings came home and were written up by the party they were about.

That is a narrower lesson than "delegate the review", and a more uncomfortable one: **the delegation has to survive the return trip.** A finding is not carried by the skill that produced it — `prior-art` cannot write into the request, `flow-grill` cannot rewrite the flow — and this set has a rule for that, added at 4.2.0, which says the receiving skill writes it in. What nobody had noticed is that the receiving skill is the compromised one, and it will round the findings toward the version it already believed.

Four more contradictions surfaced only on the second pass. Two audits found eighteen things between them in a pack that reported zero, and the second found more in the first's write-up than the first found in the pack's arithmetic.
