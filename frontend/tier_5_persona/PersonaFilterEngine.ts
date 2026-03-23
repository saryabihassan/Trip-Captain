import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';

export interface PersonaUIConfig {
  active_filter: string;
  persona_data: {
    display_title: string;
    highlights: string[];
    itinerary_notes: string[];
  };
}

export type PersonaType = 'Luxury' | 'Budget' | 'Family';

export class PersonaFilterEngine {
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Applies a persona-based filter to the trip state and updates Tier 5 UI data.
   */
  public async applyPersona(persona: PersonaType): Promise<void> {
    const currentState = await this.stateManager.read();

    if (!currentState.tier_3_logistics) {
      throw new Error('Persona filtering failed: Tier 3 logistics data is required.');
    }

    const { itinerary, cost_audit } = currentState.tier_3_logistics;
    
    console.log(`Applying persona filter: "${persona}" to Trip ID: ${currentState.trip_id}...`);

    let displayTitle = '';
    let highlights: string[] = [];
    let itineraryNotes: string[] = [];

    switch (persona) {
      case 'Luxury':
        displayTitle = 'Premium London Experience';
        highlights = ['High-end accommodation at The Londoner', 'Direct flight (if available)'];
        itineraryNotes = ['Prioritize concierge service', 'Private airport transfers suggested'];
        break;
      case 'Budget':
        displayTitle = 'Essential London Getaway';
        highlights = ['Efficient flight selection', 'Cost-effective accommodation'];
        itineraryNotes = [`Optimization Score: ${cost_audit.optimization_metadata?.score}`, 'Public transport recommended'];
        break;
      case 'Family':
        displayTitle = 'Family-Friendly London Adventure';
        highlights = ['Centrally located hotel', 'Managed logistics for ease of travel'];
        itineraryNotes = ['Child-friendly amenities inquiry needed', 'Spacious room configuration confirmed'];
        break;
      default:
        throw new Error(`Unknown persona: ${persona}`);
    }

    const tier5Data: PersonaUIConfig = {
      active_filter: persona,
      persona_data: {
        display_title: displayTitle,
        highlights,
        itinerary_notes: itineraryNotes
      }
    };

    console.log(`✅ Persona filter "${persona}" applied successfully.`);
    console.log(`✅ Display Title: ${displayTitle}`);

    // Update state to Tier 5
    await this.stateManager.updateTierData(5, tier5Data);
    
    console.log('✅ Tier 5 Persona Filter Engine Complete.');
  }
}
