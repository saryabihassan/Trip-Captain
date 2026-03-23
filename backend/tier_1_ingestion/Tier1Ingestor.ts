import { TripStateManager } from '../state_manager/TripStateManager.js';
import { TripState } from '../state_manager/types/TripStateSchema.js';

export interface FlightData {
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  status: string;
}

export interface HotelData {
  name: string;
  address: string;
  check_in: string;
  check_out: string;
}

export class Tier1Ingestor {
  /**
   * Simulates fetching raw travel data from external APIs based on NLP parameters.
   */
  private async fetchRawData(destination: string): Promise<{ flights: FlightData[]; hotels: HotelData[] }> {
    // Simulating a live API call that returns destination-specific data
    console.log(`📡 Fetching live data for destination: ${destination}...`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockData = {
      flights: [
        {
          flight_number: "AA123",
          origin: "JFK",
          destination: destination.toUpperCase().slice(0, 3) || "LHR", // Mock airport code
          departure_time: "2026-06-01T10:00:00Z",
          status: "On Time"
        }
      ],
      hotels: [
        {
          name: `The Grand ${destination} Resort`,
          address: `Central Square, ${destination}`,
          check_in: "2026-06-01",
          check_out: "2026-06-07"
        }
      ]
    };

    return mockData;
  }

  /**
   * Ingests raw data into the trip state, utilizing NLP parameters if available.
   */
  public async ingest(currentState: TripState): Promise<TripState> {
    const stateManager = new TripStateManager(currentState);
    
    // Check status constraint
    if (!['draft', 'active'].includes(currentState.metadata.status)) {
      throw new Error(`Ingestion blocked: Trip status is ${currentState.metadata.status}`);
    }

    console.log(`Ingesting Tier 1 data for Trip ID: ${currentState.trip_id}...`);
    
    // Retrieve destination extracted from Tier 2 (NLP)
    const destination = currentState.tier_2_nlp?.parameters?.destination || 'London';
    
    const rawData = await this.fetchRawData(destination);
    
    // Update state using the manager
    const newState = await stateManager.updateTierData(1, rawData);
    
    console.log('✅ Tier 1 Ingestion Complete.');
    return newState;
  }
}

