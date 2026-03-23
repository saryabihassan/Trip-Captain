# Mission Brief: Topic 3 - trip_state.json Manager

## Context
We are initializing Phase 1 of the Trip Captain platform. The system relies on a central `trip_state.json` as the single source of truth for the 5-Tier Data Spectrum.

## Objective
Implement a robust state manager in `backend/state_manager/` that handles all read/write operations to `trip_state.json`.

## Data Tier
- **Tier 1 & 2**: Initial state initialization and metadata management.

## Technical Constraints
1. **Schema Validation**: Every write operation MUST be validated against the `database_schema.json` using the `zod` library.
2. **Persistence**: The state must be persisted to `/Users/saryabihassan/squadprojects/Trip Captain/trip_state.json`.
3. **Thread Safety**: Implement basic file locking or atomic write operations to prevent state corruption during concurrent access.
4. **State Transitions**: Define clear transitions for the `metadata.status` field (draft -> active -> completed/cancelled).
5. **Output**: Provide the implementation in TypeScript.

## Reference Files
- `architecture_spec.md`
- `database_schema.json`
- `package.json` (for dependencies)

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
