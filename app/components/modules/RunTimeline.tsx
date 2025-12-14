"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Rocket, CheckCircle2, Clock, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RunTimeline = () => {
    const { currentCanvas } = useDemo();
    const data = currentCanvas?.data;
    const steps = ["Extract", "Create Logic", "Validate", "Deploy to QA", "Parity Gate", "Report"];
    const currentIdx = steps.indexOf(data.current_step) !== -1 ? steps.indexOf(data.current_step) : 3;

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 p-8 max-w-4xl mx-auto w-full">

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4 animate-bounce">
                    <Rocket size={32} className="text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Executing Phase 1 Migration</h1>
                <p className="text-gray-500">Deploying generated RCA constructs to Target QA Environment</p>
            </div>

            {/* Timeline Stepper */}
            <div className="relative flex justify-between items-start mb-16">
                {/* Background Line */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full -z-10" />
                <div className="absolute top-5 left-0 h-1 bg-green-500 rounded-full -z-10 transition-all duration-700" style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }} />

                {steps.map((step, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                        <div key={idx} className="flex flex-col items-center gap-3 w-24">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                                isCompleted ? "bg-green-500 border-green-500 text-white" :
                                    isCurrent ? "bg-white border-indigo-600 text-indigo-600 scale-110 shadow-lg" :
                                        "bg-white border-gray-200 text-gray-300"
                            )}>
                                {isCompleted ? <CheckCircle2 size={18} /> :
                                    isCurrent ? <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping" /> :
                                        <span className="text-xs font-bold">{idx + 1}</span>
                                }
                            </div>
                            <span className={cn(
                                "text-xs font-semibold text-center transition-colors",
                                isCurrent ? "text-indigo-600" : isCompleted ? "text-green-600" : "text-gray-400"
                            )}>{step}</span>
                        </div>
                    );
                })}
            </div>

            {/* Checkpoint Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500">
                        <GitBranch size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-900">Rollback Checkpoint Active</div>
                        <div className="text-xs text-gray-500 font-mono">ID: QA_PRE_001_PHASE1</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-green-600">
                    <Clock size={14} /> Auto-saving...
                </div>
            </div>

        </div>
    );
};
