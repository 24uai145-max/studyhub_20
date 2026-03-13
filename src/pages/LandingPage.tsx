import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">StudyHub 2.0</h1>
        <p className="mt-4 text-lg text-slate-300">AI-powered personalized learning platform for Students, Teachers, and Professionals.</p>
        <div className="mt-8 flex gap-3">
          <Link className="rounded bg-primary px-5 py-3" to="/auth">Get Started</Link>
          <Link className="rounded border border-slate-600 px-5 py-3" to="/dashboard">Explore Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
