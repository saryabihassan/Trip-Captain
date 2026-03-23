import pkg from 'fs-extra';
const { pathExists, readJson, writeJson, move } = pkg;
import * as path from 'path';
import { TripState, TripStateSchema } from './types/TripStateSchema.js';

export class TripStateManager {
  private static STATE_FILE = path.resolve(process.cwd(), 'trip_state.json');
  private stateCache: TripState | null = null;

  constructor(initialState?: TripState) {
    if (initialState) {
      this.stateCache = initialState;
    }
  }

  /**
   * Initializes a new state file if it doesn't exist.
   */
  public async initialize(tripId: string): Promise<TripState> {
    const initialState: TripState = {
      trip_id: tripId,
      metadata: {
        status: 'draft',
        current_tier: 1,
        last_updated: new Date().toISOString(),
      },
    };

    await this.save(initialState);
    this.stateCache = initialState;
    return initialState;
  }

  /**
   * Reads and validates the current state from cache or disk.
   */
  public async read(): Promise<TripState> {
    if (this.stateCache) {
      return this.stateCache;
    }

    if (!(await pathExists(TripStateManager.STATE_FILE))) {
      throw new Error('Trip state file not found. Run initialize() first.');
    }

    const data = await readJson(TripStateManager.STATE_FILE);
    const result = TripStateSchema.safeParse(data);

    if (!result.success) {
      throw new Error(`Schema Validation Failed: ${result.error.message}`);
    }
    
    this.stateCache = result.data;
    return result.data;
  }

  /**
   * Validates and saves the state atomically and updates the cache.
   */
  public async save(state: TripState): Promise<void> {
    const result = TripStateSchema.safeParse(state);
    if (!result.success) {
      throw new Error(`Schema Validation Failed: ${result.error.message}`);
    }

    // Update timestamp before saving
    state.metadata.last_updated = new Date().toISOString();
    
    this.stateCache = state;

    const tempFile = `${TripStateManager.STATE_FILE}.tmp`;
    await writeJson(tempFile, state, { spaces: 2 });
    await move(tempFile, TripStateManager.STATE_FILE, { overwrite: true });
  }

  /**
   * Transitions the trip status following valid business rules.
   */
  public async transitionStatus(newStatus: TripState['metadata']['status']): Promise<TripState> {
    const currentState = await this.read();
    const currentStatus = currentState.metadata.status;

    const validTransitions: Record<string, string[]> = {
      draft: ['active', 'cancelled'],
      active: ['completed', 'cancelled'],
      completed: [],
      cancelled: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new Error(`Invalid Status Transition: ${currentStatus} -> ${newStatus}`);
    }

    currentState.metadata.status = newStatus;
    await this.save(currentState);
    return currentState;
  }

  /**
   * Updates specific tier data and advances the current_tier level.
   */
  public async updateTierData(tier: number, data: any): Promise<TripState> {
    const currentState = await this.read();
    
    switch (tier) {
      case 1: currentState.tier_1_raw = data; break;
      case 2: currentState.tier_2_nlp = data; break;
      case 3: currentState.tier_3_logistics = data; break;
      case 4: currentState.tier_4_alerts = data; break;
      case 5: currentState.tier_5_ui = data; break;
      default: throw new Error(`Invalid Tier: ${tier}`);
    }

    currentState.metadata.current_tier = tier;
    await this.save(currentState);
    return currentState;
  }
}
