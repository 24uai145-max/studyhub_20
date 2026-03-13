import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();

  const signIn = () => {
    setUser({ id: crypto.randomUUID(), email, name });
    navigate('/onboarding');
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-700 p-6">
      <h2 className="text-2xl font-bold">Login / Signup</h2>
      <p className="text-sm text-slate-400">Supabase Auth hook-ready (email/password + Google OAuth button)</p>
      <div className="mt-4 space-y-3">
        <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full rounded bg-primary py-2" onClick={signIn}>Continue with Email</button>
        <button className="w-full rounded border border-slate-600 py-2">Continue with Google</button>
      </div>
    </div>
  );
}
