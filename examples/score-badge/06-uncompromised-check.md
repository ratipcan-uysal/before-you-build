# The same pack, checked by someone who did not write it

`05-build-context.md` reports **13 pairs, 0 disagreements** and returns `BUILDABLE`. It also opens by saying the check is compromised, because the chain that produced the documents also produced the check — which is the confession this set has always made and, until 4.4.0, always made instead of doing anything.

So it was done the new way as well. The same six files were handed to a reviewer with **nothing but their paths** and the checks to run: no conversation, no reasoning, no idea what the pack was for or what it hoped to find.

It came back with **fourteen findings**, in a pack that had just reported zero.

> **This document was itself audited afterwards, and did not come out clean.** Two of the fourteen below describe defects that were then corrected in place — leaving them standing here while a third document says corrections are not made in place. One is backwards. Four are overstated or blame the wrong document. Twelve hold. See [`07-second-audit.md`](07-second-audit.md), and read the list below knowing that.

---

## What it found

Grouped by what the finding costs.

### Arithmetic the pack got wrong about itself

1. ~~**`03-answers.md` said the re-score moves the document to 65.**~~ *(Corrected in place, so this no longer describes the file — see `07`.)* Recomputed from the item scores in `02`: P2 2→3 gives K1 16/21×20, B4 2→3 gives K3 16/24×25, total **64**. *(Corrected.)*
2. ~~**`02-readiness-score.md` said three of the five `capability` items scored 3.**~~ *(Corrected in place, same caveat.)* Its own arithmetic block lists four — Y1, Y2, Y3 and Y5. *(Corrected.)*
3. **"13 pairs" reconciles with nothing.** Four documents yield 6 pairs, the five sources yield 10. The number has no basis in the pack.
4. **"Four source documents in this folder."** There are five, and `05` relies on the fifth — the request — in its own opening paragraph.

### Claims the pack makes in its self-check that are not true

5. **"Prohibitions: 7/7, none broadened."** One was. `04` writes *"no focus ring on anything that does not receive focus"*; `05` carries *"No hover state, cursor change, focus ring, link or tooltip"* and drops the qualifier. Assembly drifting toward the stricter reading is the exact failure `build-context` tells itself to hunt for.
6. **"Markers: `[DECISION NEEDED]` 1 · `[ASSUMED]` 1."** It missed `04`'s `[DRAFT]` block entirely — and then restated two of its drafted values (220 px, 320 px) as done criteria with no marker on them.
7. **"Anything with no source: None."** One prohibition — *no real company name or logo* — appears only inside `04`'s generator block and in none of the four documents before it.
8. **"0 questions lost."** One was — the write-up said two and named one. `01-idea-grill.md` names *"is the QA tool in the first wave?"* and marks it **"named here so it is not mistaken for settled"**; `00` raises it too. `05` carries a different QA-tool question and says one decision remains undecided.

### Contradictions between documents

9. **The overall score disappears.** `00` says the badge renders *"a seller's score and its three components"* and `05` repeats it. `04`'s hierarchy has three component values, their labels, the staleness marker and the date range — and no score. The host never passes one, and `04`'s own prohibition forbids re-deriving it. Either the request's phrase is loose or the design dropped a requirement, and nothing in the pack says which.
10. **`04` invents an input.** *"`compact`: 1 the value the host asked for"* — there is no prop by which a host asks for a value, and `00` closes the input list with *"Nothing else is accepted."* `04` then contradicts itself two lines earlier, giving `compact`'s job as showing the score rather than a component.
11. **The generator block marks optional inputs as required** — density and the component values, both of which `00` and `04`'s own defaults table treat as absent-tolerant.
12. **Three teams or four.** `00` is addressed to *"the three teams who currently draw their own"*, `02` and `05` say three; `04` says *"Four host teams"*.
13. **A 37-character label cannot occur.** It is a done criterion in `04` and `05`. The labels are fixed by `00` and the longest is 27 characters, and `02` scored languages zero, so no localisation makes it longer either.
14. ~~**The "3 of 4" rounding count** does not survive `03`'s answer.~~ **Backwards** — `03` supports the count. The real tension is inside `00`, between *"two round to one decimal, one truncates"* and *"3 of 4"* four paragraphs later. `07` has it right.

---

## What this does to the verdict

**`BUILDABLE` does not survive.** Four of the fourteen are contradictions a builder would have to resolve by picking a side — most sharply number 9, where the thing the component renders is described two different ways and only one of them is possible from the inputs it is given. `build-context`'s own rule is that either an open question or an unresolved disagreement holds the verdict, and there are four.

The corrected verdict is **`ASK FIRST`**. It is recorded here rather than by editing `05`, because a pack that quietly becomes right is a pack nobody learns anything from.

**`CONDITIONAL` still stands.** `02` scored a document that came from outside the session and its arithmetic reconciles. The one error the reviewer found inside it is a prose miscount that moves no score. That verdict was never compromised and is not withdrawn — though `02`'s *argument* about what the score means did not survive: see `07`.

---

## Why this is the most useful document in the repository

The pack was written by a chain that had every reason to be careful. It carried the guard, named its own compromise in its first line, and still reported **zero disagreements in a set of documents holding at least four.** Not through carelessness: through recognising its own reasoning on both sides of every pair, which is the failure the guard has always described and never prevented.

The reviewer had less context, less investment, and no memory of why any decision was made — and that was the entire advantage.

What this document got wrong is the other half of the lesson, and it is in `07`.

This is the evidence for the change made at 4.4.0. The confession was true every time it was written and it never once produced a clean review. A stranger with six file paths did it in five minutes.
