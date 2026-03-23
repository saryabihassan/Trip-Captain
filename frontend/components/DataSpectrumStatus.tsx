import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  currentTier: number;
}

export const DataSpectrumStatus: React.FC<Props> = ({ currentTier }) => {
  const getTierColor = (tier: number) => {
    if (currentTier >= tier) return 'text-blue-600 border-blue-600 bg-blue-50';
    return 'text-gray-400 border-gray-200 bg-gray-50';
  };

  const tiers = [
    { t: 1, label: 'API Ingestion' },
    { t: 2, label: 'NLP Extraction' },
    { t: 3, label: 'Synthesis Engine' },
    { t: 4, label: 'Proactive Alerts' },
    { t: 5, label: 'Persona Filter' }
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Data Spectrum Status</h2>
      <div className="space-y-3">
        {tiers.map((tier) => (
          <div key={tier.t} className={`flex items-center gap-3 p-2 rounded-lg border text-sm font-medium ${getTierColor(tier.t)}`}>
            <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold">
              T{tier.t}
            </div>
            {tier.label}
            {currentTier >= tier.t && <CheckCircle2 size={16} className="ml-auto" />}
          </div>
        ))}
      </div>
    </section>
  );
};
