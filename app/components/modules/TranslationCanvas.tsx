"use client";
import React, { useState } from 'react';
import { useDemo } from '../DemoContext';
import { ArrowRight, CheckCircle2, RefreshCw, SplitSquareVertical, ChevronRight, FileCode, Sliders, LayoutTemplate, Zap, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScopeItem {
    id: string;
    title: string;
    usage: string;
    translationType: 'rebuild' | 'map-as-is';
    inputs: string[];
    behavior: string[];
    evidence: string[];
    rcaApproach: string;
    rcaDetails: string[];
    // Hybrid View Properties
    simpleExplanation?: string;
    migrationVisual?: 'script_to_standard' | 'code_to_template';
    pros?: string[];
    cons?: string[];
    parameterPreview?: {
        columns: string[];
        rows: string[][];
    };
    rcaConfig?: string; // Kept optional for backward compatibility
    isVerified?: boolean;
    manualOverride?: {
        active: boolean;
        type: 'rebuild' | 'map-as-is';
        notes: string;
    };
}

export const TranslationCanvas = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    if (!data?.items) return null;

    const items: ScopeItem[] = data.items;
    const selected = items.find(i => i.id === selectedItem);

    // Auto-select first item if none selected
    if (!selectedItem && items.length > 0) {
        setSelectedItem(items[0].id);
    }

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0">
                <div className="flex items-center gap-2">
                    <SplitSquareVertical className="text-indigo-600" />
                    <div>
                        <h1 className="font-bold text-gray-900 leading-tight">Translation Canvas</h1>
                        <div className="text-xs text-gray-500">Phase 1 Scope — {items.length} items to translate</div>
                    </div>
                </div>
                <button
                    onClick={() => handleAction('confirm_intent')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow transition-colors flex items-center gap-2"
                >
                    <CheckCircle2 size={16} /> Confirm All
                </button>
            </div>

            <div className="flex-1 overflow-hidden flex divide-x divide-gray-200">

                {/* Left Column: CPQ Reality (Phase 1 Scope Items) */}
                <div className="w-[45%] bg-gray-50/50 p-4 overflow-y-auto">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2 px-2">
                        CPQ Reality (Phase 1 Scope)
                    </div>

                    <div className="space-y-3">
                        {items.map((item, idx) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item.id)}
                                className={cn(
                                    "bg-white p-4 rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md relative overflow-hidden group",
                                    selectedItem === item.id
                                        ? "border-indigo-500 ring-1 ring-indigo-500"
                                        : "border-gray-200 hover:border-indigo-300"
                                )}
                            >
                                {/* Selection Indicator */}
                                {selectedItem === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                                )}

                                {/* Header */}
                                <div className="flex items-start justify-between mb-3 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <span className={cn(
                                                "w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center font-mono transition-colors",
                                                item.isVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                            )}>
                                                {item.isVerified ? <CheckCircle2 size={12} /> : idx + 1}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5">{item.usage}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wide",
                                        item.translationType === 'rebuild'
                                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                                            : "bg-green-50 text-green-700 border border-green-100"
                                    )}>
                                        {item.translationType === 'rebuild' ? '🔄 Rebuild' : '✅ Map As-Is'}
                                    </span>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-gray-100 my-2" />

                                {/* Detailed Props (Collapsed View) */}
                                <div className="space-y-3 pl-2">
                                    {/* Inputs */}
                                    <div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Inputs Detected</div>
                                        <div className="flex flex-wrap gap-1">
                                            {item.inputs.map(inp => (
                                                <span key={inp} className="text-[10px] text-gray-600 font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                                    {inp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Behavior */}
                                    <div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Behavior Summary</div>
                                        <ul className="space-y-1">
                                            {item.behavior.map((line, i) => (
                                                <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5 leading-relaxed">
                                                    <span className="mt-1.5 w-1 h-1 bg-gray-300 rounded-full shrink-0 group-hover:bg-indigo-400 transition-colors" />
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Evidence */}
                                    <div className="bg-gray-50 -mx-2 px-3 py-2 rounded text-xs text-gray-600 flex items-center gap-2 border border-dashed border-gray-200">
                                        <span className="font-bold text-[10px] uppercase text-gray-400">Evidence</span>
                                        {item.evidence[0]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: RCA Translation Details (HYBRID VIEW + EXPERT CONTROL) */}
                <div className="flex-1 bg-white p-8 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide flex items-center gap-2">
                            RCA Translation Proposal
                        </div>
                        {selected && (
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-medium text-gray-500">Expert Mode</span>
                                <button
                                    onClick={() => handleAction('toggle_override_mode', { id: selected.id })}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                                        selected.manualOverride?.active ? 'bg-indigo-600' : 'bg-gray-200'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                            selected.manualOverride?.active ? 'translate-x-6' : 'translate-x-1'
                                        )}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {selected ? (
                        <div className="animate-in slide-in-from-right-4 duration-300 pb-20">

                            {/* Card Header */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
                                {/* Override Warning Banner */}
                                {selected.manualOverride?.active && (
                                    <div className="bg-amber-50 px-6 py-2 border-b border-amber-100 flex items-center justify-between">
                                        <div className="text-xs font-bold text-amber-700 flex items-center gap-2">
                                            <AlertTriangle size={14} /> MANUAL OVERRIDE ACTIVE
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAction('set_override_type', { id: selected.id, type: 'rebuild' })}
                                                className={cn("text-[10px] px-2 py-1 rounded font-bold uppercase", selected.manualOverride.type === 'rebuild' ? "bg-amber-200 text-amber-900" : "bg-white/50 text-amber-900/50 hover:bg-white")}
                                            >
                                                Rebuild
                                            </button>
                                            <button
                                                onClick={() => handleAction('set_override_type', { id: selected.id, type: 'map-as-is' })}
                                                className={cn("text-[10px] px-2 py-1 rounded font-bold uppercase", selected.manualOverride.type === 'map-as-is' ? "bg-amber-200 text-amber-900" : "bg-white/50 text-amber-900/50 hover:bg-white")}
                                            >
                                                Map As-Is
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className={cn(
                                    "px-6 py-5 border-b flex justify-between items-center transition-colors",
                                    (selected.manualOverride?.active ? selected.manualOverride.type : selected.translationType) === 'rebuild'
                                        ? "bg-gradient-to-r from-blue-50 to-white"
                                        : "bg-gradient-to-r from-green-50 to-white"
                                )}>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wide opacity-60 mb-1">Transformed Object</div>
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            {selected.title}
                                            {selected.isVerified && <CheckCircle2 size={20} className="text-green-500 fill-green-50" />}
                                        </h2>
                                    </div>
                                    <span className={cn(
                                        "px-3 py-1 text-xs font-bold rounded-full border transition-colors",
                                        (selected.manualOverride?.active ? selected.manualOverride.type : selected.translationType) === 'rebuild'
                                            ? "bg-white text-blue-700 border-blue-200"
                                            : "bg-white text-green-700 border-green-200"
                                    )}>
                                        {(selected.manualOverride?.active ? selected.manualOverride.type : selected.translationType) === 'rebuild' ? 'Major Update' : 'Seamless Migration'}
                                    </span>
                                </div>

                                <div className="p-6 space-y-8 bg-white">

                                    {/* 1. logic: Use Overridden Type or Default Type */}
                                    {((selected.manualOverride?.active ? selected.manualOverride.type : selected.translationType) === 'rebuild') ? (
                                        <>
                                            {/* Visual Header (Rebuild) */}
                                            <div className="flex items-center justify-center gap-6 py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-500">
                                                        <FileCode size={24} />
                                                    </div>
                                                    <div className="text-xs font-bold text-gray-500 uppercase">Legacy</div>
                                                    <div className="text-sm font-semibold text-gray-700">Custom Code</div>
                                                </div>
                                                <ArrowRight className="text-gray-300" />
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-600">
                                                        <LayoutTemplate size={24} />
                                                    </div>
                                                    <div className="text-xs font-bold text-blue-500 uppercase">New Standard</div>
                                                    <div className="text-sm font-semibold text-blue-700">Configuration</div>
                                                </div>
                                            </div>

                                            {/* Explanation (Editable if Override Active) */}
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 flex justify-between">
                                                    What's Changing?
                                                    {selected.manualOverride?.active && <span className="text-[10px] text-indigo-500 font-normal normal-case">Editing allowed</span>}
                                                </h3>
                                                {selected.manualOverride?.active ? (
                                                    <textarea
                                                        className="w-full text-sm p-4 rounded-lg border border-indigo-200 bg-indigo-50/30 focus:ring-2 ring-indigo-500 outline-none min-h-[100px]"
                                                        value={selected.manualOverride.notes || selected.simpleExplanation}
                                                        onChange={(e) => handleAction('update_explanation', { id: selected.id, text: e.target.value })}
                                                        placeholder="Enter your notes or correction here..."
                                                    />
                                                ) : (
                                                    <p className="text-gray-600 leading-relaxed text-sm bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                                                        {selected.simpleExplanation}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Data Table */}
                                            {selected.parameterPreview && (
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center justify-between">
                                                        <span>Data Validation Preview</span>
                                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">Read-Only</span>
                                                    </h3>
                                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                        <table className="w-full text-sm text-left">
                                                            <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase border-b border-gray-200">
                                                                <tr>
                                                                    {selected.parameterPreview.columns.map((col, i) => (
                                                                        <th key={i} className="px-4 py-3">{col}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100">
                                                                {selected.parameterPreview.rows.map((row, i) => (
                                                                    <tr key={i} className="bg-white hover:bg-gray-50">
                                                                        {row.map((cell, j) => (
                                                                            <td key={j} className="px-4 py-3 text-gray-700 font-medium">{cell}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // MAP AS IS VIEW
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Mapping Verification</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-lg border border-green-100 bg-green-50/30">
                                                    <div className="text-xs text-green-700 font-semibold uppercase mb-1">Inputs</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {selected.inputs.map(i => <span key={i} className="text-xs bg-white px-1.5 border rounded text-gray-600">{i}</span>)}
                                                    </div>
                                                </div>
                                                <div className="p-4 rounded-lg border border-green-100 bg-green-50/30">
                                                    <div className="text-xs text-green-700 font-semibold uppercase mb-1">Logic Integrity</div>
                                                    <div className="text-xs text-gray-600">100% Preserved</div>
                                                </div>
                                            </div>

                                            {/* Editable Notes for Map-As-Is Override */}
                                            {selected.manualOverride?.active && (
                                                <div className="mt-4">
                                                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Override Notes</h3>
                                                    <textarea
                                                        className="w-full text-sm p-3 rounded-lg border border-gray-200 focus:ring-2 ring-green-500 outline-none min-h-[80px]"
                                                        value={selected.manualOverride.notes}
                                                        onChange={(e) => handleAction('update_explanation', { id: selected.id, text: e.target.value })}
                                                        placeholder="Why are you forcing Map As-Is?"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>

                                {/* Verify Footer */}
                                <div className="p-4 bg-gray-50 border-t flex justify-end">
                                    <button
                                        onClick={() => handleAction('verify_item', { id: selected.id })}
                                        className={cn(
                                            "px-4 py-2 rounded-lg font-bold text-sm shadow flex items-center gap-2 transition-all",
                                            selected.isVerified
                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                : "bg-white border border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                                        )}
                                    >
                                        <CheckCircle2 size={16} className={selected.isVerified ? "fill-green-600 text-white" : ""} />
                                        {selected.isVerified ? "Verified" : "Mark as Verified"}
                                    </button>
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 pb-20">
                            <ArrowRight size={48} className="mb-4 opacity-20" />
                            <p>Select an item from the left to view translation details</p>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};
