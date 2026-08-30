# Changelog

What changes about the output you get. Skills are behaviour, so a rubric that grows or a rule that tightens means the same document can come back scored differently — those changes are marked **Heads up**.

For why a decision was made rather than what changed, see [`docs/decisions.md`](docs/decisions.md).

## 4.4.0

**The guard becomes a mechanism.** Principle 7 says critique and creation must not share a context. Four skills carried the guard and all four discharged it by recommending a clean-context repeat — measured across two full chain runs, that produced fifteen compromised reviews and zero repeats, because the recommendation is addressed to a user who would have to open a new session and re-attach everything. The grills now hand the pass to a subagent whose input is the artefact's **file paths** and the skill's instructions. Paths, never pasted content; the verdict is the subagent's; inline review is unchanged when the material came from outside. The confession survives as the fallback, which is the only honest place for it. The guard also reached `risk-interrogate`, `prior-art` and `impact-radar`, which assess another skill's output and had never carried it.

**Heads up — a scoring or a review may now be produced by a subagent rather than inline.** The output is the same shape; what changes is who wrote it.

**Four claims this set made about itself were not true.** `method.md` said no skill checks how anyone else has already solved the problem — `prior-art` has done exactly that since 4.0.0, and `method.md` never mentioned it. It said every critical skill opens with a steelman; only `idea-grill` does. `decisions.md` said eleven skills. And the rubric claimed thirty-nine spine items while listing forty, in the reference belonging to the skill whose entire purpose is refusing to credit what is not there.

**CI reads the chain diagram.** It lives in a fenced block, and fences are blanked before every prose check, so the most-read map in the repo was the one document nothing could see — and it had drifted: an edge contradicting this repo's own recorded rule about where `data-model` takes its nouns, plus two edges no skill implemented. Also new: the rubric's own count, count claims in `docs/`, anchored links resolving instead of being silently skipped, a malformed manifest reporting instead of crashing, and a check that the seven hand-copied self-review guards keep their delegation. Each was proven by reintroducing the fault on a scratch copy.

**Chain holes closed.** `idea-grill` named no destination for its output, breaking the rule this repo wrote itself. `ux-grill` needs a drawing and nothing in the set produces one — the gap is now named rather than filled with a drawing skill, and a review sent a record with no drawing hands it back. `flow-grill` had one destination for three kinds of finding. `slice` named no downstream producer despite declaring its list the scope of record. `request-shaper`'s second pass now accepts `risk-interrogate` and `flow-grill`, which had no carrier back at all.

**And a versioning rule**, written after three releases picked their number from an author's reading of what a minor meant: a skill added or removed is a major, a skill's contract changing is a minor, a correction that changes no behaviour is a patch. By that rule this release is a minor, which is what it was already numbered.

**The change above was tested on the release that made it, and the release failed.** The third example's pack was assembled by this chain, carried the guard, opened by naming its own compromise — and reported **13 pairs, 0 disagreements** across a set of documents holding at least four, while getting its own arithmetic wrong twice. The same six files were then handed to a reviewer with nothing but their paths: **fourteen findings**, twelve of them invisible from inside. The `BUILDABLE` verdict is withdrawn and the check is published beside the pack rather than folded into it, because a pack that quietly becomes right teaches nobody how it was wrong. Nothing in this release is better evidence for the delegation than the fact that it caught this release.

**And then the check was checked, which is where the release stops flattering itself.** The write-up of that delegated review was produced back inside the chain, and a second reviewer — same conditions, eight file paths, no knowledge that a first audit existed — found that two of its fourteen findings no longer describe the files they name, one is backwards, and four are overstated or blame the wrong document. Twelve hold. It also found four contradictions both earlier passes missed, and it recomputed an arithmetic claim this release published: the assertion that four exempting sentences would put the third example *"in the high seventies"* is false — they give 64.3, and exempting every zero-scored item in the rubric gives 77.1. That claim, and the reading of the rubric built on it, are corrected in the example and in `docs/decisions.md`.

**Heads up — the recorded rubric finding is weaker than it was published.** A `capability` request of that shape pays an unavoidable tax of roughly twelve points, not eighteen, and the largest single shortfall in the worked example is K3, which is the request's own.

The narrower lesson is the useful one: **a delegated review has to survive the return trip.** None of the write-up's errors were in the reviewer's report. They entered when the findings came home and were written up by the party they were about — and this set already knew that a finding cannot be carried by the skill that produced it, without noticing that the skill receiving it is the compromised one.

**A third worked example, and it is the first one that gets a yes.** [Seller score badge](examples/score-badge/README.md) reaches `CONDITIONAL` and then `BUILDABLE` — labels this repository had never published, alongside `SURVIVES, NARROWED`, `idea-grill` in proxy mode inside a chain, and `design-brief`'s generator block, none of which any example had shown. It went looking for whether the 80-point threshold is reachable and found something more useful: a request that answers nearly everything a `capability` needs scores **62**, because the rubric asks a read-only render component about data residency, running cost and go-live sign-off. Nothing was exempted, because an item leaves scope only when a document positively says so and this one never thought to. The finding belongs to the rubric, and it is recorded rather than acted on — changing a threshold to make an example pass is the wrong order.

## 4.3.0

**A second worked example**, and it is a different shape from the first on purpose. [Changing a seller score](examples/seller-score/README.md) — a marketplace wants to change what a seller's score means, and twenty documents later the release being proposed does not change the score at all. It starts where most work inside an organisation starts, with something that already exists, so it enters at `impact-radar` rather than `idea-grill` — the row the README calls most of the work and the one no example covered.

It is the run the 4.2.0 fixes were measured against, so it shows them working rather than asserting them: every question raised is carried to the end (**questions lost: 0**, against a previous run that lost one and noticed in the last document), a second pass adds four departures and moves the score by nothing because questions are not content, and the cut travels back into the request to retire five open items with the quote that retired each.

What it fails at is worth more than what it gets right. A drawing decides, in a border colour, something its own record explicitly marked undecided — the second time in two examples that a design has quietly contradicted its own brief. And three numbers pointing in three different directions are all drawn identically, because the record settled hierarchy and reference and never thought to settle direction.

**CI now reads example folders.** The prose checks resolved links and skill names in `examples/*.md` and stopped there, so twenty documents in a subfolder would have been unchecked. It now walks subfolders, and requires each one to carry an index that reaches every file in it — the same guarantee the flat examples already had.

## 4.2.0

The first end-to-end run of the whole chain on one real request, and eight changes that came out of it. 4.1.0 ended with a standing rule — a skill is finished when it has been run once on real input and one other skill has been checked against it. This is that run, applied to all fifteen at once.

**Heads up — a `design-brief` record written before the flow exists now says so and calls itself partial.** An existing record re-run will come back marked. The finding behind it: the first version was read as the complete set of decisions, and the second version's largest section was error states, every one traceable to the flow rather than to the request.

- **`readiness-score` declares itself compromised when it scores its own draft.** The guard lived in `flow-grill`, `ux-grill` and `build-context` and not here, which is backwards: `request-shaper` → `readiness-score` is the pair that actually runs back to back, and the output is a number, so it reads as measurement whoever wrote it.
- **`request-shaper` takes in the questions raised before the document existed.** A proxy-mode `idea-grill` produces questions for the requester and nothing carried them. On the run, the first question asked — whether the requested thing was the right response at all — was absent from all fifteen documents that followed, and only `build-context` noticed, last.
- **A need whose owner does not exist is a finding, not a blank.** All three of `api-needs`' feasibility verdicts assumed somebody owns the system the need lands on. Two needs had no owner at all; unowned is not weakly supported, it is never confirmed, never refused, and rediscovered as the thing nobody built.
- **`flow-map` shows its arithmetic.** It already warned that mixing marks and steps is the most common error in the document. The warning was not enough — a pass wrote 16 marks on 10 steps over a table holding 14 on 8.
- **The router stopped growing three skills ago.** Seven destinations out of fifteen, and three of the six front doors the README names could not be reached from it. `flow-map` now joins `design-brief` on *a shaped request*, with a line saying which comes first.
- **One-way handoffs made two-way.** `prior-art` hands `slice` a named alternative and `slice` never mentioned it; `readiness-score` caps an `[UNVERIFIED]` item and never named the skill that settles it; `build-context` was named by two skills in the set and by neither one in the design loop.
- **`design-brief` done criteria get checked rather than read.** They restated the decisions, which is what a reviewer nods at while looking straight at a screen that violates them — as happened: the record said the recipient outranks the amount, the drawing made the amount largest, nothing looked wrong.
- **Boundary cases for the four pairs that actually collide** — `slice`/`readiness-score`, `data-model`/`api-needs`, `build-context`/`request-shaper`, `flow-grill`/`risk-interrogate`. The thinnest sections were the newest skills, which are also the ones whose descriptions overlap most. 93 cases to 101.

**The chain had no way back into a document that already exists**, and now it has one. `prior-art` ran after the request was written and its three most decision-changing findings never re-entered it; `build-context` collected them ten documents later, by which point the flow, the model and the contract had been written over the unamended version. `request-shaper` gets a **second pass** — not a new mechanism, but the one the design loop already runs when a grilled brief comes back as v2. It carries the findings and does not answer them: a second pass that quietly settles the questions it was handed is worse than none, because the document then looks as though somebody decided.

Two more checks, both of them finding what was found by hand that day. **A skill named by exactly one other skill** passes the *named by another skill* rule and is still unreachable in practice — `impact-radar` sat behind `request-shaper` alone. And **the changelog check asked whether an entry existed for the manifest version, not whether it was the newest**: a 4.2.0 entry, a 4.1.0 manifest and a README saying v4.2 all passed at once.

**Two structural gaps, both found by running the whole chain a second time on a different request.** A cut was only half-connected: `slice` wrote quotable exclusions and nothing rewrote the request's open list, so four of fourteen blocking items belonged to parts already removed and every later document counted all fourteen. `slice` is now a source for `request-shaper`'s second pass, with a third outcome — an item that left scope is not an item that closed, and the difference is the quote that retired it.

And scope grows **downstream** of the cut, through good reasoning: a brief decided a screen needed a figure the slice did not contain, the model stored what that implied, the contract returned it, and a risk pass asked a question premised on it being shown. Four documents deep before anything noticed. `design-brief`, `data-model` and `api-needs` now mark an addition as an addition and name who approves it; `build-context` gains the third slice check. Nobody is forbidden from adding — only from adding silently.

**One change in this release reversed a recorded decision and was caught reading the record.** A router row was written telling users to map the flow before writing the brief — from the same evidence the order test had already weighed, and against the threshold it had declared in advance. It is corrected here, and [`docs/decisions.md`](docs/decisions.md) now says to read it before changing the chain's order. Nothing mechanical would have caught this one.

## 4.1.0

Three checks that examine whether a skill has actually **joined the set**, rather than merely solving its problem. Every one of them exists because the same mistake was made five times, three of them on the day the first two were being audited.

- **Every skill must be named by another skill.** Being listed in the README routes nobody. `decision-memo` was named by nothing for weeks and went unrun as a direct result — a skill nobody is sent to does not get used, however good its description is.
- **Every marker a skill emits must be covered by its own Language rule.** A token that appears in the body and not in the rule gets translated, and a translated marker breaks a contract silently.
- **Every skill states a boundary.** A skill with no *Not this skill* section fires on its neighbours' work.

A written checklist was tried first and is the thing that failed. The validator is the only part of this that runs whether or not anyone remembers it.

Verified in both directions against a scratch copy. What still cannot be checked mechanically — whether both ends of a declared contract are implemented, whether a producer carries the guards its siblings carry — is recorded in [`docs/decisions.md`](docs/decisions.md) as a standing rule instead: a skill is finished when it has been run once on real input and one other skill has been checked against it, not when it is written.

## 4.0.1

`prior-art` shipped without a clear answer to *when is it called, and what does it feed*. Three breaks, all found by asking.

- **Two entry points disagreed.** `request-shaper` named it at the moment it writes a mechanism line; the chain diagram routed to it after the score. Neither was wrong and together they were unusable.
- **The diagram drew two edges out of the same node with the same label**, and the return edge fed only `request-shaper` — while the customer for a mechanism departure is `slice`, which needs a *named alternative* to make a cut a choice rather than a subtraction.
- **Two callers, one recipient written.** The operating rule said the output goes into the request's open list. A constraint question raised by `design-brief` belongs in the brief's decision list; it is not the requester's to settle.

It is now written as what it is: **not a step in the chain, but a skill that answers to whoever called it.** Three callers, three different outputs, three different places they go — and one edge forward, because a named alternative is what turns a cut into a choice.

If the caller is unclear, it asks which of the three before reading anything. They need different sources and produce different documents, and doing all three at once produces a survey nobody acts on.

## 4.0.0 — fifteen skills

**`prior-art` joins the set**, and it is the only skill here that reads material the user did not produce. That makes it the only one that can be confidently wrong about the world, so it is built as a grill rather than a producer: it asks questions, never recommends, and never names a product to buy.

It exists because the set had no way to see a choice presented as a requirement. Requests describe **one** way of solving the problem, and by the time it is written down nobody remembers it was a choice. `prior-art` reads what already solves the problem and asks about three kinds of departure — a different **mechanism**, a **constraint** nobody else imposes, and a **capability** nobody confirmed the platform has. Each has a different owner, and capability departures can usually be settled the same day rather than discussed for a week.

**Heads up — every line cites a source that was actually opened.** Not a search result title, not a recollection. This is the same evidence gate `readiness-score` applies to out-of-scope claims, and it is not decoration: on its first run the rule caught its own author. A claim written from a search summary — *"comparable products have the customer start the session, not the agent"* — did not survive contact with the page, which documents agent-sent SMS links as one of five supported methods. The corrected finding is narrower, accurate, and more useful: the work **stacks two initiation methods** where the documented product treats them as alternatives.

`request-shaper` names it whenever it writes a mechanism line, and `design-brief` names it for any constraint nobody else imposes — because from inside the work, an insight and an unexamined assumption look identical.

**Major version** because the chain has a new step and the marker vocabulary grew in 3.9. Nothing that worked before behaves differently.

## 3.9.0

**Heads up — `[UNVERIFIED]` joins the marker vocabulary, and every skill recognises it.**

The set had a marker for *I inferred this from what you gave me* (`[ASSUMED]`) and nothing for *this holds only if the outside world works the way somebody believes it does*. Platform capabilities, vendor guarantees, regulatory requirements, what an integrator will expect — every one of them can sit unmarked in a document and read as a decision somebody made. They are the claims nobody returns to, precisely because they look settled.

This gap had been found once already, during `impact-radar`'s first run, which mandates the distinction and gave no token for it. The marker was improvised in that run, recorded as a defect, and never built. It is now built.

`readiness-score` caps an `[UNVERIFIED]` item at 1 of 3, exactly as it does an `[ASSUMED]` one. `build-context` carries the marker through and lists any load-bearing one under *Ask before you start*, because it is a question rather than a fact. `design-brief` applies it hardest to constraints that **deviate** from what is usually done — a deliberate deviation is an insight, an accidental one is an oversight, and only someone who checked can say which. `api-needs` states the boundary against its own `Unconfirmed`: that is a feasibility verdict on a need, this is a claim about the world.

**A tenth principle** goes with it: *the set works from the material, and marks where the material rests on the world.* No skill here checks a platform, a regulator or a competitor, and that boundary is deliberate — a model summarising what it half-remembers sounds exactly as confident as one reading a document, which is the failure the whole set is built against. A boundary is only safe when it is visible.

## 3.8.0

The SDK run was audited output by output against how the problem is actually solved in the market. Four defects, and the largest one is a shape the whole set is blind to.

**Heads up — `request-shaper` separates the requirement from the mechanism.** Requests arrive describing *how*, and the how is one option written as though it were the need. In the audited run, *"an SMS goes out, the customer taps the link, a code appears, they read it to the agent"* was carried by every downstream document as the requirement. It is four mechanisms; the requirement underneath is *"the person on the call proves they are the person in the app, and consents."* Comparable products do this without the SMS at all — the customer starts the session themselves. Nobody in the chain could see that, because the mechanism was never written as a choice. It is not this skill's job to argue with it; it is its job to make it visible, so `slice` can cut it and `design-brief` can pick another.

**Heads up — `readiness-score` scores an explicit *"this was not discussed"* as zero.** `request-shaper` is built to write those sentences, so they arrive often and they read as coverage. Naming a gap is honest and it is not content. The same applies to a document that lists what *should* be decided: a recommendation is not a decision. The audit found this rule broken by the skill itself, twice, in the run being reviewed.

**`slice` checks the mechanism against the job**, alongside the headline. Cutting a mechanism is often the largest cut available: it drags its own failure paths, its own secrets and its own surfaces out with it. In the audited run, cutting the SMS removes four error paths and an unnamed shared secret that nobody had noticed the flow needed.

**`api-needs` covers the second contract.** Work consumed by other software has two — what the system must provide, which the flow shows, and what the integrating developer must call, supply and declare, which no step performs and no flow contains. It is also the contract that cannot be changed later, because every host has already built against it.

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
