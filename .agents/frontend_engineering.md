# Mission Brief: Topic 13 - UI Component Library

## Context
Phase 1 of Trip Captain has a functional dashboard shell. We now need to refactor the monolithic `App.tsx` into a reusable UI Component Library to ensure scalability and maintainability.

## Objective
Implement the UI Component Library in `frontend/components/`.

## Data Tier
- **Tier 5**: UI Presentation.

## Technical Constraints
1. **Refactor**: Extract existing UI logic from `App.tsx` into modular components.
2. **Components to Create**:
    - `OrchestratorPanel.tsx`: Handles input and persona selection.
    - `DataSpectrumStatus.tsx`: Visualizes Tier 1-5 progress.
    - `PersonaHero.tsx`: Large header for Tier 5 data.
    - `ItineraryList.tsx`: Displays Tier 3 chronological items.
    - `CostAuditCard.tsx`: Displays financial and optimization data.
    - `AlertBanner.tsx`: Displays Tier 4 proactive alerts.
3. **Architecture**:
    - Components should be functional and receive data via props.
    - Use `lucide-react` for icons and `tailwind-merge` for styling.
4. **Integration**: Update `frontend/dashboard/src/App.tsx` to use these new components.
5. **Output**: TypeScript implementation.

## Reference Files
- `frontend/dashboard/src/App.tsx` (current monolith)

---
*No fluff. No mocking Tier 1 data. Output only executable code.*
