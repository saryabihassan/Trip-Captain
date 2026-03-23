import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface Props {
  tier5Ui: {
    active_filter: string;
    persona_data: {
      display_title: string;
      highlights: string[];
      itinerary_notes: string[];
    };
  };
}

export const PersonaHero: React.FC<Props> = ({ tier5Ui }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 p-8 sm:p-10 rounded-[2rem] text-white shadow-xl group">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-90"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-700"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 text-indigo-200 mb-4 shadow-sm">
              <Sparkles size={14} /> {tier5Ui.active_filter} Persona Active
            </div>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              {tier5Ui.persona_data.display_title}
            </h3>
          </div>
          <div className="hidden sm:flex p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <User size={48} className="text-indigo-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 hover:bg-white/10 transition-colors duration-300 p-5 rounded-2xl backdrop-blur-md border border-white/10">
            <p className="text-xs font-bold text-indigo-300 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Highlights
            </p>
            <ul className="text-sm text-slate-200 space-y-3 font-medium">
              {tier5Ui.persona_data.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5 opacity-60">✦</span> {h}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/5 hover:bg-white/10 transition-colors duration-300 p-5 rounded-2xl backdrop-blur-md border border-white/10">
            <p className="text-xs font-bold text-purple-300 mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Concierge Notes
            </p>
            <ul className="text-sm text-slate-200 space-y-3 font-medium">
              {tier5Ui.persona_data.itinerary_notes.map((n, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-purple-400 mt-0.5 opacity-60">✦</span> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
