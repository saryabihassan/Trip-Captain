import axios from 'axios';
import { TripStateManager } from '../state_manager/TripStateManager.js';

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
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Simulates fetching raw travel data from external APIs.
   * In a real scenario, this would call actual travel provider APIs.
   */
  public async fetchRawData(): Promise<{ flights: FlightData[]; hotels: HotelData[] }> {
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
   * Ingests raw data into the trip_state.json file.
   */
  public async ingest(): Promise<void> {
    const currentState = await this.stateManager.read();
    
    // Check status constraint
    if (!['draft', 'active'].includes(currentState.metadata.status)) {
      throw new Error(`Ingestion blocked: Trip status is ${currentState.metadata.status}`);
    }

    console.log(`Ingesting Tier 1 data for Trip ID: ${currentState.trip_id}...`);
    
    const rawData = await this.fetchRawData();
    
    // Update state using the manager (Topic 3 requirement)
    await this.stateManager.updateTierData(1, rawData);
    
    console.log('✅ Tier 1 Ingestion Complete.');
  }
}
