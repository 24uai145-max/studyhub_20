import { supabase } from './supabase';
import type { ChatMessage } from '../types';

export async function saveConversation(userId: string, role: string, messages: ChatMessage[]) {
  if (!supabase) return;
  await supabase.from('conversations').insert({ user_id: userId, role, messages });
}

export async function saveQuiz(userId: string, topic: string, questions: string, score = 0) {
  if (!supabase) return;
  await supabase.from('quizzes').insert({ user_id: userId, topic, questions, score });
}

export async function upsertProfile(user: { id: string; email: string; role: string; name?: string; level?: string; goals?: string; }) {
  if (!supabase) return;
  await supabase.from('users').upsert(user);
}
