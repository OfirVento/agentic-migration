"use client";
import React, { useState } from 'react';
import { useDemo } from '../DemoContext';
import { ArrowRight, CheckCircle2, ChevronDown, Edit2, PlayCircle, SplitSquareVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TranslationCanvas = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    const [editing, setEditing] = useState(false);
    const [confirmations, setConfirmations] = useState(data.confirmations || []);

    const handleEdit = (idx: number, field: string, value: string) => {
        const newConfs = [...confirmations];
        // For demo simpliciy, just deeply mocking the update structure if needed
        // But mainly just enabling the UI state for "Edit"
        setEditing(true);
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0">
                <div className="flex items-center gap-2">
                    <SplitSquareVertical className="text-indigo-600" />
                    <div>
                        <h1 className="font-bold text-gray-900 leading-tight">Translation Canvas</h1>
                        <div className="text-xs text-gray-500">{data.cpq_side.name}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">View Source</button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex divide-x divide-gray-200">

                {/* Column 1: CPQ Behavior (As-Is) */}
                <div className="flex-1 bg-gray-50/50 p-6 overflow-y-auto w-1/3">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400" /> CPQ Reality (Detected)
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4 mb-6">
                        <div>
                            <div className="text-xs text-gray-500 font-medium mb-1">Inputs Detected</div>
                            <div className="flex flex-wrap gap-1">
                                {data.cpq_side.inputs.map((inp: string) => (
                                    <span key={inp} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono border border-gray-200">{inp}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500 font-medium mb-2">Behavior Summary</div>
                            <ul className="space-y-2">
                                {data.cpq_side.plain_english.map((line: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-indigo-400 rounded-full shrink-0" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div className="text-xs text-indigo-800 font-semibold mb-2">Usage Evidence</div>
                        <ul className="space-y-1">
                            {data.cpq_side.evidence.map((ev: string, i: number) => (
                                <li key={i} className="text-xs text-indigo-700 font-medium">• {ev}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Column 2: RCA Logic (To-Be) */}
                <div className="flex-1 bg-white p-6 overflow-y-auto w-1/3 relative">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600" /> New Logic (RCA)
                    </div>

                    <div className="absolute top-6 right-6 px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded border border-indigo-100">
                        {data.rca_side.construct}
                    </div>

                    <div className="space-y-2 mt-8">
                        {data.rca_side.blocks.map((block: string, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                                {i > 0 && <div className="h-4 w-0.5 bg-gray-200 my-1" />}
                                <div className={cn(
                                    "w-full p-3 rounded-lg border text-sm font-medium text-center shadow-sm relative transition-all hover:scale-[1.02]",
                                    i === 0 ? "bg-gray-50 text-gray-500 border-dashed border-gray-300" :
                                        i === data.rca_side.blocks.length - 1 ? "bg-gray-50 text-gray-900 border-gray-300 font-bold" :
                                            "bg-indigo-50 text-indigo-900 border-indigo-200"
                                )}>
                                    {block}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 3: Confirm & Test */}
                <div className="flex-1 bg-gray-50/50 p-6 overflow-y-auto w-1/3 flex flex-col">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400" /> Verification
                    </div>

                    <div className="space-y-4 mb-8">
                        {confirmations.map((conf: any, idx: number) => (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-xs font-medium text-gray-500 uppercase">{conf.question}</div>
                                    <button onClick={() => setEditing(!editing)} className="text-gray-400 hover:text-blue-600">
                                        <Edit2 size={12} />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {Object.entries(conf.fields).map(([key, val]) => (
                                        <div key={key} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">{key}:</span>
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    defaultValue={val as string}
                                                    className="w-16 text-right px-1 py-0.5 border border-blue-300 rounded text-sm bg-blue-50 focus:outline-none"
                                                />
                                            ) : (
                                                <span className="font-semibold text-gray-900">{val as string}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-auto">
                        <div className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <PlayCircle size={14} className="text-green-600" /> Replay Test Plan
                        </div>
                        <div className="space-y-1 mb-4">
                            {data.test_plan_preview.replay_sets.map((set: string, i: number) => (
                                <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                                    <CheckCircle2 size={12} className="text-gray-300" /> {set}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleAction('confirm_intent')}
                            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm shadow transition-colors"
                        >
                            Confirm Translation & Generate Replays
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};
