import React from 'react';
import { AlertTriangle, Info, BellRing } from 'lucide-react';

interface Props {
  alerts: any[];
}

export const AlertBanner: React.FC<Props> = ({ alerts }) => {
  return (
    <section className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-extrabold flex items-center gap-2 text-slate-800 tracking-tight">
          <BellRing size={20} className="text-amber-500" /> Proactive Alerts
        </h3>
        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-full">
          Tier 4
        </span>
      </div>
      
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center text-sm font-medium text-slate-500">
            No active alerts detected.
          </div>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${
              alert.type === 'critical' ? 'bg-red-50/50 border-red-200 text-red-800' :
              alert.type === 'warning' ? 'bg-amber-50/50 border-amber-200 text-amber-800' :
              'bg-blue-50/50 border-blue-200 text-blue-800'
            }`}>
              <div className={`p-2 rounded-xl bg-white shadow-sm border ${
                alert.type === 'critical' ? 'border-red-100' :
                alert.type === 'warning' ? 'border-amber-100' : 'border-blue-100'
              }`}>
                {alert.type === 'critical' ? <AlertTriangle size={18} className="text-red-500" /> : 
                 alert.type === 'warning' ? <AlertTriangle size={18} className="text-amber-500" /> : 
                 <Info size={18} className="text-blue-500" />}
              </div>
              <div className="mt-1">
                <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-0.5">{alert.source}</p>
                <p className="text-sm font-semibold leading-relaxed">{alert.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
