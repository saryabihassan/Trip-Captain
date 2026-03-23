# Mission Brief: Topic 7 - Financial Validator & Fee Audit

## Context
Phase 1 of Trip Captain has generated a Tier 3 synthesized itinerary. We now need a dedicated audit of the financial data to account for service fees, taxes, and potential discrepancies.

## Objective
Implement the Financial Validator & Fee Audit in `algorithms/cost_audit/`.

## Data Tier
- **Tier 3**: Logistics Synthesis (Financial Validation).

## Technical Constraints
1. **Source**: Read `tier_3_logistics` from `trip_state.json`.
2. **Logic**: Apply a standard service fee (e.g., 5%) and local tax (e.g., 10%) to the `total_estimated_cost`.
3. **Discrepancy Check**: Verify that the sum of individual itinerary item prices matches the `total_estimated_cost` before fees.
4. **Integration**: Update the `cost_audit` block in `trip_state.json` with the new totals and audit trail using `TripStateManager.updateTierData(3, data)`.
5. **Validation**: Ensure the results conform to the `tier_3_logistics` block in `database_schema.json`.
6. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
