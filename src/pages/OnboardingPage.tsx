import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { upsertProfile } from '../lib/data';
import type { Level, UserRole } from '../types';

export default function OnboardingPage() {
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  const [level, setLevel] = useState<Level>('beginner');
  const [goals, setGoals] = useState('');
  const [subjects, setSubjects] = useState('');

  const finish = async () => {
    if (!user) return;
    const updated = { ...user, role, level, goals, subjects: subjects.split(',').map((s) => s.trim()) };
    setUser(updated);
    await upsertProfile({ id: updated.id, email: updated.email, role: updated.role!, name: updated.name, level: updated.level, goals: updated.goals });
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-slate-700 p-6 space-y-4">
      <h2 className="text-2xl font-bold">Onboarding</h2>
      <label className="block">Role
        <select className="mt-1 w-full rounded bg-slate-900 p-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          <option value="student">Student</option><option value="teacher">Teacher</option><option value="professional">Professional</option>
        </select>
      </label>
      <label className="block">Learning goal
        <input className="mt-1 w-full rounded bg-slate-900 p-2" value={goals} onChange={(e) => setGoals(e.target.value)} />
      </label>
      <label className="block">Level
        <select className="mt-1 w-full rounded bg-slate-900 p-2" value={level} onChange={(e) => setLevel(e.target.value as Level)}>
          <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
        </select>
      </label>
      <label className="block">Subjects / domain (comma separated)
        <input className="mt-1 w-full rounded bg-slate-900 p-2" value={subjects} onChange={(e) => setSubjects(e.target.value)} />
      </label>
      <button onClick={finish} className="rounded bg-primary px-4 py-2">Finish</button>
    </div>
  );
}
