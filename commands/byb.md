---
description: Route to the right before-you-build skill for what you have in hand
---

The user invoked the before-you-build router. Figure out where they are in the chain and route them — do not do the downstream work yourself.

**Ask nothing if you can tell from context.** Look at what they attached, pasted, or described, then name the skill and start it.

| What they have | Route to |
|---|---|
| A raw idea, proposal, or decision they have not committed to | `idea-grill` |
| An idea that survived scrutiny, now needs writing up properly | `request-shaper` |
| A written request, and the question is "can we start building?" | `readiness-score` |
| A shaped request, and nobody has decided what the screens should do | `design-brief` |
| A wireframe, mockup, or screenshot to be critiqued | `ux-grill` |
| A shaped request, and nobody has written down what actually happens | `flow-map` |
| A mapped flow, and nobody has decided what the system stores | `data-model` |
| A decision already made above them, with enough detail to fail in production | `risk-interrogate` |
| A change to something that already exists | `impact-radar` |
| A request nobody can build in the time available | `slice` |
| Several documents from this chain, and the question is "can we build now?" | `build-context` |

**Two rows take the same input and are not interchangeable.** A shaped request can go to `design-brief` or to `flow-map`, and the order matters: a brief written before the flow exists is missing most of its error states and says so. If they have not mapped the flow, route there first unless they say otherwise.

**`prior-art` is not a destination.** It is called by another skill when a mechanism or a capability needs checking, and it answers to whoever called it. Never route someone to it cold; name it when the thing in their hand specifies *how* and nobody has asked why that way.

If they gave you nothing to work with, ask exactly one question: *"What do you have — a raw idea, a written request, or a design?"* Then route.

If what they have does not fit any row, say so plainly and suggest the closest skill rather than forcing a fit. Some work does not need this set.

$ARGUMENTS
