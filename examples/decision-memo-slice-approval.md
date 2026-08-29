# Worked example — `decision-memo`

Input: [the slice](slice-quick-send.md), and everything the chain produced before it. No new analysis; every figure below already existed in one of those documents.

> **This was the last skill in the set to be run against real material, and the reason it went last is itself a finding.** No skill in the chain named it. `readiness-score` and `request-shaper` both produce lists of *"this person must decide that"* and neither said what to do about it. A skill nobody is routed to does not get used, however good its description is. Six skills now name the one they hand off to.

## Phase 0 — The two blocking questions

**What exactly is being approved?** Shipping Quick Send's first slice without the passwordless path.

**Who signs?** The requester, named in the request as the decision owner. Not *"leadership"* — a memo addressed to a group is held by nobody.

---

## The memo

> ### Quick Send — approval to ship without the passwordless path
> **To:** the requester · **From:** product · one page

**The ask.** I am asking for approval to ship Quick Send **without passwordless sending**. Recipient and amount arrive prefilled; verification works as it does today. The passwordless path is added in the second slice, when risk approves it.

**Why now.** The target is mobile live by end of Q3. Two things are stopping release today and both come from the same place: **there is no daily total cap**, and **approval to open it to every retail customer has not been given**. Both sit with risk, and both exist only because of the passwordless path.

**What we know.**
- Monthly transfers from mobile are about **1,000,000**. The target is **1,300,000**.
- The request carries **19 open items**. **Two are go-live blockers** and both attach to the passwordless path.
- **One of eight system needs is confirmed.** Of the unconfirmed, the hardest is enforcing the passwordless rule server-side, about which the needs pass wrote: *"if remote config never reaches the server this is impossible, and there is no real protection left on a passwordless money movement."*
- The impact pass recorded that repeated small sends under a threshold is **a textbook structuring pattern**, and that nobody knows whether the AML rules are calibrated for it.
- **The problem is not the password.** The request says the trouble is that *"the whole transfer flow has to be walked from the start every time."* The password is one step inside that flow. What we are removing is the flow.

**The recommendation.** Ship without the passwordless path.

The two rejected alternatives, one line each:
- **Wait and ship with it** — both blockers sit with risk and neither has a date. The Q3 commitment is not theirs.
- **Ship nothing** — a prefilled recipient and amount already removes most of the flow, and waiting to find out how much is waiting without measuring.

**What it costs.**
*What we give up:* the user takes one more step, the password. *What we accept:* this is not the feature as it was described, and the +30% target was set for the whole of it — the number has to be restated for the smaller thing before release, or the result cannot be read.

*What it takes to undo:* the passwordless path returns on two conditions — risk approval, and confirmation that the threshold can be enforced server-side. **No migration.** The applied threshold is stored on every transfer in this slice as well, which is part of the cut rather than a precaution taken afterwards.

**If nobody decides.** The default is risk's calendar, and neither blocker has a date. Q3 passes, and **nobody will have decided not to ship** — the decision will have been made by an absence of replies.

**What I need from you.** One approval: that the slice ships without the passwordless path. We are not stopping the conversation with risk. We are separating their calendar from ours.

---

## What running it changed

The skill's own opening phase names three kinds of ask, and **scope reduction is one of them** — yet none of its seven fields owned the question a reader asks first when told to give something up: *can we have it back?*

*What it costs* reads as price. *The recommendation* reads as rationale. So the paragraph above got written into the draft by hand, because the memo was plainly wrong without it — not because the skill asked for it.

The answer was already sitting in the chain: `slice` produces a column headed *what brings each cut thing back*. The data existed and the memo had no home for it. It does now, as a third required part of the cost field, with one rule attached: **if the honest answer is a migration rather than a decision, say so** — that turns a deferral into a permanent cut, and the reader is entitled to know which of the two they are approving.
