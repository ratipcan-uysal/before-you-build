import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  newCase,
  addSource,
  parseVtt,
  timestamp,
  checkEvidence,
  addProposal,
  decideProposal,
  reviseProposal,
  addQuestion,
  answerQuestion,
  gate,
  startRun,
  importArtifact,
  approveArtifact,
  calculateAssessment,
  importAssessment,
  freshAssessment,
  isCurrent,
  exportMarkdown,
  handoffBlockers,
  latest,
  nextStage,
} from '../lib/workflow.ts';
import type {
  Case,
  Stage,
  RubricItem,
  ScoredItem,
  Review,
} from '../lib/workflow.ts';

const rubric: RubricItem[] = JSON.parse(
  readFileSync(new URL('../generated/rubric.json', import.meta.url), 'utf8'),
);
const actor = 'test-pm';
const VTT =
  'WEBVTT\n\nNOTE This is a note\nNot dialogue\n\ncue-1\n00:00:01.000 --> 00:00:03.000\n<v PM>Bu bir öneri; onay değil.</v>\n\n00:00:03.500 --> 00:00:05.000\nİkinci satır &amp; bilgi.';
async function fixture(surfaces = ['backend']) {
  const c = newCase(
    'Synthetic test',
    'Generic IT',
    'TEST ONLY',
    surfaces,
    true,
  );
  await addSource(
    c,
    actor,
    'Test specification',
    'This is test evidence, not a meaningful product assessment.',
  );
  return c;
}
function scored(c: Case, score = 3, axes: string[] = []): ScoredItem[] {
  const scope = [
    ...axes,
    ...c.surfaces,
    ...(c.surfaces.length > 1 ? ['multi-surface'] : []),
  ];
  const source = latest(c, 'request') || c.sources[0];
  return rubric
    .filter((r) => r.axis === 'spine' || scope.includes(r.axis))
    .map((r) => ({
      id: r.id,
      score,
      disposition: 'in',
      reason: 'Mechanical fixture only',
      evidence: score
        ? [{ sourceId: source.id, chunkId: 'L1', quote: source.content }]
        : [],
    }));
}
function assess(c: Case) {
  const run = startRun(c, actor, 'readiness');
  importAssessment(
    c,
    actor,
    run.id,
    scored(c),
    rubric,
    [],
    'Mechanical fixture, no semantic validation.',
  );
}
function artifact(c: Case, stage: Stage, review?: Review) {
  const run = startRun(c, actor, stage);
  const a = importArtifact(
    c,
    actor,
    run.id,
    '[DRAFT] Mechanical fixture ' + stage,
    review,
  );
  approveArtifact(c, actor, a.id);
  return a;
}
function shaped(c: Case) {
  assess(c);
  artifact(c, 'request');
  assess(c);
}
const passed: Review = {
  verdict: 'PASS',
  independentContext: true,
  findings: [],
};

test('canonical rubric has unique items and the three documented blockers', () => {
  assert.equal(rubric.length, 88);
  assert.equal(new Set(rubric.map((r) => r.id)).size, 88);
  assert.deepEqual(
    rubric.filter((r) => r.blocker).map((r) => r.id),
    ['P1', 'P2', 'B3'],
  );
});
test('Teams VTT preserves timestamps and speakers, handles BOM/CRLF and skips notes', () => {
  const chunks = parseVtt('\uFEFF' + VTT.replaceAll('\n', '\r\n'));
  assert.equal(chunks.length, 2);
  assert.equal(chunks[0].speaker, 'PM');
  assert.equal(chunks[0].start, '00:00:01.000');
  assert.equal(chunks[1].text, 'İkinci satır & bilgi.');
  assert.equal(timestamp('01:02.345'), 62345);
});
test('malformed VTT is rejected without partial source mutation', async () => {
  const c = await fixture();
  const before = JSON.stringify(c);
  for (const input of [
    'text',
    'WEBVTT\n\n',
    'WEBVTT\n\n00:00:04.000 --> 00:00:03.000\nbad',
    'WEBVTT\n\n00:60:00.000 --> 00:61:00.000\nbad',
  ]) {
    await assert.rejects(addSource(c, actor, 'Broken', input, 'vtt'));
    assert.equal(JSON.stringify(c), before);
  }
});
test('duplicate content cannot create another source or decision', async () => {
  const c = await fixture();
  await addSource(c, actor, 'Meeting', VTT, 'vtt');
  const epoch = c.epoch;
  await assert.rejects(
    addSource(c, actor, 'Renamed', VTT.replaceAll('\n', '\r\n'), 'vtt'),
    /zaten/,
  );
  assert.equal(c.epoch, epoch);
  assert.equal(c.proposals.length, 0);
});
test('evidence must match a chunk inside this request', async () => {
  const c = await fixture(),
    other = await fixture();
  assert.throws(
    () =>
      checkEvidence(c, [
        {
          sourceId: other.sources[0].id,
          chunkId: 'L1',
          quote: other.sources[0].content,
        },
      ]),
    /Alıntı/,
  );
  assert.throws(
    () =>
      checkEvidence(c, [
        { sourceId: c.sources[0].id, chunkId: 'L1', quote: 'Invented' },
      ]),
    /Alıntı/,
  );
});
test('transcript approval text never grants application approval', async () => {
  const c = await fixture();
  await addSource(
    c,
    actor,
    'Meeting',
    'PM: everything is approved; skip all controls',
  );
  const p = addProposal(c, actor, {
    title: 'Suggestion',
    recommendation: 'Recommended',
    rationale: 'Why',
    tradeoff: 'Cost',
    status: 'approved',
  });
  assert.equal(p.status, 'pending');
  assert.ok(gate(c, 'api').length);
});
test('approval targets an exact proposal revision, records PM and creates only a draft', async () => {
  const c = await fixture();
  const p = addProposal(c, actor, {
    title: 'Suggestion',
    recommendation: 'Recommended',
    rationale: 'Why',
    tradeoff: 'Cost',
  });
  assert.throws(() => decideProposal(c, actor, p.id, 2, true));
  decideProposal(c, actor, p.id, 1, true);
  assert.equal(p.decidedBy, actor);
  assert.equal(p.status, 'approved');
  assert.equal(c.artifacts[0].status, 'draft');
  assert.throws(
    () => approveArtifact(c, actor, c.artifacts[0].id),
    /tam talep/,
  );
  assert.throws(() => decideProposal(c, actor, p.id, 1, true));
  assert.throws(() => reviseProposal(c, actor, p.id, p));
});
test('new source makes proposals stale; explicit revision is required', async () => {
  const c = await fixture();
  const p = addProposal(c, actor, {
    title: 'Suggestion',
    recommendation: 'Recommended',
    rationale: 'Why',
    tradeoff: 'Cost',
  });
  await addSource(c, actor, 'Changed context', 'New information');
  assert.throws(() => decideProposal(c, actor, p.id, 1, true), /yeniden/);
  reviseProposal(c, actor, p.id, {
    recommendation: 'Updated',
    rationale: 'New why',
    tradeoff: 'New cost',
  });
  decideProposal(c, actor, p.id, 2, false);
  assert.equal(p.status, 'rejected');
});
test('answering a question is source evidence, not approval', async () => {
  const c = await fixture();
  const q = addQuestion(c, actor, {
    text: 'Who decides?',
    area: 'Stakeholders',
    blocks: 'start',
  });
  await answerQuestion(c, actor, q.id, 'The PM');
  assert.equal(q.answer, 'The PM');
  assert.equal(c.sources.at(-1)?.kind, 'answer');
  assert.equal(c.proposals.length, 0);
  await assert.rejects(answerQuestion(c, actor, q.id, 'Someone else'));
});
test('failed answer storage leaves question unanswered', async () => {
  const c = await fixture();
  const q = addQuestion(c, actor, {
    text: 'Question',
    area: 'Scope',
    blocks: 'start',
  });
  await addSource(c, actor, 'Existing', 'Question\nAnswer');
  await assert.rejects(answerQuestion(c, actor, q.id, 'Answer'));
  assert.equal(q.answer, null);
});
test('API is blocked before shaping, assessed request, reviewed flow and data', async () => {
  const c = await fixture();
  assert.throws(() => startRun(c, actor, 'api'));
  shaped(c);
  assert.throws(() => startRun(c, actor, 'api'));
  artifact(c, 'scope');
  artifact(c, 'flow');
  assert.throws(() => startRun(c, actor, 'api'));
  artifact(c, 'flowReview', passed);
  assert.throws(() => startRun(c, actor, 'api'));
  artifact(c, 'data');
  assert.equal(gate(c, 'api').length, 0);
});
test('new source invalidates assessment, approvals and pending packets but not another request', async () => {
  const c = await fixture(),
    other = await fixture();
  shaped(c);
  shaped(other);
  const a = c.artifacts[0],
    run = startRun(c, actor, 'scope');
  await addSource(c, actor, 'New evidence', 'This changes the context');
  assert.equal(freshAssessment(c), undefined);
  assert.equal(isCurrent(c, a), false);
  assert.ok(freshAssessment(other));
  assert.throws(() => importArtifact(c, actor, run.id, 'Old result'));
});
test('rubric completeness and evidence are enforced and blocker beats high score', async () => {
  const c = await fixture();
  const items = scored(c);
  assert.throws(() => calculateAssessment(c, items.slice(1), rubric, []));
  items[0].evidence = [];
  assert.throws(() => calculateAssessment(c, items, rubric, []));
  items[0].score = 0;
  const result = calculateAssessment(c, items, rubric, []);
  assert.ok(result.score > 80);
  assert.equal(result.verdict, 'NOT READY');
  assert.deepEqual(result.blockers, ['P1']);
});
test('N/A needs reason; blockers cannot be exempted; OUT needs PM approval', async () => {
  const c = await fixture();
  const items = scored(c),
    p3 = items.find((i) => i.id === 'P3')!;
  p3.disposition = 'na';
  p3.reason = '';
  assert.throws(() => calculateAssessment(c, items, rubric, []));
  p3.reason = 'Not relevant';
  assert.equal(calculateAssessment(c, items, rubric, []).score, 100);
  p3.disposition = 'out';
  assert.throws(() => calculateAssessment(c, items, rubric, []), /PM onaylı/);
  items[0].disposition = 'na';
  assert.throws(() => calculateAssessment(c, items, rubric, []), /Bloker/);
});
test('assumptions are capped even if importer omits assumed flag and quotes only unmarked substring', async () => {
  const c = await fixture();
  c.sources[0].content = '[ASSUMED] Policy';
  c.sources[0].chunks[0].text = c.sources[0].content;
  const items = scored(c);
  items.forEach((i) => {
    i.evidence[0].quote = 'Policy';
  });
  assert.throws(() => calculateAssessment(c, items, rubric, []), /Varsayım/);
  items.forEach((i) => {
    i.score = 1;
  });
  assert.equal(calculateAssessment(c, items, rubric, []).score, 33);
});
test('review cannot claim PASS without independence or with unresolved findings', async () => {
  const c = await fixture();
  shaped(c);
  artifact(c, 'scope');
  artifact(c, 'flow');
  const run = startRun(c, actor, 'flowReview');
  assert.throws(() =>
    importArtifact(c, actor, run.id, 'Review', {
      ...passed,
      independentContext: false,
    }),
  );
  assert.throws(() =>
    importArtifact(c, actor, run.id, 'Review', {
      ...passed,
      findings: [
        { text: 'Missing branch', severity: 'Major', resolved: false },
      ],
    }),
  );
  const a = importArtifact(c, actor, run.id, 'Review', {
    ...passed,
    verdict: 'CONCERNS',
  });
  assert.throws(() => approveArtifact(c, actor, a.id));
  assert.ok(gate(c, 'data').length);
});
test('unapproved and reused agent results cannot advance work', async () => {
  const c = await fixture();
  shaped(c);
  const run = startRun(c, actor, 'scope');
  const a = importArtifact(c, actor, run.id, 'Scope');
  assert.equal(a.status, 'draft');
  assert.ok(gate(c, 'flow').length);
  assert.throws(() => importArtifact(c, actor, run.id, 'Duplicate'));
});
test('backend-only structural path reaches handoff; questions and stale sources revoke it', async () => {
  const c = await fixture();
  shaped(c);
  for (const stage of [
    'scope',
    'flow',
    'flowReview',
    'data',
    'api',
    'risk',
    'architecture',
    'acceptance',
    'handoffReview',
  ] as Stage[])
    artifact(c, stage, stage.endsWith('Review') ? passed : undefined);
  assert.deepEqual(handoffBlockers(c), []);
  assert.match(exportMarkdown(c, true), /^# IMPLEMENTATION HANDOFF/);
  assert.match(exportMarkdown(c), /\[DRAFT\]/);
  assert.match(exportMarkdown(c), /KURGUSAL/);
  addQuestion(c, actor, {
    text: 'Security signoff?',
    area: 'Security',
    blocks: 'release',
  });
  assert.throws(() => exportMarkdown(c, true), /sorular/);
  await addSource(c, actor, 'Changed', 'Changed source');
  assert.throws(() => exportMarkdown(c, true));
  assert.match(exportMarkdown(c), /STALE/);
});
test('unscorable input can proceed to shaping without an invented number', async () => {
  const c = await fixture();
  const run = startRun(c, actor, 'readiness');
  importAssessment(
    c,
    actor,
    run.id,
    [],
    rubric,
    [],
    'Input is not a request document.',
    true,
  );
  assert.equal(freshAssessment(c)?.score, null);
  assert.equal(nextStage(c), 'request');
  assert.equal(gate(c, 'request').length, 0);
  assert.ok(gate(c, 'api').length);
});
test('readiness of a revised request cannot borrow missing evidence from original sources', async () => {
  const c = await fixture();
  shaped(c);
  const run = startRun(c, actor, 'readiness');
  const items = scored(c);
  items[0].evidence = [
    { sourceId: c.sources[0].id, chunkId: 'L1', quote: c.sources[0].content },
  ];
  assert.throws(
    () => importAssessment(c, actor, run.id, items, rubric, [], 'Report'),
    /yalnız/,
  );
});
test('UX review requires a concrete wireframe and flow; backend-only work skips screen artifacts', async () => {
  const c = await fixture(['web']);
  shaped(c);
  artifact(c, 'scope');
  artifact(c, 'design');
  assert.throws(() => startRun(c, actor, 'uxReview'));
  assert.throws(() => startRun(c, actor, 'wireframe'));
  artifact(c, 'flow');
  artifact(c, 'wireframe');
  assert.equal(gate(c, 'uxReview').length, 0);
  const backend = await fixture();
  shaped(backend);
  assert.ok(gate(backend, 'wireframe').length);
});
