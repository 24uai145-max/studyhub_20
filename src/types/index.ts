export type UserRole = 'student' | 'teacher' | 'professional';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface AppUser {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  goals?: string;
  level?: Level;
  subjects?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}
