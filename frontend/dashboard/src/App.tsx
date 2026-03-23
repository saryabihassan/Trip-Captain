import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Send, 
  Plane, 
  Hotel, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  User,
  Activity,
  DollarSign,
  TrendingUp,
  MapPin
} from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

interface TripState {
  trip_id: string;
  metadata: {
    status: string;
    current_tier: number;
    last_updated: string;
  };
  tier_1_raw?: any;
  tier_2_nlp?: any;
  tier_3_logistics?: any;
  tier_4_alerts?: any[];
  tier_5_ui?: any;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [persona, setPersona] = useState('Luxury');
  const [tripState, setTripState] = useState<TripState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchState = async () => {
    try {
      const response = await axios.get(`${API_BASE}/state`);
      setTripState(response.data);
    } catch (err) {
      console.log('No active trip found.');
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/chat`, { prompt, persona });
      setTripState(response.data);
      setPrompt('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to connect to API Bridge');
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: number) => {
    if (tripState && tripState.metadata.current_tier >= tier) return 'text-blue-600 border-blue-600 bg-blue-50';
    return 'text-gray-400 border-gray-200 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Plane className="text-blue-600" /> Trip Captain
          </h1>
          <p className="text-slate-500">Logistics Orchestration Dashboard</p>
        </div>
        {tripState && (
          <div className="text-right">
            <p className="text-xs font-mono text-slate-400">TRIP ID: {tripState.trip_id}</p>
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">
              {tripState.metadata.status}
            </span>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Controls & Input */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" /> Orchestrator
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Data Acquisition Spectrum Status */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Data Spectrum Status</h2>
            <div className="space-y-3">
              {[
                { t: 1, label: 'API Ingestion' },
                { t: 2, label: 'NLP Extraction' },
                { t: 3, label: 'Synthesis Engine' },
                { t: 4, label: 'Proactive Alerts' },
                { t: 5, label: 'Persona Filter' }
              ].map((tier) => (
                <div key={tier.t} className={`flex items-center gap-3 p-2 rounded-lg border text-sm font-medium ${getTierColor(tier.t)}`}>
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold">
                    T{tier.t}
                  </div>
                  {tier.label}
                  {tripState && tripState.metadata.current_tier >= tier.t && <CheckCircle2 size={16} className="ml-auto" />}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Results & Visuals */}
        <div className="lg:col-span-2 space-y-6">
          {!tripState ? (
            <div className="bg-white h-96 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <Plane size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-lg">No Active Trip Sequence</p>
              <p className="text-sm">Enter an intent to start orchestration</p>
            </div>
          ) : (
            <>
              {/* Persona Hero (Tier 5) */}
              {tripState.tier_5_ui && (
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase backdrop-blur-sm">
                        {tripState.tier_5_ui.active_filter} Persona
                      </span>
                      <h3 className="text-3xl font-bold mt-2">{tripState.tier_5_ui.persona_data.display_title}</h3>
                    </div>
                    <User size={40} className="p-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Highlights</p>
                      <ul className="text-sm space-y-1">
                        {tripState.tier_5_ui.persona_data.highlights.map((h: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">• {h}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Persona Notes</p>
                      <ul className="text-sm space-y-1">
                        {tripState.tier_5_ui.persona_data.itinerary_notes.map((n: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">• {n}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Itinerary (Tier 3) */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-indigo-500" /> Itinerary
                  </h3>
                  <div className="space-y-4">
                    {tripState.tier_3_logistics?.itinerary.map((item: any, i: number) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 h-fit">
                          {item.type === 'flight' ? <Plane size={18} className="text-blue-500" /> : <Hotel size={18} className="text-indigo-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.description}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{new Date(item.start_date).toLocaleDateString()}</p>
                          {item.price && <p className="text-xs font-bold text-slate-900 mt-1">${item.price}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Audit & Alerts (Tier 3 & 4) */}
                <div className="space-y-6">
                  <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <DollarSign size={20} className="text-green-500" /> Cost Audit
                    </h3>
                    {tripState.tier_3_logistics?.cost_audit && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Base Total</span>
                          <span className="font-medium">${tripState.tier_3_logistics.cost_audit.financial_breakdown.base_total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Service Fees</span>
                          <span className="font-medium text-slate-900">+${tripState.tier_3_logistics.cost_audit.financial_breakdown.service_fee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Taxes</span>
                          <span className="font-medium text-slate-900">+${tripState.tier_3_logistics.cost_audit.financial_breakdown.taxes}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                          <span className="font-bold text-slate-900">Grand Total</span>
                          <span className="text-xl font-extrabold text-blue-600">${tripState.tier_3_logistics.cost_audit.financial_breakdown.grand_total.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold">
                            <ShieldCheck size={14} /> Audit Verified
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                            <TrendingUp size={14} /> Score: {tripState.tier_3_logistics.cost_audit.optimization_metadata.score}
                          </div>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Proactive Alerts (Tier 4) */}
                  <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <AlertTriangle size={20} className="text-amber-500" /> Proactive Alerts
                    </h3>
                    <div className="space-y-3">
                      {tripState.tier_4_alerts?.map((alert: any, i: number) => (
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
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
