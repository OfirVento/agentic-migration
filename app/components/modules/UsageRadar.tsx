"use client";
import React, { useState } from 'react';
import { useDemo } from '../DemoContext';
import { BarChart3, FileText, Database, Boxes, DollarSign, ShieldCheck, FileOutput, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const UsageRadar = () => {
    const { currentCanvas } = useDemo();
    const data = currentCanvas?.data;
    const [activeTab, setActiveTab] = useState('summary');

    if (!data) return null;

    const getTabIcon = (tabId: string) => {
        switch (tabId) {
            case 'summary': return TrendingUp;
            case 'quotes': return FileText;
            case 'products': return Database;
            case 'bundles': return Boxes;
            case 'pricing': return DollarSign;
            case 'approvals': return ShieldCheck;
            case 'documents': return FileOutput;
            default: return BarChart3;
        }
    };

    const getComplexityBadge = (level: string) => {
        const normalized = level.toLowerCase();
        if (normalized === 'critical' || normalized === 'high') {
            return <span className="px-2 py-0.5 text-xs font-bold rounded border bg-red-50 text-red-700 border-red-200">HIGH</span>;
        }
        if (normalized === 'medium') {
            return <span className="px-2 py-0.5 text-xs font-bold rounded border bg-amber-50 text-amber-700 border-amber-200">MED</span>;
        }
        return <span className="px-2 py-0.5 text-xs font-bold rounded border bg-green-50 text-green-700 border-green-200">LOW</span>;
    };

    const getIcon = (iconName: string) => {
        const iconMap: { [key: string]: any } = {
            'activity': TrendingUp,
            'shield': ShieldCheck,
            'layers': Boxes,
            'file-text': FileText,
            'database': Database,
            'code': DollarSign
        };
        return iconMap[iconName] || BarChart3;
    };

    const renderSummaryTab = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                {data.summary.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                        <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">{stat.label}</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.trend}</div>
                    </div>
                ))}
            </div>

            {/* Area Cards */}
            <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Inventory & Health</h3>
                <p className="text-xs text-gray-500 mb-4">Active components prioritized by usage coverage.</p>
                <div className="grid grid-cols-2 gap-4">
                    {data.summary.area_cards.map((card: any, idx: number) => {
                        const Icon = getIcon(card.icon);
                        return (
                            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            <Icon size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{card.area}</h4>
                                            <p className="text-xs text-gray-500">{card.total_items} Total Items</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {/* Active % */}
                                    <div>
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-gray-500 font-medium">ACTIVE</span>
                                            <span className="font-bold text-gray-900">{card.active_percent}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 rounded-full transition-all"
                                                style={{ width: `${card.active_percent}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Usage Coverage */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 font-medium">USAGE COVERAGE</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-indigo-600">{card.active_items}</span>
                                            <span className="text-xs text-gray-400">of total items</span>
                                        </div>
                                    </div>

                                    {/* Insight + View Details */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-600 italic">"{card.insight}"</p>
                                        <button
                                            onClick={() => setActiveTab(card.link_to_tab)}
                                            className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 group shrink-0 ml-2"
                                        >
                                            View details
                                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Priority Table */}
            <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    Top 5 Migration Priorities
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-200">
                            <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                <th className="text-left py-3 px-4">Artifact Name</th>
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Usage</th>
                                <th className="text-left py-3 px-4">Complexity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.summary.top_priority.map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="py-3 px-4 font-semibold text-gray-900 text-sm">{item.name}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{item.type}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{item.usage}</td>
                                    <td className="py-3 px-4">{getComplexityBadge(item.complexity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderDataTable = (items: any[]) => (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <th className="text-left py-3 px-4">Artifact Name</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Usage Frequency</th>
                        <th className="text-left py-3 px-4">Complexity</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-semibold text-gray-900 text-sm">{item.name}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{item.type}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{item.usage}</td>
                            <td className="py-3 px-4">{getComplexityBadge(item.complexity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderTabContent = () => {
        if (activeTab === 'summary') return renderSummaryTab();
        if (activeTab === 'quotes') return renderDataTable(data.quotes);
        if (activeTab === 'products') return renderDataTable(data.products);
        if (activeTab === 'bundles') return renderDataTable(data.bundles);
        if (activeTab === 'pricing') return renderDataTable(data.pricing);
        if (activeTab === 'approvals') return renderDataTable(data.approvals);
        if (activeTab === 'documents') return renderDataTable(data.documents);
        return null;
    };

    return (
        <div className="flex h-full animate-in fade-in zoom-in-95 duration-500">
            {/* Left Sidebar - Vertical Tabs */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-1 flex-shrink-0">
                <div className="mb-4">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide px-3 mb-2">Functional Areas</h2>
                </div>
                {data.tabs.map((tab: any) => {
                    const Icon = getTabIcon(tab.id);
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                    : "text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                            <span className="text-left flex-1">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Right Panel - Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="text-indigo-600" />
                            Usage Radar
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Analysis of last 90 days • Ranked by quote interaction volume</p>
                    </div>

                    {/* Dynamic Content */}
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};
