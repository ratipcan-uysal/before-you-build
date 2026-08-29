# Worked examples

One fictional request, carried through eleven skills in the order they were actually run. Every document here is the real output, including the passes where a skill caught the one before it — and the two where a skill caught its own author.

Read in this order:

| | | What this step added |
|---|---|---|
| 1 | [The raw request](quick-send-request.md) | A bank's business unit asks for one-tap repeat transfers. One page, one contradiction, and a great deal of silence |
| 2 | [`request-shaper`](request-shaper-interview.md) | Fifteen questions later it is a seven-section document. One answer doubles the scope mid-interview; two answers contradict each other ten minutes apart |
| 3 | [`readiness-score`](readiness-score-comparison.md) | **12/100 before, 39/100 after, NOT READY both times.** Catches the shaper for stopping early and saying nothing about it |
| 4 | [`risk-interrogate`](risk-interrogate-pass.md) | Six of sixteen draft questions struck for repeating gaps the document already listed |
| 5 | [`design-brief`](design-brief-record.md) | The decisions behind the screens. Version two, because eleven of the grill's findings were decisions nobody had made |
| 6 | [`ux-grill`](ux-grill-findings.md) | Thirteen findings on screens drawn from that record — including the record's own central decision, violated in the drawing |
| 7 | [`flow-map`](flow-map-quick-send.md) | What happens, in what order, with nine error paths the request had none of |
| 8 | [`flow-grill`](flow-grill-findings.md) | Nine findings, six of them in the diagram rather than the text |
| 9 | [`api-needs`](api-needs-contract.md) | What the system must provide — 1 supported, 7 unconfirmed — and a draft contract |
| 10 | [`data-model`](data-model-quick-send.md) | What the system must remember. Four mismatches against the flow it was derived from, and one is whether the central noun is even a thing |
| 11 | [`slice`](slice-quick-send.md) | What ships first. The part the feature is named after turns out not to be load-bearing |
| 12 | [`build-context`](build-context-pack.md) | All eleven documents checked against each other and assembled. **Ten disagreements in fifteen checks** — including one the design and the flow each held consistently, and the request's most expensive marked assumption read as fact by three later documents |

There is also [a standalone `idea-grill` session](idea-grill-session.md) on a different case: a team wants to add an AI support chatbot, and four questions later it turns out they have a screen problem and have never looked at their own ticket data.

## Why these are unflattering

Examples where everything goes well teach nothing. These show the seams the skills exist to catch, including the seams in each other:

- The score comes back **NOT READY twice** and is right both times.
- The design **violates its own brief** — the recorded rank was recipient over amount, and the drawing made the amount the largest element. Nothing looked wrong.
- The flow grill finds most of its faults **in the diagram, not the text**, because a derived view drops constraints from its source.
- Two reviews open by **declaring themselves compromised**, because the same session produced what they are reviewing.

## Two of these ran in the wrong place, and it shows

The order above is the order things actually happened, not the order the chain now recommends. Two skills did not exist yet, and the record of what that cost is more useful than a tidied-up version.

- **`slice` should have run fourth**, right after the score. It ran last. So steps 5 to 9 were produced across the full scope — a design record and a flow were written for a web surface the request itself defers, and a passwordless path that the slice then cut. That is the argument for its position, and it is an expensive one to make twice.
- **`data-model` should have run before `api-needs`.** It ran after. The draft contract in step 9 was written over nouns nobody had defined; nothing in it turned out wrong, but it was standing on unsurveyed ground.

The chain the skills now describe is: shape · score · **slice** · design · grill · map · grill · **model** · contract.

## The order is not a pipeline

Steps 5 to 8 are a loop, not a line. Some questions do not occur to anyone until something has been drawn — *"two recipients share a name; how does anyone tell them apart"* is not derivable from a request, and nobody thinks of it until two identical cards sit side by side.

Noticing and deciding are not the same step, and this example separates them the hard way. The drawing is what surfaced the question; the answer belongs to `data-model`, four steps away, because *what makes two recipients the same recipient* is an identity rule and not a rendering choice. Step 6 filed it as a design finding, step 10 found it was never a design question at all. Expect two passes, and expect the second to be the useful one.

Most real sessions use one skill, not eleven.
