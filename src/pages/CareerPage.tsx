import { useState } from 'react';
import { requestClaude } from '../lib/ai';

export default function CareerPage() {
  const [domain, setDomain] = useState('Data Science');
  const [roadmap, setRoadmap] = useState('');

  return (
    <div className="space-y-4 rounded border p-6">
      <h2 className="text-2xl font-bold">Career Roadmap</h2>
      <input className="rounded bg-slate-900 p-2 w-full" value={domain} onChange={(e) => setDomain(e.target.value)} />
      <button className="rounded bg-primary px-4 py-2" onClick={async () => setRoadmap(await requestClaude('professional', `Create a step-by-step upskilling and certification roadmap for ${domain}.`))}>Generate Roadmap</button>
      {roadmap && <pre className="whitespace-pre-wrap rounded bg-slate-900 p-3">{roadmap}</pre>}
    </div>
  );
}
