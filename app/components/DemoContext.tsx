"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export type AgentRole = 'system' | 'assistant' | 'user';

export interface ActionButton {
    label: string;
    action_id: string;
    next_state?: string;
    effect?: string;
    params?: any[];
}

export interface ChatMessage {
    id: string;
    role: AgentRole;
    agentName?: string;
    avatar?: string;
    content: string;
    actions?: ActionButton[];
    reasoning?: string[]; // Chain of thought steps
    meta?: {
        job_id?: string;
        status?: 'running' | 'completed' | 'failed';
    };
    timestamp: number;
}

export interface TaskStep {
    id: string;
    text: string;
    status: 'pending' | 'running' | 'completed';
}

export interface AgentTask {
    id: string;
    title: string;
    status: string;
    steps: TaskStep[];
    startTime: number;
}

export interface CanvasState {
    type: string; // e.g., 'scan_scope', 'usage_radar_table'
    title: string;
    data: any;
}

export interface MissionState {
    phase: string;
    progress: number; // 0-100
    parity?: string; // string or null
    needs_confirmation: number;
    jobs_running: number;
}

interface DemoContextType {
    currentState: string;
    chatHistory: ChatMessage[];
    currentCanvas: CanvasState | null;
    mission: MissionState;
    handleAction: (action_id: string, params?: any) => void;
    handleUserMessage: (text: string) => void;
    transitionTo: (newState: string) => void;
    currentTask: AgentTask | null;
    isTyping: boolean;
    typingLabel: string | null;
}

// --- Seed Data ---

const INITIAL_MISSION: MissionState = {
    phase: 'CPQ Reality',
    progress: 0,
    parity: '—',
    needs_confirmation: 0,
    jobs_running: 0,
};

// --- Context ---

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) throw new Error('useDemo must be used within a DemoProvider');
    return context;
};

export const DemoProvider = ({ children }: { children: ReactNode }) => {
    const [currentState, setCurrentState] = useState('S0');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentCanvas, setCurrentCanvas] = useState<CanvasState | null>(null);
    const [mission, setMission] = useState<MissionState>(INITIAL_MISSION);
    const [currentTask, setCurrentTask] = useState<AgentTask | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingLabel, setTypingLabel] = useState<string | null>(null);

    // Helper to add message with typing delay
    const addAgentMessage = (agentName: string, role: AgentRole, content: string, actions?: ActionButton[], meta?: any, reasoning?: string[], avatar?: string) => {
        setIsTyping(true);
        setTypingLabel(`${agentName} is typing...`);
        // Simulate typing delay based on text length (clamped)
        const delay = Math.min(2500, Math.max(1000, content.length * 15)); // Increased delay for "thinking" feel

        setTimeout(() => {
            setIsTyping(false);
            setTypingLabel(null);
            setChatHistory(prev => [...prev, {
                id: Date.now().toString(),
                agentName,
                role,
                content,
                actions,
                meta,
                reasoning,
                avatar,
                timestamp: Date.now()
            }]);
        }, delay);
    };

    // Helper for multi-agent sequences
    const runTeamSequence = (messages: Array<{ agent: string, role: AgentRole, text: string, actions?: ActionButton[], reasoning?: string[] }>, delayBetween: number = 2000) => {
        let chain = Promise.resolve();
        messages.forEach((msg, idx) => {
            const delay = idx === 0 ? 100 : delayBetween;
            chain = chain.then(() => new Promise(resolve => {
                setTimeout(() => {
                    addAgentMessage(msg.agent, msg.role, msg.text, msg.actions, undefined, msg.reasoning);
                    resolve();
                }, delay);
            }));
        });
    };

    // Handle User Message & Gemini Simulation
    const handleUserMessage = (text: string) => {
        // Add User Message
        setChatHistory(prev => [...prev, {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: Date.now()
        }]);

        // Trigger Gemini Response
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addAgentMessage(
                "Gemini 3", "assistant",
                "I'm tracking the migration progress. I can help you modify the scope, explain the RCA logic, or run specific scenarios. usage-based prioritization is currently active.",
                undefined,
                undefined,
                [
                    "Analyzing user intent...",
                    "Checking Mission Context...",
                    "Formulating helpful response based on current phase."
                ]
            );
        }, 2000);
    };

    // --- State Machine Logic ---

    const transitionTo = (state: string) => {
        console.log(`Transitioning to ${state}`);
        setCurrentState(state);

        // State Handlers
        switch (state) {
            case 'S0': // Welcome - Master Agent Intro
                setMission({ ...INITIAL_MISSION });

                runTeamSequence([
                    {
                        agent: "Migration Agent", role: "system",
                        text: "Welcome to Agentic Migration. I am your Master Orchestrator. I've assembled a specialized agent team to handle your CPQ to RCA transition.",
                    },
                    {
                        agent: "Navigator Agent", role: "assistant",
                        text: "Hi Maya. I'm the Navigator. I'll guide the strategy. We migrate by priority: usage-first, parity-proven. Ready to scan the org?",
                        actions: [
                            { label: "Start scan", action_id: "start_scan", next_state: "S2" },
                            { label: "What will you scan?", action_id: "view_scope", next_state: "S1" }
                        ]
                    }
                ]);

                setCurrentCanvas({
                    type: "scan_scope",
                    title: "Connect & Scan",
                    data: {
                        connection_status: "Connected to Salesforce — Read-only scan mode",
                        window: "Last 90 days",
                        scope: [
                            { name: "Quotes + Quote Lines", enabled: true },
                            { name: "Products + Price Books", enabled: true },
                            { name: "Bundles + Options", enabled: true },
                            { name: "Pricing (Price Rules, Discount Schedules)", enabled: true },
                            { name: "Approvals", enabled: true },
                            { name: "Quote Documents/Templates", enabled: true }
                        ],
                        note: "We’ll introduce RCA objects only after Phase 1 scope is set."
                    }
                });
                break;

            case 'S1': // Scan Scope - Scanner Intro
                setMission(prev => ({ ...prev, phase: "Discover", progress: 5 }));

                runTeamSequence([
                    {
                        agent: "Migration Agent", role: "system",
                        text: "I'm deploying the Org Scanner Agent to map your metadata topology."
                    },
                    {
                        agent: "Org Scanner Agent", role: "assistant",
                        text: "I am ready. I can discover your entire CPQ implementation, including data volume, metadata dependencies, and custom scripts. Shall we build the inventory?",
                        actions: [
                            { label: "Scan Org", action_id: "scan_org", next_state: "S2" },
                            { label: "Load previous scan", action_id: "load_scan", effect: "toast" }
                        ]
                    }
                ]);
                setCurrentCanvas({ type: "scan_scope", title: "Scan Configuration", data: {} });
                break;

            case 'S2': // Scanning - Team
                setMission(prev => ({ ...prev, progress: 12, jobs_running: 1 }));

                runTeamSequence([
                    {
                        agent: "Migration Agent", role: "system",
                        text: "Scanner, please proceed with the connection. Analyze usage frequency to determine highest value targets."
                    },
                    {
                        agent: "Org Scanner Agent", role: "assistant",
                        text: "On it. Connecting to Salesforce Metadata API now. I'll prioritize what impacts quotes most.",
                        reasoning: [
                            "Connecting to Salesforce Metadata API...",
                            "Querying SBQQ__QuoteLine__c for usage frequency...",
                            "Identifying top 5 artifacts affecting Total Price."
                        ]
                    }
                ], 2000);

                // Start the Agent Task
                setCurrentTask({
                    id: "task_scan_01",
                    title: "Scanning CPQ Inventory",
                    status: "Connecting...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Scan Product Objects", status: "running" },
                        { id: "2", text: "Analyze Price Rules", status: "pending" },
                        { id: "3", text: "Map Dependencies", status: "pending" }
                    ]
                });

                setCurrentCanvas({
                    type: "scan_progress",
                    title: "Scan in progress",
                    data: {
                        stepper: ["Discover activity", "Index rules", "Map dependencies", "Summarize health"],
                        current_step: "Discover activity",
                        progress: 0.1,
                        counters: []
                    }
                });

                setTimeout(() => {
                    setCurrentCanvas(prev => prev ? ({ ...prev, data: { ...prev.data, current_step: "Map dependencies", progress: 0.6 } }) : null);
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Mapping dependencies...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "completed" } :
                                    s.id === "3" ? { ...s, status: "running" } : s
                        )
                    }) : null);
                }, 2500);

                setTimeout(() => {
                    // Complete Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);
                    transitionTo('S3');
                }, 5000);
                break;

            case 'S3': // Usage Radar
                setMission(prev => ({ ...prev, progress: 20, jobs_running: 0 }));
                addAgentMessage(
                    "Org Scanner Agent", "assistant",
                    "Scan complete. I found 14 active CPQ artifacts. The 'Usage Radar' shows that 62% of your quote volume relies on just 5 complex Price Rules. We should migrate those first.",
                    [
                        { label: "View Inventory Health", action_id: "view_health", next_state: "S4" }
                    ]
                );
                setCurrentCanvas({
                    type: "usage_radar",
                    title: "Usage Radar — Complexity vs. Impact",
                    data: {
                        tabs: [
                            { id: "summary", label: "Summary" },
                            { id: "quotes", label: "Quotes + Quote Lines" },
                            { id: "products", label: "Products + Price Books" },
                            { id: "bundles", label: "Bundles + Options" },
                            { id: "pricing", label: "Pricing (Price Rules...)" },
                            { id: "approvals", label: "Approvals" },
                            { id: "documents", label: "Quote Documents" }
                        ],
                        summary: {
                            stats: [
                                { label: "Total Artifacts", value: "1,453", trend: "Active" },
                                { label: "High Complexity", value: "12", trend: "Critical" },
                                { label: "Migration Effort", value: "4 Weeks", trend: "Est." }
                            ],
                            area_cards: [
                                {
                                    area: "Volume Discount",
                                    icon: "activity",
                                    total_items: 12,
                                    active_items: 9,
                                    active_percent: 75,
                                    usage_coverage: "62%",
                                    usage_count: "8,942",
                                    insight: "High complexity, 3 scripts found",
                                    link_to_tab: "pricing"
                                },
                                {
                                    area: "Approval Rules",
                                    icon: "shield",
                                    total_items: 4,
                                    active_items: 2,
                                    active_percent: 50,
                                    usage_coverage: "22%",
                                    usage_count: "3,168",
                                    insight: "Logic mixed with triggers",
                                    link_to_tab: "approvals"
                                },
                                {
                                    area: "Product Bundles",
                                    icon: "layers",
                                    total_items: 8,
                                    active_items: 5,
                                    active_percent: 63,
                                    usage_coverage: "41%",
                                    usage_count: "5,904",
                                    insight: "Mostly standard structure",
                                    link_to_tab: "bundles"
                                },
                                {
                                    area: "Quote Templates",
                                    icon: "file-text",
                                    total_items: 3,
                                    active_items: 2,
                                    active_percent: 67,
                                    usage_coverage: "12%",
                                    usage_count: "1,728",
                                    insight: "Visualforce pages detected",
                                    link_to_tab: "documents"
                                },
                                {
                                    area: "Product Objects",
                                    icon: "database",
                                    total_items: 1204,
                                    active_items: 434,
                                    active_percent: 36,
                                    usage_coverage: "100%",
                                    usage_count: "14,400",
                                    insight: "Large SKU catalog",
                                    link_to_tab: "products"
                                },
                                {
                                    area: "Pricing Scripts",
                                    icon: "code",
                                    total_items: 5,
                                    active_items: 3,
                                    active_percent: 60,
                                    usage_coverage: "45%",
                                    usage_count: "6,480",
                                    insight: "Custom QCP logic detected",
                                    link_to_tab: "pricing"
                                }
                            ],
                            top_priority: [
                                { name: "Volume Discount (Seat Tiers)", type: "Price Rule", usage: "62% of Quotes", complexity: "High" },
                                { name: "Laptop Package Bundle", type: "Product Bundle", usage: "310 Quotes/mo", complexity: "Medium" },
                                { name: "Partner Rebate Logic", type: "Price Rule", usage: "45% of Quotes", complexity: "High" },
                                { name: "Discount > 15% Approval", type: "Approval Rule", usage: "224 Triggers/mo", complexity: "Low" },
                                { name: "Enterprise Quote Template", type: "Quote Template", usage: "12% of Quotes", complexity: "Medium" }
                            ]
                        },
                        quotes: [
                            { name: "SBQQ__QuoteLine__c", type: "Object", usage: "1.2M Records", complexity: "Low" },
                            { name: "SBQQ__Quote__c", type: "Object", usage: "145k Records", complexity: "Low" },
                            { name: "Quote Line Group", type: "Object", usage: "45k Records", complexity: "Low" }
                        ],
                        products: [
                            { name: "Hardware Family", type: "Product Family", usage: "85 active SKUs", complexity: "Low" },
                            { name: "Software Licenses", type: "Product Family", usage: "12 active SKUs", complexity: "Medium" },
                            { name: "Maintenance Packs", type: "Product Family", usage: "4 active SKUs", complexity: "Low" }
                        ],
                        bundles: [
                            { name: "Laptop Package Bundle", type: "Bundle", usage: "Top 1 used", complexity: "Medium" },
                            { name: "Server Rack Config", type: "Bundle", usage: "Top 2 used", complexity: "High" },
                            { name: "Workstation Setup", type: "Bundle", usage: "Top 3 used", complexity: "Low" }
                        ],
                        pricing: [
                            { name: "Volume Discount (Seat Tiers)", type: "Price Rule", usage: "62% coverage", complexity: "High" },
                            { name: "Partner Rebate Logic", type: "Price Rule", usage: "45% coverage", complexity: "High" },
                            { name: "Region Adjustment Script", type: "QCP Script", usage: "100% coverage", complexity: "Critical" },
                            { name: "Distributor Margin", type: "Price Rule", usage: "15% coverage", complexity: "Medium" }
                        ],
                        approvals: [
                            { name: "Discount > 15%", type: "Approval Rule", usage: "224 triggers", complexity: "Low" },
                            { name: "Payment Terms > Net30", type: "Approval Rule", usage: "56 triggers", complexity: "Low" },
                            { name: "Legal Review (Custom)", type: "Approval Chain", usage: "12 triggers", complexity: "Medium" }
                        ],
                        documents: [
                            { name: "Enterprise Quote PDF v3", type: "Template", usage: "Default", complexity: "Medium" },
                            { name: "Partner Quote PDF", type: "Template", usage: "Secondary", complexity: "Low" },
                            { name: "Order Form (Signed)", type: "Content", usage: "Rare", complexity: "Low" }
                        ]
                    }
                });
                break;

            case 'S4': // Health Summary (Now redirects - data is in Usage Radar Summary)
                setMission(prev => ({ ...prev, progress: 25 }));
                addAgentMessage(
                    "Org Scanner Agent", "assistant",
                    "The inventory scan is complete. I've identified the high-complexity artifacts. Let's analyze the dependency chains next.",
                    [
                        { label: "Analyze Dependencies", action_id: "view_deps", next_state: "S5" }
                    ]
                );
                // No canvas needed - data is in Usage Radar Summary
                break;

            case 'S5': // Dependency Map
                setMission(prev => ({ ...prev, progress: 30 }));
                addAgentMessage(
                    "Priority Planner Agent", "assistant",
                    "I've mapped the dependencies. The Volume Discount logic feeds into the Partner Rebate program. We must migrate them together to avoid breaking the calculation chain.",
                    [
                        { label: "Generate Phase 1 Proposal", action_id: "gen_proposal", next_state: "S6_80" }
                    ]
                );
                setCurrentCanvas({
                    type: "dependency_map",
                    title: "Dependency Graph — Volume Discount",
                    data: {
                        nodes: [
                            { id: "bundle", label: "Laptop Package", type: "Bundle" },
                            { id: "opt1", label: "CPU Option", type: "Option" },
                            { id: "opt2", label: "RAM Option", type: "Option" },
                            { id: "opt3", label: "SSD Option", type: "Option" },
                            { id: "field1", label: "Seat Count", type: "Field" },
                            { id: "field2", label: "Region", type: "Field" },
                            { id: "rule1", label: "Volume Discount", type: "Price Rule" }, // Key
                            { id: "rule2", label: "Partner Rebate", type: "Price Rule" },
                            { id: "pr1", label: "Compat Rule", type: "Product Rule" },
                            { id: "appr", label: "Disc > 15%", type: "Approval" },
                            { id: "doc", label: "Quote PDF", type: "Template" }
                        ]
                    }
                });
                break;

            case 'S6_80':
                addAgentMessage(
                    "Priority Planner Agent", "assistant",
                    "Here’s a Phase 1 proposal covering ~78% of quote volume. It focuses on top pricing + approvals + most-used bundles + primary document output.",
                    [
                        { label: "Approve Phase 1 scope", action_id: "approve_scope", next_state: "S7" },
                        { label: "Edit scope", action_id: "edit_scope", effect: "toast" },
                        { label: "Explain why", action_id: "explain_scope", effect: "toast" }
                    ]
                );

                // Start Agent Task
                setCurrentTask({
                    id: "task_plan_01",
                    title: "Analyzing Dependencies",
                    status: "Tracing references...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Cluster Top 20 Artifacts", status: "running" },
                        { id: "2", text: "Calculate Dependency Surface", status: "pending" },
                        { id: "3", text: "Project Coverage %", status: "pending" }
                    ]
                });

                // Temporary loading state if desired, or just show the result immediately with the task running
                // For better effect, let's delay the final canvas slightly or just let the task run alongside

                setCurrentCanvas({
                    type: "phase_scope_proposal",
                    title: "Phase 1 Scope Proposal (Generating...)",
                    data: {
                        coverage: "Calculating...",
                        included: []
                    }
                });

                setTimeout(() => {
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Projecting coverage...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "running" } : s
                        )
                    }) : null);
                }, 1500);

                setTimeout(() => {
                    // Complete Task & Show Real Data
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);

                    setCurrentCanvas({
                        type: "phase_scope_proposal",
                        title: "Phase 1 Scope Proposal (Usage-first)",
                        data: {
                            coverage: "78% of quote volume",
                            included: [
                                { item: "Volume Discount (Seat Tiers)", usage: "62% of quotes", steps: ["Translate", "Verify", "Run"] },
                                { item: "Discount > 15% Approval", usage: "224 triggers", steps: ["Translate", "Verify", "Run"] },
                                { item: "Top 6 bundles by usage", usage: "covers 41% of quotes", steps: ["Translate", "Verify", "Run"] },
                                { item: "Enterprise Quote PDF v3", usage: "12% of quotes", steps: ["Translate", "Verify", "Run"] },
                                { item: "Data fix: Region__c completion", usage: "6% of lines missing", steps: ["Apply", "Verify"] }
                            ]
                        }
                    });
                }, 3500);
                break;

            case 'S7': // Stakeholder Confirm
                setMission(prev => ({ ...prev, progress: 38 }));
                addAgentMessage(
                    "Priority Planner Agent", "assistant",
                    "Before we start, I found 3 stakeholders who own these rules. Should we notify them?",
                    [
                        { label: "Notify & Continue", action_id: "notify", next_state: "S8" },
                        { label: "Skip notification", action_id: "skip_notify", next_state: "S8" }
                    ]
                );
                setCurrentCanvas({
                    type: "stakeholder_confirm",
                    title: "Stakeholder Check",
                    data: {
                        teams: [
                            { team: "Sales Ops", top_user: "Maya Cohen", activity: "48 catalog edits" },
                            { team: "Finance (Billing)", top_user: "Lina Park", activity: "96 invoice-related touches" },
                            { team: "Finance (RevRec)", top_user: "Jordan Wu", activity: "Revenue schedule reviews" },
                            { team: "IT/Admin", top_user: "Tom Reyes", activity: "Deployments & integrations" }
                        ]
                    }
                });
                break;

            case 'S8': // Translation Canvas - Team
                setMission(prev => ({ ...prev, phase: "Convert", progress: 45 }));

                runTeamSequence([
                    {
                        agent: "Migration Agent", role: "system",
                        text: "Planning complete. Logic Translator, please begin conversion for 'Volume Discount'."
                    },
                    {
                        agent: "Logic Translator Agent", role: "assistant",
                        text: "I'm translating the 'Volume Discount' bundle now. I’ve converted the Price Rules to RCA Pricing Procedures. Please confirm the tier boundaries.",
                        actions: [
                            { label: "Confirm Logic", action_id: "confirm_logic", next_state: "S9" },
                            { label: "View Source Code", action_id: "view_source", effect: "toast" }
                        ],
                        reasoning: [
                            "Analyzing SBQQ__DiscountSchedule__c structure...",
                            "Mapping Price Tiers to RCA Decision Matrix...",
                            "Detected custom script 'PartnerOverride' -> converting to conditional logic block."
                        ]
                    }
                ]);

                // Start Agent Task
                setCurrentTask({
                    id: "task_trans_01",
                    title: "Translating CPQ Logic",
                    status: "Parsing Rules...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Parse Discount Schedule", status: "running" },
                        { id: "2", text: "Map to Pricing Procedure", status: "pending" },
                        { id: "3", text: "Generate Test Plan", status: "pending" }
                    ]
                });

                // Show placeholder state first
                setCurrentCanvas({
                    type: "translation_canvas",
                    title: "Translation — Generating...",
                    data: {
                        cpq_side: { name: "Loading...", inputs: [], plain_english: [], evidence: [] },
                        rca_side: { construct: "Generating...", blocks: [] },
                        confirmations: [],
                        test_plan_preview: { replay_sets: [] }
                    }
                });

                setTimeout(() => {
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Generating Blocks...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "running" } : s
                        )
                    }) : null);
                }, 1500);

                setTimeout(() => {
                    // Complete Task & Show Real Data
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);

                    setCurrentCanvas({
                        type: "translation_canvas",
                        title: "Translation — Volume Discount (Seat Tiers)",
                        data: {
                            cpq_side: {
                                name: "Volume Discount Schedule",
                                inputs: ["SBQQ__Quantity__c", "SBQQ__ListPrice__c", "User.Segment__c"],
                                plain_english: [
                                    "If Quantity is between 10-49, apply 5% discount.",
                                    "If Quantity is 50+, apply 10% discount.",
                                    "Override: If User Segment is 'Partner', add extra 2%."
                                ],
                                evidence: ["Triggered on 62% of quotes", "98% matched standard tiers", "2% fell into partner override"]
                            },
                            rca_side: {
                                construct: "Pricing Procedure",
                                blocks: [
                                    "Load List Price",
                                    "Lookup Volume Discount Table",
                                    "Calc Tier Adjustment",
                                    "Check Partner Status",
                                    "Finalize Net Price"
                                ]
                            },
                            confirmations: [
                                {
                                    question: "Confirm Tiers",
                                    fields: { "Tier 1 Min": "10", "Tier 1 %": "5.0", "Tier 2 Min": "50", "Tier 2 %": "10.0" }
                                }
                            ],
                            test_plan_preview: {
                                replay_sets: [
                                    "Verify base price (Qty < 10)",
                                    "Verify Tier 1 (Qty 10-49)",
                                    "Verify Tier 2 (Qty 50+)",
                                    "Verify Partner Override"
                                ]
                            }
                        }
                    });
                }, 3500);
                break;

            case 'S9': // Generate Replay Suite
                setMission(prev => ({ ...prev, phase: "Verify", progress: 55, needs_confirmation: 0 }));
                addAgentMessage(
                    "Parity Prover Agent", "assistant",
                    "Great. I captured your intent and generated a replay suite of 30 scenarios based on real usage patterns. Ready to run parity replays now?",
                    [
                        { label: "Run replays", action_id: "run_replays", next_state: "S10" }
                    ]
                );
                setCurrentCanvas({
                    type: "replay_progress",
                    title: "Replay Suite Ready",
                    data: { suite_name: "Volume Discount — Phase 1", scenarios: 30, status: "Ready" }
                });
                break;

            case 'S10': // Replay Running
                setMission(prev => ({ ...prev, progress: 60, parity: "Running", jobs_running: 1 }));
                addAgentMessage(
                    "Parity Prover Agent", "assistant",
                    "Running parity replays now. I’ll show results live and explain any differences.",
                    undefined,
                    { job_id: "replay_001", status: "running" }
                );

                // Start Agent Task
                setCurrentTask({
                    id: "task_verify_01",
                    title: "Running Parity Replays",
                    status: "Initializing...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Execute Scenario 1-10 (Simple)", status: "running" },
                        { id: "2", text: "Execute Scenario 11-25 (Bundles)", status: "pending" },
                        { id: "3", text: "Execute Scenario 26-30 (Edge)", status: "pending" },
                        { id: "4", text: "Compare Outputs", status: "pending" }
                    ]
                });

                setCurrentCanvas({
                    type: "replay_progress",
                    title: "Parity Replays — Running",
                    data: { suite_name: "Volume Discount — Phase 1", scenarios: 30, status: "Running", live_log: ["Initializing..."] }
                });

                setTimeout(() => {
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Comparing results...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "completed" } :
                                    s.id === "3" ? { ...s, status: "completed" } :
                                        s.id === "4" ? { ...s, status: "running" } : s
                        )
                    }) : null);
                }, 2000);

                setTimeout(() => {
                    // Complete Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);
                    transitionTo('S11');
                }, 4000);
                break;

            case 'S11': // Diff Viewer
                setMission(prev => ({ ...prev, progress: 70, parity: "86% passing", jobs_running: 0 }));
                addAgentMessage(
                    "Parity Prover Agent", "assistant",
                    "Replay results: 26/30 passing. 4 differences found. All 4 are tied to rounding behavior on bundle-related line items. I can propose a correction and re-run only the failed cases.",
                    [
                        { label: "Apply fix + re-run failed (4)", action_id: "apply_fix", next_state: "S12" }
                    ],
                    undefined,
                    [
                        "Analyzing 4 failures...",
                        "Root cause: CPQ rounds at line level, RCA defaulted to header level.",
                        "Proposed Fix: Set rounding mode to 'HALF_UP' per line."
                    ]
                );
                setCurrentCanvas({
                    type: "diff_viewer",
                    title: "Diff Viewer — Quote Q-10492 (Example)",
                    data: {
                        summary: { passing: 26, total: 30, score: "86%" },
                        diffs: [
                            { id: 1, field: "SBQQ__NetTotal__c", cpq: "1250.45", rca: "1250.50", diff: "+0.05", cause: "Rounding Mode mismatch" },
                            { id: 2, field: "SBQQ__CustomerPrice__c", cpq: "1125.40", rca: "1125.45", diff: "+0.05", cause: "Rounding Mode mismatch" },
                            { id: 3, field: "SBQQ__PartnerPrice__c", cpq: "980.25", rca: "980.30", diff: "+0.05", cause: "Rounding Mode mismatch" },
                            { id: 4, field: "SBQQ__ListPrice__c", cpq: "1500.00", rca: "1500.00", diff: "0.00", cause: "Match" }
                        ]
                    }
                });
                break;

            case 'S12': // Apply Fix + Rerun
                setMission(prev => ({ ...prev, progress: 78, parity: "Re-running", jobs_running: 1 }));
                addAgentMessage(
                    "Parity Prover Agent", "assistant",
                    "Applied correction: align rounding sequence to CPQ outcome for bundle component aggregation. Re-running the 4 failed cases now.",
                    undefined,
                    { job_id: "replay_002", status: "running" }
                );

                // Start Agent Task
                setCurrentTask({
                    id: "task_fix_01",
                    title: "Applying Logic Fix",
                    status: "Refactoring...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Patch Pricing Procedure", status: "running" },
                        { id: "2", text: "Hot-reload Replay Engine", status: "pending" },
                        { id: "3", text: "Re-queue Failed Cases", status: "pending" }
                    ]
                });

                setCurrentCanvas({
                    type: "replay_progress",
                    title: "Re-run Failed Cases",
                    data: { suite_name: "Re-run Failed Cases", scenarios: 4, status: "Pending Start" }
                });

                setTimeout(() => {
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Re-queueing...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "completed" } :
                                    s.id === "3" ? { ...s, status: "running" } : s
                        )
                    }) : null);

                    setCurrentCanvas(prev => prev ? ({ ...prev, data: { ...prev.data, status: "Running" } }) : null);
                }, 2000);

                setTimeout(() => {
                    // Complete Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);
                    transitionTo('S13');
                }, 4500);
                break;

            case 'S13': // Parity Pass Summary
                setMission(prev => ({ ...prev, phase: "Verify → Run", progress: 85, parity: "90% passing", jobs_running: 0 }));
                addAgentMessage(
                    "Navigator Agent", "assistant",
                    "Great news: Volume Discount parity is now passing for this replay suite. Phase 1 parity gate for pricing is at 90%. Next, I can run Phase 1 in QA and stream progress with a rollback checkpoint.",
                    [
                        { label: "Run QA", action_id: "run_qa", next_state: "S14" }
                    ]
                );
                setCurrentCanvas({
                    type: "run_summary",
                    title: "Parity Report — Volume Discount",
                    data: {
                        metrics: [
                            { label: "Scenarios Run", value: "30", trend: "+4 re-run" },
                            { label: "Parity Score", value: "100%", trend: "PASS" },
                            { label: "Critical Logic", value: "Match", trend: "OK" }
                        ]
                    }
                });
                break;

            case 'S14': // Run QA - Team
                setMission(prev => ({ ...prev, phase: "Run", progress: 90, jobs_running: 1 }));

                runTeamSequence([
                    {
                        agent: "Migration Agent", role: "system",
                        text: "Parity verified. Runner Agent, please deploy to QA environment and execute the suite."
                    },
                    {
                        agent: "Migration Runner Agent", role: "assistant",
                        text: "Running Phase 1 in QA now. I’ll stream each step, show counts, and create a rollback checkpoint.",
                        reasoning: [
                            "Initializing deployment pipeline...",
                            "Snapshotting QA environment for rollback...",
                            "Pushing Pricing Procedure 'Volume_Discount_v1'..."
                        ]
                    }
                ]);

                // Start Agent Task
                setCurrentTask({
                    id: "task_qa_01",
                    title: "Deploying Phase 1 to QA",
                    status: "Starting deployment...",
                    startTime: Date.now(),
                    steps: [
                        { id: "1", text: "Snapshot QA Environment", status: "running" },
                        { id: "2", text: "Deploy Pricing Procedures", status: "pending" },
                        { id: "3", text: "Execute Test Suite", status: "pending" }
                    ]
                });

                setCurrentCanvas({
                    type: "run_timeline",
                    title: "AI Migration Run — QA",
                    data: { current_step: "Deploy to QA" }
                });

                setTimeout(() => {
                    // Update Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Deploying logic...",
                        steps: prev.steps.map(s =>
                            s.id === "1" ? { ...s, status: "completed" } :
                                s.id === "2" ? { ...s, status: "completed" } :
                                    s.id === "3" ? { ...s, status: "running" } : s
                        )
                    }) : null);
                }, 2500);

                setTimeout(() => {
                    // Complete Task
                    setCurrentTask(prev => prev ? ({
                        ...prev,
                        status: "Complete",
                        steps: prev.steps.map(s => ({ ...s, status: "completed" as const }))
                    }) : null);
                    transitionTo('S15');
                }, 5000);
                break;

            case 'S15': // Run Summary
                setMission(prev => ({ ...prev, progress: 100, jobs_running: 0, needs_confirmation: 1 }));
                addAgentMessage(
                    "Migration Runner Agent", "assistant",
                    "QA run complete. Phase 1 pricing is deployed and parity-gated. I found 2 optional field mappings I can suggest to improve completeness. Next recommended item: Discount > 15% Approval translation.",
                    [
                        { label: "Finish Demo", action_id: "finish", effect: "toast" }
                    ]
                );
                setCurrentCanvas({
                    type: "run_summary",
                    title: "QA Run Summary — Phase 1",
                    data: { status: "SUCCESS" }
                });
                break;

            default:
                console.warn('Unknown state:', state);
        }
    };

    const handleAction = (action_id: string, params?: any) => {
        if (action_id === 'run_scan') {
            transitionTo('S2');
            return;
        }
        console.log('Action triggered:', action_id);
        // ... handled by transitionTo usually if direct link
        // if generic action logic needed, add here
    };

    // Initialize S0
    useEffect(() => {
        transitionTo('S0');
    }, []);

    return (
        <DemoContext.Provider value={{ currentState, chatHistory, currentCanvas, mission, handleAction, handleUserMessage, transitionTo, currentTask, isTyping, typingLabel }}>
            {children}
        </DemoContext.Provider>
    );
};
