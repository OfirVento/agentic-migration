"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from './DemoContext';
import { ChevronRight, CheckCircle2, Loader2, AlertCircle, Info, Search, GitCompare, Code2, CalendarClock, PlayCircle, ShieldCheck, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const JOURNEY_STAGES = [
    {
        id: 1,
        title: "Discovery",
        icon: Search,
        objective: "Understand current CPQ landscape and define scope",
        decision: "Reuse org or start fresh?"
    },
    {
        id: 2,
        title: "Fit-Gap",
        icon: GitCompare,
        objective: "Align CPQ features with RCA capabilities",
        decision: "Standardize vs replicate? What gets retired?"
    },
    {
        id: 3,
        title: "Design",
        icon: Code2,
        objective: "Define future-state architecture",
        decision: "Where's the source of truth? Key integration pts?"
    },
    {
        id: 4,
        title: "Planning",
        icon: CalendarClock,
        objective: "Plan low-risk, phased rollout",
        decision: "Big bang vs phased? Coexistence strategy?"
    },
    {
        id: 5,
        title: "Execution",
        icon: PlayCircle,
        objective: "Build, migrate, and prepare users",
        decision: "Who drives change? License approach?"
    },
    {
        id: 6,
        title: "Testing",
        icon: ShieldCheck,
        objective: "Validate business readiness",
        decision: "Who signs off? What's the fallback plan?"
    },
    {
        id: 7,
        title: "Go-Live",
        icon: Trophy,
        objective: "Stabilize and transition to support",
        decision: "Support model? What's next in roadmap?"
    }
];

const JourneyProgress = () => {
    const { currentState } = useDemo();

    // Map S0-S15 to 1-7 Stages
    const getActiveStage = (state: string) => {
        // Special mapping for named states
        if (state.includes("FIT_GAP")) return 2;

        const s = parseInt(state.substring(1));
        if (s <= 2) return 1; // Discovery (S0, S1, S2)
        if (s <= 5) return 2; // Fit-Gap (S3, S4, S5)
        if (s === 6) return 3; // Design (S6)
        if (s <= 8) return 4; // Planning (S7, S8) - Translation is Planning
        if (s <= 10) return 5; // Execution (S9 Suite Ready, S10 Replay)
        if (s <= 12) return 6; // Testing (S11 Diff, S12 Fix)
        return 7; // Go-Live (S13+)
    };

    const activeStage = getActiveStage(currentState);

    return (
        <div className="flex items-center gap-1 mx-4">
            {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStage;
                const isPast = stage.id < activeStage;
                const Icon = stage.icon;

                return (
                    <div key={stage.id} className="relative group flex items-center">
                        {/* Connector Line */}
                        {idx > 0 && (
                            <div className={cn("w-6 h-0.5 mx-1", isPast ? "bg-blue-600" : "bg-gray-200")} />
                        )}

                        {/* Node */}
                        <div className={cn(
                            "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all cursor-help",
                            isActive ? "border-blue-600 bg-blue-50 text-blue-600 scale-110 z-10" :
                                isPast ? "border-blue-600 bg-blue-600 text-white" :
                                    "border-gray-200 bg-white text-gray-300"
                        )}>
                            <Icon size={14} strokeWidth={isPast ? 3 : 2} />

                            {/* Hover Popup */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 invisible group-hover:visible">
                                <div className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                                    <Icon size={16} className="text-blue-600" />
                                    {stage.title}
                                </div>
                                <div className="text-xs text-gray-500 italic mb-3">Target Objective</div>
                                <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 leading-relaxed mb-3">
                                    {stage.objective}
                                </div>
                                <div className="text-xs text-gray-500 italic mb-1">Key Decision</div>
                                <div className="text-xs font-medium text-gray-800 border-l-2 border-amber-400 pl-2">
                                    {stage.decision}
                                </div>
                                {/* Triangle Arrow */}
                                {/* Triangle Arrow */}
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45" />
                            </div>

                            {/* Label */}
                            <span className={cn(
                                "absolute top-full mt-1 text-[10px] font-semibold whitespace-nowrap left-1/2 -translate-x-1/2 transition-colors",
                                isActive ? "text-blue-600" : isPast ? "text-gray-400" : "text-gray-300"
                            )}>
                                {stage.title}
                            </span>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export const MissionBar = () => {
    const { mission } = useDemo();

    return (
        <div className="h-20 border-b border-gray-200 bg-white flex items-center px-6 justify-between shrink-0 z-50 shadow-sm relative">
            <div className="flex items-center gap-3 w-1/4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                    <h1 className="text-sm font-bold text-gray-900 leading-none">Agentic Migration</h1>
                    <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                        CPQ <ChevronRight size={10} /> RCA
                    </div>
                </div>
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <div className="flex gap-4 text-sm font-medium">
                    <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Migration</Link>
                    <Link href="/expert" className="text-gray-500 hover:text-blue-600 transition-colors">Expert Tools</Link>
                </div>
            </div>

            {/* Center: Journey Progress */}
            <JourneyProgress />

            {/* Right: Metrics */}
            <div className="flex items-center gap-6 w-1/4 justify-end">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Job Parity</span>
                    <span className={cn("text-sm font-bold",
                        mission.parity?.includes("Run") ? "text-amber-600" :
                            mission.parity?.includes("pass") ? "text-green-600" : "text-gray-400"
                    )}>
                        {mission.parity || "—"}
                    </span>
                </div>

                <div className="h-8 w-px bg-gray-100" />

                {mission.jobs_running > 0 ? (
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full animate-pulse border border-blue-100">
                        <Loader2 size={14} className="animate-spin" />
                        <span className="text-xs font-semibold">Processing...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-gray-400 px-3 py-1.5 border border-transparent">
                        <CheckCircle2 size={14} />
                        <span className="text-xs font-medium">System Idle</span>
                    </div>
                )}
            </div>
        </div>
    );
};
