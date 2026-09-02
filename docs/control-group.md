# Control group — the skill against a plain prompt

Every example in this repository shows what a skill produced. None of them showed what the same model produces on the same input **without** the skill, so the set's central claim — that a rubric finds what a good reviewer misses — had never been tested. This is that test, on the three published requests, for `readiness-score`.

## Method

Three clean subagents, no shared context, each given one raw request and the prompt below. They were told not to invoke any skill, and none did. Comparison was by hand, against the skill's published scoring of the same request, in both directions: does the baseline name each of the skill's five critical gaps, and does the skill name each of the baseline's three verdict-determining gaps.

Here is the prompt, verbatim, because a control group with a weak control proves nothing:

> A product team has received this request and is about to start building from it. Assess whether it is ready for a team to start on. Be the strongest reviewer you can be: list every gap a developer or designer would hit if they started tomorrow — every decision the document does not make, every behaviour it does not specify, every failure path it does not describe, every dependency it names without settling. Quote the document where it is silent or vague; do not paraphrase. Do not fill any gap. Do not suggest what the answer should be. Say what the document does well, specifically. Give a verdict — ready, conditionally ready, or not ready — and the three gaps that most determine it.

That is a strong prompt on purpose. It carries the evidence gate in plain words. What it does not carry is the rubric: no item list, no weights, no blockers, no classification, no cap on inferred content.

## Results

| Request | Skill | Baseline | Verdict agrees | Skill's top gaps the baseline names | Baseline's top gaps the skill names |
|---|---|---|---|---|---|
| [Quick Send](../examples/quick-send-request.md) | 12/100, NOT READY | Not ready, 52 gaps | Yes | Blocker and both zero categories, yes | 3 of 3, one sharper in the baseline |
| [Seller score](../examples/seller-score/00-request.md) | 25/100, NOT READY | Not ready, 41 gaps | Yes | 5 of 5, one read as ambiguity rather than contradiction | 1 of 3 in the skill's five; 3 sharp catches outside them |
| [Shift swap](../examples/vardiya-takasi/00-talep.md) | 44/100, NOT READY | Hazır değil, 51 gaps | Yes | 5 of 5, one partial | 3 of 3 in substance; 4 sharp catches outside the five, one a defect in the request nobody else saw |

### Quick Send

On the raw request the skill's published scoring is short: a blocker (B3, no failure paths), four items with any score, K6 and K7 at zero, and a note that *"the existing security steps will of course be preserved"* earned nothing. From the same three places the baseline reached the same verdict, and was sharper on the third: it read the security line together with *"without being asked for a password"* and called it what it is, two promises that cannot both hold. Where the skill declined to credit the line, the baseline named the contradiction.

Some of what the baseline found has no rubric item at all. Whether the home screen is pre-login, which would put the customer's payee list in front of an unauthenticated phone. Whether a recipient last paid by an out-of-scope transfer type still appears in an in-scope list. What the card row displaces on a home screen that already has content. None of those is a rubric question. All of them are questions a developer hits on day one.

### Seller score

All five of the skill's critical gaps are in the baseline's forty-one, each covered in more detail: the undefined components across four gaps, the nightly-run failure path, the design gap as one line that says *"show the components separately" is the entire specification*. One is weaker in the baseline: the skill calls nightly recalculation against a 15 November freeze a contradiction the document carries; the baseline files it as ambiguity about when the check runs.

Read the other way, the skill loses. Of the baseline's three verdict-determining gaps, the skill's five name one. The campaign gate's mechanics — which campaigns, what *enter* means, what happens to a seller already inside one, oscillation across 4.0 with no grace period — are not in the skill's five, though its *what to do next* does reach the sharpest of them: count how many sellers fall below 4.0 today. And the baseline's third is a piece of arithmetic the skill never does: a 90-day window that must be trustworthy at a 15 November freeze needs data from mid-August, and nothing in the request says that data exists. And the baseline caught the request's own frame contradicting its solution — *"the review belongs to the product; the score lands on the seller"*, followed by product reviews kept at 20% of the seller score — which is exactly the departure item P7 was added to catch, and the skill's five do not carry it.

### Shift swap

Strongest request, closest race. All five of the skill's gaps are in the baseline's fifty-one, and its three verdict gaps are the skill's B-2, B-3 and B-5 by other names — the Plan write failing after approval, eligibility evaluated at a moment nobody chose while the roster changes underneath it, and the lifecycle the author left open. One partial: the skill says the third success metric cannot be measured because no event exists; the baseline asks what the 24 hours are counted from. Of the two, the skill's is the sharper sentence.

Outside the five, the baseline caught four things worth the whole exercise. A document titled a swap describes a one-way transfer, and never says whether a two-sided exchange is in scope. All six eligibility rules bind the person taking the shift and none binds the person giving it away. That `%94` adoption figure is for store staff, and nothing says a manager uses the mobile app today. And the request's own dates contradict: *"Q2'de çıkması bekleniyor"* in the header, *"Q2 sonu"* in the constraints, *"Ramazan öncesi (mart)"* in the same line — March is not in Q2. **Sixteen agents ran on that fixture over two days, each reading it in full, and none of them reported the date.** A plain reviewer with one instruction found it in the first pass.

One qualitative difference shows most clearly here. A baseline writes its gaps as questions: *which moment is the rule evaluated at?* The skill writes them as the sentence the author has to add, with the decision blanked: *"Uygunluk ___ anında yeniden hesaplanır (üstlenme / müdür onayı / Plan yazımı)."* Fifty-one questions is a reading list. Five sentences with blanks is a Monday morning.

## What this says

**On finding gaps, the plain prompt is not worse. It is broader.** Forty to fifty named gaps against five, three times out of three, and its top three overlap the skill's top five well while adding two to four catches per request that the rubric's items do not reach — including one defect in a fixture that a sixteen-agent chain read in full and missed. Anyone who expected the rubric to *discover* more than a strong reviewer should read this twice.

**What the skill adds is not discovery.** It is five things a prose review cannot produce, and the run before this one measured the first:

- **A number that reproduces.** Two independent scorings of the shift-swap request returned the same 44, the same blocker, the same alternative reading. Here the three baselines returned 52, 41 and 51 gaps, and nothing about those counts is comparable across runs or reviewers.
- **A verdict that is not negotiable.** The blocker fires on a zero and the total cannot argue with it. A prose review's verdict is a paragraph, and paragraphs get read charitably.
- **A denominator.** The skill says what it measured against — 57 items, 27 with no evidence, and the total under the nearest defensible alternative classification. Fifty-two gaps, says the baseline, and cannot say out of how many.
- **A gap written as the missing sentence.** The skill leaves the decision blank and writes the sentence around it; the baseline asks a question. Of those, the first is closer to what the author does next.
- **A next step that names a mechanism.** *Nine of nine blocking items are waiting on a person, not on more writing* routes to `decision-memo`; *this scope does not fit one release* routes to `slice`. A baseline ends with *the team can start on the questions*.

**And it costs more.** The three baselines ran at 59,000, 59,000 and 67,000 tokens, with two tool calls each. Scorings by the skill on this set ran between 94,000 and 121,000. So the rubric is a third to a half more expensive for a narrower gap list and a better number.

**One change follows directly.** The skill publishes five critical gaps in prose and every zero-scored item as a rubric code in its arithmetic. Those codes are the full list, and nobody reads them as one. Forty prose gaps get read because they are prose. Whether the skill should print its zeros as sentences is a question this comparison opens and does not settle: it would double the document's length, and the five-gap discipline exists because a reader stops at the second page.

## What this does not show

Three requests, one prompt, one model family on both sides, overlap judged by the person who wrote the prompt. A blind rater, a second prompt written by somebody else, and a request from outside the fictional three would each move the result and none of them has been run. This is the first control, not the last.
