# Worked examples

One fictional request, carried through eight skills in the order they were actually run. Every document here is the real output, including the passes where a skill caught the one before it — and the two where a skill caught its own author.

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

There is also [a standalone `idea-grill` session](idea-grill-session.md) on a different case: a team wants to add an AI support chatbot, and four questions later it turns out they have a screen problem and have never looked at their own ticket data.

## Why these are unflattering

Examples where everything goes well teach nothing. These show the seams the skills exist to catch, including the seams in each other:

- The score comes back **NOT READY twice** and is right both times.
- The design **violates its own brief** — the recorded rank was recipient over amount, and the drawing made the amount the largest element. Nothing looked wrong.
- The flow grill finds most of its faults **in the diagram, not the text**, because a derived view drops constraints from its source.
- Two reviews open by **declaring themselves compromised**, because the same session produced what they are reviewing.

## The order is not a pipeline

Steps 5 to 7 are a loop, not a line. Some decisions cannot exist until something has been drawn — *"two recipients share a name; how does anyone tell them apart"* is not derivable from a request, and nobody thinks of it until two identical cards sit side by side. Expect two passes, and expect the second to be the useful one.

Most real sessions use one skill, not nine.
