"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Activity, ShieldAlert, Zap, Layers, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const HealthSummary = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    // Icon mapping
    const getIcon = (comp: string) => {
        if (comp.includes('Price')) return Zap;
        if (comp.includes('Product')) return Layers; // rules
        if (comp.includes('Discount')) return Activity;
        if (comp.includes('Template')) return FileText;
        return ShieldAlert;
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
            <div className="p-6 space-y-6">

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900">Inventory & Health</h1>
                        <p className="text-gray-500 text-sm">Active components prioritized by usage coverage.</p>
                    </div>
                    <button
                        onClick={() => handleAction('gen_scope')} // Primary next action
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all flex items-center gap-2"
                    >
                        Generate Phase 1 Scope <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {data.rows.map((row: any, idx: number) => {
                        const Icon = getIcon(row.component);

                        return (
                            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-blue-300 transition-colors">
                                <div className="p-3 bg-gray-50 rounded-lg text-gray-500">
                                    <Icon size={24} />
                                </div>

                                <div className="flex-1 grid grid-cols-12 gap-4">
                                    <div className="col-span-3">
                                        <h3 className="font-semibold text-gray-900">{row.component}</h3>
                                        <div className="text-2xl font-bold text-gray-900 mt-1">{row.count}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Total items</div>
                                    </div>

                                    <div className="col-span-3 flex flex-col justify-center">
                                        <div className="text-xs font-semibold text-gray-400 uppercase">Active</div>
                                        <div className="text-sm font-medium text-gray-700">{row.active}</div>

                                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: row.active }} />
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex flex-col justify-center">
                                        <div className="text-xs font-semibold text-gray-400 uppercase">Usage Coverage</div>
                                        <div className="text-lg font-bold text-blue-600">{row.coverage}</div>
                                        <p className="text-[10px] text-gray-400 leading-tight mt-1">of total volume</p>
                                    </div>

                                    <div className="col-span-3 bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col justify-between">
                                        <div className="text-xs text-gray-500 italic mb-2">"{row.notes}"</div>
                                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 text-left flex items-center gap-1">
                                            {row.action} <ArrowRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};
