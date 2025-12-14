"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { CheckCircle2, Trophy, ArrowRight, FileText, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti'; // Optional, but let's stick to CSS/standard for now to avoid dep errors

export const RunSummary = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    // Confetti effect on mount if success
    React.useEffect(() => {
        if (data.status === 'SUCCESS' || data.result === 'PASS') {
            // Placeholder for celebration effect
        }
    }, [data]);

    return (
        <div className="flex flex-col h-full items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-8">

            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-700 delay-100">
                <Trophy size={48} className="text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {data.result === 'PASS' ? 'Parity Gate Passed' : 'Migration Success'}
            </h1>

            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-8 font-mono">
                {data.parity_score || "100%"}
            </div>

            {data.notes && (
                <div className="space-y-2 mb-8 text-center">
                    {data.notes.map((note: string, idx: number) => (
                        <div key={idx} className="text-gray-600 flex items-center gap-2 justify-center">
                            <CheckCircle2 size={16} className="text-green-500" /> {note}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex gap-4">
                {data.result === 'PASS' ? (
                    <button
                        onClick={() => handleAction('run_qa')}
                        className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black hover:scale-105 transition-all flex items-center gap-2"
                    >
                        Deploy to QA <ArrowRight size={20} />
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2">
                            <FileText size={18} /> View Report
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 flex items-center gap-2">
                            <Share2 size={18} /> Share Results
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};
