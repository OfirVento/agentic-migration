"use client";
import React from 'react';
import { TestTube2, TrendingDown, Target, Zap, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ParityLab = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TestTube2 className="text-indigo-500" />
                    Parity Lab
                </h2>
                <p className="text-xs text-gray-500 mt-1 italic">Proving that the new system behaves exactly like the old one with variance analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pricing Accuracy</div>
                    <div className="text-3xl font-black text-gray-900 mb-1">99.98%</div>
                    <div className="text-[10px] flex items-center gap-1 font-bold text-emerald-500 uppercase">
                        <TrendingDown size={12} className="rotate-180" />
                        0.02% variance
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Scenarios Executed</div>
                    <div className="text-3xl font-black text-gray-900 mb-1">12,450</div>
                    <div className="text-[10px] flex items-center gap-1 font-bold text-indigo-500 uppercase">
                        Across 4 orgs
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Gate Status</div>
                    <div className="text-xl font-black text-emerald-600 mb-1 mt-1 flex items-center gap-2">
                        <ShieldCheck /> PASSED
                    </div>
                    <div className="text-[10px] flex items-center gap-1 font-bold text-gray-400 uppercase">
                        Production Ready
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase">Variance Breakdown</h4>
                    <button className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest">Download Full Report</button>
                </div>

                <div className="space-y-4 overflow-y-auto">
                    {[
                        { label: 'Bundle Configuration', parity: 100, status: 'Perfect' },
                        { label: 'Volume Discount Logic', parity: 100, status: 'Perfect' },
                        { label: 'Manual Overrides', parity: 98.4, status: 'Variance Found' },
                        { label: 'Partner Pricing', parity: 100, status: 'Perfect' },
                        { label: 'Tax Calculations', parity: 99.1, status: 'Expert Review' },
                    ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                    <Target size={16} />
                                </div>
                                <div className="text-xs font-bold text-gray-700">{row.label}</div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-xs font-black text-gray-900">{row.parity}%</div>
                                    <div className={cn("text-[9px] font-bold uppercase", row.parity === 100 ? "text-emerald-500" : "text-amber-500")}>
                                        {row.status}
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
