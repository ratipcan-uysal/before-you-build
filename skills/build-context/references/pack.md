# The pack, section by section

One document, six sections, in this order. The order is the design: whoever reads top to bottom meets what is unsettled before they meet anything they could start building from.

Open with the verdict on its own line — `BUILDABLE`, `ASK FIRST` or `NOT BUILDABLE` — and, in one sentence, which chain documents this was assembled from and which are missing.

---

## 1. Ask before you start

Not a list of everything open. **Only what cannot be deferred** — the things whose answer the first day of work will otherwise invent. `slice`'s *decided now, built later* list is where most of them come from; the rest are `[DECISION NEEDED]` items that survived the chain.

Each one gets three things: the question in one sentence, who can answer it, and what happens if it is guessed.

> **Which account does money leave from when a customer has several?** — the requester. Guessed, every screen showing money picks its own answer and they will not agree.

Close the section with the contract, stated plainly, because it is the sentence the whole pack turns on:

> **These are questions, not gaps to fill. If you are building from this document and one of them is unanswered, stop and ask. Do not choose the sensible option.**

## 2. The job

One paragraph. Who finishes what, from where to where. Take `slice`'s spine sentence if there is one; write one if there is not.

No background, no motivation, no metrics. Those live in the request and a builder does not need them to build.

## 3. Decided

Facts, in the words the chain used, grouped so they can be found: behaviour and rules · surfaces and states · data · what the system must provide · errors and their exits.

- **Quote where it is load-bearing.** A paraphrase is a small rewrite.
- **Keep every `[ASSUMED]` marker.** An assumption promoted to a fact by transcription is the most expensive thing this section can contain.
- **Never add a fact that is not in a source document.** If you find yourself writing something reasonable that nobody decided, it belongs in section 1.

## 4. Must not

Prohibitions, as a plain list. From the brief's non-goals, `slice`'s permanent cuts, and the contract's anti-requirements.

The shortest section to write and **the one a generator actually obeys** — a model reading *"do not show the balance anywhere in this flow"* complies, where the same instruction phrased as a preference gets averaged away against everything else on the page.

Phrase every one as a prohibition, never as a preference. *"We'd rather not…"* is not a rule.

## 5. Decided now, built later

`slice`'s second list, carried whole: the identity rules, the stored-versus-computed calls, the permission model, retention. Each states the decision and then says explicitly that the feature around it is deferred.

> **Identity.** Two recipients are the same recipient when the account number matches, regardless of name. The merge tooling is not in this slice.

The test for each line: **someone reading only that line could implement it without asking a question.**

## 6. Done means

How anyone can tell it works.

- **The signal** — what should move, and roughly by how much, from `slice` or the request.
- **The error paths that must be reachable**, taken from the flow. Not "handle errors gracefully": the list, by name, each with its exit.
- **What must still be true afterwards** — from `impact-radar`'s regression surface where there is one. This is the only home that output has.

Nothing here is invented. If the flow does not name an error path, it is not in this section; it is in section 1.

## 7. What this pack cannot control

Always present, always last, even when the answer is *nothing missing*.

Four things decide the output more than any further decision will: **real copy**, **deliberately awkward example data**, **the design system**, and **the actual stack constraints**. Say which you have and which you do not, and say plainly that a generator handed none of them invents all four and returns something that reads as finished.
