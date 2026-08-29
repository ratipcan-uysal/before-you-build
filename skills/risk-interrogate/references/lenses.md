# Risk dimensions

Twelve. Work them in order; skip the ones the classification makes irrelevant. Each entry gives what the dimension asks, what it usually catches, and an example phrased against a concrete feature — always rewrite the phrasing against the material actually in front of you.

## 1. Concurrency — two things at once
What happens when the same action runs twice, or two actors touch the same thing simultaneously.

Catches: double submission, two devices on one account, the same flow open in two tabs, a retry arriving after a timeout, two admins editing one record.

> "The amount is pre-filled and no password is asked below the threshold. A double tap, or a retry after a slow network — what stops it sending twice, and where is that enforced?"

## 2. Dependency failure — the thing you rely on is down, slow, or lying
Not just unavailable. Slow is worse than down, and wrong is worse than both.

Catches: no timeout defined, no fallback, a partner returning success for a failed operation, a cascading queue, a synchronous call that should have been asynchronous.

> "The counterparty bank does not respond. Five minutes is the stated recovery — what is the user's account showing during those five minutes, and what happens if the response arrives at minute six?"

## 3. Data integrity — stale, partial, duplicated, inconsistent
Data that was true when it was read and false when it was used, or true in one system and false in another.

Catches: prices computed at render and charged at submit, a balance shown from cache, two systems disagreeing about state, orphaned records after a partial failure.

> "The list is built from transfer history. If the recipient closed their account since the last transfer, when is that discovered — before the tap, or after the money leaves?"

## 4. Abuse and authorisation — someone doing this deliberately
Not the confused user. The motivated one, and the one who should not have access at all.

Catches: client-side-only permission checks, missing server re-verification, enumeration through an ID, a limit enforced in the UI only, a stolen session doing what a stolen device could.

> "The cap is per transaction with no daily total. Walk through what someone with a stolen unlocked phone can move in ten minutes, and what would stop them."

## 5. Privacy and regulation — the data footprint and who is allowed to see it
What personal data is touched, on what legal basis, for how long, and where it physically lives.

Catches: personal data in logs, retention nobody set, cross-border storage, a consent that does not cover this use, an audit trail that does not exist, a regulator-facing obligation nobody owns.

> "The recipient list is derived personal data. What is written to logs, who can read those logs, how long are they kept, and does the existing consent cover showing one customer's transfer history back to them this way?"

## 6. Scale and cost — ten times the volume, and what it costs
Both directions: does it hold up, and what does the bill look like when it does.

Catches: a query that is fine for ten rows and not for ten thousand, per-call vendor pricing that nobody added up, a notification fan-out, a cache that only helps when the feature is unpopular.

> "If this reaches the target volume, what does the per-transaction cost of the fraud check become, and who is watching that number?"

## 7. Operations and support — the person taking the call
Every feature creates work for someone who did not build it.

Catches: no way for an agent to see what happened, no manual override, no way to reverse an action, a script nobody wrote, a queue nobody staffed.

> "A customer calls saying they sent money to the wrong person. What can the agent see, what can they do, and if the answer is nothing, who is telling them that before launch?"

## 8. Reversibility — turning it off, rolling it back, fixing what is already written
Three different problems. Most plans cover the first and none of the rest.

Catches: a flag that stops new cases but leaves broken ones, a release that cannot be rolled back because the schema moved, data written in a wrong shape that has to be repaired by hand.

> "The feature can be switched off remotely. What happens to the transactions that already went out under the wrong threshold — is there a repair path, and who runs it?"

## 9. Migration and coexistence — the world as it is on release day
Existing users, in-flight work, old clients, old data, the half-migrated middle.

Catches: an old app version calling a changed endpoint, a user midway through a flow when the release lands, existing records missing a new required field, two versions of a rule live at once.

> "On release day, users are on app versions going back a year. Which of them see this, which of them call the new endpoint, and what does the oldest supported version do with a response it does not understand?"

## 10. Detection — how you find out, and how long it takes
A failure nobody notices is not smaller. It is larger, because it runs longer.

Catches: no alert, an alert nobody owns, a dashboard checked weekly for a problem that compounds hourly, a silent failure path, success and failure indistinguishable in the data.

> "If this starts failing for one bank's customers only, what alerts, who receives it, and how long before somebody looks? If the answer is a weekly report, say what a week of that costs."

## 11. Blast radius — what else goes down with it
The failure that stays inside its own feature is the rare one.

Catches: a shared service saturated, a shared table locked, a shared queue backed up, a login flow taken down by an optional widget on the home screen.

> "This sits on the home screen and calls transfer history on every open. If that query degrades, what else on the home screen degrades with it — and does the app still open?"

## 12. Human error — somebody configures it wrong
The most common production incident is not an attacker and not a bug.

Catches: a remotely-set limit typed with the wrong number of zeros, a flag enabled for the wrong segment, content published to the wrong surface, a migration run twice.

> "The threshold is remotely configurable. Who can change it, is there a second pair of eyes, and what stops a mistyped value going live at ten times the intended limit?"

## Working them well

- **Follow the material, not the list.** A dimension that produces nothing specific produces nothing. Say so in the closing section.
- **Chain the dimensions.** The strongest findings sit where two meet — a dependency failure that also leaves data inconsistent, an abuse path opened by a human error.
- **Prefer the mechanism to the category.** "Security risk" is a label. "A stolen unlocked phone can move the balance in sub-threshold taps" is a finding.
- **Do not write the fix.** Naming the failure is the job. The owner decides what to do about it, and skipping that step is how a risk pass turns into a design nobody signed up for.
