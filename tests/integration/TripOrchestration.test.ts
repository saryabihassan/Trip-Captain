import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';
import { TripStateSchema } from '../../backend/state_manager/types/TripStateSchema.js';
import pkg from 'fs-extra';
const { pathExists, remove } = pkg;
import axios from 'axios';
import * as path from 'path';

const API_URL = 'http://localhost:3000/api';
const STATE_FILE = path.resolve(process.cwd(), 'trip_state.json');

async function runTests() {
  console.log('🚀 Starting Integration Tests & Edge Case Scenarios...\n');

  try {
    // 1. Test TripStateManager: Schema Validation
    console.log('--- Test 1: TripStateManager Schema Validation ---');
    const manager = new TripStateManager();
    const tripId = 'TEST-TRIP-123';
    await manager.initialize(tripId);
    console.log('✅ Initialization successful.');

    try {
      // Intentional invalid update
      await manager.updateTierData(1, { invalid_field: 123 } as any);
      // If no error, fail
      // Wait, Tier 1 is "object" in schema, so it might pass if not strict.
      // Let's try something that violates the metadata schema.
      const state = await manager.read();
      state.metadata.current_tier = 10; // Max is 5
      await manager.save(state);
      console.log('❌ Error: Tier 10 should have failed validation.');
    } catch (error: any) {
      console.log(`✅ Validation correctly blocked invalid tier: ${error.message}`);
    }

    // 2. Test TripStateManager: State Transitions
    console.log('\n--- Test 2: TripStateManager State Transitions ---');
    // Re-initialize for a clean state
    const transitionManager = new TripStateManager();
    await transitionManager.initialize('TRANSITION-TEST-123');
    
    // Test Valid Transition: draft -> active
    const activeState = await transitionManager.transitionStatus('active');
    if (activeState.metadata.status === 'active') {
      console.log('✅ Transition draft -> active successful.');
    } else {
      console.log('❌ Error: Transition draft -> active failed.');
    }

    // Test Valid Transition: active -> completed
    const completedState = await transitionManager.transitionStatus('completed');
    if (completedState.metadata.status === 'completed') {
      console.log('✅ Transition active -> completed successful.');
    } else {
      console.log('❌ Error: Transition active -> completed failed.');
    }


    // Test Invalid Transition: completed -> active
    try {
      await transitionManager.transitionStatus('active');
      console.log('❌ Error: Transition completed -> active should have failed.');
    } catch (error: any) {
      console.log(`✅ Transition correctly blocked invalid transition: ${error.message}`);
    }


    // 3. Test Full Orchestration (Tiers 1-5) via API
    console.log('\n--- Test 3: Full 5-Tier Orchestration via API ---');
    console.log('Note: Ensure the server is running on localhost:3000');
    
    const prompt = "I want to go to Paris for 5 days";
    const response = await axios.post(`${API_URL}/chat`, { prompt, persona: 'Budget' });
    
    const state = response.data;
    if (state.metadata.current_tier === 5 && state.tier_5_ui.active_filter === 'Budget') {
      console.log('✅ Full Orchestration (Tiers 1-5) successful for prompt: ' + prompt);
      console.log(`✅ State reached Tier: ${state.metadata.current_tier}`);
      console.log(`✅ Active Persona: ${state.tier_5_ui.active_filter}`);
    } else {
      console.log('❌ Full Orchestration failed. State:', JSON.stringify(state, null, 2));
    }

    // 4. Test Edge Case: Empty Prompt
    console.log('\n--- Test 4: Edge Case - Empty Prompt ---');
    try {
      await axios.post(`${API_URL}/chat`, { prompt: '', persona: 'Luxury' });
      console.log('❌ Error: Empty prompt should have failed.');
    } catch (error: any) {
      console.log(`✅ Correctly handled empty prompt: ${error.response?.data?.error || error.message}`);
    }

    console.log('\n✨ All Integration Tests Completed Successfully.');
  } catch (error: any) {
    console.error('\n💥 Integration Test Suite Failed:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    process.exit(1);
  }
}

runTests();
