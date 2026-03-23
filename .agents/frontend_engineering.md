# Mission Brief: Topic 11 - Conversational API Bridge

## Context
Phase 1 of Trip Captain requires a communication bridge between the user interface and the backend logic (NLP, State Manager, etc.).

## Objective
Implement the Conversational API Bridge in `frontend/api_bridge/`.

## Data Tier
- **Cross-Tier**: Orchestrates Tiers 1-5 via an API.

## Technical Constraints
1. **Source**: Create an Express-based API server.
2. **Endpoint**: Implement `POST /api/chat` that accepts a user prompt.
3. **Logic**:
    - Receive `{ prompt: string }`.
    - Trigger the `NLPParameterExtractor` (Tier 2).
    - Trigger the `LogisticsSynthesisEngine` (Tier 3) if parameters are sufficient.
    - Return the updated `trip_state.json` or a summary.
4. **Environment**: Use the `PORT` defined in `.env`.
5. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `backend/state_manager/TripStateManager.ts`
- `backend/tier_2_nlp/NLPParameterExtractor.ts`
- `algorithms/tier_3_synthesis/LogisticsSynthesisEngine.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
