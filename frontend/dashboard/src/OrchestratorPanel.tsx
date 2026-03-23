import React from 'react';
import { Send, Sparkles } from 'lucide-react';

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
    <section className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-slate-800 tracking-tight">
        <Sparkles size={22} className="text-indigo-500" /> AI Orchestrator
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Persona Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Persona</label>
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/50">
            {['Luxury', 'Budget', 'Family'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  persona === p 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50 scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trip Intent</label>
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to go to Tokyo for 10 days"
              className="w-full p-4 pb-14 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none resize-none h-32 text-slate-700 placeholder:text-slate-400 shadow-inner"
            />
            <div className="absolute bottom-3 right-3">
              <button
                disabled={loading || !prompt.trim()}
                className="bg-indigo-600 text-white p-3 rounded-xl font-bold flex items-center justify-center hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
            <span className="shrink-0 mt-0.5">⚠️</span>
            <p>{error}</p>
          </div>
        )}
      </form>
    </section>
  );
};
