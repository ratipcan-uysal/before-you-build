---
name: decision-memo
description: Compress existing analysis into a one-page memo that takes a single position and asks one named person to approve one specific thing. Seven fixed fields — the ask, why now, what is known, the recommendation, what it costs, what happens if nobody decides, and what is needed from the reader. Produces no new analysis and invents no numbers; a figure that is not in the source material does not appear. Use when the user says "write the memo", "I need approval for this", "make the case to leadership", "one-pager for the decision", "how do I get a yes on this", or has analysis and needs a decision out of it. Do not use to pressure-test whether the idea is sound (idea-grill), to write the request for the team (request-shaper), to measure a document (readiness-score), or to generate the analysis being summarised.
---

# Decision Memo

A decision-maker reads the first three lines. Everything after that either supports the ask or delays it.

You compress analysis that already exists into one page that takes **one position** and asks **one named person** to approve **one specific thing**.

**Load in one pass, before Phase 0:** `references/format.md`. **References together; documents one at a time.** Opening five references separately costs a round trip each and every round trip re-sends everything read so far. Chain documents are the opposite case: they run past four hundred lines, a batched read of several of them overflows a single read and comes back as more turns than it saved, and each one opens with a carrier that tells you which part you need. Read the carrier, then the part.

## Three rules, and the memo lives or dies on them

**One position, not a menu.** A memo presenting three options with balanced pros and cons hands the work back to the person with the least context. You have the context. Take the position, and give each rejected alternative one line saying why it lost.

**Never invent a number.** If the analysis has no figure, the memo has no figure. A fabricated number in an outward-facing document is the single error that ends an author's credibility, and it ends it permanently — nobody remembers which number was wrong, only that one was.

**The cost of not deciding is the strongest field on the page.** Most memos explain what happens if you say yes. What moves a decision is what happens if nobody says anything: the default that arrives by inaction, and the date after which it cannot be undone.

**And this is the one field the no-new-analysis rule cannot govern**, because a counterfactual is by construction not in the source material. Quote the default where the material states one — a freeze date, a fallback, a next release — and where you had to derive it, **say that you derived it and from what**. Both are allowed here and nowhere else on the page.

## Not this skill

| The user wants… | Use instead |
|---|---|
| To find out whether the idea survives scrutiny | `idea-grill` |
| The request written for the team | `request-shaper` |
| A document measured for completeness | `readiness-score` |
| The analysis itself produced | Whichever skill owns it |

**You are a compressor, not a source.** Every claim traces to material you were given — including two facts placed side by side to make a third, which is what most of a memo is made of. Where a sentence is a join rather than a quote, it is yours and it is defensible only if both halves are cited.

**What you read.** Whatever analysis exists: a request and its open list, a slice, a grill, a score, a set of departures. You do not go looking for more, and you do not write the memo from one document when the open item you are escalating was created in another — the reason it is stuck is usually in a third. Where the analysis is thin, the memo says so in the author's voice — *"we have not measured this"* is a sentence a senior reader respects and can act on. Filling the gap is how a memo becomes something nobody can defend in the room.

## Phase 0 — Establish the ask and the reader

Two questions before writing, and the memo cannot be written without them.

**What exactly is being approved?** Not "the project" — the specific, bounded thing. Budget, a go-live, a scope reduction, permission to stop.

**Who signs?** A named person or a named role. A memo addressed to "leadership" is read by nobody, because nobody is holding it.

If either is missing, ask. These are the only two questions worth blocking on.

**When the material holds several blocked decisions, say which you picked and why the others wait.** That is the normal case: an open list with owners is a queue, not a single item. Take the one that is blocking soonest, whose answer is another team producing something rather than an owner merely agreeing, and that no cut has already retired. Name the rest in one closing line — one reader holding five one-pagers reads none of them, and the ranking is work only you can do.

**A named body counts as a named person** where a body is what decides — a committee with a decision number, a board, a panel. What is forbidden is an address with nobody behind it. Write the body's name and the reference of the decision you are asking it to amend.

## Phase 1 — Write the seven fields

Format, order, and worked wording: [`references/format.md`](references/format.md).

The ask · why now · what we know · the recommendation · what it costs · if nobody decides · what I need from you.

**When the ask is a reduction — cut this scope, stop this work, defer this thing — one line goes inside the cost field and nothing else will do: what it takes to undo.** A reader deciding whether to give something up asks whether they can have it back long before they ask what it saves, and a memo that leaves it out gets that question in the room instead, where the answer is improvised. Say what brings the cut thing back and what it costs then — and if the answer is *a migration* rather than *a decision*, say that, because it changes the ask from a deferral into a permanent one. `slice` produces this column already; if a slice exists, the line is a lift, not a judgement.

The order is fixed and the ask is first. A memo that builds to its request has already lost the reader who stopped after the summary — which is most of them.

## Phase 2 — Cut to one page

**One page is about 600 words.** Markdown has no pages and a threat you cannot measure does not discipline anything: past 750 the memo has stopped being one, and the reader who was going to stop after the summary already has.

Anything that is not the ask, the evidence for it, or the cost of it comes out. Background the reader already has, process detail, the history of how you got here: out.

**Length is a signal.** A two-page memo says the author could not decide what mattered, and it is read as such before a word of it is judged.

## Phase 3 — The two checks

**The thirty-second test.** Read only the first three lines. Does the reader know what they are being asked to approve, and roughly what it costs? If not, the memo is not finished, however good the rest is.

**The hostile-read test.** Read it as the person who does not want to approve this. Every number they would question, every claim with no source, every place the memo overstates — find those before they do. Where the material genuinely does not settle something, say so in the memo rather than hoping.

## Operating rules

- **Language:** reply in whatever language the user is writing in — but **markers, verdicts and status labels keep the English forms given here.** `[ASSUMED]`, `[UNVERIFIED]`, `[DECISION NEEDED]`, `[DRAFT]`, `READY`, `Critical`, `Open`, `reads`, `acts` and the rest are tokens the next skill matches on and a reader learns once. Translating them breaks the chain, and makes one finding look like two different things across two documents. In a language that inflects, the token keeps its shape and the suffix hangs off it: `READY`'dir, `[ASSUMED]`'lı. What costs a reader is half-translation. `Kritik` in one paragraph and `Critical` in the next is two labels to them and two terms to a grep.
- **One word per thing, chosen once.** The markers are fixed; the rest of the vocabulary is yours. Whatever word you settle on for `touchpoint`, for a carrier, for a blast radius, hold it to the end of the document, and where the document in front of you already chose one, use theirs rather than coining a second.
- **A cell is a line, not a paragraph.** Past roughly fifteen words a table stops being scannable and turns into prose with pipes in it. This set's own examples reached 84 words in one cell and 748 characters in one row, which neither a terminal nor a phone renders readably. Keep the claim in the cell and number the rows so anything downstream can point at one. When the reasoning will not fit, write those rows as blocks instead: the identifier and the claim as a heading line, each column as a labelled line under it. Do not cut what you found down to fit a grid.
- **No hedging vocabulary.** No "we believe", "it is anticipated", "medium confidence". State it, or state that it is unknown. A hedge reads as an author protecting themselves, and a reader who notices that stops trusting the rest.
- **No new analysis.** A gap you notice is a note to the author, delivered separately — never a paragraph you invented inside the memo.
- **Output to chat**, then offer to save. Never write files unprompted.
