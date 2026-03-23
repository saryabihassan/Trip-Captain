import React from 'react';
import { Check, CircleDashed } from 'lucide-react';

interface Props {
  currentTier: number;
}

export const DataSpectrumStatus: React.FC<Props> = ({ currentTier }) => {
  const tiers = [
    { t: 1, label: 'API Ingestion', desc: 'Raw data sourcing' },
    { t: 2, label: 'NLP Extraction', desc: 'Intent parsing' },
    { t: 3, label: 'Synthesis Engine', desc: 'Logistics & Audit' },
    { t: 4, label: 'Proactive Alerts', desc: 'Conflict detection' },
    { t: 5, label: 'Persona Filter', desc: 'UI adaptation' }
  ];

  return (
    <section className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Data Spectrum Progress</h2>
      
      <div className="relative pl-3">
        {tiers.map((tier, index) => {
          const isComplete = currentTier >= tier.t;
          const isPending = currentTier < tier.t;

          return (
            <div key={tier.t} className="relative pb-8 last:pb-0">
              {/* Connecting Line */}
              {index !== tiers.length - 1 && (
                <div className={`absolute left-[-11px] top-6 bottom-0 w-0.5 rounded-full transition-colors duration-500 ${isComplete ? 'bg-indigo-500' : 'bg-slate-100'}`} />
              )}

              {/* Status Node */}
              <div className="flex items-start gap-4">
                <div className={`relative z-10 -ml-[23px] w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white ${
                  isComplete 
                    ? 'border-indigo-500 text-indigo-500 shadow-sm' 
                    : 'border-slate-200 text-slate-300'
                }`}>
                  {isComplete ? <Check size={12} strokeWidth={3} /> : <CircleDashed size={12} />}
                </div>

                {/* Content */}
                <div className={`-mt-1 transition-all duration-300 ${isComplete ? 'opacity-100' : 'opacity-40'}`}>
                  <h4 className={`text-sm font-bold ${isComplete ? 'text-slate-800' : 'text-slate-500'}`}>
                    Tier {tier.t}: {tier.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{tier.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
