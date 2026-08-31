# Lenses

Eleven. Apply the ones the material can answer; say which you could not and why. Each entry gives what it asks, what it usually catches, and the question that produces a finding rather than an opinion.

## 1. Hierarchy — does the eye land where the design intends?
Catches: two elements competing for first place, a decision recorded and not executed, size contradicting stated rank, a heading that outranks the thing it labels.

> "Blur the screen. What survives? Is that the thing this surface exists for?"

## 2. Affordance — does what is actionable look actionable?
Hierarchy decides what is *seen* first; affordance decides what looks *pressable*. They come apart constantly.

Catches: a primary action drawn as an information tile, text that looks tappable and is not, an icon with no hit area, a card where the whole surface is the control but nothing says so.

> "Point at everything a user can act on. Now point at everything that looks like they can. Where do the two lists differ?"

## 3. States — what does this look like when the world is not convenient?
Catches: no empty state, no loading state, an error state that was never drawn, a list designed for four items and shipped with four hundred.

> "Which states exist as a drawn screen, and which exist only as an assumption?"

**Sweep for them rather than recalling them.** Per surface, ask what happens when: the data is absent, singular, or far larger than expected · a dependency this surface needs never arrives · what was shown has gone stale before it was used · permission or session is lost while the screen is open · the app is backgrounded and returned to midway · the person arrives after a long absence and the prefilled values are old.

Most produce nothing on most surfaces. The one that reliably produces something is the second — a surface that needs three things and has a designed state for two.

Report each as a **condition the design must answer for**, never as a check that would verify it. *"What is the largest amount this surface must display"* is a state; *"does 999,999.99 fit"* is a test, and a list of tests arrives with nobody owning the decision behind it.

Project-wide constraints — theme, text scaling, minimum viewport, motion, truncation, number formatting — are not findings here. They have the same answer on every surface and belong in `design-brief`. Check they were decided, and point there in one line if they were not.

## 4. Error paths — what happens when it fails?
Catches: an error that says something went wrong and not what, an error far from the field that caused it, a dead end with no way forward, a failure the user never sees at all.

> "Read the error as someone who does not know how the system works. Do they now know what to do next?"

## 5. Adjacency — is the explanation next to the thing it explains?
Catches: a rule stated at the top and applied at the bottom, a notice that changes the meaning of a button placed nowhere near it, a label separated from its value by a container edge.

> "For each piece of explanatory text: how far is it from the thing it changes, and will a top-down reader still be holding it?"

## 6. Irreversibility — is the point of no return announced?
Catches: a destructive or final action that looks like every other action, a flow that removed a confirmation step and never says so, a "done" that is not done.

> "Which action here cannot be undone, and how does the person know before they take it?"

## 7. Correction — can a user fix what they got wrong, here, now?
Catches: a pre-filled value with no visible way to change it, a summary that forces a full restart to edit one field, an error that clears the input it complained about.

> "The value in front of them is wrong. What is the shortest path to right, and does the screen show it?"

## 8. Exits — how many ways out, and do they behave the same?
Catches: a back control and a cancel button doing undefined and possibly different things, an exit that stays live during an operation it cannot actually stop, a modal with no way out at all.

> "Count the exits. For each: where does it land, and what happens to work in progress?"

## 9. Accessibility — who cannot use this?
Catches: contrast below threshold, hit targets under 44px, meaning carried by colour alone, an unreadable focus order, text that breaks when scaled, an icon-only control with no label.

> "Turn it greyscale. Double the text size. Now which parts stop working?"
> If no conformance level was specified, say so — a finding against an unstated standard is a suggestion. **A measurement is not a suggestion, and the two travel together:** report the contrast you read, then say which level it would fail and that no level is set. The number is a fact about the drawing; only the verdict waits on somebody.

## 10. Content under stress — does it survive real material?
Catches: layouts built for the short name and the round number, truncation with no rule, placeholder copy that reads as final, invented real-world brands and institutions, two identical entries that cannot be told apart.

> "Put the worst realistic content in it — the longest name, the duplicate entry, the zero, the negative. What breaks, and what merely becomes ugly?"
> Invented copy is a finding on its own: unapproved strings that reach a screenshot become approved strings.

## 11. Consistency — does it belong to this product?
Catches: a control that exists nowhere else in the app, a second visual language, spacing and type that do not match the surrounding screens, a pattern borrowed from a different product's conventions.

> "If this were dropped into the app tomorrow, what would a regular user notice as foreign?"
> Only assertable if you can see the rest of the product. If you cannot, say so rather than guessing.

## Working them well

- **Follow the screen, not the list.** A lens with nothing to say produces nothing. Naming the ones you could not apply is more useful than padding.
- **The strongest findings sit where two lenses meet** — an affordance problem that is also an irreversibility problem, a state that is missing *and* carries the only error path.
- **Prefer the mechanism to the label.** "Poor hierarchy" is a grade. "The amount is the largest element on a screen whose stated rank one is the recipient" is a finding.
- **Never fix it in the finding.** Name the decision that closes it and stop.
