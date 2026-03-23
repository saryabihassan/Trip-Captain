import React from 'react';
import { Send, Activity } from 'lucide-react';

interface Props {
  prompt: string;
  setPrompt: (v: string) => void;
  persona: string;
  setPersona: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export const OrchestratorPanel: React.FC<Props> = ({ 
  prompt, setPrompt, persona, setPersona, loading, error, onSubmit 
}) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Activity size={20} className="text-blue-500" /> Orchestrator
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Persona</label>
          <div className="grid grid-cols-3 gap-2">
            {['Luxury', 'Budget', 'Family'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  persona === p 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">User Intent</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., I want to go to London for 7 days"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 text-sm"
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {loading ? 'Orchestrating...' : <><Send size={18} /> Run Sequence</>}
        </button>
        {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
      </form>
    </section>
  );
};
