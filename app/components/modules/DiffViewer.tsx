"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { AlertCircle, ArrowLeftRight, CheckCircle2, ChevronDown, Split } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const DiffViewer = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    const [activeTab, setActiveTab] = useState("Line Items");
    const tabs = ["Totals", "Line Items", "Eligibility", "Approvals"];

    // Mock data for the table if not fully provided in context seed for brevity
    const diffRows = data.diff_rows || [
        { item: "Add-on Pack", cpq: 9990, rca: 9989, delta: -1, hypothesis: "Rounding order differs", action: "Propose fix" },
        { item: "Laptop Package", cpq: 24500, rca: 24500, delta: 0, hypothesis: "—", action: "Pass" },
        { item: "Warranty", cpq: 1200, rca: 1199, delta: -1, hypothesis: "Rounding at component level", action: "Propose fix" },
        { item: "Dock", cpq: 300, rca: 300, delta: 0, hypothesis: "—", action: "Pass" }
    ];

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <ArrowLeftRight className="text-amber-600" /> Parity Diff Viewer
                    </h1>
                    <p className="text-sm text-gray-500">Comparing CPQ Engine vs RCA Logic</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">
                        <div className="col-span-3">Line Item</div>
                        <div className="col-span-2 text-right pr-4">CPQ Value</div>
                        <div className="col-span-2 text-right pr-4">RCA Value</div>
                        <div className="col-span-1 text-center">Delta</div>
                        <div className="col-span-3">Hypothesis</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {diffRows.map((row: any, idx: number) => (
                            <div key={idx} className={cn("grid grid-cols-12 items-center py-4 px-4", row.delta !== 0 ? "bg-amber-50/30" : "")}>
                                <div className="col-span-3 font-medium text-gray-900 flex items-center gap-2">
                                    {row.delta !== 0 ? <AlertCircle size={14} className="text-amber-600" /> : <CheckCircle2 size={14} className="text-green-500" />}
                                    {row.item}
                                </div>
                                <div className="col-span-2 text-right pr-4 font-mono text-gray-600">{row.cpq.toLocaleString()}</div>
                                <div className="col-span-2 text-right pr-4 font-mono text-gray-600 font-semibold">{row.rca.toLocaleString()}</div>

                                <div className="col-span-1 text-center">
                                    {row.delta !== 0 ? (
                                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{row.delta}</span>
                                    ) : (
                                        <span className="text-green-500">-</span>
                                    )}
                                </div>

                                <div className="col-span-3 text-sm text-gray-500 italic">
                                    {row.hypothesis}
                                </div>

                                <div className="col-span-1 text-right">
                                    {row.action === 'Propose fix' ? (
                                        <button
                                            onClick={() => handleAction('apply_fix')}
                                            className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                                        >
                                            Fix
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-300 font-medium">PASS</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
