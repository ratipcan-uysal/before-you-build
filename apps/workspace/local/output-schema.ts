import type { Stage } from '../lib/workflow.ts';
const text = { type: 'string' };
const bool = { type: 'boolean' };
const object = (properties: Record<string, unknown>) => ({
  type: 'object',
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});
const array = (items: unknown, maxItems = 100) => ({
  type: 'array',
  items,
  maxItems,
});
const evidence = array(object({ sourceId: text, chunkId: text, quote: text }));
export function agentOutputSchema(stage: Stage, runId: string) {
  const questions = array(
    object({
      text,
      area: text,
      blocks: { type: 'string', enum: ['start', 'release', 'none'] },
      evidence,
    }),
    stage === 'request' ? 1 : 100,
  );
  const proposals = array(
    object({
      title: text,
      recommendation: text,
      rationale: text,
      tradeoff: text,
      evidence,
    }),
    50,
  );
  const common = {
    runId: { type: 'string', enum: [runId] },
    questions,
    proposals,
  };
  if (stage === 'readiness')
    return object({
      ...common,
      axes: array(
        {
          type: 'string',
          enum: [
            'transaction',
            'data-display',
            'input-collection',
            'content-config',
            'personalization',
            'capability',
          ],
        },
        6,
      ),
      report: text,
      notAssessable: bool,
      items: array(
        object({
          id: text,
          disposition: { type: 'string', enum: ['in', 'na', 'out'] },
          score: { type: 'integer', enum: [0, 1, 2, 3] },
          evidence,
          reason: text,
          assumed: bool,
          exemptionProposalId: { type: ['string', 'null'] },
        }),
        100,
      ),
    });
  return object({
    ...common,
    content: text,
    ...(stage.endsWith('Review')
      ? {
          review: object({
            verdict: { type: 'string', enum: ['PASS', 'CONCERNS', 'FAIL'] },
            independentContext: bool,
            findings: array(
              object({
                text,
                severity: {
                  type: 'string',
                  enum: ['Critical', 'Major', 'Minor'],
                },
                resolved: bool,
              }),
            ),
          }),
        }
      : {}),
  });
}
