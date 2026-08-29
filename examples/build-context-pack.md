# Worked example — `build-context`

Input: every other document in this folder — the shaped request, both scores, the risk pass, the design record, the UX review, the flow, the flow review, the system needs, the impact pass, the data model and the slice. Eleven documents.

---

> **Every document checked here was produced in the same conversation as this check. It is compromised.** A model that wrote a brief, a flow and a contract, then hunts for disagreements between them, finds fewer than a stranger would — it recognises its own reasoning on both sides of each pair and reads agreement into it. This bites harder than the equivalent guard on `ux-grill`, because the pull is toward every document at once. Repeat it in a clean context.

## Phase 1 — The chain against itself

> **15 checks · 10 disagreements**

| | Disagreement | Pair |
|---|---|---|
| 1 | The happy path's **last step has no design**. The flow's step 8 is *"show the result"*; none of the eight artboards reviewed is a success screen | brief ↔ flow |
| 2 | **The empty state is specified and never drawn.** The request defines it, the flow carries it as `B4`, nothing renders it | brief ↔ flow |
| 3 | **Nine error paths, one of them drawn.** Only insufficient balance. The flow says so about itself — *"six exits still undefined"* — and nobody read it across | flow ↔ states |
| 4 | The exit from insufficient balance is *"change the account"*; the design has no account selector. **Both documents are internally consistent**, which is why neither review caught it | flow ↔ states |
| 5 | The draft contract treats `recipient` as a resource with its own endpoint. The data model leaves open whether it is an entity at all or a query over transfers | model ↔ contract |
| 6 | The model requires the **applied threshold stored on the transfer**; no endpoint writes it | model ↔ contract |
| 7 | *"Which account does money leave from"* sits in three documents with **two different owners**. Two owners means neither answers | open lists |
| 8 | *"How is a mis-send reversed"* was raised by the request, the risk pass and the impact pass, and **entered no downstream document at all** | open lists |
| 9 | The request marks *"corporate customers are out of scope"* `[ASSUMED]` and names it the most expensive assumption if wrong. **The brief, the flow and the contract all treat it as fact** | markers |
| 10 | The target is **+30% monthly transfer volume, set for the whole feature.** The slice is smaller and nobody restated it | slice ↔ upstream |

Not one of these is reconciled here. Choosing the more recent document would be making ten product decisions by filing order.

## The verdict

> ## `ASK FIRST`
> **5 questions** before the first line of code, **10 disagreements** to settle. Both above anything you could build from.

The five: the recipient identity rule · which account money leaves from · audit retention and its owner · accessibility conformance level · minimum supported version.

A sixth tier sits lower down and is deliberately not here: **six of eight error exits are undecided.** None of them stops anyone starting. All of them stop anyone shipping, and filing them next to the identity rule gets both ignored.

## Phase 4 — The same material as project files

Rendering it is what showed the first two attempts to be wrong, and the second was wrong in a way that is easy to defend and still wrong.

**Attempt one** wrote a standing file and a pack that summarised eleven documents and pointed at them. Complete for a team who hold those documents; empty for a model, which gets the folder and nothing else. **146 lines going down against 768 of material.**

**Attempt two** carried the chain's documents across whole, unsummarised. Lossless, and still wrong — because it produced a folder shaped like the process that made it. Whoever writes the confirmation screen finds its rule in the request, its hierarchy and copy in the design record, its steps and its error exit in the flow, what it stores in the data model, and what feeds it in the needs. **Five files, a fifth of the answer in each.** Nobody building is auditing the process.

**Attempt three** is one spec **ordered by what someone is about to build**:

```
hizli-gonder-build/
├── CLAUDE.md                45   every session
├── specs/
│   └── hizli-gonder.md     287   the spec, by subject
└── sources/                      the audit trail — not build instructions
    ├── request.md · slice.md · screens.md · ux-grill.md
    └── flow.md · data-model.md · api.md
```

Its section 4.2, *Confirmation*, holds in one place: the hierarchy and why the recipient outranks the amount, the prefilled and in-place-editable amount with the branch it creates, the four states, the locked screen with the exit control removed, the prohibition on showing balance **including in error messages**, which two needs it reads and that they are separate sources, what it writes and that it must be atomic, what it stores, which events it emits — and the open decision about the source-account picker, with the note that the flow and the design each hold a consistent and incompatible version of it.

Every one of those lines came from a different document. That is what assembling by subject means, and it is also a check: **the same rule usually appears in three documents in three shapes, and separate files hide that.** A reader meets each version in its own context and agrees with all three. Pulled into one section they either agree or they visibly do not.

**Move sentences, do not rewrite them.** A sentence relocated is not a sentence rewritten, and the difference is checkable — every line traces to a line in `sources/`.

### Then the check was run on it, and found three faults

Claiming traceability is not measuring it. Walking every prohibition, default and marker back to its source turned up:

1. **A prohibition inverted.** The design record decided, deliberately and in response to a review finding, that *"the balance prohibition covers only the region, not error messages"* — because a failure that does not say what is short cannot be acted on. The spec had it as *"no balance anywhere, error messages included."* **Assembly drifts toward the stricter reading**, and the stricter reading looks more careful, so nothing flags it.
2. **`sources/` was incomplete.** Seven of eleven chain documents. Lines in the acceptance section cite an impact pass that is not in the folder, so their traceability target does not exist.
3. **Markers were translated in the sources.** Thirteen `[TASLAK]` and thirteen `[KARAR GEREK]` against a chain contract that is `[DRAFT]` and `[DECISION NEEDED]`. A translated marker still looks marked, which is why the marker check now hunts for it.

Two more absences surfaced the same way, because writing the copy meant opening the sources: the design record had **drafted no strings at all** and **no example records**, and the pack's last section had ticked both green. It also had none of the six project-wide constraints. All three are now in the spec, marked `[DRAFT]` — and writing them proved the point, since the number format had to be decided before a single button label could be written.

## What this pack cannot control
```

## What this pack cannot control

Four things move a generated result more than any further decision. This chain produced two of them and not the other two.

| | |
|---|---|
| **Real copy** | ✅ drafted and marked `[DRAFT]` in the design record |
| **Deliberately awkward example data** | ✅ three records, including two recipients with the same name |
| **The design system** | ❌ not supplied. Export the tokens, or hand over two screenshots and the component list |
| **The actual stack constraints** | ❌ not supplied |

Saying so is the point. A pack that stays quiet about the two it does not have gets handed to a generator that invents a visual language and an architecture, and returns something that looks finished.

---

## What running it changed

Three things, and the third is the one worth reading.

**The verdict counted questions and not contradictions.** A pack with nothing open and ten disagreements would have come back `BUILDABLE` — the exact failure the skill exists against, committed by the skill. It counts both now, and either can hold the verdict.

**The cross-check only paired neighbours.** The sharpest findings came from documents three and four steps apart: number 9 runs from the request to the contract, and number 10 was not found by the matrix at all — it surfaced while writing the acceptance section, because a slice changes what the documents *before* it mean, not only the ones after.

**The output was wrong twice, and the second time it was defensibly wrong.** First a summary that read as a specification. Then the chain's documents carried whole — lossless, and shaped like the process rather than like the work. The distinction that was missing: *summarising* is lossy and *reorganising* is not, and refusing to summarise is not a reason to hand over a folder organised by which skill produced what.

**The pack was a front door with no rooms behind it.** It summarised eleven documents and pointed at them, which is complete for a team holding those documents and empty for a model handed a folder. Phase 4 wrote the door and left the rooms in a chat window. It now carries the chain's documents whole, and the pack's *Decided* section is orientation with pointers rather than a paraphrase — because anything that exists only in the summary is either a missing document or something the summary invented, and both are findings.

**The pack broke a contract the chain had already paid for.** `request-shaper` sorts open items by what they block — starting, or going live — after an interview specifically to establish that. The first version of this skill collapsed both into one list called *ask before you start*, which would have put six undecided error exits beside the identity rule. One of those stops the first commit; the other six stop the release. Filed together, both get skimmed. The distinction is restored, and the lesson is narrower than it looks: a skill that assembles other skills' output can destroy information by flattening it, and nothing upstream will complain.
