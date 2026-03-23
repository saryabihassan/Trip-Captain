# Mission Brief: Topic 5 - Tier 2 NLP Parameter Extractor

## Context
Phase 1 of Trip Captain has Tier 1 raw data. We now need to process natural language input to extract structured intent and parameters.

## Objective
Implement the Tier 2 NLP Parameter Extractor in `backend/tier_2_nlp/`.

## Data Tier
- **Tier 2**: NLP Parameter Extraction.

## Technical Constraints
1. **Source**: Accept a natural language string (e.g., "I want to go to London for 7 days").
2. **Logic**: Implement a parser (regex-based or simple logic) to extract:
    - `intent`: e.g., "vacation_planning"
    - `parameters`: e.g., `{ "destination": "London", "duration_days": 7 }`
3. **Integration**: Use `TripStateManager.updateTierData(2, data)` to persist the extracted parameters.
4. **Validation**: Ensure the extraction results conform to the `tier_2_nlp` block in `database_schema.json`.
5. **Output**: TypeScript implementation.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `backend/state_manager/TripStateManager.ts`

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
