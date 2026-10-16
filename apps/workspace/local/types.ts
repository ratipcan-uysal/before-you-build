import type { Stage } from '../lib/workflow.ts';
export type Model = { id: string; name: string; isDefault: boolean };
export type ProviderStatus = {
  id: string;
  name: string;
  ready: boolean;
  detail: string;
  models: Model[];
};
export type Job = {
  id: string;
  caseId: string;
  runId: string;
  stage: Stage;
  provider: string;
  model: string;
  threadId?: string;
  skill: string | null;
  skillHash: string;
  inputHash: string;
  revision: number;
  epoch: number;
  status: 'running' | 'succeeded' | 'failed' | 'cancelled' | 'stale';
  message: string;
  createdAt: string;
  finishedAt?: string;
};
export type AgentInput = {
  outputSchema?: Record<string, unknown>;
  prompt: string;
  skill: string | null;
  skillPath?: string;
  model: string;
  signal: AbortSignal;
  onProgress: (message: string, threadId?: string) => void;
};
export interface AgentProvider {
  id: string;
  status(): Promise<ProviderStatus>;
  run(input: AgentInput): Promise<string>;
  close(): void;
}
