import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';

export interface ItineraryItem {
  type: 'flight' | 'hotel';
  description: string;
  start_date: string;
  end_date: string;
  price?: number;
}

export interface SynthesisResult {
  itinerary: ItineraryItem[];
  cost_audit: {
    total_estimated_cost: number;
    currency: string;
    details: string;
  };
}

export class LogisticsSynthesisEngine {
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Synthesizes Tier 1 and Tier 2 data into a Tier 3 itinerary and cost audit.
   */
  public async synthesize(): Promise<void> {
    const currentState = await this.stateManager.read();

    if (!currentState.tier_1_raw || !currentState.tier_2_nlp) {
      throw new Error('Synthesis failed: Tier 1 and Tier 2 data are required.');
    }

    const { tier_1_raw, tier_2_nlp } = currentState;
    const { destination, duration_days } = tier_2_nlp.parameters;

    console.log(`Synthesizing logistics for ${destination} for ${duration_days} days...`);

    const itinerary: ItineraryItem[] = [];
    let totalCost = 0;

    // Filter Tier 1 flights for the destination
    const flights = (tier_1_raw as any).flights || [];
    // Mock mapping: If destination is London, use LHR. Otherwise use first flight or mock one.
    const relevantFlight = flights.find((f: any) => f.destination === 'LHR' || destination.toLowerCase().includes('london'));
    
    if (relevantFlight || flights.length > 0) {
      const flight = relevantFlight || flights[0];
      itinerary.push({
        type: 'flight',
        description: `Flight ${flight.flight_number} from ${flight.origin} to ${destination}`,
        start_date: flight.departure_time,
        end_date: flight.departure_time,
        price: 500
      });
      totalCost += 500;
    }

    // Filter Tier 1 hotels for the destination
    const hotels = (tier_1_raw as any).hotels || [];
    const relevantHotel = hotels.find((h: any) => h.address.includes(destination));

    if (relevantHotel) {
      itinerary.push({
        type: 'hotel',
        description: `Stay at ${relevantHotel.name}`,
        start_date: relevantHotel.check_in,
        end_date: relevantHotel.check_out,
        price: 150 * duration_days // Mock price for synthesis
      });
      totalCost += 150 * duration_days;
    }

    const result: SynthesisResult = {
      itinerary,
      cost_audit: {
        total_estimated_cost: totalCost,
        currency: 'USD',
        details: `Synthesis of ${itinerary.length} items for destination ${destination}.`
      }
    };

    console.log('✅ Logistics synthesis complete.');
    console.log('✅ Estimated Total Cost:', totalCost);

    // Update state to Tier 3
    await this.stateManager.updateTierData(3, result);
    
    console.log('✅ Tier 3 Logistics Synthesis Complete.');
  }
}
