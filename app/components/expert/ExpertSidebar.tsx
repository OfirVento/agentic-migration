"use client";
import React from 'react';
import {
    LayoutDashboard,
    Database,
    Users,
    TestTube2,
    Terminal,
    ChevronRight,
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ExpertZone = 'dashboard' | 'inventory' | 'decisions' | 'parity' | 'intelligence';

interface SidebarProps {
    activeZone: ExpertZone;
    onZoneChange: (zone: ExpertZone) => void;
}

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, summary: 'Overall migration health' },
    { id: 'inventory', label: 'Inventory Hub', icon: Database, summary: 'Metadata & scan depth' },
    { id: 'decisions', label: 'Decision Bridge', icon: Users, summary: 'Stakeholder alignment' },
    { id: 'parity', label: 'Parity Lab', icon: TestTube2, summary: 'Logic & pricing variance' },
    { id: 'intelligence', label: 'AI Intelligence', icon: Terminal, summary: 'Live agent telemetry' },
] as const;

export const ExpertSidebar = ({ activeZone, onZoneChange }: SidebarProps) => {
    return (
        <div className="w-64 bg-gray-900 h-full flex flex-col shrink-0 border-r border-gray-800">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Expert Suite</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight italic">War Room v1.0</h2>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeZone === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onZoneChange(item.id as ExpertZone)}
                            className={cn(
                                "w-full flex items-center justify-between p-3 rounded-xl transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <Icon size={18} className={cn(isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-400")} />
                                <div className="text-left">
                                    <div className="text-xs font-bold leading-none mb-0.5">{item.label}</div>
                                    <div className={cn("text-[9px] leading-none opacity-60", isActive ? "text-indigo-100" : "text-gray-600")}>
                                        {item.summary}
                                    </div>
                                </div>
                            </div>
                            {isActive && <ChevronRight size={14} className="text-indigo-200" />}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all text-xs font-bold group">
                    <Settings size={16} className="group-hover:rotate-45 transition-transform" />
                    Configure Node
                </button>
                <a href="/" className="w-full flex items-center gap-3 p-3 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all text-xs font-bold">
                    <LogOut size={16} className="rotate-180" />
                    Exit War Room
                </a>
            </div>
        </div>
    );
};
