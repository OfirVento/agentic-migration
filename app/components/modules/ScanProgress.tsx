"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Loader2, CheckCircle2, Search, FileText, Database, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ScanProgress = () => {
    const { currentCanvas } = useDemo();
    const data = currentCanvas?.data;

    // Icon mapping for counters
    const getIcon = (label: string) => {
        if (label.includes('Quotes')) return FileText;
        if (label.includes('lines')) return FileText;
        if (label.includes('Rules')) return Zap;
        if (label.includes('Approval')) return Shield;
        if (label.includes('Bundles')) return Database;
        return Search;
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 p-8 max-w-4xl mx-auto w-full">

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 animate-pulse">
                    <Loader2 size={32} className="text-blue-600 animate-spin" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Scanning Environment...</h1>
                <p className="text-gray-500">Analyzing usage patterns from last 90 days</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-16 px-12">
                {data.stepper.map((step: string, idx: number) => {
                    const isActive = step === data.current_step;
                    const isPast = data.stepper.indexOf(data.current_step) > idx;

                    return (
                        <div key={idx} className="flex flex-col items-center gap-3 relative z-10 w-32">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                isPast ? "bg-green-600 border-green-600 text-white" :
                                    isActive ? "bg-white border-blue-600 text-blue-600" :
                                        "bg-gray-50 border-gray-200 text-gray-300"
                            )}>
                                {isPast ? <CheckCircle2 size={20} /> :
                                    isActive ? <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" /> :
                                        <span className="text-sm font-semibold">{idx + 1}</span>
                                }
                            </div>
                            <span className={cn(
                                "text-xs font-semibold text-center transition-colors duration-300",
                                isActive ? "text-blue-600" : isPast ? "text-green-700" : "text-gray-400"
                            )}>{step}</span>

                            {/* Connecting Line */}
                            {idx < data.stepper.length - 1 && (
                                <div className="absolute top-5 left-[50%] w-[200%] h-0.5 bg-gray-100 -z-10">
                                    <div className={cn("h-full bg-green-500 transition-all duration-500", isPast ? "w-full" : "w-0")} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Live Counters Grid (Only show counters if discovered) */}
            {data.progress > 0.2 && (
                <div className="grid grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                    {data.counters.map((counter: any, idx: number) => {
                        // Random stagger effect for "live" feel
                        const Icon = getIcon(counter.label);

                        return (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center gap-2 hover:-translate-y-1 transition-transform">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400 mb-1">
                                    <Icon size={18} />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 tabular-nums">
                                    {counter.value.toLocaleString()}
                                </div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {counter.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
};
