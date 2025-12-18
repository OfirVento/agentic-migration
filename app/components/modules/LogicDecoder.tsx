"use client";
import React, { useState } from 'react';
import { FileCode, Zap, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogicDecoderProps {
    legacyCode: string;
    rcaLogic: string;
    title: string;
    description: string;
}

export const LogicDecoder = ({ legacyCode, rcaLogic, title, description }: LogicDecoderProps) => {
    const [viewMode, setViewMode] = useState<'expert' | 'client'>('expert');

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{title}</h3>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                </div>
                <div className="flex bg-gray-200 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('expert')}
                        className={cn(
                            "px-3 py-1 text-xs font-bold rounded-md transition-all",
                            viewMode === 'expert' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Expert View
                    </button>
                    <button
                        onClick={() => setViewMode('client')}
                        className={cn(
                            "px-3 py-1 text-xs font-bold rounded-md transition-all",
                            viewMode === 'client' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Client View
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden divide-x divide-gray-100">
                {viewMode === 'expert' ? (
                    <>
                        {/* Legacy Side */}
                        <div className="flex-1 flex flex-col bg-gray-50/50">
                            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                                <FileCode size={14} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Legacy CPQ Script (QCP)</span>
                            </div>
                            <div className="flex-1 p-4 font-mono text-xs text-gray-600 overflow-y-auto whitespace-pre">
                                {legacyCode}
                            </div>
                        </div>

                        {/* Gap/Arrow */}
                        <div className="w-12 flex items-center justify-center bg-white z-10 -mx-6">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-indigo-500">
                                <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* RCA Side */}
                        <div className="flex-1 flex flex-col bg-indigo-50/10">
                            <div className="px-4 py-2 border-b border-indigo-50 flex items-center gap-2">
                                <Zap size={14} className="text-indigo-400" />
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">RCA Pricing Procedure</span>
                            </div>
                            <div className="flex-1 p-4 font-mono text-xs text-indigo-900/80 overflow-y-auto whitespace-pre">
                                {rcaLogic}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={40} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Translation Success: Rounding & Logic Parity</h4>
                            <p className="text-gray-600 leading-relaxed">
                                We migrated the complex custom rounding logic from a legacy script into the standard RCA Pricing Engine.
                                This ensures **100% pricing accuracy** while removing **160 lines of custom code** that previously required developer maintenance.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
                                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Impact</div>
                                <div className="text-sm font-semibold text-gray-900">Reduced variance to 0.00%</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
                                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</div>
                                <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
                                    <CheckCircle2 size={14} /> Ready for UAT
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle size={14} />
                    Verified against 4,500 historic quote lines
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                    View Full Parity Report <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};
