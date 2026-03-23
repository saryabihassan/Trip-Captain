# Mission Brief: Topic 8 - Pathfinding & Optimization Algorithm

## Context
Phase 1 of Trip Captain has synthesized a base itinerary. We now need an optimizer that refines this itinerary for logistical efficiency (e.g., travel time or cost-efficiency).

## Objective
Implement the Pathfinding & Optimization Algorithm in `algorithms/optimization/`.

## Data Tier
- **Tier 3**: Logistics Synthesis (Optimization).

## Technical Constraints
1. **Source**: Read `tier_3_logistics` from `trip_state.json`.
2. **Logic**: Implement a sorting or optimization rule (e.g., sort itinerary items by date, or select the best price flight/hotel if multiple exist). For this phase, focus on **Chronological Ordering** and **Cost Validation**.
3. **Integration**: Update the `tier_3_logistics.itinerary` and add an `optimization_metadata` block using `TripStateManager.updateTierData(3, data)`.
4. **Validation**: Ensure results conform to the `tier_3_logistics` schema.
5. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
