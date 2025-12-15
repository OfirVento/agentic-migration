import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types (will be moved to DemoContext later)
export interface Blocker {
    id: string;
    agent: string;
    question: string;
    options: string[];
    status: 'open' | 'resolved';
    resolution?: string;
    timestamp: number;
}

interface ClarificationInboxProps {
    blockers: Blocker[];
    onResolve: (id: string, option: string) => void;
}

export const ClarificationInbox: React.FC<ClarificationInboxProps> = ({ blockers, onResolve }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openBlockers = blockers.filter(b => b.status === 'open');
    const hasOpen = openBlockers.length > 0;

    if (blockers.length === 0) return null;

    return (
        <div className={cn(
            "fixed bottom-6 right-6 z-50 transition-all duration-300 flex flex-col items-end",
            isOpen ? "w-96" : "w-auto"
        )}>
            {/* Toggle Button / Badge */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all",
                    hasOpen ? "bg-amber-500 text-white hover:bg-amber-600 animate-pulse" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                )}
            >
                {hasOpen ? <AlertTriangle size={20} /> : <MessageCircle size={20} />}
                <span className="font-bold">
                    {hasOpen ? `${openBlockers.length} Review Request${openBlockers.length > 1 ? 's' : ''}` : "Clarifications"}
                </span>
                {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>

            {/* Inbox Panel */}
            {isOpen && (
                <div className="mt-3 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Clarification Inbox</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-4">
                        {openBlockers.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                <CheckCircle2 size={32} className="mx-auto mb-2 opacity-20" />
                                <p>All clear. No active blockers.</p>
                            </div>
                        )}

                        {openBlockers.map(blocker => (
                            <div key={blocker.id} className="bg-white border border-amber-100 rounded-lg shadow-sm overflow-hidden ring-1 ring-amber-100/50">
                                <div className="p-3 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">{blocker.agent}</span>
                                    <span className="ml-auto text-xs text-amber-600/70 font-mono">
                                        {new Date(blocker.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-800 font-medium mb-4 leading-relaxed">
                                        {blocker.question}
                                    </p>
                                    <div className="space-y-2">
                                        {blocker.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => onResolve(blocker.id, option)}
                                                className="w-full text-left px-3 py-2 rounded-md text-sm border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all flex items-center gap-2 group"
                                            >
                                                <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-indigo-400 flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
