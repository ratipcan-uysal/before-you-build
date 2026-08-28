# Worked example — `idea-grill`

A real-shaped session, abridged. The product is fictional: **Ledgerly**, a small B2B invoicing tool with roughly 400 paying customers.

---

**User:** We keep getting the same support questions over and over. I want to add an AI chatbot to the help page. Grill me.

**Claude:**

Before I attack it, here it is at its strongest:

> Ledgerly's support load is dominated by a small number of repeated questions. Those questions have stable, documented answers, which makes them the ideal case for automation. An AI assistant on the help page deflects that volume at near-zero marginal cost, gives customers answers at 2am instead of the next business day, and frees the two-person support team for the harder tickets that actually need judgment. The technology is now cheap and good enough that not doing this is the unusual choice.

Is that your argument at its strongest, or have I missed a reason?

**User:** That's it, that's the argument.

---

**Claude:** *(assumption excavation)*

You said the same questions come up repeatedly. How do you know that — from the ticket data, or from the feeling of answering them?

**User:** Honestly, the feeling. But it's a strong feeling, we all have it.

**Claude:** Logged as a crack: the premise of the whole idea is currently unmeasured.

*(frame challenge)*

Suppose you pull the data and you are right — say 60% of tickets are five recurring questions. A chatbot answers them. But a question asked hundreds of times is usually a product telling you something. What would it mean if the correct fix is not answering those questions faster, but making them stop being asked?

**User:** ...that's uncomfortable. Probably three of the five are because our invoice-status page is confusing. A chatbot would basically be a translation layer over a bad screen.

**Claude:** That held as an objection, and you conceded it cleanly. Noted: part of the ticket volume is a design defect, not an information gap.

*(stakeholder rotation — the customer)*

Take the seat of a customer whose invoice has not been paid and who is now angry. They land on your help page and get a chatbot. Argue their side: what does that experience do to them?

**User:** They'd hate it. But we'd have a clear "talk to a human" escape.

**Claude:** You answered a different question. I asked what the experience does to them, and you told me what mitigation you would add. With 400 customers and two support staff, what is your actual reply time today?

**User:** Couple of hours, usually. Same day for sure.

**Claude:** So the honest comparison is not "chatbot versus waiting until tomorrow". It is "chatbot versus a human in two hours" — for a customer base small enough that support may be something they notice and value.

*(opportunity cost)*

Two-person team. Building and tuning this is real work. What are you not building while you build it?

**User:** The invoice-status redesign, probably. Which... is the thing that causes the tickets.

---

**Claude:** Let me close this out.

### Surviving thesis
Ledgerly has a support-load problem worth solving, but the diagnosis has not been done. A chatbot is one candidate treatment, currently untested against a cheaper one.

### Cracks

| Crack | What would close it |
|---|---|
| "Same questions repeatedly" is a felt impression, not a measurement | Tag one month of tickets by topic; get the actual top-five distribution |
| Three of five recurring questions are suspected to be caused by the invoice-status screen | Confirm against the tagged data; if it holds, that is the real defect |
| Deflection value assumed against a "next business day" baseline that does not exist here | Compare against the real 2-hour reply time |
| At 400 customers, human support may be a retention asset rather than a cost | Ask ten customers what they would think of a bot before building one |

### How the idea evolved
Opened as "add a chatbot", a solution looking for justification. Under pressure the premise turned out to be unmeasured, a cheaper competing fix surfaced from the user's own answer, and the comparison baseline was found to be wrong in the idea's favour.

### Verdict
**UNRESOLVED** — the idea is not dead, but it cannot be defended until the ticket data exists. One week of tagging decides whether this is a chatbot problem or a screen problem.

---

Want me to save this to a file?

**User:** Yes. And let's design the tagging.

> *Note: the last request leaves `idea-grill`. Designing the tagging is not a grill — it is the next piece of work.*
