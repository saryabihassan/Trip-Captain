# Mission Brief: Topic 4 - Tier 1 API Ingestion

## Context
Phase 1 of Trip Captain requires raw logistical data (Flights, Hotels, Weather) from external sources.

## Objective
Implement the Tier 1 API Ingestion logic in `backend/tier_1_ingestion/`.

## Data Tier
- **Tier 1**: Raw data ingestion into `trip_state.json`.

## Technical Constraints
1. **Source**: Use a mockable API client (Axios) to simulate fetching travel data.
2. **Schema Validation**: Use the `TripStateManager`'s `updateTierData(1, data)` method to ensure the data is validated against the schema before being persisted to `trip_state.json`.
3. **Status Check**: Ensure the trip status is 'active' or 'draft' before ingestion.
4. **Output**: TypeScript implementation that can be triggered to simulate a data fetch.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data (use realistic structures). Output only executable code.*
