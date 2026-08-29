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

## Phase 4 — The same pack as project files

The pack was rendered as files, and rendering it is what showed the first version to be wrong.

**The first attempt wrote two files** — a 45-line standing file and a 101-line pack — and pointed at the chain's documents for everything else. For a team that is complete: they have those documents. For a model it is empty, because a model is handed the folder and nothing else, and the summary then reads as the whole specification. Everything compressed out of it — the steps, the states, the exits, the fields, the strings — gets invented.

**146 lines were going down. The material is 768.** The pack was carrying 19% of it and reading as though it carried all of it.

```
hizli-gonder-build/
├── CLAUDE.md              45   loaded every session
└── specs/
    ├── quick-send.md     101   the front door — verdict, disagreements, done means
    ├── request.md        126   problem, rules, limits, the open list by what it blocks
    ├── slice.md           75   what is in this release, and what brings each cut thing back
    ├── screens.md        128   surfaces, hierarchy, states, drafted copy, awkward data
    ├── flow.md            96   8 steps · 4 decisions · 5 branches · 9 error paths with exits
    ├── data-model.md      68   entities, identity rules, lifecycle, stored versus computed
    └── api.md            129   8 needs with feasibility, anti-requirements, draft contract
```

The split that emerged is three-way and only the first part was obvious:

- **Every session** — the job, the five questions, the prohibitions, the undeferrable decisions, the vocabulary. A page.
- **The front door** — verdict, the ten disagreements, what done means, what the pack cannot control, and the few facts that change how everything else reads.
- **The documents themselves, carried whole.** Not summarised. A compression of another skill's output is a rewrite, and a rewrite is where a prohibition loses its edge and a marked assumption becomes a fact.

### `CLAUDE.md`, in full

```markdown
# Quick Send — standing context

Read on every session. The full pack is in [`specs/quick-send.md`](specs/quick-send.md).

## The job

A customer who has sent money before sends it again to the same person, from the home screen, without walking the whole transfer flow from the start.

**This is slice one.** Passwordless sending, the web surface and the source-account picker are deliberately not in it. Do not add them back; see the spec for what brings each one in.

## Ask, do not guess

Five things are undecided. **If you need one of them, stop and ask.** Do not pick the sensible option — a plausible answer here becomes a migration.

| Open | Who answers | If you guess |
|---|---|---|
| What makes two recipients the same recipient — account number alone, or account number and name | Requester + backend | Duplicates accumulate under the wrong rule; the fix is a merge with rules about which history survives |
| Which account money leaves from when a customer has several | Requester | Every surface showing money picks its own answer and they will not agree |
| Audit log retention period and its owner | Compliance | The obligation applies from the first record written |
| Accessibility conformance level | UX | Retrofitting contrast and targets touches every surface |
| Minimum supported app version, and what older versions show | Mobile | An unmanaged version is a support incident with no fix path |

## Must not

- **No amount on the recipient cards.** No balance anywhere in this flow, error messages included — this is a stated constraint, not a layout preference.
- **No avatars, no contact-book access, no bulk send.**
- **No client-side ranking.** The list arrives ordered.
- **No second call to fetch the last amount** — the list carries it.
- **No secret, limit or threshold enforced only on the device.**
- **No fetching balance in order to draw the region.**

## Decided now, built later

These are in the build even though the features around them are not.

- **Applied threshold.** Every transfer stores the limit in force when it was made. The screen that shows it is not in this slice.
- **Default source account.** The picker is out; which account money leaves from is a decision, not a default to invent.
- **Event source parameter.** Every send event carries its source from day one. A million existing rows without it cannot be backfilled.
- **Audit trail.** Written from the first transfer. The tooling to read it is out.

## Vocabulary

Use these words in code, copy and commits. They come from the request and changing them costs a translation layer in every conversation.

`recipient` (not contact, not payee) · `quick send` (the region) · `transfer` (the record) · `source account` · `applied threshold`
```

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

**The pack was a front door with no rooms behind it.** It summarised eleven documents and pointed at them, which is complete for a team holding those documents and empty for a model handed a folder. Phase 4 wrote the door and left the rooms in a chat window. It now carries the chain's documents whole, and the pack's *Decided* section is orientation with pointers rather than a paraphrase — because anything that exists only in the summary is either a missing document or something the summary invented, and both are findings.

**The pack broke a contract the chain had already paid for.** `request-shaper` sorts open items by what they block — starting, or going live — after an interview specifically to establish that. The first version of this skill collapsed both into one list called *ask before you start*, which would have put six undecided error exits beside the identity rule. One of those stops the first commit; the other six stop the release. Filed together, both get skimmed. The distinction is restored, and the lesson is narrower than it looks: a skill that assembles other skills' output can destroy information by flattening it, and nothing upstream will complain.
