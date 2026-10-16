import {
  addProposal,
  addQuestion,
  importArtifact,
  importAssessment,
} from './workflow.ts';
import type { Case, Review, ScoredItem } from './workflow.ts';
import { RUBRIC } from './packets.ts';

export type AgentResult = {
  runId: string;
  content?: string;
  review?: Review;
  questions?: unknown[];
  proposals?: unknown[];
  items?: ScoredItem[];
  axes?: string[];
  report?: string;
  notAssessable?: boolean;
};
// Call on a detached snapshot; persist only after ALL validation succeeds.
export function applyAgentResult(c: Case, actor: string, result: AgentResult) {
  const run = c.runs.find((r) => r.id === result.runId);
  if (!run) throw new Error('Bu talebe ait çalışma bulunamadı.');
  if (run.stage === 'readiness') {
    importAssessment(
      c,
      actor,
      run.id,
      result.items || [],
      RUBRIC,
      result.axes || [],
      result.report,
      result.notAssessable === true,
    );
  } else {
    importArtifact(c, actor, run.id, result.content, result.review);
  }
  if (
    !Array.isArray(result.questions || []) ||
    !Array.isArray(result.proposals || []) ||
    (result.questions?.length || 0) > 100 ||
    (result.proposals?.length || 0) > 50
  )
    throw new Error('Ajan sonuç listeleri geçersiz.');
  const normalize = (value: string) =>
    value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr');
  for (const q of result.questions || []) {
    // Validate even a repeated question. Reuse its existing answer/identity;
    // rereading an upstream question is not a newly discovered gap.
    const validated = addQuestion({ ...c, questions: [], audit: [] }, actor, q);
    if (
      !c.questions.some(
        (existing) => normalize(existing.text) === normalize(validated.text),
      )
    )
      addQuestion(c, actor, q);
  }
  for (const p of result.proposals || []) addProposal(c, actor, p);
}
