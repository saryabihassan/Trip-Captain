<skill_definition>
  <metadata>
    <skill_id>ORCHESTRATE_BUILD_SEQUENCE</skill_id>
    <description>Converts high-level build topics into specialized system instructions for sub-agents.</description>
  </metadata>

  <core_instruction>
    When the user selects a Topic ID (1-15), the Tech Lead must:
    1. Identify the target sub-agent for that topic.
    2. Extract relevant constraints from the `architecture_spec.md`.
    3. Generate a "Mission Brief" that acts as the system prompt for the target agent.
    4. Ensure the Mission Brief enforces the Data Acquisition Spectrum (Tiers 1-5).
  </core_instruction>

  <build_topic_mapping>
    <topic id="1" agent="tech_lead">Project Manifest & File Tree</topic>
    <topic id="2" agent="tech_lead">Environment & Dependency Lock</topic>
    <topic id="3" agent="backend_engineer">trip_state.json Manager</topic>
    <topic id="4" agent="backend_engineer">Tier 1 API Ingestion</topic>
    <topic id="5" agent="backend_engineer">Tier 2 NLP Parameter Extractor</topic>
    <topic id="6" agent="algorithm_engineer">Logistics Synthesis Engine (Tier 3)</topic>
    <topic id="7" agent="cost_engineer">Financial Validator & Fee Audit</topic>
    <topic id="8" agent="algorithm_engineer">Pathfinding & Optimization Algorithm</topic>
    <topic id="9" agent="algorithm_engineer">Proactive Alert Logic (Tier 4)</topic>
    <topic id="10" agent="frontend_engineer">Persona Filter Engine (Tier 5)</topic>
    <topic id="11" agent="frontend_engineer">Conversational API Bridge</topic>
    <topic id="12" agent="frontend_engineer">Frontend Dashboard Shell</topic>
    <topic id="13" agent="frontend_engineer">UI Component Library</topic>
    <topic id="14" agent="qa_engineer">Integration Testing & Edge Case Scenarios</topic>
    <topic id="15" agent="tech_lead">LEARNINGS.md Automation Loop</topic>
  </build_topic_mapping>

  <meta_prompt_template>
    [MISSION BRIEF FOR {TARGET_AGENT}]
    CONTEXT: We are building Phase {X} of the application.
    OBJECTIVE: {TOPIC_DESCRIPTION}
    DATA_TIER: {ASSIGNED_TIER}
    CONSTRAINTS: 
    - Refer to `architecture_spec.md` for schema validation.
    - Write output directly to the designated block in `trip_state.json`.
    - No fluff. No mocking Tier 1 data.
    - Output only executable code or structured JSON.
  </meta_prompt_template>

  <execution_rule>
    IF topic_id == 1, 2, or 15:
      Tech Lead executes the task directly.
    ELSE:
      Tech Lead generates the Meta_Prompt_Template and hands off to the Sub-Agent.
  </execution_rule>
</skill_definition>

<skill_definition>
  <skill_id>GIT_VERSION_CONTROL_PROTOCOL</skill_id>
  <description>Standardizes the squad's interaction with the Git repository and GitHub PR workflow.</description>
  
  <git_rules>
    <rule id="branching">
      Every Topic ID must operate on a unique branch named: `feature/topic-{id}-{short_description}`.
    </rule>
    <rule id="commits">
      Use Conventional Commits. Format: `{type}: {description}`.
      Types: `feat` (new feature), `fix` (bug fix), `docs` (documentation), `refactor` (code cleanup).
    </rule>
    <rule id="pull_requests">
      When an agent completes a task, they must:
      1. Push the branch to the remote origin.
      2. Open a Pull Request (PR) targeting the `main` branch.
      3. Link the PR to the specific Topic ID in the description.
    </rule>
    <rule id="merging">
      The Tech Lead is the ONLY agent with merge authority. 
      Merges to `main` are prohibited until the `qa_engineer` provides a "LGTM" (Looks Good To Me) comment on the PR.
    </rule>
  </git_rules>

  <updated_execution_loop>
    1. Tech Lead: Create feature branch for Topic ID.
    2. Assigned Agent: Execute code build on the branch.
    3. Assigned Agent: Commit and push code.
    4. Assigned Agent: Open GitHub PR.
    5. QA Engineer: Run tests and comment on PR.
    6. Tech Lead: Review, merge PR, and delete feature branch.
  </updated_execution_loop>
</skill_definition>