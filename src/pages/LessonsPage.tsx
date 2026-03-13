import { useState } from 'react';
import { requestClaude } from '../lib/ai';
import { useAppStore } from '../store/appStore';

export default function LessonsPage() {
  const user = useAppStore((s) => s.user);
  const [subject, setSubject] = useState('Biology');
  const [grade, setGrade] = useState('Grade 8');
  const [duration, setDuration] = useState('45 min');
  const [content, setContent] = useState('');

  const generate = async () => {
    if (!user?.role) return;
    setContent(await requestClaude('teacher', `Create a lesson plan for ${subject}, ${grade}, duration ${duration}. Include objectives, activities, and assessment.`));
  };

  return (
    <div className="space-y-4 rounded border p-6">
      <h2 className="text-2xl font-bold">Lesson Plan Generator</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <input className="rounded bg-slate-900 p-2" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input className="rounded bg-slate-900 p-2" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <input className="rounded bg-slate-900 p-2" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <button onClick={generate} className="rounded bg-primary px-4 py-2">Generate Plan</button>
      {content && <pre className="whitespace-pre-wrap rounded bg-slate-900 p-3">{content}</pre>}
    </div>
  );
}
