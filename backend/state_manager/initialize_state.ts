import { TripStateManager } from './TripStateManager.js';

const initializeState = async () => {
  const manager = new TripStateManager();
  const tripId = `TRIP-${Date.now()}`;
  
  console.log(`Initializing state for: ${tripId}`);
  
  try {
    await manager.initialize(tripId);
    console.log('✅ trip_state.json created successfully.');
  } catch (error: any) {
    console.error('❌ Failed to initialize state:', error.message);
    process.exit(1);
  }
};

initializeState();
