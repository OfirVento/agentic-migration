# Agentic Migration - Application Context and Flow Guide

This document provides a detailed breakdown of the "Agentic Migration" application flow, including every screen, agent interaction, and available user action. Use this to understand the application state at any point.

## 1. Application Overview
**Goal**: Migrate legacy Salesforce CPQ (Configure, Price, Quote) metadata (Rules, Products, Scripts) to a modern Revenue Cloud Architecture (RCA) using a team of AI agents.
**Core Mechanics**:
-   **Chat Interface**: The primary driver. Agents communicate plans and ask for decisions.
-   **Canvas (Right Panel)**: Displays rich, interactive visualizations (Dashboards, Maps, Proposals) relevant to the current conversation.
-   **Mission Bar**: Top bar tracking "Stage" (Discovery, Planning, Conversion) and completion %.

---

## 2. Detailed Flow Breakdown

### Phase 1: Discovery & Analysis

#### **State S0: Welcome / Home**
-   **Goal**: Establish context and start the session.
-   **Agent Script**:
    -   *Migration Agent*: Introduces the "Master Orchestrator" role and the expert team.
    -   *Navigator Agent*: Explains the strategy (usage-first priority) and asks to start.
-   **Canvas**: **"Connect & Scan"** (Scope List: Quotes, Products, Bundles, Pricing, Approvals, Docs).
-   **User Actions**:
    -   `[Start scan]` -> Moves to **S2**.
    -   `[What will you scan?]` -> Moves to **S1** (Info).

#### **State S1: Scan Scope (Optional Info)**
-   **Goal**: Explain the scanner capabilities.
-   **Agent Script**: *Org Scanner Agent* explains it maps metadata topology and volume.
-   **User Actions**:
    -   `[Scan Org]` -> Moves to **S2**.
    -   `[Load previous scan]` -> Toast effect.

#### **State S2: Scanning in Progress**
-   **Goal**: Simulate the technical scanning process.
-   **Agent Script**: *Scanner* connects to Metadata API, queries `SBQQ__QuoteLine__c` for usage stats.
-   **Canvas**: **"Scan in progress"** (Stepper: Discover -> Index -> Map -> Summarize).
-   **Agent Task**: "Scanning CPQ Inventory" (Steps: Scan Objects, Analyze Rules, Map Dependencies).
-   **Transition**: Auto-advances to **S3** after ~5 seconds.

#### **State S3: Usage Radar (Dashboard)**
-   **Goal**: Present high-level findings and identify hotspots.
-   **Agent Script**: *Scanner* reports 1,453 artifacts found. Identifies "Volume Discount" as high-impact (62% of quotes).
-   **Canvas**: **"Usage Radar"** (Split Pane).
    -   **Summary Tab**: Visual cards (Volume Discount, Approval Rules, Bundles).
    -   **Data Tabs**: Precise tables for Quotes, Products, Pricing, etc.
-   **User Actions**:
    -   `[View Analysis]` -> Moves to **S_FIT_GAP_EARLY** (Fit-Gap Dashboard).
    -   `[Analyze Dependencies]` -> Moves to **S5**.

#### **State S_FIT_GAP_EARLY: Fit-Gap Analysis**
-   **Goal**: Visualize complexity and "fallout" before detailed planning.
-   **Agent Script**: *Migration Agent* presents the "Early Fit-Gap Analysis" visuals.
-   **Canvas**: **"Fit-Gap Analysis"**.
    -   **Network Graph**: Force-directed graph of rule connections.
    -   **Treemap**: Rectangles sized by volume.
    -   **Sankey**: Flow from Legacy -> Target -> Retired.
-   **User Actions**:
    -   `[Proceed to Dependencies]` -> Moves to **S5**.
    -   `[Back to Radar]` -> Moves to **S3**.

### Phase 2: Planning

#### **State S5: Dependency Mapping**
-   **Goal**: Show specific object-level links for the target feature.
-   **Agent Script**: *Planner Agent* maps "Volume Discount" logic to "Partner Rebate". Suggests grouping them.
-   **Canvas**: **"Dependency Graph"** (Nodes: Bundle -> Options -> Fields -> Price Rules).
-   **User Actions**:
    -   `[Generate Phase 1 Proposal]` -> Moves to **S6_80**.

#### **State S6_80: Scope Proposal**
-   **Goal**: Define the migration batch.
-   **Agent Script**: *Planner* proposes a "Phase 1" scope covering 78% of quote volume (High Usage items only).
-   **Canvas**: **"Phase 1 Scope Proposal"** (Table: Volume Discount, Approvals, Bundles, Quote PDF - all selected).
-   **User Actions**:
    -   `[Approve Phase 1 scope]` -> Moves to **S7**.
    -   `[Edit scope]` / `[Explain why]` -> Toast.

#### **State S7: Stakeholder Check**
-   **Goal**: Confirm human ownership.
-   **Agent Script**: *Planner* found owners (Maya, Lina, Jordan). Asks to notify.
-   **Canvas**: **"Stakeholder Check"** (List of user profiles and activity).
-   **User Actions**:
    -   `[Notify & Continue]` -> Moves to **S8**.
    -   `[Skip notification]` -> Moves to **S8**.

### Phase 3: Conversion & Resolving Blockers

#### **State S8: Translation (The Core Workflow)**
-   **Goal**: Convert logic and handle ambiguity.
-   **Agent Script**: *Logic Translator* begins parsing "Volume Discount".
-   **Event**: **BLOCKER DETECTED**. External dependency on `LegacyPricingService`.
-   **Agent Script (Blocker)**: "I cannot migrate automatically. Paused."
-   **Canvas**: **"Translation Canvas"** (Split view: CPQ Source Code vs. RCA Pricing Procedure).
-   **User Actions (Resolution)**:
    -   `[Mock Service]` -> Rebuilds logic (Standard). Content: "I will mock the service... converted to RCA Pricing Procedure."
    -   `[Map Manual]` -> Flags for manual work.
    -   `[Wait]` -> Pauses item.

#### **State S9: Verification Setup**
-   **Goal**: Prepare for testing.
-   **Agent Script**: *Parity Prover* generated 30 replay scenarios based on historic data.
-   **Canvas**: **"Replay Suite Ready"**.
-   **User Actions**:
    -   `[Run replays]` -> Moves to **S10**.

### Phase 4: Verification & Deployment

#### **State S10: Running Replays**
-   **Goal**: Execute tests.
-   **Agent Script**: "Running replays live..."
-   **Canvas**: **"Parity Replays"** (Live log lines).
-   **Transition**: Auto-advances to **S11**.

#### **State S11: Diff Analysis**
-   **Goal**: resolve logic errors.
-   **Agent Script**: 26/30 Passed. 4 Failed due to "Rounding Mode mismatch". Suggests fix.
-   **Canvas**: **"Diff Viewer"** (Data grid comparing CPQ vs RCA output values).
-   **User Actions**:
    -   `[Apply fix + re-run]` -> Moves to **S12**.

#### **State S12: Re-Run**
-   **Agent Script**: "Applied rounding fix. Re-running 4 cases."
-   **Transition**: Auto-advances to **S13**.

#### **State S13: Parity Success**
-   **Goal**: Gate check before QA.
-   **Agent Script**: "Volume Discount parity passing (100%). Ready for QA."
-   **Canvas**: **"Parity Report"** (Green metrics).
-   **User Actions**:
    -   `[Run QA]` -> Moves to **S14**.

#### **State S14: QA Deployment**
-   **Goal**: Simulate deployment.
-   **Agent Script**: *Runner Agent* deploys logic to QA env. Snapshotting...
-   **Canvas**: **"Run Timeline"**.
-   **Transition**: Auto-advances to **S15**.

#### **State S15: Completion**
-   **Goal**: Wrap up.
-   **Agent Script**: "QA run complete... Next recommended item: Discount Approval."
-   **User Actions**: `[Finish Demo]`.

---

## 3. Notable Agents

| Agent Name | Role | Personality/Function |
| :--- | :--- | :--- |
| **Migration Agent** | Master Orchestrator | System-level coordination. Introduces others. |
| **Navigator Agent** | Strategy/Guide | User persona "Maya's" buddy. Focuses on priority and business value. |
| **Org Scanner** | Discovery | Technical. Scans metadata, counts artifacts, builds the graph. |
| **Priority Planner** | Architecture | Strategic. Maps dependencies, defines phases, identifies stakeholders. |
| **Logic Translator** | Writer | The coder. Converts CPQ rules to RCA expressions. |
| **Parity Prover** | QA | Analytical. Runs tests, finds diffs, suggests fixes. |
| **Runner Agent** | DevOps | Handles deployment and environment steps. |

## 4. Key UI Components
-   **Task Card**: Bottom-left floating card showing the active Agent Task (steps, spinner).
-   **Typing Effect**: Real-time character streaming for realism.
-   **Expert Side Panel**: Allows "God mode" commands (Generate Agenda, Simulate Blocker).
