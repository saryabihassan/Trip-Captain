# Mission Brief: Topic 6 - Logistics Synthesis Engine (Tier 3)

## Context
Phase 1 of Trip Captain has Tier 1 raw data and Tier 2 NLP parameters. We now need to synthesize this information to create a feasible itinerary.

## Objective
Implement the Logistics Synthesis Engine (Tier 3) in `algorithms/tier_3_synthesis/`.

## Data Tier
- **Tier 3**: Logistics Synthesis.

## Technical Constraints
1. **Source**: Read `tier_1_raw` and `tier_2_nlp` from `trip_state.json`.
2. **Logic**: Cross-reference the user's intent (destination/duration) with the available flight/hotel data.
3. **Integration**: Use `TripStateManager.updateTierData(3, data)` to persist the synthesized itinerary and cost audit.
4. **Validation**: Ensure the results conform to the `tier_3_logistics` block in `database_schema.json`.
5. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
