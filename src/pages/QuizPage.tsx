import { useState } from 'react';
import { requestClaude } from '../lib/ai';
import { useAppStore } from '../store/appStore';
import { saveQuiz } from '../lib/data';

export default function QuizPage() {
  const user = useAppStore((s) => s.user);
  const [topic, setTopic] = useState('Algebra');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [count, setCount] = useState(5);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!user?.role) return;
    const prompt = `Generate ${count} multiple-choice questions on ${topic} at ${difficulty} difficulty. Include answers and short explanations.`;
    const quizText = await requestClaude(user.role, prompt);
    setResult(quizText);
    await saveQuiz(user.id, topic, quizText, 0);
  };

  return (
    <div className="space-y-4 rounded border p-6">
      <h2 className="text-2xl font-bold">Quiz Generator</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <input className="rounded bg-slate-900 p-2" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <select className="rounded bg-slate-900 p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
        <input className="rounded bg-slate-900 p-2" type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} />
      </div>
      <button onClick={generate} className="rounded bg-primary px-4 py-2">Generate Quiz</button>
      {result && <pre className="whitespace-pre-wrap rounded bg-slate-900 p-3">{result}</pre>}
    </div>
  );
}
