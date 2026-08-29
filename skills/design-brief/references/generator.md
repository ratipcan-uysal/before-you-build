# The generator block

A second output, offered once and produced only on request. It is not the record reformatted — it is the record translated into the things a UI generator actually obeys.

## What generators respond to

**Structure, order, and prohibitions.** They ignore adjectives, and they fill every gap with a confident default drawn from the average of everything they have seen.

That last part is the whole problem. A gap is not left blank; it is filled, plausibly, and nobody notices until someone tries to use it. So the block's job is to leave as few gaps as possible in exactly the places that matter, and to say out loud what must not appear.

**Never put a style adjective in it.** "Modern", "clean", "sleek", "intuitive" are the instructions that produce the generic result the user is trying to escape — they carry no constraint, so the model falls back on its average. Rank order and prohibitions carry constraint. Adjectives do not.

## Format

One block per surface.

```
SURFACE: <name>
PRIMARY JOB: <one verb phrase — the single thing a person comes here to do>

ELEMENTS, IN RANK ORDER:
1. <element> — <why it is first>
2. <element>
3. <element>

REQUIRED STATES:
- default: <what is shown>
- empty: <what is shown, and the way forward>
- loading: <what is shown>
- error: <what is shown, and whether it interrupts>

INPUT:
- required: <fields>
- order: <what is unreachable until what>
- pre-filled: <field, source, how it is corrected>

MUST NOT:
- <the thing a generator would add unasked>
- <the thing a stakeholder would add unasked>

CONSTRAINTS:
- surface: <phone / browser / both>
- accessibility: <level, or "not specified — do not assume">
- design system: <tokens or reference, or "none supplied — output is a layout study">

CONTENT:
- copy: <the drafted strings, flagged [DRAFT] if not yet approved>
- example data: <three records, at least one awkward for this domain>
```

Drafted copy goes **into** the block, flagged. Leaving it out to be safe does not make the generator cautious — it makes it inventive.

## Rules

- **MUST NOT is the highest-value section.** It is the only reliable control over what a generator invents. Write the specific things: no contacts import, no avatars, no bulk actions, no promotional banner, no onboarding carousel.
- **Ban real-world entities by name.** Generators reach for real banks, airlines, brands and logos to make sample content feel plausible, and a mockup carrying a real institution's name is a mockup someone will screenshot into an external deck. Put it in MUST NOT and supply fictional names in the example data.
- **Carry the rank mechanism, not the rank.** "1. recipient" tells a generator the order and nothing about the means, and it will happily make item 2 the largest thing on the screen. Write how rank 1 wins — largest, isolated, contained, first — or the order is decorative.
- **Rank order, never "prominent".** "Make the recipient prominent" produces bold text. "1. recipient name" produces a layout.
- **Real copy or a flag.** If you do not have the real strings, say so in the block. Otherwise the generator's invented copy gets screenshotted into a review deck and quietly becomes the copy.
- **One surface per block.** A block covering three surfaces produces one screen with three jobs on it.
- **Carry the `[DECISION NEEDED]` items in as prohibitions, not blanks.** *"Source account selection: NOT DECIDED — do not render a selector"* beats leaving it out, which invites one to be invented.

## What the block cannot control — say so every time

The record is the decisions layer. A generator needs decisions **plus** three things this skill does not produce, and it will invent all three silently if you do not supply them. Close every generator block with what is missing, in the user's own terms:

| Missing | What the generator does instead |
|---|---|
| **Real copy** | Invents every label, button, error and empty-state string. It reads fine, gets screenshotted into a review, and quietly becomes the copy nobody approved. **Draft it instead** — marked `[DRAFT]`, approved in one pass |
| **Example content** | Designs for the convenient case — a short name, a round number. Never the 34-character name, the single-word account, the two people with the same name. **Draft three records**, one of them deliberately awkward |
| **The full state set** | Renders the default state only, whatever the record says. Every state you need drawn has to appear in the block by name |
| **Design system access** | Builds its own visual language. "Use the existing design system" means nothing to a tool that cannot see it — supply tokens, or accept that the output is a layout study and not a design |

Supplying strings and three awkward example records costs ten minutes and changes the output more than any other input. Say that out loud, because users reliably skip it.

## What not to do with it

Do not treat the generated result as a design. It is a draft of a layout that respects your decisions — worth minutes, not hours. It has not been critiqued, its states have not been swept, and nobody has checked it against a real user.

That is what `ux-grill` is for, and running it on generated output — in a context that did not produce it — is the point at which this set earns its name.
