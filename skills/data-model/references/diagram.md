# The entity diagram

Offered at four or more entities, never assumed. Below four, a table is clearer and a diagram is decoration.

## Conventions

Mermaid `erDiagram`, because it is the one notation that renders in a repository, an issue and a chat window without a tool.

```
erDiagram
    CUSTOMER ||--o{ ACCOUNT : owns
    ACCOUNT  ||--o{ TRANSFER : "sent from"
    RECIPIENT ||--o{ TRANSFER : "sent to"
```

- **Entity names in the singular**, in the words the material uses. If the material calls it three things, that is a finding for the user to settle, not something to smooth over in a drawing.
- **Every line is labelled with a verb**, read in one direction. An unlabelled line records that a relationship exists and loses what it is for.
- **Cardinality on both ends**, always. `||--o{` says one-to-many *and* says the many side is optional, which is a different product from `||--|{`.
- **Only fields that carry a decision.** A diagram listing every field becomes a schema, and a schema in a product document is the thing that gets it dismissed.
- **Mark what is unsettled.** An entity with an open `[DECISION NEEDED]` is drawn and labelled as open, not omitted. An omitted entity reads as decided.

## Check the drawing against the table

A diagram is a derived view and drops what the source held. Check it item by item, both directions, and report the count.

| Check | What it catches |
|---|---|
| Every entity in the table appears in the diagram | The one left out because the layout got crowded |
| Every entity in the diagram is in the table | An entity invented while drawing, usually a join table |
| Every cardinality matches | The end that flipped to make the line tidier |
| Every Phase 2 prohibition survives | **The most common loss.** Cardinality redraws easily; *"cannot be reassigned"* has nowhere to sit in the notation |

That last row is why the check exists. The rules Phase 2 records are exactly the ones a diagram cannot hold, so a diagram handed over on its own quietly returns the model to plumbing.

**Say what the diagram cannot show** when you hand it over: identity rules, retention, copy-versus-reference, and every prohibition. Whoever reads only the picture is reading the half that has no decisions in it.
