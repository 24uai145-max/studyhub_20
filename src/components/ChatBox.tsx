import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { requestClaude } from '../lib/ai';
import { useAppStore } from '../store/appStore';
import { saveConversation } from '../lib/data';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const { user, messages, addMessage, awardXp } = useAppStore();

  const send = async () => {
    if (!input.trim() || !user?.role) return;
    const userMessage = { id: crypto.randomUUID(), role: 'user' as const, content: input, createdAt: new Date().toISOString() };
    addMessage(userMessage);
    setInput('');
    setTyping(true);
    const response = await requestClaude(user.role, input);
    const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: response, createdAt: new Date().toISOString() };
    addMessage(assistantMessage);
    awardXp(5);
    await saveConversation(user.id, user.role, [...messages, userMessage, assistantMessage]);
    setTyping(false);
  };

  return (
    <div className="rounded-xl border border-slate-700 p-4 h-[70vh] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-xl px-4 py-3 ${m.role === 'user' ? 'ml-auto bg-primary text-white' : 'bg-slate-800 text-slate-100'}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
          </div>
        ))}
        {typing && <div className="w-16 rounded-xl bg-slate-700 px-4 py-3 animate-pulse">...</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 rounded border border-slate-600 bg-slate-900 px-3 py-2"/>
        <button onClick={send} className="rounded bg-primary px-4 py-2 text-white">Send</button>
      </div>
    </div>
  );
}
