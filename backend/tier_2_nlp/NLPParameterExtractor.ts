import { TripStateManager } from '../state_manager/TripStateManager.js';

export interface NLPExtractionResult {
  intent: string;
  parameters: Record<string, any>;
}

export class NLPParameterExtractor {
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Processes a natural language prompt to extract intent and parameters.
   * Uses simple regex logic for this phase.
   */
  public extractFromPrompt(prompt: string): NLPExtractionResult {
    console.log(`Processing prompt: "${prompt}"`);

    // Basic regex-based extraction for Topic 5 demonstration
    const destinationMatch = prompt.match(/to\s+([A-Z][a-z]+)/);
    const durationMatch = prompt.match(/(\d+)\s+day/);
    
    const result: NLPExtractionResult = {
      intent: prompt.includes('go') ? 'travel_planning' : 'general_query',
      parameters: {
        destination: destinationMatch ? destinationMatch[1] : 'unknown',
        duration_days: durationMatch ? parseInt(durationMatch[1], 10) : 0,
        raw_prompt: prompt
      }
    };

    return result;
  }

  /**
   * Extracts parameters from the prompt and persists them as Tier 2 data.
   */
  public async process(prompt: string): Promise<void> {
    const currentState = await this.stateManager.read();
    
    // Ensure we have Tier 1 data first (Data Acquisition Spectrum enforcement)
    if (!currentState.tier_1_raw) {
      console.warn('⚠️ Warning: Proceeding to Tier 2 without Tier 1 data.');
    }

    const nlpData = this.extractFromPrompt(prompt);
    
    console.log('✅ Extracted Intent:', nlpData.intent);
    console.log('✅ Extracted Parameters:', JSON.stringify(nlpData.parameters));

    // Update state to Tier 2
    await this.stateManager.updateTierData(2, nlpData);
    
    console.log('✅ Tier 2 NLP Parameter Extraction Complete.');
  }
}
