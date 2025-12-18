"use client";
import React from 'react';
import { Cpu, Activity, Brain, Target, ChevronRight } from 'lucide-react';
import { useDemo } from '../DemoContext';
import { cn } from '@/lib/utils';

export const MissionControl = () => {
    const { currentTask, isTyping } = useDemo();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        isTyping ? "bg-emerald-500" : "bg-gray-300"
                    )} />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                        <Cpu size={16} className="text-indigo-500" />
                        Mission Control
                    </h3>
                </div>
                <span className="text-[10px] font-bold text-gray-400 font-mono">NODE_032</span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                {/* Active Agent Info */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Intelligence</div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                            <Brain size={20} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-indigo-900">Navigator Agent</div>
                            <div className="text-[10px] text-indigo-600 font-medium">Orchestrating Phase 2</div>
                        </div>
                    </div>
                </div>

                {/* Current Objective */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Objective</div>
                    <div className="p-3 bg-white border border-gray-100 rounded-xl">
                        <div className="flex items-start gap-2 mb-2">
                            <Target size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                            <div className="text-xs font-bold text-gray-800 leading-tight">
                                {currentTask?.title || "Monitoring Org Activity..."}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '45%' }} />
                            </div>
                            <span className="text-[10px] font-mono text-gray-400">45%</span>
                        </div>
                    </div>
                </div>

                {/* Reasoning Stream */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                        Reasoning Stream
                        <Activity size={12} className="text-indigo-400" />
                    </div>
                    <div className="space-y-2 border-l-2 border-dashed border-gray-100 pl-4">
                        {[
                            "Mapping QCP script patterns",
                            "Validating pricing procedure sync",
                            "Identifying rounding variance hotspots"
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500 group cursor-default">
                                <ChevronRight size={10} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 italic leading-relaxed text-center">
                    A direct window into the AI's mind, showing you exactly what it's working on right now.
                </p>
            </div>
        </div>
    );
};
