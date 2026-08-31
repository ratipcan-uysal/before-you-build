# Output

## 1. What was reviewed

Two or three lines. How many surfaces, at what fidelity, whether a brief or decision record was available, and what you could not assess. If you produced this design yourself in this conversation, that sentence comes first — see the self-review guard.

> Reviewed: eight phone artboards at mockup fidelity, against the design decision record. Hover, scroll and animation were not assessable from static frames.

## 2. Conformance

Only when a brief exists. Each decision the design contradicts, quoted, with what the design does instead.

| Decision | What the design does | Severity |
|---|---|---|
| "Recipient outranks amount" | The amount is the largest element on the surface | High |

This section goes first because it is the one nobody else runs. A screen that contradicts its own brief passes review — nothing looks broken, and everyone assumes the decision was followed.

**A third column, because two of these are not the same finding.** A design that contradicts its record is the designer's to fix. A design that followed its record into something wrong is the record's, and it needs an owner and a return path to `design-brief` — not a severity. Mark which each row is. Without the distinction the sharpest findings on a faithful drawing read as criticism of the drawing, and go to the person who cannot act on them.

## 3. Findings

Grouped by surface, ordered by severity inside each group. A reader should be able to work through one screen at a time.

Number the findings `F1` upward. A later document can then cite one instead of quoting it back. Open with the index, one line each, no wrapping:

| | | Finding |
|---|---|---|
| **F1** | **Critical** | Three numbers, nothing saying which direction is good |

Where every cell fits on a line, that table is the whole section. Where the finding needs a paragraph, which is what real material produces, keep the index and write the rows as blocks, the three fields as labelled lines:

> **F1 · Critical — three numbers side by side, and nothing says which direction is good.**
> `98.2%` is good high, `0.4%` is good low, `4.7` is out of five, and all three carry the same size and weight.
> **What a user does:** reads a high cancellation rate as a target and fixes the wrong number.
> **Decision that closes it:** how each component's direction is carried on screen. The record never discussed it — goes to `design-brief`.

The three fields are the discipline, not the grid. A row carrying all three runs past seven hundred characters, wraps into four narrow columns of prose, and gets skipped by the person it was written for.

**Severity**

| | |
|---|---|
| **Critical** | Someone does the wrong thing without noticing, or cannot proceed |
| **High** | A stated decision is contradicted, or a state that is needed does not exist |
| **Medium** | Friction, inconsistency, or something a reviewer will raise anyway |

**What a user does** is where a finding proves itself. If you cannot name the behaviour, you have a preference rather than a finding — cut it.

**Decision that closes it** names what has to be decided, never what it should look like. Handing a designer a layout from a screenshot is doing their job badly; handing them the open decision is doing yours.

## 4. What works

Specific, and only where it is true. Name the thing and why it works.

Not to soften the rest — a critic who never finds anything working is not believed on the things that are broken. Two or three lines is enough; a list as long as the findings reads as padding and undoes the point.

## 5. Not assessable

What you could not judge and why: lenses the material could not answer, states that exist only as an assumption, conventions you could not check without the rest of the product.

Then, if any finding needs a decision nobody has made, say so and point at `design-brief`. Critique that quietly becomes design is how a review turns territorial.

## Rules

- **No overall grade.** "This design is 7/10" invites an argument about the number instead of the findings.
- **No summary paragraph on top.** It gets read instead of the findings and is always the least specific thing on the page.
- **Quote the decision when there is one.** Paraphrasing a brief back at its author loses the argument before it starts.
- **Offer to save at the end.** Never write files unprompted.
