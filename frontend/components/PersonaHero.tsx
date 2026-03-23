import React from 'react';
import { User } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase backdrop-blur-sm">
            {tier5Ui.active_filter} Persona
          </span>
          <h3 className="text-3xl font-bold mt-2">{tier5Ui.persona_data.display_title}</h3>
        </div>
        <User size={40} className="p-2 bg-white/10 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
          <p className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Highlights</p>
          <ul className="text-sm space-y-1">
            {tier5Ui.persona_data.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">• {h}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
          <p className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Persona Notes</p>
          <ul className="text-sm space-y-1">
            {tier5Ui.persona_data.itinerary_notes.map((n, i) => (
              <li key={i} className="flex items-start gap-2">• {n}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
