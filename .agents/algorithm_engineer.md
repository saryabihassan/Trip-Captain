# Mission Brief: Topic 9 - Proactive Alert Logic (Tier 4)

## Context
Phase 1 of Trip Captain has an optimized Tier 3 itinerary. We now need a proactive monitoring system that detects potential logistical issues (e.g., flight delays, price hikes, or schedule conflicts) and generates alerts.

## Objective
Implement the Proactive Alert Logic in `algorithms/tier_4_alerts/`.

## Data Tier
- **Tier 4**: Proactive Alerts.

## Technical Constraints
1. **Source**: Read `tier_1_raw`, `tier_2_nlp`, and `tier_3_logistics` from `trip_state.json`.
2. **Logic**: Simulate a "Delta Check" between Tier 1 source data and Tier 3 synthesis. For this phase, detect:
    - **Flight Status Conflicts**: e.g., if a flight in Tier 1 is "Delayed" but is critical for the Tier 3 itinerary.
    - **Proximity Alerts**: e.g., if the stay duration in Tier 2 doesn't match the Tier 3 hotel booking.
3. **Integration**: Use `TripStateManager.updateTierData(4, data)` to update the `tier_4_alerts` array in `trip_state.json`.
4. **Validation**: Ensure results conform to the `tier_4_alerts` schema.
5. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
