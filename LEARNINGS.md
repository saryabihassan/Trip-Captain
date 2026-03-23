# Trip Captain: Project Development Learnings

## Core Mandates & Architecture
- **5-Tier Data Spectrum:** Strictly adhere to the Tiers (1: Ingestion, 2: NLP, 3: Synthesis, 4: Alerts, 5: Persona). Tier 2 should ideally follow Tier 1, and Tier 3 requires both.
- **Single Source of Truth:** `trip_state.json` is the ground truth. All state changes MUST be validated against `database_schema.json` using the `TripStateManager`.
- **Branching Policy:** Always commit directly to the `main` branch.

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
- **Working Directory:** Always run execution commands from the project root to ensure `process.cwd()` resolves to the correct location for `trip_state.json`.
