"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Target, CheckCircle2, ChevronRight, ListChecks, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PhaseScopeProposal = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    // Render S6_80 view (The proposal)
    if (data.included) {
        return (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500 p-8 max-w-4xl mx-auto w-full">

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                            <Target size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Phase 1 Scope Proposal</h1>
                    </div>
                    <p className="text-gray-500">Optimized for maximum coverage with minimal complexity.</p>
                </div>

                {/* Coverage Card */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex items-center justify-between">
                    <div>
                        <div className="text-purple-100 font-medium mb-1">Total Coverage Target</div>
                        <div className="text-4xl font-bold tracking-tight">{data.coverage}</div>
                        <div className="text-purple-100 text-sm opacity-80 mt-1">Focuses on high-impact behaviors</div>
                    </div>
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Zap size={32} className="text-white fill-current" />
                    </div>
                </div>

                {/* Included Items List */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Included in Scope</h3>
                    {data.included.map((item: any, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => handleAction('toggle_scope_item', { id: item.id })}
                            className={cn(
                                "bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 transition-all cursor-pointer group",
                                item.isSelected ? "border-purple-200 shadow-sm" : "border-gray-200 opacity-60 bg-gray-50"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                                item.isSelected ? "bg-purple-600 border-purple-600" : "bg-white border-gray-300 group-hover:border-purple-400"
                            )}>
                                {item.isSelected && <CheckCircle2 size={16} className="text-white" />}
                            </div>

                            <div className="flex-1">
                                <div className={cn("font-semibold text-gray-900", !item.isSelected && "text-gray-500 line-through decoration-gray-300")}>
                                    {item.item}
                                </div>
                                <div className="text-sm text-gray-500">{item.usage}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {item.steps.map((step: string, sIdx: number) => (
                                    <div key={sIdx} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-100">
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 border-t pt-6">
                    <button
                        onClick={() => handleAction('approve_scope')}
                        disabled={data.included.filter((i: any) => i.isSelected).length === 0}
                        className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold shadow hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckCircle2 size={20} />
                        Approve Scope ({data.included.filter((i: any) => i.isSelected).length})
                    </button>
                </div>

            </div>
        );
    }

    // Render S6 (Builder selection)
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-8 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <ListChecks size={40} className="text-purple-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">Build your implementation plan</h2>
            <p className="text-lg text-gray-500 max-w-md">
                I can optimize your Phase 1 scope to cover maximum volume.
                Choose your target strategy.
            </p>

            <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mt-8">
                {[
                    { label: "Quick Win", percent: "60%", desc: "Focus on Top 10 items only" },
                    { label: "Balanced", percent: "80%", desc: "Top pricing + approvals + docs", active: true },
                    { label: "Complete", percent: "90%", desc: "Includes edge cases & rare rules" },
                ].map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAction(opt.active ? 'scope80' : 'scope80')} // All route to demo path
                        className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all hover:scale-105",
                            opt.active ? "border-purple-600 bg-purple-50 shadow-md ring-1 ring-purple-600" : "border-gray-200 bg-white hover:border-purple-200"
                        )}
                    >
                        <div className="text-sm font-medium text-gray-500 mb-2">{opt.label}</div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">{opt.percent}</div>
                        <div className="text-xs text-gray-400">{opt.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
