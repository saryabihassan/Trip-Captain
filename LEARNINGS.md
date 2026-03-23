# Trip Captain: Project Development Learnings

## Core Mandates & Architecture
- **Schema Reliability:** Validating state at every tier (1-5) prevents downstream failures in synthesis and optimization logic.
- **5-Tier Data Spectrum:** Strictly adhere to the Tiers (1: Ingestion, 2: NLP, 3: Synthesis, 4: Alerts, 5: Persona). Tier 2 should ideally follow Tier 1, and Tier 3 requires both.
- **Single Source of Truth:** `trip_state.json` is the ground truth. All state changes MUST be validated against `database_schema.json` using the `TripStateManager`.
- **Branching Policy:** Always commit directly to the `main` branch.
- **Sub-Phase States:** Tier 3 isn't a single step; it involves multiple sub-phases: Synthesis (Feasibility), Audit (Financial), and Optimization (Scoring). Each sub-phase updates the same Tier 3 block but refines the data.

## Technical Implementation (TypeScript/ESM)
- **Node.js ESM Compatibility:** 
    - Always include `"type": "module"` in `package.json`.
    - Use `.js` extensions in imports (e.g., `import { Foo } from './Foo.js';`) even if the source is `.ts`.
    - Avoid `__dirname` in ESM; use `path.resolve(process.cwd(), '...')` for reliable pathing from the project root.
- **Library Nuances:**
    - `fs-extra` in ESM: Use default import and destructure (e.g., `import pkg from 'fs-extra'; const { pathExists } = pkg;`).
- **Execution Tooling:**
    - Use `tsx` (`npx tsx path/to/file.ts`) for executing TypeScript files directly in an ESM context; it handles loaders and ESM mapping more gracefully than `ts-node` without complex configuration.

## Git & Project Structure
- **Nested Repositories:** Ensure no nested `.git` directories exist (e.g., in `main/`) as they prevent staging and committing files to the parent repository.
- **Empty Directories:** Use `.gitkeep` files to ensure the directory structure is preserved in Git, as Git does not track empty folders by default.
- **GitHub CLI (`gh`):** Be aware of system aliases. The standard `gh` on this system was an older version; use the Homebrew-installed path (`/opt/homebrew/bin/gh`) for full functionality (e.g., `repo create`, `repo edit`).

## Potential Future Pitfalls
- **Lookup Mappings:** Mapping natural language (Tier 2 "London") to technical codes (Tier 1 "LHR") is currently hardcoded for demonstration. A robust mapping service will be needed for Tier 3 synthesis as the project scales.
- **Cross-Tier Validation (Delta Checking):** Tier 4 (Alerts) is most effective when it performs "Delta Checks" between different Tiers (e.g., comparing Tier 2 user intent with Tier 3 logistical results). This reveals discrepancies like requested duration vs. actual booking availability.
- **State Observability:** Implementing "Validation Status" and "Optimization Scores" within the state schema significantly improves the observability of the automated planning process.
- **Working Directory:** Always run execution commands from the project root to ensure `process.cwd()` resolves to the correct location for `trip_state.json`.
