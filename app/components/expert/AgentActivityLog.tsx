"use client";
import React from 'react';
import { History, CheckCircle2, AlertCircle, Info, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogItemProps {
    type: 'success' | 'alert' | 'info';
    time: string;
    agent: string;
    message: string;
}

const LogItem = ({ type, time, agent, message }: LogItemProps) => {
    const icons = {
        success: <CheckCircle2 size={12} className="text-emerald-500" />,
        alert: <AlertCircle size={12} className="text-amber-500" />,
        info: <Info size={12} className="text-indigo-500" />,
    };

    return (
        <div className="flex gap-3 group">
            <div className="w-16 shrink-0 pt-0.5 text-[10px] font-mono text-gray-400 uppercase tracking-widest">{time}</div>
            <div className="flex flex-col items-center gap-1">
                <div className="p-1.5 rounded-full bg-white border border-gray-100 shadow-sm z-10 group-hover:border-indigo-200 transition-colors">
                    {icons[type]}
                </div>
                <div className="w-px h-full bg-gray-100" />
            </div>
            <div className="pb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    {agent}
                    {type === 'alert' && <span className="bg-amber-100 text-amber-600 px-1 py-0.5 rounded text-[8px]">Action Needed</span>}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium transition-colors group-hover:text-indigo-600">{message}</p>
            </div>
        </div>
    );
};

export const AgentActivityLog = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                    <History size={16} className="text-indigo-500" />
                    Agent Activity Log
                </h3>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
                <LogItem
                    type="success"
                    time="14:22:04"
                    agent="Logic Translator"
                    message="Finalized translation for 'Volume Discount' logic. 0% variance detected."
                />
                <LogItem
                    type="alert"
                    time="13:58:12"
                    agent="Org Scanner"
                    message="Conflict identified in 'Partner Rebate' rule. Architectural mismatch with RCA native procedures."
                />
                <LogItem
                    type="info"
                    time="13:10:45"
                    agent="Priority Planner"
                    message="Updated execution sequence based on high-impact usage patterns (Last 90 days)."
                />
                <LogItem
                    type="success"
                    time="12:45:00"
                    agent="Parity Prover"
                    message="Bulk validation complete for Core Product Catalog (1,240 SKUs)."
                />
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 italic leading-relaxed text-center">
                    A historical record of every decision the AI made, ensuring full auditability.
                </p>
            </div>
        </div>
    );
};
