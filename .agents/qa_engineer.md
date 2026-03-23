# Mission Brief: Topic 14 - Integration Testing & Edge Case Scenarios

## Context
Phase 1 of Trip Captain is complete from Tiers 1-5. We now need a robust integration test suite to verify the end-to-end orchestration and handle edge cases.

## Objective
Implement Integration Testing & Edge Case Scenarios in `tests/integration/`.

## Data Tier
- **Cross-Tier**: Verifies Tiers 1-5.

## Technical Constraints
1. **Verification**: Implement a test suite that:
    - Verifies the full 5-tier orchestration via `POST /api/chat`.
    - Asserts that `trip_state.json` contains valid data at each tier.
    - Verifies the `TripStateManager`'s validation logic.
2. **Edge Cases**:
    - **Invalid Prompt**: Prompt without destination/duration.
    - **State Corruption**: Attempting to write invalid data to `trip_state.json` (expect `zod` failure).
    - **Invalid Transition**: Attempting an invalid state transition (e.g., `completed -> active`).
3. **Execution**: Use `tsx` or a compatible test runner to execute the tests.
4. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`
- `frontend/api_bridge/Server.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
