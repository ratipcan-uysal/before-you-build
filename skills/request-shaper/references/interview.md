# Interview

Ask in rounds of three to five. Ask only what the input has not already answered. Order the rounds so a user who stops early still has a usable document.

## Order

1. **Blockers** — P1, P2, B3 below. Without these the document is automatically NOT READY, so they are never worth deferring.
2. **Behaviour and rules** — the heaviest category, and the one developers stall on first.
3. **Problem and scope, users and trigger** — the framing the rest hangs from.
4. **Data and dependencies, design and states, risk** — in whatever order the material makes natural.

## Which questions take options

**Options** — the answer is a decision from a small closed set. Build two to four genuinely different choices with the trade-off written into each, plus an escape.

> B5 permissions · S2 which states exist · D1 which source · U3 whether segments differ · T1 duplicate-submission behaviour · L1 ordering · prefill-or-ask · notification channel · reversal model

**Open** — the answer is a fact only they hold. Never offer options; you would be guessing on their behalf.

> any amount, count, limit, threshold, or percentage · current volumes · team and system names · dates · what the funnel shows · what the copy should say

**Half and half is common.** "Is the cap per transaction or per day?" is a choice; "how much is it?" is a fact. Ask the choice with options and the number in the open — in that order, because the model of the limit shapes what number makes sense.

## How to ask so you get a usable answer

- **Ask for the concrete instance, not the general rule.** "What happens if the payment fails?" gets a real answer. "How should errors be handled?" gets a shrug.
- **Offer a wrong answer to argue with.** "So anyone with an account can do this?" surfaces the permission rule faster than "who can do this?" — people correct much more readily than they specify.
- **Ask what breaks, not what should happen.** "What would make this go wrong for a user?" produces the branches that "describe the flow" never does.
- **One follow-up on vagueness, then stop.** Ask once for the number, the name, the limit. If it does not come, write what they said and record the gap. Pressing further is `idea-grill`'s contract, not yours.
- **Never ask two questions in one sentence.** People answer the second and forget the first.

## Question bank

### Problem and scope
- **P1 ⚑** What is going wrong today, for whom? *(a problem, not the feature)*
- **P2 ⚑** How will you know this worked? What changes that you could point at?
- **P3** What is deliberately *not* part of this?
- **P4** Who decided this is worth doing? Who can change that decision?
- **P5** Which platforms and channels? *(options — and never let "the app" stand for an answer)*
- **P6** Does anyone internal need a screen for this — an agent, an admin, back office? *(options)*

### Users and trigger
- **U1** Who does this? Be specific — a role, not "the user".
- **U2** What are they doing right before they hit this?
- **U3** Does it work differently for anyone — a plan tier, a permission level, a new account?
- **U4** What do they do today instead?
- **U5** Is the user ever acting for someone else — a second account, a company, a delegated role? What changes when they switch? *(options)*

### Behaviour and rules
- **B1** Walk me through it, step by step, when everything works.
- **B2** Where does it go a different way, and on what condition?
- **B3 ⚑** What can go wrong, and what does the user see when it does?
- **B4** What are the limits — minimums, maximums, timeouts, how many, how often?
- **B5** Who is allowed to do this, and what happens to someone who is not?

### Data and dependencies
- **D1** Where does this information come from?
- **D2** Which systems or teams are involved?
- **D3** What else uses the thing you are changing?
- **D4** Does any existing interface, schema, or contract change shape?
- **D5** Is a vendor or third party involved, and what does the agreement actually promise?

### Design and states
- **S1** Which screens or surfaces are involved?
- **S2** What is shown while it loads, when there is nothing, and when it fails?
- **S3** What does it actually say on screen — the labels, the messages, the error text?
- **S4** What accessibility level is required? *(options)*
- **S5** How many languages, and who writes and approves the translations?

### Risk and non-functional
- **R1** What worries you about the day after this ships? How would you find out it went wrong?
- **R2** If it goes badly, how do you undo it?
- **R3** How many people, how fast, how much data?
- **R4** Does this touch personal data, money, or anything a regulator cares about?
- **R5** Who has to sign this off before it goes live — legal, compliance, security, risk?
- **R6** Where does the data live, and is there a constraint on that?
- **R7** What does this cost to run — infrastructure, per-transaction fees, vendor charges?

### Instrumentation and downstream
The category most often missing entirely. The feature ships, and three weeks later nobody can say whether it worked.
- **N1** Which events fire, and with what parameters?
- **N2** What gets logged or written to an audit trail, and for how long is it kept?
- **N3** Does anyone need a report or a warehouse change out of this — new tables, new fields, a dashboard?
- **N4** How will you see it working in production? What would alert someone if it stopped?
- **N5** What do support and operations see when a customer calls about it? Do they need a tool?
- **N6** When this fails across five systems, can anyone follow one transaction end to end? *(options — shared trace id, per-system logs only, not discussed)*
- **N7** Who outside the delivery team needs to be ready — branch, call centre, field? Training or a script?

## Conditional questions

Two axes, both open questions — see the `readiness-score` rubric for the full list.

**By what the work does:**
- **Transactions:** what happens if they press it twice? Is authorisation re-checked on the server at submit? What if the price they saw has changed by then? In what order are discount, tax, and fee applied — and after which step can it no longer be undone?
- **Lists:** what does it look like empty, and with ten thousand rows?
- **Forms:** what happens to a half-filled entry?
- **Content:** what does the surface do if the content is missing?
- **Personalisation:** which rule wins when someone matches three campaigns at once? When is eligibility re-checked? What does someone who matches nothing see?

**By where it runs** — these are the same every time for a given surface, so ask them every time:
- **Mobile:** iOS and Android both, or one first? Minimum app version, and what old versions see? Can it be switched off without a store release? What happens with no connectivity — and what happens if the app is killed halfway through?
- **Web:** which browsers and viewports? What happens with the same flow open in two tabs? What accessibility level is required?
- **Backend:** who consumes this today, and does their version keep working? Which ships first, backend or client — and does each survive the other's previous version?
- **Multi-surface:** must it behave identically everywhere? Which ships first, and what do users see in the gap?
