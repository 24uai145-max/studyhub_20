import { create } from 'zustand';
import type { AppUser, ChatMessage, QuizQuestion } from '../types';

interface AppState {
  user: AppUser | null;
  darkMode: boolean;
  messages: ChatMessage[];
  xp: number;
  streak: number;
  badges: string[];
  quiz: QuizQuestion[];
  setUser: (user: AppUser | null) => void;
  toggleDarkMode: () => void;
  addMessage: (message: ChatMessage) => void;
  awardXp: (amount: number) => void;
  awardBadge: (badge: string) => void;
  setQuiz: (quiz: QuizQuestion[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  darkMode: true,
  messages: [],
  xp: 0,
  streak: 1,
  badges: [],
  quiz: [],
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  awardXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  awardBadge: (badge) =>
    set((state) => ({ badges: state.badges.includes(badge) ? state.badges : [...state.badges, badge] })),
  setQuiz: (quiz) => set({ quiz }),
}));
