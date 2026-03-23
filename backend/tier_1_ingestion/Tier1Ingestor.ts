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
   * Simulates fetching raw travel data from external APIs.
   */
  private async fetchRawData(): Promise<{ flights: FlightData[]; hotels: HotelData[] }> {
    // Simulating API response data
    const mockData = {
      flights: [
        {
          flight_number: "AA123",
          origin: "JFK",
          destination: "LHR",
          departure_time: "2026-06-01T10:00:00Z",
          status: "On Time"
        }
      ],
      hotels: [
        {
          name: "The Londoner",
          address: "Leicester Square, London",
          check_in: "2026-06-01",
          check_out: "2026-06-07"
        }
      ]
    };

    return mockData;
  }

  /**
   * Ingests raw data into the trip state.
   */
  public async ingest(currentState: TripState): Promise<TripState> {
    const stateManager = new TripStateManager(currentState);
    
    // Check status constraint
    if (!['draft', 'active'].includes(currentState.metadata.status)) {
      throw new Error(`Ingestion blocked: Trip status is ${currentState.metadata.status}`);
    }

    console.log(`Ingesting Tier 1 data for Trip ID: ${currentState.trip_id}...`);
    
    const rawData = await this.fetchRawData();
    
    // Update state using the manager
    const newState = await stateManager.updateTierData(1, rawData);
    
    console.log('✅ Tier 1 Ingestion Complete.');
    return newState;
  }
}

