# Finding sources, and what counts as one

## The order to look in

1. **Product documentation** — the developer docs of things that already do this. Highest value by a distance: docs describe behaviour, including the awkward parts, because the people reading them will hit those parts.
2. **Specifications and standards** — RFCs, platform APIs, W3C, the regulator's own text. These settle capability questions outright.
3. **Platform documentation** — what iOS, Android, the browser or the runtime actually permits. Most capability departures are settled here in one page.
4. **Published post-mortems and engineering writing** — narrower, and useful for the failures nobody documents in a feature page.
5. **Marketing and comparison pages** — lowest. Say what someone wants believed. Cite only when nothing else exists, and mark the line `[UNVERIFIED]`.

## What counts as a source

**A page you opened and read.** Not a search result title, not a snippet, not something you are fairly sure is true.

The test: could you quote the sentence that supports your line? If not, you have a recollection, and a recollection presented beside real citations is the single thing that makes this whole skill untrustworthy — because the reader cannot tell which is which, and after one bad line they stop believing the good ones too.

## Reading a documentation page well

- **Look for what it says is configurable.** A setting exists because somebody needed both answers, which means it is a decision rather than a default — and probably a decision in this work too.
- **Look for what it says is not supported**, and in what combination. *"Redaction is disabled in full device mode"* settles an argument that would otherwise run for a week.
- **Look at the defaults.** A default is the vendor's answer to "what do most people need", and departing from it is a departure worth asking about.
- **Look at what the docs bother to warn about.** Warnings are compressed incident history.

## What not to do

- **Do not read one product and generalise.** Two independent sources doing the same thing is a pattern; one is a company.
- **Do not treat absence as evidence.** Nobody documenting a thing does not mean nobody does it. It means you did not find it, and that goes in Phase 4.
- **Do not follow the page's argument.** Vendor documentation is written to make its own model look inevitable. Take the behaviour, leave the framing.
- **Do not go deep on more than a handful.** Three well-sourced departures beat twelve half-read ones, and the reader's patience is spent on the first two anyway.

## When the search comes back empty

Say so plainly, and say which reading you think applies:

- **The problem is unusual.** Then the work has no map, which is itself worth knowing and changes how much of the rest of the chain should be trusted.
- **The search was wrong.** Different words, a different field, an adjacent industry. Say which words you tried.

An empty section written as though nothing were missing is the worst outcome this skill can produce, because it reads as *"we checked, we are fine."*
