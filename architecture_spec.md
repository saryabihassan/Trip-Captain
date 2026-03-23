# Trip Captain: Architecture Specification & Roadmap

## Overview
Trip Captain is a logistical orchestration platform designed to handle complex travel planning through a 5-Tier Data Acquisition Spectrum.

## Data Acquisition Spectrum (Tiers 1-5)
1.  **Tier 1: API Ingestion**: Raw external data (Flights, Hotels, Weather).
2.  **Tier 2: NLP Extraction**: Intent-based parameter extraction from user prompts.
3.  **Tier 3: Synthesis Engine**: Cross-referencing Tier 1/2 data for logistical feasibility.
4.  **Tier 4: Proactive Alerts**: Real-time monitoring of Tier 1 delta changes.
5.  **Tier 5: Persona Filter**: UI-level filtering based on user role (e.g., Budget, Luxury, Family).

## Build Topic Mapping (Roadmap)
- **Topic 1-2**: Foundation (Manifest, Env, Dependencies).
- **Topic 3-5**: Ingestion (State Manager, API, NLP).
- **Topic 6-9**: Intelligence (Synthesis, Audit, Pathfinding, Alerts).
- **Topic 10-13**: Interface (Persona Filter, API Bridge, Dashboard, Components).
- **Topic 14-15**: Lifecycle (QA, LEARNINGS Loop).

## File System Convention
- `/backend`: Tiers 1-2.
- `/algorithms`: Tiers 3-4.
- `/frontend`: Tier 5 & UI components.
- `trip_state.json`: Single source of truth.
