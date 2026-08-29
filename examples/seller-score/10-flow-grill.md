# flow-grill — findings on 09-flow-map.md

## 1. What was reviewed

**This flow was produced in the same session; the review is compromised.** A model that authored a sequence accepts its own assumptions, most reliably on the branches it thought hardest about. Repeat in a clean context.

Reviewed: two flows (A the nightly calculation, B the seller reading), 12 steps, 5 branches, 7 error paths and a diagram, against `07-slice.md` and `08-design-brief-v1.md`. Step tables were provided, so conditions could be read.

**What is sound, specifically:** separating the two flows makes it visible that every failure lives in A; one merged table would have lost that. **EA5** — late-arriving data making yesterday's value wrong — is a question most batch flows never ask, and it draws the line from there to the appeal process. And writing the system marks as step numbers made the count **checkable**: counting the table gives 8 marks across 6 steps, exactly what the document claims.

---

## 2. Drift from what was asked

| What was asked | What the flow does | |
|---|---|---|
| `08-design-brief-v1.md` section 7: **"One component could not be computed → the other two are shown and the missing one says it is missing. It is not silently hidden."** | BA2 opens the same question as **`[DECISION NEEDED]`**: write nothing, or write partially | **High.** The record decided; the flow is undecided. A designer reading only the record believes it settled and draws the partial state; a developer working from the flow may choose to write nothing. **The decision that closes it:** the write-side decision, and then confirming section 7 of the record still matches it |
| `08-design-brief-v1.md`: "no data", "cannot be computed" and "stale" **must be distinguishable** | BB1: two different causes land in the same empty state, and the flow says so itself: *"the data that would distinguish them is not written at A5"* | **High.** The design requires a distinction the flow does not produce. The record asks for three texts; the data cannot separate two states. **The decision that closes it:** whether A5 writes "insufficient data" and "could not compute" as distinct values |
| `07-slice.md` decision 5: **"'why was my value X on 3 November' has to be answerable from the stored rows"** | A5 writes only the **value and the date range**. What the value was computed from — how many orders, how many on time — is stored at no step | **High — dropped.** "Why was it 61%" is answered with "because the range was 3 August to 1 November", which is not an answer. The slice's own decision is not met by the flow. **The decision that closes it:** whether the component row also carries the numerator and denominator. Goes to `data-model` |
| `07-slice.md` decision 4: "no daily value is ever overwritten" | A5 does not say so; the prohibition appears only as a tension in EA4 | **Medium.** The happy path does not carry the rule, so a reader of the happy path never sees it |

---

## 3. Findings

### Flow A

| | Finding | What goes wrong | Decision that closes it |
|---|---|---|---|
| **Critical** | **Four branches lead nowhere:** BA3 (overlapping runs), EA4 (second run same day), EA5 (late data), EB2 (reading during a write). The flow marks them itself — marking does not close them | In all four the developer decides, and picks the easiest: allow parallel runs, overwrite, ignore late data, read a half-written run. All four are silent | One sentence each: is a second run refused · what the no-overwrite rule means on a rerun · is late data corrected · does a read see the completed run. Owner Marketplace Core, and Deniz on EA5 |
| **Critical** | **EA2 has no ending.** *"Never reaches A6"* is not an ending: it neither rejoins a step nor terminates. And nothing leads to "partially written", one of the three endings the flow declares | A half-written day exists and **nothing marks it as partial**; the next night's run starts normally and that day stays half-done forever | What a dead run does: is it rolled back, marked partial, or completed the next day |
| **High** | **A2's condition cannot be tested.** "Determines the set of sellers to compute for" — which sellers? All, active ones, those with orders in the window? | The set definition decides whether the job takes ten minutes or six hours, and it directly drives the likelihood of EA2. A developer writes "all" | The definition of the seller set. Owner Deniz + Marketplace Core |
| **High** | **Assumed success between A5 and A6.** A6 marks the run complete; there is no path where A5 partially succeeded | A run that wrote 90% is marked complete and monitoring looks green | What A6 checks before saying complete: rows written, or absence of errors |
| **Medium** | **What is held between A4 and A5 is unstated.** How many sellers' values accumulate in memory before a write? | That number is EA2's blast radius: written in one go it is all-or-nothing, per seller it is half a day | The grain of the write — per seller or batched |

### Flow B

| | Finding | What goes wrong | Decision that closes it |
|---|---|---|---|
| **High** | **B3 is one read answering two different questions:** "does this seller have values" and "are the values fresh". BB1 and BB2 come off the same step but need different data — the second needs the run's timestamp, the first needs row existence | If the empty state and the stale state are both derived from one read, "never ran" cannot be told from "never reached this seller" — which is exactly what `design-brief` wants separated | Whether the panel also reads the last run time independently of the seller |
| **Medium** | **B4 is marked `emits` and nothing anywhere says what it emits.** It is the only event point in this slice, and the measurement gap already scored 0 | `api-needs` will derive an event need from this one mark with nobody having said what goes in it | What question a view of the performance section has to be able to answer. Owner Deniz |

---

## 4. Coverage

**12 happy-path steps · 5 branches (4 dangling) · 7 error paths (1 with no ending) · 6 endings (1 unreachable: "partially written") · 2 state-changing steps (A5, A6), concurrency asked for A5 and not for A6 · 8 marks across 6 steps — count verified against the table.**

Seven error paths to twelve happy steps, distributed correctly: five in A, two in B. That is the expected shape for batch work.

---

## 5. Not assessable

- **How the source systems behave** — whether delivery, cancellation and review data arrive in batches or as events appears in no document. So how often EA5 (late data) actually happens cannot be known: an edge case or a daily fact, there is no answer.
- **How the panel reads** — whether B3 goes direct or through a service is unwritten, and whether EB2 (reading during a write) is even possible depends on it.
- **No drift was found between the diagram and the text.** All 5 branches and all 7 error paths are drawn; the four unclosed ones are drawn with a single exit, so the drawing does not conceal the gap. This check passed.
