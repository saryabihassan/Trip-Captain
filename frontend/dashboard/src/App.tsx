import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane } from 'lucide-react';

// UI Component Library Imports
import { 
  OrchestratorPanel, 
  DataSpectrumStatus, 
  PersonaHero, 
  ItineraryList, 
  CostAuditCard, 
  AlertBanner 
} from './index.ts';

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 relative selection:bg-indigo-500 selection:text-white">
      {/* Global Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center py-6 px-8 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
            <Plane className="text-white" size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Trip Captain
            </h1>
            <p className="text-sm font-semibold text-slate-400 mt-0.5 tracking-wide uppercase">AI Logistics Orchestrator</p>
          </div>
        </div>
        
        {tripState && (
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold font-mono text-slate-400 mb-1.5 opacity-70">SESSION: {tripState.trip_id.split('-')[1]}</p>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
              {tripState.metadata.status}
            </span>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Input */}
        <div className="lg:col-span-4 space-y-6">
          <OrchestratorPanel 
            prompt={prompt}
            setPrompt={setPrompt}
            persona={persona}
            setPersona={setPersona}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />

          <DataSpectrumStatus currentTier={tripState?.metadata.current_tier || 0} />
        </div>

        {/* Right Column: Results & Visuals */}
        <div className="lg:col-span-8 space-y-6">
          {!tripState ? (
            <div className="bg-white/50 backdrop-blur-xl h-[600px] rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 transition-all duration-500 hover:border-indigo-300 hover:bg-white/80 group">
              <div className="p-8 bg-slate-100 rounded-full mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-500">
                <Plane size={64} className="opacity-20 group-hover:opacity-100 group-hover:text-indigo-500 transition-all duration-500" />
              </div>
              <p className="font-extrabold text-2xl text-slate-700 tracking-tight">Awaiting Orders</p>
              <p className="text-sm font-medium text-slate-500 mt-2 max-w-xs text-center leading-relaxed">Enter an intent in the Orchestrator panel to initiate the 5-Tier Data Spectrum.</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Persona Hero (Tier 5) */}
              {tripState.tier_5_ui && <PersonaHero tier5Ui={tripState.tier_5_ui} />}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Itinerary (Tier 3) */}
                <div className="xl:col-span-1">
                  {tripState.tier_3_logistics?.itinerary && (
                    <ItineraryList itinerary={tripState.tier_3_logistics.itinerary} />
                  )}
                </div>

                {/* Audit & Alerts (Tier 3 & 4) */}
                <div className="xl:col-span-1 space-y-8">
                  {tripState.tier_3_logistics?.cost_audit && (
                    <CostAuditCard costAudit={tripState.tier_3_logistics.cost_audit} />
                  )}

                  {/* Proactive Alerts (Tier 4) */}
                  {tripState.tier_4_alerts && (
                    <AlertBanner alerts={tripState.tier_4_alerts} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
