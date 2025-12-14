"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { PlayCircle, CheckCircle2, AlertOctagon, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export const ReplayProgress = () => {
    const { currentCanvas } = useDemo();
    const data = currentCanvas?.data;

    // Simple mock log animator
    const [logs, setLogs] = useState(data.live_log || []);

    useEffect(() => {
        if (data.status === 'Running') {
            const interval = setInterval(() => {
                setLogs((prev: string[]) => {
                    const nextId = prev.length + 1;
                    // Just adding random noise for interactivity feel
                    return [...prev, `Scenario ${nextId}: PASS checked`].slice(-6);
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [data.status]);

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 p-8 max-w-3xl mx-auto w-full">

            <div className="text-center mb-12">
                {data.status === 'Running' ? (
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mb-4 animate-pulse">
                        <RefreshCw size={32} className="text-amber-600 animate-spin" />
                    </div>
                ) : (
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                        <PlayCircle size={32} className="text-blue-600" />
                    </div>
                )}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.title || "Parity Replay Suite"}</h1>
                <p className="text-gray-500 font-mono text-sm">{data.suite_name}</p>
            </div>

            {/* Progress Bar */}
            {data.status === 'Running' && (
                <div className="mb-12">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>Progress</span>
                        <span>{Math.round((data.completed ? parseInt(data.completed) / parseInt(data.completed.split('/')[1]) : 0) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(data.completed ? parseInt(data.completed) / parseInt(data.completed.split('/')[1]) : 0.1) * 100}%` }} />
                    </div>
                    <div className="flex justify-center gap-8 mt-4 text-sm font-medium">
                        <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> {data.passing} Passing</span>
                        {data.diffs > 0 && <span className="text-red-600 flex items-center gap-1"><AlertOctagon size={14} /> {data.diffs} Diffs</span>}
                    </div>
                </div>
            )}

            {/* Live Log or Summary */}
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 min-h-[200px] flex flex-col shadow-inner">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-2 mb-2 text-gray-500">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-2">Live Execution Log</span>
                </div>
                <div className="flex-1 space-y-1 overflow-hidden flex flex-col justify-end">
                    {logs.map((log: string, idx: number) => (
                        <div key={idx} className="animate-in slide-in-from-left-2 fade-in duration-300">
                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
                        </div>
                    ))}
                    {data.status === 'Running' && (
                        <div className="animate-pulse text-blue-400">_</div>
                    )}
                </div>
            </div>

        </div>
    );
};
