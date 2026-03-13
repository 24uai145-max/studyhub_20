import Anthropic from '@anthropic-ai/sdk';
import type { UserRole } from '../types';

const prompts: Record<UserRole, string> = {
  student:
    'You are a friendly, encouraging AI tutor. Explain concepts simply, use examples and analogies. Ask follow-up questions to check understanding. Adapt difficulty based on student responses.',
  teacher:
    'You are a professional educational assistant. Help teachers create structured lesson plans, detailed quizzes, and curriculum materials. Be concise and professional.',
  professional:
    "You are a career mentor AI. Suggest learning paths, skill-building strategies, and certification routes based on the user's domain and career goals. Be strategic and motivational.",
};

const anthropic = import.meta.env.VITE_ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY, dangerouslyAllowBrowser: true })
  : null;

export const getRolePrompt = (role: UserRole) => prompts[role];

export async function requestClaude(role: UserRole, input: string) {
  if (!anthropic) {
    return `Anthropic key missing. Add VITE_ANTHROPIC_API_KEY to use live AI.\n\nPrompt preview:\n${prompts[role]}\n\nUser input:\n${input}`;
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: prompts[role],
    messages: [{ role: 'user', content: input }],
  });

  const text = response.content.find((part) => part.type === 'text');
  return text?.text ?? 'No text returned.';
}
