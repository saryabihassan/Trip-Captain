import React from 'react';
import { DollarSign, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

interface Props {
  costAudit: {
    financial_breakdown: {
      base_total: number;
      service_fee: number;
      taxes: number;
      grand_total: number;
    };
    optimization_metadata: {
      score: number;
    };
  };
}

export const CostAuditCard: React.FC<Props> = ({ costAudit }) => {
  return (
    <section className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 text-slate-800 tracking-tight">
        <DollarSign size={20} className="text-emerald-500" /> Cost Audit
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="text-slate-500 font-medium">Base Total</span>
          <span className="font-bold text-slate-700">${costAudit.financial_breakdown.base_total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="text-slate-500 font-medium">Service Fees</span>
          <span className="font-bold text-slate-600">+${costAudit.financial_breakdown.service_fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="text-slate-500 font-medium">Taxes</span>
          <span className="font-bold text-slate-600">+${costAudit.financial_breakdown.taxes.toFixed(2)}</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="font-black text-slate-800 tracking-tight">Grand Total</span>
          <span className="text-2xl font-black text-emerald-600 tracking-tight">
            ${costAudit.financial_breakdown.grand_total.toFixed(2)}
          </span>
        </div>
        
        <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <ShieldCheck size={16} /> Audit Verified
          </div>
          <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <TrendingUp size={16} /> Score: {costAudit.optimization_metadata.score}
            <Sparkles size={12} className="opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};
