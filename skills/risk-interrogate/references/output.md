# Output

Four parts. Written so it can be forwarded to seven people who each read only their own section.

## 1. What was assessed

Two or three lines. What material you read, how you classified it, and — importantly — what you did **not** have. A reader who thinks you saw the API contract will trust the output more than they should.

> Assessed: the shaped request for Hızlı Gönder (7 sections). Classified as `transaction` · `multi-surface`. No API contract, no screens, and no fraud rules were available.

## 2. Questions by owner

One block per owner. Inside a block, order by severity, never by dimension — the reader is a person with a job, not a taxonomy.

Number the questions `Q1` upward, straight through the whole output rather than restarting per owner. Section 3 and every reply can then point at one without naming the block. Open each block with its index, one line per question:

### Backend

| | | Question |
|---|---|---|
| **Q1** | **Critical** | What stops a nightly run that produces plausible but wrong values |

Where every cell fits on a line, that table is the whole block. Where the question and its consequence each need a sentence, which is usual, write them out below the index:

> **Q1 · Critical — what stops a plausible but wrong run, and what corrects it once written?**
> Values are written unconditionally every night and never overwritten.
> **Prevents:** an irreversible wrong day. Nothing blocks the write, several hundred thousand rows land, the no-overwrite rule forbids the correction, and no alert exists, so nobody finds out.

A question and its consequence both need a sentence each. Put them in one row and the row runs past six hundred characters, which is the length at which the owner it was addressed to stops reading.

Owners: product · backend · mobile · web · security and risk · legal and compliance · operations and support · data and analytics. Use the roles the material names where it names them — a question addressed to "Elif" gets answered faster than one addressed to "product".

**Severity**

| | |
|---|---|
| **Critical** | money moves wrongly, data is exposed or lost, or a rule is broken |
| **High** | users hit something broken or unrecoverable, or nobody can tell it happened |
| **Medium** | degraded experience, avoidable support load, or rework |

**Prevents** is not decoration. It is the difference between a question that gets answered this week and one that gets moved to the next agenda four times. Write the actual consequence, in the reader's terms: money, customers, hours, a regulator.

## 3. Answer these five first

Five, ranked, across all owners. Chosen by cost of being wrong multiplied by how cheap the answer is right now — not by severity alone. A Critical that takes a month of legal review may sit below a High that one engineer settles in an afternoon and unblocks four other questions.

Say why each one is on the list, in a clause. Not a paragraph.

## 4. What could not be assessed

Every dimension you could not work, and the specific thing that was missing.

> **Blast radius** — not assessable. The material never says which service backs the recipient list, so there is no way to know what else it is shared with.

This section is not an apology. It converts your gaps into someone's task, and it stops a reader concluding that silence meant safety. It is often the most actionable part of the output.

## Rules

- **No summary paragraph at the top.** It gets read instead of the questions, and it is always the least specific thing on the page.
- **No question without an owner.** If you cannot name one, name the closest role and say you are guessing.
- **No counts as a headline.** "23 risks identified" is a number that flatters the author. Lead with the five.
- **Say what you struck and why.** If the material's own open list already named something, one line is enough: *"Audit retention, minimum app version, and support tooling are already on the document's open list — those are completeness gaps, not failure modes, and repeating them here would bury the rest."* It shows the reader you read their work, and it stops them wondering whether you missed the obvious.
- **Offer to save at the end.** Never write files unprompted.
