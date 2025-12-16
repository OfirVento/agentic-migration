import React from 'react';
import { FileText, Database, Shield, Layers, Code, Play } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utils alias, otherwise inline utility function

const Treemap = () => {
    // Mock Data: Impact vs. Health
    // Size = Impact (Volume), Color = Health (Fit Score)
    const items = [
        { id: '1', label: 'Product Catalog', volume: 45, score: 100, color: 'bg-emerald-500', icon: Database },
        { id: '2', label: 'Volume Discount', volume: 25, score: 90, color: 'bg-emerald-400', icon: FileText }, // Slight complexity
        { id: '3', label: 'Partner Rebates', volume: 15, score: 60, color: 'bg-yellow-400', icon: Layers }, // Warning
        { id: '4', label: 'Approval Chains', volume: 10, score: 80, color: 'bg-emerald-300', icon: Shield },
        { id: '5', label: 'Legacy Scripts', volume: 5, score: 10, color: 'bg-red-500', icon: Code }, // CRITICAL GAP
    ];

    return (
        <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-gray-900 font-semibold text-lg flex items-center gap-2">
                        Inventory Heatmap
                    </h3>
                    <p className="text-gray-500 text-sm">Size = Usage Volume, Color = Migration Readiness</p>
                </div>
                <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm" /> Ready</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-sm" /> Review</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm" /> Blocked</span>
                </div>
            </div>

            <div className="flex-1 w-full h-full grid grid-cols-4 grid-rows-3 gap-2">
                {/* 1. Main: Catalog (45%) - Big block */}
                <div className="col-span-2 row-span-3 bg-emerald-50 relative group overflow-hidden rounded-lg border-2 border-white hover:border-emerald-200 transition-colors">
                    <div className="absolute inset-0 bg-emerald-500 opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <Database size={48} className="opacity-50" />
                        <div>
                            <span className="text-3xl font-bold">45%</span>
                            <p className="font-medium text-lg">Product Catalog</p>
                            <p className="text-xs opacity-75">14,500 Items • Clean Data</p>
                        </div>
                    </div>
                </div>

                {/* 2. Volume Discount (25%) */}
                <div className="col-span-2 row-span-2 bg-emerald-50 relative group overflow-hidden rounded-lg border-2 border-white hover:border-emerald-200">
                    <div className="absolute inset-0 bg-emerald-400 opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                            <FileText size={32} className="opacity-50" />
                            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Auto-mapped</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold">25%</span>
                            <p className="font-medium">Volume Discount</p>
                            <p className="text-xs opacity-75">Complex Logic</p>
                        </div>
                    </div>
                </div>

                {/* 3. Partner Rebates (15%) */}
                <div className="col-span-1 row-span-1 bg-yellow-50 relative group overflow-hidden rounded-lg border-2 border-white hover:border-yellow-200">
                    <div className="absolute inset-0 bg-yellow-400 opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                        <Layers size={24} className="opacity-50" />
                        <div>
                            <span className="text-xl font-bold">15%</span>
                            <p className="font-medium text-sm">Partner Rebates</p>
                        </div>
                    </div>
                </div>

                {/* 4. Approvals (10%) */}
                <div className="col-span-1 row-span-1 bg-emerald-50 relative group overflow-hidden rounded-lg border-2 border-white hover:border-emerald-200">
                    <div className="absolute inset-0 bg-emerald-300 opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                        <Shield size={24} className="opacity-50" />
                        <div>
                            <span className="text-xl font-bold">10%</span>
                            <p className="font-medium text-sm">Approvals</p>
                        </div>
                    </div>
                </div>

                {/* 5. Legacy Scripts (GAP) - Small but Red */}
                {/* Trick: Putting it absolutely positioned over the bottom right of the grid isn't standard grid but let's just use the last cell split */}
            </div>

            {/* The gap item floating or separate */}
            <div className="mt-2 h-16 w-full bg-red-500 rounded-lg relative overflow-hidden group cursor-pointer border-2 border-red-400 animate-pulse hover:animate-none">
                <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full"><Code size={20} /></div>
                        <div>
                            <p className="font-bold">Legacy QCP Scripts Detected</p>
                            <p className="text-xs opacity-90">5% Volume • Requires Manual Intervention</p>
                        </div>
                    </div>
                    <button className="bg-white text-red-600 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm hover:bg-red-50">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Treemap;
