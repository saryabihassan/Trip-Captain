import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';
import { NLPParameterExtractor } from '../../backend/tier_2_nlp/NLPParameterExtractor.js';
import { Tier1Ingestor } from '../../backend/tier_1_ingestion/Tier1Ingestor.js';
import { LogisticsSynthesisEngine } from '../../algorithms/tier_3_synthesis/LogisticsSynthesisEngine.js';
import { FinancialValidator } from '../../algorithms/cost_audit/FinancialValidator.js';
import { LogisticsOptimizer } from '../../algorithms/optimization/LogisticsOptimizer.js';
import { ProactiveAlertEngine } from '../../algorithms/tier_4_alerts/ProactiveAlertEngine.js';
import { PersonaFilterEngine, PersonaType } from '../tier_5_persona/PersonaFilterEngine.js';
import { LearningsManager } from '../../scripts/LearningsManager.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize engine instances once
const ingestor = new Tier1Ingestor();
const nlpExtractor = new NLPParameterExtractor();
const synthesisEngine = new LogisticsSynthesisEngine();
const costValidator = new FinancialValidator();
const optimizer = new LogisticsOptimizer();
const alertEngine = new ProactiveAlertEngine();
const personaEngine = new PersonaFilterEngine();
const learningsManager = new LearningsManager();

/**
 * Endpoint to trigger the full 5-Tier Data Spectrum orchestration via a chat prompt.
 */
app.post('/api/chat', async (req: Request, res: Response) => {
  const { prompt, persona = 'Luxury' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    console.log(`\n--- Orchestrating Build Sequence for: "${prompt}" ---`);
    
    // 1. Initialize State
    const stateManager = new TripStateManager();
    const tripId = `TRIP-${Date.now()}`;
    let state = await stateManager.initialize(tripId);
    
    // 2. Orchestration Chain (In-Memory State Passing)
    // CRITICAL FIX: NLP Extraction (Tier 2) must happen BEFORE API Ingestion (Tier 1) 
    // so that we know *what* destination to fetch data for.
    state = await nlpExtractor.process(prompt, state);
    state = await ingestor.ingest(state);
    
    state = await synthesisEngine.synthesize(state);
    state = await costValidator.audit(state);
    state = await optimizer.optimize(state);
    state = await alertEngine.scanForAlerts(state);
    state = await personaEngine.applyPersona(persona as PersonaType, state);


    res.json(state);
    
    console.log(`--- Orchestration Complete for: ${tripId} ---\n`);
  } catch (error: any) {
    console.error('❌ Orchestration Failed:', error.message);
    
    // Topic 15: Automation Loop
    await learningsManager.autoAnalyze(`Orchestration: ${prompt}`, error);
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to fetch the current trip state.
 */
app.get('/api/state', async (_req: Request, res: Response) => {
  try {
    // Always use a fresh state manager for GET requests to read from disk
    const stateManager = new TripStateManager();
    const state = await stateManager.read();
    res.json(state);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Conversational API Bridge running at http://localhost:${PORT}`);
});
