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

The pack was rendered both ways. The split that emerged is **what every session needs against what is read once**, and it is not the same as important against unimportant.

### `CLAUDE.md` — 45 lines, loaded on every session

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

### `specs/quick-send.md` — 88 lines, read once

The verdict, the ten disagreements, the decided detail grouped so it can be found, the eight error paths by name with their exits, and what the pack cannot control.

```markdown
## Done means

**The signal.** Monthly transfers from mobile, against the trend before release. The stated target is +30%, from about 1,000,000 to 1,300,000 — **set for the full feature. See disagreement 10.**

**Reachable, by name, each with its exit.** Not *"handle errors gracefully"*:

| | Exit |
|---|---|
| List request fails | The region becomes invisible; the rest of the home screen works |
| Insufficient balance | Lower the amount or change the account, back to confirmation |
| Recipient account closed | `[DECISION NEEDED]` |
| Receiving bank silent | Five minutes of uncertainty, then the money returns. What the customer sees during it is `[DECISION NEEDED]` |
| Duplicate send | The second is the same transfer and is refused |
| App killed mid-send | `[DECISION NEEDED]` |
| Session or authorisation lost | `[DECISION NEEDED]` |
| No connection | `[DECISION NEEDED]` |

**Six of eight exits are undecided.** They are not in the ASK FIRST list because none of them blocks the first line of code — but every one of them blocks release.

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

**The pack broke a contract the chain had already paid for.** `request-shaper` sorts open items by what they block — starting, or going live — after an interview specifically to establish that. The first version of this skill collapsed both into one list called *ask before you start*, which would have put six undecided error exits beside the identity rule. One of those stops the first commit; the other six stop the release. Filed together, both get skimmed. The distinction is restored, and the lesson is narrower than it looks: a skill that assembles other skills' output can destroy information by flattening it, and nothing upstream will complain.
