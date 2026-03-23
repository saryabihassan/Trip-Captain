import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface Props {
  alerts: any[];
}

export const AlertBanner: React.FC<Props> = ({ alerts }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <AlertTriangle size={20} className="text-amber-500" /> Proactive Alerts
      </h3>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
            alert.type === 'critical' ? 'bg-red-50 border-red-100 text-red-700' :
            alert.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700' :
            'bg-blue-50 border-blue-100 text-blue-700'
          }`}>
            {alert.type === 'critical' ? <AlertTriangle size={18} /> : <Info size={18} />}
            <p className="text-xs font-medium leading-relaxed">{alert.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
