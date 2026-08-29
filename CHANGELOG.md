# Changelog

What changes about the output you get. Skills are behaviour, so a rubric that grows or a rule that tightens means the same document can come back scored differently — those changes are marked **Heads up**.

For why a decision was made rather than what changed, see [`docs/decisions.md`](docs/decisions.md).

## 3.7.0

The set was run end to end on a second, deliberately different request — an SDK, embedded in someone else's app, with a regulated consent flow. Three defects, all from the run.

**Heads up — `readiness-score` gains a sixth work type, `capability`.** The five existing values had no home for work consumed by other software rather than used directly. An SDK was scored as `input-collection`, which is defensible and misses the point: the essence of that request was **irreversible disclosure**, which fits `transaction`'s definition and is written in money-and-state language, so nobody looks there. `capability` opens five conditional items, and two of them are where the money is — whether behaviour can be switched off **without every host shipping a release**, and what the default is when the host declares nothing.

**Heads up — `slice`'s second test now checks that the signal exists**, not that one can be named. In this run it passed on *"first-contact resolution will improve"* while `readiness-score` had already fired that same measure as a **blocker scoring zero**. Two skills quietly agreeing that an unmeasurable slice is measurable is exactly the collusion the `[ASSUMED]` contract exists to prevent elsewhere. The cut can still be made; it is now made with that said out loud.

**`flow-map` counts marks and steps separately.** A step carries two or three touchpoint marks, and branches carry them too. *"Nine touchpoints"* over a table holding nineteen marks on ten steps reads as precision and is arithmetic — this is the third time that specific error has been made in this repo, which makes it a rule rather than a slip.

Three things worked that had never been tested. `design-brief`'s hardened opening reordered the run on its first real outing — the request had zero error paths, so it said running `flow-map` first would change the brief, and it did. `risk-interrogate`'s *a gap is not a risk* struck seven of nineteen draft questions. And `build-context`'s non-adjacent pairs, added the same day, found the `slice`-against-score contradiction that neither skill could see alone.

## 3.6.2

Three holes closed in the validator, all of them ones this repo had named and left open.

- **A retired or planned skill named without backticks** now fails. The token check only ever read backticked terms, so plain prose was a hiding place. Only retired and planned names are chased in bare prose — every other skill name is an ordinary phrase somewhere.
- **`CHANGELOG.md` is no longer exempt outright.** Entries under a version heading were true at the version they describe, but the intro above the first heading speaks in the present tense and was never checked.
- **A declared skill count in the README** — the bolded one in the status line — must match the number of skills on disk.

Verified in both directions against a scratch copy: each fires on its own defect, and a retired name under a version heading still passes.

## 3.6.1

**Heads up — a `decision-memo` asking for a reduction now says what it takes to undo.**

The first run of this skill against real material was a scope cut, which is one of the three asks its own opening phase names. Writing it surfaced the gap: a reader being asked to give something up asks whether they can have it back **before** they ask what it saves, and none of the seven fields owned that question. It belongs in *what it costs*, as a third required part alongside what we give up and what we accept.

If the honest answer is a migration rather than a decision, the memo says so — that turns a deferral into a permanent cut, and the reader is entitled to know which one they are approving. Where a `slice` pass exists, the column is already written and the line is a lift rather than a judgement.

This was the last skill in the set never run against real material. Every one has now produced at least one correction on its first run.

## 3.6.0

**Heads up — six skills now name the skill they hand off to.** An audit of every claim one skill makes about another found the `emits` break from 3.5.0 was not alone: **`decision-memo` and `build-context` were named by no skill at all**, and `slice` and `data-model` only by `build-context`, which runs last.

That explains something. `decision-memo` is the only skill in this set never run against real material, and nothing in the chain has ever pointed at it — a skill nobody is sent to does not get used, however good its description is.

- `readiness-score` now names `slice` when the scope is obviously more than one release, and `decision-memo` when a gap is open because a person has not decided. A NOT READY that reads as *go and write more* is wrong about both.
- `flow-map` says its touchpoint marks feed **two** skills. A flow that only ever reaches `api-needs` gets a schema invented for it downstream.
- `api-needs` asks whether the nouns have been named before drafting a contract over them, and names `build-context` at the end, because a list of needs is not a handoff.
- `request-shaper` names `decision-memo` for any open item that names a person rather than a question.
- `impact-radar` says where the regression surface goes. Handed over on its own it is read once and lost.
- `build-context` names `decision-memo` for anything that has stayed open across more than one document.

## 3.5.0

Three skills change, all from one question: is the produced spec enough for a backend or a mobile developer?

**Heads up — `api-needs` now covers `emits`, and says what each event must carry.** It had never mentioned events at all, in the skill or its references, while `flow-map` marks `emits` separately and says in as many words that a flow carries analytics to `api-needs` so that the pass will ask for it. One end of that contract was never built. *"Four events on the existing taxonomy"* also cannot be built from — nobody knows what to put in them — so each `emits` need now names the question it exists to answer and the fields that answer it. Naming the events stays with whoever owns the taxonomy.

**Heads up — `flow-map` now asks which failures a person must be able to tell apart.** It is derivable from the table the skill already produces: two errors that leave someone holding the same thing with the same way out do not need separate treatment; two that differ must be distinguishable, and if the interface shows both as *something went wrong*, one of the exits is unreachable. The codes underneath belong to whoever builds the system. Which failures a person is required to distinguish does not, and it had no owner anywhere in the set.

**`build-context` checks its own assembly against its sources.** It was the only producer in the set without that check — `flow-map` checks its diagram, `data-model` checks itself against the flow, `design-brief` checks the generator block against the record. It was needed: assembling this repo's own example, the spec turned a prohibition scoped to one surface into a prohibition on the whole flow, reversing a decision the design record had made deliberately in response to a review finding. **Assembly drifts toward the stricter reading**, because the stricter reading looks more careful and nothing flags it.

Also in `build-context`: the marker check now looks for markers that were **translated**, not only dropped. A translated marker still looks marked, which makes it the harder half.

## 3.4.0

**Heads up — `build-context` now writes one spec, ordered by what someone is about to build.**

3.3.2 fixed a summary that read as a specification by carrying the chain's documents across whole. Lossless, and still wrong: it produced a folder shaped like the process that made it. Whoever writes one screen finds its rule in the request, its hierarchy and copy in the design record, its steps and error exit in the flow, what it stores in the data model, and what feeds it in the needs — five files, a fifth of the answer in each. Nobody building is auditing the process.

The distinction that was missing: **summarising is lossy, reorganising is not.** Refusing to summarise was right; it was never a reason to hand over a folder organised by which skill produced what.

So: one spec, assembled by subject. Surface-bound material gathers per surface; the flow, the data model and the contract are cross-cutting and stay whole. **Move sentences, do not rewrite them** — a sentence relocated is not a sentence rewritten, and the difference is checkable, because every line traces to a line in the sources kept beside it.

**Assembling is also a check.** The same rule usually appears in three documents in three shapes. Separate files hide that: a reader meets each version in its own context and agrees with all three. Pulled into one section they either agree or they visibly do not, and the ones that do not are cross-check findings that were missed.

## 3.3.2

**Heads up — `build-context` now carries the chain's documents, not a summary of them.**

When it writes the handoff as project files, three things go down instead of two: the standing file a coding agent loads every session, the pack as a front door, **and the chain's own documents copied across whole** — the flow with its steps and exits, the design record with its states and drafted copy, the data model, the needs and the draft contract.

The version shipped in 3.3.0 wrote the first two and pointed at the rest. That is complete for a team, who already hold those documents, and empty for a model, which is handed the folder and nothing else — and the summary then reads as the whole specification, so everything compressed out of it gets invented instead. Rendered for this repo's worked example, the handoff was 146 lines against 768 of material: **19% of it, reading as though it were all of it.**

The pack's *Decided* section is now orientation and pointers rather than a restatement, with one rule attached: **nothing may exist only in the summary.** If a detail is in the pack and in no carried document, either a document is missing or the pack invented it, and both are findings.

## 3.3.1

Three corrections to `build-context`, all found by producing the pack rather than by reading the skill.

**It now declares itself compromised when it assembled the sources.** A model that wrote a brief, a flow and a contract, then hunts for disagreements between them, finds fewer than a stranger would. `ux-grill` and `flow-grill` have carried this guard from the start; the skill that checks *several* documents needed it most and did not have it.

**Heads up — the two tiers of open items survive into the pack.** `request-shaper` sorts open items by what they block, starting or going live, and the first version of `build-context` flattened both into one list. That would have filed six undecided error exits beside a decision that stops the first commit. One of those stops you starting; the other six stop you shipping, and together they get skimmed.

**The cross-check reads the slice in both directions.** Cutting scope changes what the documents *before* it mean, not only the ones after — a target set for the whole feature and never restated for the smaller one is a real disagreement, and the matrix could not see it.

Also: the validator no longer treats a link inside a fenced code block as a link. A worked example that shows a document is quoting it, not claiming its links resolve from here.

## 3.3.0

**`build-context` closes the chain.** It assembles what the other skills decided into one pack whose reader is whoever writes the code, and it puts **what is still open at the top**, above anything anyone could start building from. The chain used to end in nine documents, and nobody builds from nine documents.

It is the only skill in the set that reads more than one, which is where its boundary is and also where the work is. Its first phase checks the chain against itself — a screen with no step, an error path nothing renders, a field returned that no entity holds, the same question carrying two owners in two documents, an `[ASSUMED]` marker dropped in transcription and now read as fact. Run against this repo's own worked example it found **nine disagreements in fifteen checks**, including the request's most expensive marked assumption being treated as settled by three later documents.

**A disagreement is never reconciled here.** Choosing the more recent document, or the one that reads better, is making a product decision by filing order — in the document whose whole purpose is to stop that.

**Heads up — the verdict counts contradictions, not just questions.** `BUILDABLE` requires that nothing undeferrable is open **and** that no disagreement is unresolved. A pack with nothing open and nine places where two documents contradict each other is not buildable: whoever builds picks a side per contradiction, and no two picks have to agree.

**With this the set is fourteen skills and nothing is planned.** The three added since 3.0 all come from one correction — it was built for a PM handing a request to a team, and it also has to serve someone handing it to a model that writes the whole product. That reader does not ask when something is missing.

## 3.2.0

**`slice` joins the set**, and it runs fourth — straight after `readiness-score`, before anything is designed. Putting it at the end, next to the handoff, is where scope-cutting usually appears on a diagram and where it is useless: the design, the flow and the contract have already been produced for things that will not ship. That happened in this repo's own worked example, where a brief and a flow were written for a web surface the request itself defers.

Its rule is **cut the build, never the decision.** A deferred feature is a smaller build. A deferred decision is one made silently by whoever writes the code, instantly and without mention when that is a model. So the output has two lists rather than one, and the second — *decided now, built later* — carries the things that look like features and are decisions in costume: identity rules, stored-versus-computed, the permission model, and anything touching money, law or someone else's data.

Its first phase does one thing beyond finding the spine: it holds the **headline** against it. The part the request is named after, the part waiting on an approval, is often not load-bearing — and when it is not, that single cut takes the blocking approvals, the risk surface and the hardest dependency with it while leaving the hypothesis testable. Nobody looks, because the risky half is what the request is called.

**Heads up — a slice should raise your readiness score.** `slice` writes its exclusions as declarations rather than intentions, because `readiness-score` marks an item out of scope only against a quoted sentence. The open items belonging to deferred parts then leave scope with evidence attached. If the score does not move after a cut, the cut removed nothing.

## 3.1.0

**`data-model` joins the set.** It decides what the system must remember before anyone writes a schema: the entities, what makes two records the same thing, who owns them, what creates and ends them, which relationships carry a rule, and what is stored rather than computed. It takes its nouns from a mapped flow instead of brainstorming them, and checks itself back against that flow — a step that reads something no entity holds means one of the two is wrong.

It runs **before `api-needs`**: nouns before verbs, because a contract over undefined nouns is a contract over guesses. Nothing about `api-needs` changes, but its draft contract has better ground to stand on when the entities are named first.

Why it exists: ask a model to build and it produces a schema that works. Working is not the test. Copy a recipient's name onto a transfer and last March's receipt still says what it said; reference it instead and a rename edits every past receipt. Both schemas work, both survive review, and nothing records which was chosen.

**Heads up — `design-brief` now asks for your error paths.** It names them before deciding anything, and if the material lists only a handful it will say plainly that running `flow-map` first will change what the brief contains, then let you choose. This came from a measurement: of twelve design-review findings that named a decision, every one a mapped flow would have answered first was an error path and its exit — the retry left enabled, the message ordering an action the screen does not offer, the value hidden by a prohibition the exit needs. The order of the chain did not change; the input requirement did.

**Two skills are named in the chain and not written yet** — `slice` (what ships first, running fourth so the rest of the chain is spent on the first slice only) and `build-context` (the handoff, whose reader is whoever writes the code, human or not). They appear in the README diagram as planned. They will not appear inside any skill, example or router until they exist.

## 3.0.0

**`state-matrix` is removed.** Its work now lives in two places you were probably already running.

**Heads up.** If you were invoking it by name, that no longer resolves. The per-surface sweep — what a surface does when a dependency never arrives, when what it showed went stale, when the session is lost while it is open — is now part of `ux-grill`'s states lens, which runs on the same surface at the same point in the work. The project-wide constraints it kept rediscovering — theme, text scaling, minimum viewport, motion, truncation, number formatting — moved into `design-brief`, which now asks for all six and drafts them.

It was removed because two rounds of narrowing left it thin, and because a twelfth skill costs a boundary that has to be defended, tested and kept from drifting. It earned one finding the others would plausibly have reached anyway. The full reasoning, including the deletion condition written before it was met, is in [`docs/decisions.md`](docs/decisions.md).

## 2.0.0 — all twelve

**`impact-radar`** joins the set. What a change to something existing will break, traced across ten dimensions — and the distinction the whole skill turns on: **loud breakage throws and gets fixed in a day; silent breakage keeps working and is wrong.** A report that groups differently outranks a screen that errors, every time. Deferred breakage is worse than both, because release day looks fine.

It also produces the list nobody asks for and everybody needs: **what stays the same.** Half the cost of a change is reviewing everything people feared it touched.

**`decision-memo`** closes the chain. Seven fixed fields, one page, one position, one named person asked to approve one specific thing. It compresses analysis and produces none: a number that is not in the source material does not appear.

Its strongest field is the one most memos leave out — **what happens if nobody decides.** Inaction is a decision that gets made accidentally, and naming the default with the date it becomes irreversible is what turns a memo from information into a request.

## 1.4.0

**`api-needs`** joins the set. At each point the flow reads or acts, what the system must be able to provide — and crucially **when**: "the app needs the ranked list" is not a requirement, "on every launch before the person has touched anything" is, and only the second one has a cost.

Three things worth knowing:

- **Feasibility has three states, and Unconfirmed is the default.** If you cannot see the system, every need is unconfirmed and it says so with an owner attached. A list where everything is quietly assumed to work is the document that produces the week-three conversation.
- **It sweeps for assumed capabilities** — data a design takes for granted that nothing is known to produce. These are invisible in a flow, because the step reads perfectly.
- **It will draft a contract if you ask**, in a separate section that says in its own words that it is a starting point for the backend team rather than a specification. The needs stand without it, and it can be deleted.

Despite the name it is not about HTTP: a need can be met by a cache, a push, or a precomputed table.

## 1.3.0

**`flow-grill`** joins the set. Audits a flow that exists and returns findings, never a rewritten flow — not even a small one, because the moment you write the steps the review becomes a proposal.

It runs the same two guards as `ux-grill`: it declares itself compromised if it authored the flow in the same conversation, and it checks drift from the request before checking completeness. Drift runs in both directions, and the invisible one is a flow that quietly **dropped** something the request included — a missing thing leaves no gap in a diagram.

## 1.2.0

**`flow-map`** joins the set. Produces the flow as numbered steps with every branch's condition and ending, error paths numbered alongside rather than appended, and a mark at each point where the system reads or acts.

Coverage comes back as counts. Nine happy-path steps and one error path did not have one failure; it had one that came to mind.

**`api-needs` is now planned**, and it sits after the flow rather than after the screens: screens tell you about reads, flows tell you about writes, sequencing and failure.

## 1.1.0

**`state-matrix`** joins the set. Enumerates every state a surface can be in across six dimensions, marks each **Designed / Decided / Open / Unreachable**, and reports the counts. Two checks read across the finished matrix: a state with no way out is a trap, and a designed state nothing leads to is dead.

The design part of the chain is now drawn as the loop it is — `design-brief` → `state-matrix` → `ux-grill` → back to the brief. Some decisions cannot exist until something has been drawn, and the second pass is usually the useful one.

## 1.0.0 — wave one complete

**`ux-grill`** joins the set. Critiques a design that exists and returns findings with severity, never a redesign.

Two rules worth knowing before you run it:

- **It declares itself compromised if it produced the design in the same conversation.** A model that generates and then reviews approves its own work. This is not a disclaimer; it changes what the output is worth, and the pass should be repeated in a clean context.
- **Conformance runs before taste.** If a brief exists, the design is checked against it first — a screen that contradicts its own brief looks fine and passes review.

## 0.5.0

**`design-brief`** joins the set. Extracts the design decisions behind a feature before anyone opens Figma: surfaces, the single primary job of each, ranked hierarchy, navigation and input models, defaults, feedback, constraints, non-goals.

It also drafts what a UI generator would otherwise invent — copy and example content, marked `[DRAFT]` — and can emit a constraint block for generators. That block carries rank order and prohibitions and never a style adjective, because adjectives carry no constraint and send the model back to its average.

## 0.4.0

**`risk-interrogate`** joins the set. Twelve dimensions of production failure for work that is already decided, as questions grouped by who has to answer them.

**Heads up.** It refuses to restate gaps. If the material is already shaped or scored, it reads that document's open list and strikes everything already named there — an absence is a completeness finding and belongs to `readiness-score`. Expect a shorter, sharper list than a checklist would give you, and expect it to say so.

## 0.3.0

**`request-shaper`** joins the set. Turns raw notes into a document a team can start from, either by interview or, on request, as a draft with every inferred line marked.

**Heads up — a contract between two skills.** `request-shaper` marks anything it inferred `[ASSUMED]`, and `readiness-score` now caps a marked item at 1 point of 3. Documents produced by earlier drafting will score slightly lower, and that is the correct number: without the cap, one skill invents and the other scores the invention as content.

`idea-grill` gains **proxy mode** — for grilling a request that came from someone else, where "only they can answer that" is a correct answer rather than a crack, and the close becomes a question list for whoever owns it. Its lens catalogue grows to fifteen with prior art, unit economics, and permission to operate, plus channel lenses that ask where a request came from, because a request from sales fails differently from one from compliance.

## 0.2.0

**`readiness-score`** joins the set. Scores a written request 0–100 with a `READY / CONDITIONAL / NOT READY` verdict.

**Heads up — the rubric grew twice after this release.** It began at 25 items on one conditional axis. It now carries 39 spine items across seven weighted categories and two axes: what the work does, and where it runs. A document scored at 0.2.0 will score differently now, usually lower, because instrumentation, account context, calculation order, release ordering and platform scope were not asked about at all. The later number is the honest one.

Three blockers force `NOT READY` regardless of total: no stated problem, no success criterion, no failure paths. A document can score 84 and still fail.

## 0.1.0

First release. **`idea-grill`**, the `/byb` router, the method, and one worked example.

`idea-grill` was calibrated once shortly after release: it now shows the strongest available answer once a point closes — never while it is open — restates the thesis whenever a defense moves it, and stops on a maturity check rather than a turn count. Can you state the thesis, do you know what it depends on, do you know what would kill it: any no is the next target, all three yes means dialogue has taken it as far as it goes.
