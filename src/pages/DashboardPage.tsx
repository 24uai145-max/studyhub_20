import { Link } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAppStore } from '../store/appStore';

const mockData = [
  { name: 'Math', progress: 55 },
  { name: 'Science', progress: 40 },
  { name: 'Coding', progress: 70 },
];

export default function DashboardPage() {
  const { user, badges, streak, xp } = useAppStore();

  if (user?.role === 'teacher') {
    return <div className="space-y-4"><h2 className="text-2xl font-bold">Teacher Dashboard</h2><p>Class overview, analytics, and content generation tools.</p><div className="grid gap-3 md:grid-cols-2"><Link to="/lessons" className="rounded border p-4">Lesson Plan Generator</Link><Link to="/quiz" className="rounded border p-4">Quiz Builder</Link></div></div>;
  }

  if (user?.role === 'professional') {
    return <div className="space-y-4"><h2 className="text-2xl font-bold">Professional Dashboard</h2><p>Career roadmap, skill modules, and AI career mentoring.</p><Link to="/career" className="rounded border p-4 inline-block">Open Career Roadmap</Link></div>;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded border p-4">XP: {xp}</div>
        <div className="rounded border p-4">Streak: 🔥 {streak}</div>
        <div className="rounded border p-4">Badges: {badges.length}</div>
        <Link to="/quiz" className="rounded border p-4">Take Quiz</Link>
      </div>
      <div className="h-64 rounded border p-3">
        <h3 className="mb-2">Progress Tracker</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={mockData}><XAxis dataKey="name" /><YAxis /><Bar dataKey="progress" fill="#4F8EF7" /></BarChart>
        </ResponsiveContainer>
      </div>
      <Link to="/chat" className="rounded bg-primary px-4 py-2 inline-block">Open AI Tutor Chat</Link>
    </div>
  );
}
