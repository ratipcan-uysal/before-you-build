# The draft contract

Offered once, produced only on request, and always in its own section under a heading that says what it is.

## What it is for

A product manager arriving with a list of needs negotiates from a weaker position than one arriving with something concrete to disagree with. Engineers respond to a proposal; a list of requirements invites a conversation about scope, and a proposal invites a conversation about design — which is the one worth having.

## What it is not

It is not a specification, and the document says so in its own words:

> **This section is a starting point for the backend team, not a specification.** It is a guess at a shape, made by someone who does not own this system. Argue with it, replace it, or delete it — the needs above stand without it.

That paragraph is not decoration. It is the thing that stops an experienced team reading the section as overreach, and it goes in every time.

## Two layers, and the second one has to be asked for

**The shape layer** is always safe: what is asked for, what comes back, and what is still open. It survives any paradigm.

**The concrete layer** — real operations with paths, fields and verbs — is far more useful and only exists once you know the conventions. **Ask before writing a line of it**, in one exchange:

1. **Which paradigm** — REST, GraphQL, gRPC, something else, mixed.
2. **Naming** — resource nouns or action paths, and the field case. Best of all: two existing endpoints to copy the style from.
3. **Versioning** — in the path, in a header, or not versioned.

**If the answer is "I don't know" or "mixed", stop at the shape layer and say why.** A proposal in the wrong paradigm is worse than no proposal: it is not merely unusable, it tells the reader the author does not know the stack, and everything above it is then read in that light.

When the conventions come back, **follow them exactly, including the ones you would not have chosen.** The value here is a document that looks like it belongs to this organisation, not one that argues for a better naming scheme. Naming is where a contract conversation goes to die, and you did not open this conversation to win that argument.

## Rules that keep it honest

- **Every element traces to a need.** No field, operation or parameter that no step in the flow requires. The moment you add something because it seems useful, you are designing a system you have not seen.
- **Mark it all `[DRAFT]`.** Every operation, every field.
- **Name what you could not shape.** Where a need has no obvious form — a ranking, a limit that may live in a rules engine — say that rather than inventing one.
- **No error catalogue, and no status codes.** Failure paths are in the flow, where they belong. A parallel list of codes here is a second source of truth and the wrong one — and error semantics are the part a backend team most reasonably owns.

## Shape

```
[DRAFT] Recipients for quick send
  Serves: step 1
  Asks for: the customer
  Returns:  a ranked list — for each, whatever identifies the person
            to a human plus what identifies the account to the system,
            and the amount last sent to them
  Open:     what "ranked" is computed from, and over what window

[DRAFT] Send a repeat transfer
  Serves: step 5
  Asks for: source account, recipient, amount, and something that lets
            a repeat of this exact request be recognised as the same one
  Returns:  whether it happened
  Open:     whether the caller learns the result synchronously or is
            told later — the flow's five-minute return path depends on it
```

**"Open" is a required line where anything is open.** A draft that answers everything is a draft that invented something, and the invented part is the part nobody will notice before it is built.

## After it

Close by handing it over explicitly: the needs are the product manager's, the contract is the backend team's, and the fastest version of this conversation is one where both sides know which is which before it starts.
