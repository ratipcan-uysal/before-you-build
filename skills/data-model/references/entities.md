# The five questions, worked

Each question below catches a specific failure. The failure is named first, because a question whose failure you cannot picture gets answered carelessly.

## The shape of an entity record

Five labelled lines under the entity's name, which is what a later document cites. Do not number entities. The flow's own steps and error paths are already `A1`, `E4`, `EA2`, and a second meaning for one of those letters costs more than it saves. The labels are the five questions in short form, so a reader looking for retention finds it without reading the record:

> **Component value** — *(seller × day × component type)*
> **Identity:** seller, day and component type all match. `[DECISION NEEDED]` owner Marketplace Core — a second run the same day writes a new version or is refused, and the code will pick one on day one.
> **Ownership:** the seller. What happens to the values when a seller leaves is Legal's, along with the retention period.
> **Lifecycle:** created by step A5 · nothing changes it · ended by retention only.
> **Copy or reference:** the seller is a reference, the definition is a reference to an immutable version, the number itself is a copy of a computation.
> **Existence:** seller, day, component type, definition version, date range. It can exist without a value — "insufficient data" is a stored state, not an absence.

Two columns of key and value do the same job until an answer runs long, and these answers run long: a measured run put 84 words in one of these cells, which renders as a narrow column of squeezed prose beside a one-word label. The labels are worth keeping; the grid is not.

## 1. What makes two records the same thing?

**Catches:** duplicates that arrive quietly and are never merged, because nothing ever said they were the same.

The identity rule is a sentence, not a column. *"Two recipients are the same recipient when the account number matches, regardless of the name"* and *"…when the account number **and** the name match"* produce different products: the first follows a person through a rename, the second leaves a second card in the list.

Ask it hardest where the material says "list of" or "history of". A list is where identity failures become visible, one row at a time.

**When the answer is "we don't know yet"**, that is a real answer and it has a consequence: the system must be able to merge later, which is a decision about what merging does to history. Say so rather than defaulting.

## 2. Who does it belong to, and what happens when they leave?

**Catches:** a deletion request arriving eighteen months later with nobody able to say what it covers.

Three questions wearing one coat:

- **Ownership** — whose record is it. Shared records have no single owner and that is itself the finding.
- **Departure** — account closed, employee gone, subscription ended. Does the record go, anonymise, or stay?
- **Retention** — how long it is kept, and whether an obligation somewhere sets that number rather than a preference.

The answer usually belongs to legal, compliance or a data-protection owner. Name them; do not invent a period.

## 3. What creates it, what changes it, what ends it?

**Catches:** entities that exist in the model and in nobody's flow — the ones a generator will faithfully build tables for and never write a row into.

Every entity gets three steps named. If a step cannot be named:

- **No creator** → it comes from outside. That is an integration, an import or a seed, and it is a dependency nobody listed.
- **No changer** → it is a log, not a record. Say so, because the two want different things.
- **No end** → it grows forever. Sometimes correct, and worth being correct on purpose.

## 4. When something it copied changes, does this change too?

**Catches:** history that rewrites itself, and the argument three months later about which number was right.

Answer **per field**. A transfer usually wants the recipient's name frozen at the moment of sending and their account reference live, because the name is what the person read and the account is what the money follows.

Two failure directions, both real:

| Copied when it should reference | Referenced when it should copy |
|---|---|
| A corrected typo never reaches the old rows | Last year's receipt shows this year's name |
| Two records disagree and neither is wrong | A rename silently edits history |

The question is not which is safer. It is what the person was shown, and whether that is a promise.

## 5. What must be true for it to exist at all?

**Catches:** the required field that turns out to be unknowable at the moment of creation, discovered during build.

State it as a rule someone can argue with — *"a transfer cannot exist without an amount and a destination; it can exist without a recipient name"* — and then check it against the flow's earliest step that creates the thing. If that step does not yet have one of your required values, one of the two must move.

## Relationships: what to write and what to skip

Write it up when it does one of these. Otherwise one line.

- **Reaches the screen.** *"One customer, many accounts"* forces every money surface to say which account, and forces the flow to have a step where that is chosen.
- **Can break.** The account closes, the recipient is deleted, the plan ends. What the dependent record does then is a product decision.
- **Is really a state.** *"Many sessions"* is usually one current and a log. *"Many addresses"* is usually one default and the rest.
- **Carries a limit.** Ten recipients, three devices, one active subscription. A limit in a relationship is a rule, and rules get enforced in exactly one place or in none.

Always say what the rule **forbids**. *"A customer may have many accounts"* constrains nothing; *"a transfer belongs to exactly one account and cannot be reassigned"* does.
