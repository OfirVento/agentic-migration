"use client";
import React from 'react';
import { Terminal, Brain, Cpu, Sparkles, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AIIntelligence = () => {
    const logs = [
        { time: '23:40:02', agent: 'NAVIGATOR', type: 'THOUGHT', text: 'Analyzing metadata drift in SBQQ__QuoteLine__c' },
        { time: '23:40:08', agent: 'SCANNER', type: 'SYTEM', text: 'Scan depth 100%. Found 12 custom pricing fields.' },
        { time: '23:41:15', agent: 'LOGIC_AI', type: 'THOUGHT', text: 'Pattern match found for QCP: "VolumeDiscount". 94% match with native expression.' },
        { time: '23:42:01', agent: 'GATEKEEPER', type: 'ALERT', text: 'Warning: Ambiguous rounding logic detected in Currency mapping.' },
        { time: '23:42:15', agent: 'NAVIGATOR', type: 'ACTION', text: 'Queueing decision for Expert: Maya (Process Owner)' },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Terminal className="text-indigo-500" />
                    AI Intelligence
                </h2>
                <p className="text-xs text-gray-500 mt-1 italic">A real-time transcript of the AI's internal thought process and developer-grade logs.</p>
            </div>

            <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-6 font-mono overflow-hidden flex flex-col relative">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live Interaction Stream</div>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded text-[9px] text-emerald-400 font-bold">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                        AGENT_LINK: ONLINE
                    </div>
                </div>

                {/* Logs Area */}
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-4 group">
                            <span className="text-gray-600 text-[10px] shrink-0">{log.time}</span>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded",
                                        log.agent === 'NAVIGATOR' ? "bg-indigo-900/50 text-indigo-400 border border-indigo-800" :
                                            log.agent === 'SCANNER' ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800" :
                                                log.agent === 'GATEKEEPER' ? "bg-rose-900/50 text-rose-400 border border-rose-800" :
                                                    "bg-gray-800 text-gray-400 border border-gray-700"
                                    )}>
                                        [{log.agent}]
                                    </span>
                                    <span className="text-[9px] text-gray-500">:: {log.type}</span>
                                </div>
                                <p className={cn(
                                    "text-xs leading-relaxed",
                                    log.type === 'ALERT' ? "text-rose-400" :
                                        log.type === 'ACTION' ? "text-emerald-400" : "text-gray-300"
                                )}>
                                    <ChevronRight size={10} className="inline mr-1 text-gray-700" />
                                    {log.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 text-indigo-400 text-xs animate-pulse pt-2">
                        <span className="w-1.5 h-3 bg-indigo-500" />
                        Waiting for agent interaction...
                    </div>
                </div>

                {/* Terminal Bottom Overlay */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-900/40">
                        <Play size={12} fill="currentColor" />
                        Run Diagnostic
                    </button>
                </div>
            </div>
        </div>
    );
};
