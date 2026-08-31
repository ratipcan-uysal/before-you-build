# flow-grill — findings on 09-flow-map.md

## 1. What was reviewed

**This flow was produced in the same session; the review is compromised.** A model that authored a sequence accepts its own assumptions, most reliably on the branches it thought hardest about. Repeat in a clean context.

Reviewed: two flows (A the nightly calculation, B the seller reading), 12 steps, 5 branches, 7 error paths and a diagram, against `07-slice.md` and `08-design-brief-v1.md`. Step tables were provided, so conditions could be read.

**What is sound, specifically:** separating the two flows makes it visible that every failure lives in A; one merged table would have lost that. **EA5** — late-arriving data making yesterday's value wrong — is a question most batch flows never ask, and it draws the line from there to the appeal process. And writing the system marks as step numbers made the count **checkable**: counting the table gives 8 marks across 6 steps, exactly what the document claims.

---

## 2. Drift from what was asked

| | | Drift |
|---|---|---|
| **D1** | **High** | The record decided the partial state; the flow left it open |
| **D2** | **High** | The design requires a distinction the flow does not produce |
| **D3** | **High — dropped** | The slice's answerability decision is not met by the flow |
| **D4** | **Medium** | The no-overwrite rule is not carried by the happy path |

> **D1 · High — the record decided the partial state; the flow left it open.**
> **Asked:** `08-design-brief-v1.md` section 7 — **"One component could not be computed → the other two are shown and the missing one says it is missing. It is not silently hidden."**
> **What the flow does:** BA2 opens the same question as **`[DECISION NEEDED]`**: write nothing, or write partially.
> **What goes wrong:** a designer reading only the record believes it settled and draws the partial state; a developer working from the flow may choose to write nothing.
> **Decision that closes it:** the write-side decision, and then confirming section 7 of the record still matches it.

> **D2 · High — the design requires a distinction the flow does not produce.**
> **Asked:** `08-design-brief-v1.md` — "no data", "cannot be computed" and "stale" **must be distinguishable**.
> **What the flow does:** BB1 lands two different causes in the same empty state, and says so itself: *"the data that would distinguish them is not written at A5"*.
> **What goes wrong:** the record asks for three texts; the data cannot separate two states.
> **Decision that closes it:** whether A5 writes "insufficient data" and "could not compute" as distinct values.

> **D3 · High, dropped — the slice's answerability decision is not met by the flow.**
> **Asked:** `07-slice.md` decision 5 — **"'why was my value X on 3 November' has to be answerable from the stored rows"**.
> **What the flow does:** A5 writes only the **value and the date range**. What the value was computed from — how many orders, how many on time — is stored at no step.
> **What goes wrong:** "Why was it 61%" is answered with "because the range was 3 August to 1 November", which is not an answer.
> **Decision that closes it:** whether the component row also carries the numerator and denominator. Goes to `data-model`.

> **D4 · Medium — the no-overwrite rule is not carried by the happy path.**
> **Asked:** `07-slice.md` decision 4 — "no daily value is ever overwritten".
> **What the flow does:** A5 does not say so; the prohibition appears only as a tension in EA4.
> **What goes wrong:** a reader of the happy path never sees the rule.

---

## 3. Findings

| | | Finding |
|---|---|---|
| **F1** | **Critical** | Four branches lead nowhere |
| **F2** | **Critical** | EA2 has no ending |
| **F3** | **High** | A2's condition cannot be tested |
| **F4** | **High** | Assumed success between A5 and A6 |
| **F5** | **Medium** | What is held between A4 and A5 is unstated |
| **F6** | **High** | B3 is one read answering two different questions |
| **F7** | **Medium** | B4 is marked `emits` and nothing says what it emits |

### Flow A

> **F1 · Critical — four branches lead nowhere.**
> BA3 (overlapping runs), EA4 (second run same day), EA5 (late data), EB2 (reading during a write). The flow marks them itself; marking does not close them.
> **What goes wrong:** in all four the developer decides, and picks the easiest — allow parallel runs, overwrite, ignore late data, read a half-written run. All four are silent.
> **Decision that closes it:** one sentence each. Is a second run refused · what the no-overwrite rule means on a rerun · is late data corrected · does a read see the completed run. Owner Marketplace Core, and Deniz on EA5.

> **F2 · Critical — EA2 has no ending.**
> *"Never reaches A6"* is not an ending: it neither rejoins a step nor terminates. And nothing leads to "partially written", one of the three endings the flow declares.
> **What goes wrong:** a half-written day exists and **nothing marks it as partial**; the next night's run starts normally and that day stays half-done forever.
> **Decision that closes it:** what a dead run does — rolled back, marked partial, or completed the next day.

> **F3 · High — A2's condition cannot be tested.**
> "Determines the set of sellers to compute for" — which sellers? All, active ones, those with orders in the window?
> **What goes wrong:** the set definition decides whether the job takes ten minutes or six hours, and it directly drives the likelihood of EA2. A developer writes "all".
> **Decision that closes it:** the definition of the seller set. Owner Deniz + Marketplace Core.

> **F4 · High — assumed success between A5 and A6.**
> A6 marks the run complete; there is no path where A5 partially succeeded.
> **What goes wrong:** a run that wrote 90% is marked complete and monitoring looks green.
> **Decision that closes it:** what A6 checks before saying complete — rows written, or absence of errors.

> **F5 · Medium — what is held between A4 and A5 is unstated.**
> How many sellers' values accumulate in memory before a write?
> **What goes wrong:** that number is EA2's blast radius. Written in one go it is all-or-nothing; per seller it is half a day.
> **Decision that closes it:** the grain of the write — per seller or batched.

### Flow B

> **F6 · High — B3 is one read answering two different questions.**
> "Does this seller have values" and "are the values fresh". BB1 and BB2 come off the same step but need different data: the second needs the run's timestamp, the first needs row existence.
> **What goes wrong:** if the empty state and the stale state are both derived from one read, "never ran" cannot be told from "never reached this seller" — which is exactly what `design-brief` wants separated.
> **Decision that closes it:** whether the panel also reads the last run time independently of the seller.

> **F7 · Medium — B4 is marked `emits` and nothing anywhere says what it emits.**
> It is the only event point in this slice, and the measurement gap already scored 0.
> **What goes wrong:** `api-needs` will derive an event need from this one mark with nobody having said what goes in it.
> **Decision that closes it:** what question a view of the performance section has to be able to answer. Owner Deniz.

---

## 4. Coverage

**12 happy-path steps · 5 branches (4 dangling) · 7 error paths (1 with no ending) · 6 endings (1 unreachable: "partially written") · 2 state-changing steps (A5, A6), concurrency asked for A5 and not for A6 · 8 marks across 6 steps — count verified against the table.**

Seven error paths to twelve happy steps, distributed correctly: five in A, two in B. That is the expected shape for batch work.

---

## 5. Not assessable

- **How the source systems behave** — whether delivery, cancellation and review data arrive in batches or as events appears in no document. So how often EA5 (late data) actually happens cannot be known: an edge case or a daily fact, there is no answer.
- **How the panel reads** — whether B3 goes direct or through a service is unwritten, and whether EB2 (reading during a write) is even possible depends on it.
- **No drift was found between the diagram and the text.** All 5 branches and all 7 error paths are drawn; the four unclosed ones are drawn with a single exit, so the drawing does not conceal the gap. This check passed.
