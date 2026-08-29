# Checking the chain against itself

Every other skill in this set reads one document. You read all of them, which means you are the only thing that can catch the failure the set has demonstrated on itself twice: a derived document quietly disagreeing with its source, with nothing looking wrong.

Work the pairs below. Report a count, the way the other skills do — *"eleven checks, three disagreements"* — because a check with no number reads as a gesture.

## Brief ↔ flow

**A screen with no step.** The brief names a surface the flow never reaches. Either the flow is incomplete or the surface is dead.

**A step with no screen.** More common and more expensive. Every flow step a person participates in needs somewhere to happen, and the ones that get missed are the error paths, because they were written last.

**A decision the flow contradicts.** The brief says the confirmation is a separate surface; the flow shows the send happening from the list. One of them was updated and the other was not.

## Flow ↔ design states

**An error path nothing renders.** Take the flow's error list and find each one in the design's state list. This is the single highest-yield check in the matrix, because the flow lists failures exhaustively by discipline and the design covers the ones somebody drew.

**A state with no way out.** Both documents can hold this and neither notices — the flow says the exit is *"lower the amount"* and the design hides the information the person needs to know how far to lower it.

## Data model ↔ contract

**A field returned that no entity holds.** The contract promises something. Either an entity is missing or the field is derived and nobody said so.

**An entity nothing returns.** Possibly correct — internal state. Possibly a read nobody built.

**Copy or reference, decided differently in each.** The model says the name is frozen on the record; the contract returns it from a live lookup. Both are defensible and they cannot both be true.

## Slice ↔ everything downstream

**Work described for something already cut.** If `slice` ran late — as it did the first time this set was used end to end — the design, the flow and the contract all cover scope that will not ship. Do not delete it. **Mark it deferred and keep it**, because it is finished work that becomes valid again when the second slice starts.

**Something the slice kept that nothing downstream covers.** The reverse, and worse: it ships, and no document says what it does.

**Something downstream added that the slice never contained.** The third direction, and the one that reads as diligence: a brief decides a screen needs a figure the cut did not include, a model stores it, a contract returns it. Each step follows from the last and none of them follows from the slice. Check every requirement in the later documents against the *In the slice* list, and treat anything missing from it as an addition with no approver — not as a derivation. On the run this check was written from, that chain ran four documents deep before anything noticed.

## Every open list ↔ every other

**The same question with two owners.** *"Which account does the money leave from"* appears in the request's open list against the requester and in the flow against the backend. Two owners means neither answers.

**A question answered in one document and still open in another.** The answer usually arrived late and was written into the nearest document rather than back into the one that asked.

**A question that quietly disappeared.** Present in an early document, absent from every later one, never answered. This is the one nobody finds, and the only way to find it is to read the earliest open list last.

## Markers ↔ everything

**An `[ASSUMED]` that has since been confirmed** and still carries the marker — it will be scored low forever.

**A decision that appears unmarked in a later document and marked in an earlier one.** The marker was dropped in transcription, and an assumption is now being read as a fact. Trust the earlier document and say so.

## What not to do with a disagreement

**Do not reconcile it.** Choosing the more recent document, or the one that reads better, is making a product decision by filing order — silently, in a document whose whole purpose is to stop that.

Put both statements side by side, quoted, name which document each came from, and let the user choose. If they are not available, carry both into the pack under **Ask before you start**.
