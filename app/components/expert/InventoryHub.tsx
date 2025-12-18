"use client";
import React from 'react';
import { Search, Filter, Download, Database, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const InventoryHub = () => {
    const items = [
        { name: 'SBQQ__Quote__c', type: 'Object', status: 'Mapped', coverage: 100, risk: 'Low' },
        { name: 'SBQQ__QuoteLine__c', type: 'Object', status: 'Mapped', coverage: 98, risk: 'Low' },
        { name: 'PriceRule_VolumeDiscount', type: 'Logic', status: 'AI Translating', coverage: 45, risk: 'Medium' },
        { name: 'QCP_CustomRounding', type: 'Script', status: 'Expert Required', coverage: 0, risk: 'High' },
        { name: 'Product_Bundle_v2', type: 'Configuration', status: 'Verified', coverage: 100, risk: 'Low' },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Database className="text-indigo-500" />
                        Inventory Hub
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 italic">A detailed list of everything we found in your org during the reality scan.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search metadata..."
                            className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                        />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">
                        <Filter size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                        <Download size={14} />
                        Export Manifest
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Metadata Item</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Coverage</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Risk</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item, i) => (
                            <tr key={i} className="hover:bg-indigo-50/30 transition-colors cursor-pointer group">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-bold uppercase">{item.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {item.status === 'Verified' ? <CheckCircle2 size={14} className="text-emerald-500" /> :
                                            item.status === 'Expert Required' ? <AlertTriangle size={14} className="text-amber-500" /> :
                                                <Clock size={14} className="text-indigo-400 animate-pulse" />}
                                        <span className="text-xs font-medium text-gray-600">{item.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full transition-all duration-1000", item.coverage === 100 ? "bg-emerald-500" : "bg-indigo-500")}
                                                style={{ width: `${item.coverage}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400">{item.coverage}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-tighter",
                                        item.risk === 'Low' ? "text-emerald-500" : item.risk === 'High' ? "text-rose-500" : "text-amber-500"
                                    )}>{item.risk}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
