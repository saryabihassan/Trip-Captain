import { TripStateManager } from '../state_manager/TripStateManager.js';
import { TripState } from '../state_manager/types/TripStateSchema.js';

export interface NLPExtractionResult {
  intent: string;
  parameters: Record<string, any>;
}

export class NLPParameterExtractor {
  /**
   * Processes a natural language prompt to extract intent and parameters.
   */
  private extractFromPrompt(prompt: string): NLPExtractionResult {
    console.log(`Processing prompt: "${prompt}"`);

    // Basic regex-based extraction
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
  public async process(prompt: string, currentState: TripState): Promise<TripState> {
    const stateManager = new TripStateManager(currentState);
    
    if (!currentState.tier_1_raw) {
      console.warn('⚠️ Warning: Proceeding to Tier 2 without Tier 1 data.');
    }

    const nlpData = this.extractFromPrompt(prompt);
    
    console.log('✅ Extracted Intent:', nlpData.intent);
    console.log('✅ Extracted Parameters:', JSON.stringify(nlpData.parameters));

    // Update state to Tier 2
    const newState = await stateManager.updateTierData(2, nlpData);
    
    console.log('✅ Tier 2 NLP Parameter Extraction Complete.');
    return newState;
  }
}

