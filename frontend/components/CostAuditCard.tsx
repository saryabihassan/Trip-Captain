import React from 'react';
import { DollarSign, ShieldCheck, TrendingUp } from 'lucide-react';

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
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <DollarSign size={20} className="text-green-500" /> Cost Audit
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Base Total</span>
          <span className="font-medium">${costAudit.financial_breakdown.base_total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Service Fees</span>
          <span className="font-medium text-slate-900">+${costAudit.financial_breakdown.service_fee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Taxes</span>
          <span className="font-medium text-slate-900">+${costAudit.financial_breakdown.taxes}</span>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
          <span className="font-bold text-slate-900">Grand Total</span>
          <span className="text-xl font-extrabold text-blue-600">${costAudit.financial_breakdown.grand_total.toFixed(2)}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
            <ShieldCheck size={14} /> Audit Verified
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
            <TrendingUp size={14} /> Score: {costAudit.optimization_metadata.score}
          </div>
        </div>
      </div>
    </section>
  );
};
