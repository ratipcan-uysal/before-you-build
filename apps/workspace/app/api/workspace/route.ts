import { getChatGPTUser } from '@/app/chatgpt-auth';
import * as store from '@/lib/store';
import { workspaceHandlers } from '@/lib/workspace-service';
export const dynamic = 'force-dynamic';
async function handle(request: Request, method: 'GET' | 'POST') {
  const user = await getChatGPTUser();
  if (!user)
    return Response.json(
      { error: 'Çalışma alanı için oturum açın.' },
      { status: 401 },
    );
  return workspaceHandlers(store, user)[method](request);
}
export const GET = (request: Request) => handle(request, 'GET');
export const POST = (request: Request) => handle(request, 'POST');
