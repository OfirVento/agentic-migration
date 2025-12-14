"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Check, Database, Boxes, FileText, Share2, ShieldCheck, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ScanScope = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    // Icon mapping helper
    const getIcon = (name: string) => {
        if (name.includes('Quotes')) return FileText;
        if (name.includes('Products')) return Database;
        if (name.includes('Bundles')) return Boxes;
        if (name.includes('Pricing')) return Share2; // node-like logic
        if (name.includes('Approvals')) return ShieldCheck;
        return Power; // default
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
            <div className="p-8 max-w-2xl mx-auto w-full space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                        <Check size={14} />
                        {data.connection_status}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Scope & Reality Capture</h1>
                    <p className="text-gray-500 text-lg">Define what the agents should analyze to build your baseline.</p>
                </div>

                {/* Time Window Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">Analysis Time Window</h3>
                            <p className="text-sm text-gray-500">Determines usage priority ranking</p>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700">
                            {data.window}
                        </div>
                    </div>
                </div>

                {/* Scope Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {data.scope.map((item: any, idx: number) => {
                        const Icon = getIcon(item.name);
                        return (
                            <div key={idx} className={cn(
                                "p-4 rounded-xl border transition-all duration-200 flex items-start gap-4",
                                item.enabled ? "bg-blue-50/50 border-blue-200 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"
                            )}>
                                <div className={cn("p-2 rounded-lg shrink-0", item.enabled ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500")}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h4 className={cn("font-semibold", item.enabled ? "text-gray-900" : "text-gray-500")}>{item.name}</h4>
                                    {item.enabled && <span className="text-xs text-blue-600 font-medium">Included</span>}
                                </div>
                                {item.enabled && <Check size={16} className="ml-auto text-blue-600 mt-1" />}
                            </div>
                        );
                    })}
                </div>

                {/* Note */}
                <div className="text-center text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                    "{data.note}"
                </div>

                {/* Big CTA */}
                <button
                    onClick={() => handleAction('run_scan')} // This doesn't do anything directly now, handled by chat button usually, but good to have
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Run Reality Scan
                </button>

            </div>
        </div>
    );
};
