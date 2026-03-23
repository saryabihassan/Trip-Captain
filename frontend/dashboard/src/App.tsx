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
} from '../../components/index.ts';

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
              {tripState.tier_5_ui && <PersonaHero tier5Ui={tripState.tier_5_ui} />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Itinerary (Tier 3) */}
                {tripState.tier_3_logistics?.itinerary && (
                  <ItineraryList itinerary={tripState.tier_3_logistics.itinerary} />
                )}

                {/* Audit & Alerts (Tier 3 & 4) */}
                <div className="space-y-6">
                  {tripState.tier_3_logistics?.cost_audit && (
                    <CostAuditCard costAudit={tripState.tier_3_logistics.cost_audit} />
                  )}

                  {/* Proactive Alerts (Tier 4) */}
                  {tripState.tier_4_alerts && (
                    <AlertBanner alerts={tripState.tier_4_alerts} />
                  )}
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
