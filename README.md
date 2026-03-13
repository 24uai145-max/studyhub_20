# StudyHub 2.0

Full-stack-ready React + Vite + TypeScript app implementing the MVP foundations:

- Auth + onboarding flow with role/goal/level capture
- Role-based routing for Student / Teacher / Professional dashboards
- Claude Sonnet role-specific chat prompts
- Quiz generator, lesson generator, career roadmap tools
- Student gamification state (XP / streak / badges)
- Supabase schema and persistence hooks for users, conversations, quizzes

## Setup

1. Install dependencies
2. Add `.env`:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ANTHROPIC_API_KEY=...
```

3. Apply `supabase/schema.sql` in your Supabase SQL editor.
4. Run `npm run dev`.

## Notes

- If Anthropic key is missing, AI calls return a safe fallback preview.
- Document Q&A (PDF parsing with `pdfjs-dist`) is left as a Phase-2 extension hook.
