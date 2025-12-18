"use client";
import React from 'react';
import { Users, AlertCircle, CheckCircle2, MessageSquare, UserPlus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DecisionBridge = () => {
    const decisions = [
        {
            id: 1,
            title: "Partner Rebate Conflict",
            description: "CPQ uses a custom script, but Revenue Cloud has a native rebate module. Should we standardize or replicate?",
            stakeholder: "Maya (Process Owner)",
            priority: "Critical",
            status: "Pending Maya"
        },
        {
            id: 2,
            title: "Multi-Currency Rounding",
            description: "Legacy behavior allows 4 decimal places. RCA defaults to 2. Confirm impact on high-value quotes.",
            stakeholder: "Lina (Sales Ops)",
            priority: "High",
            status: "Awaiting Feedback"
        },
        {
            id: 3,
            title: "Approvals Migration Strategy",
            description: "Move all historic approvals or only active ones to the new Advanced Approvals engine?",
            stakeholder: "Expert Required",
            priority: "Medium",
            status: "In Review"
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Users className="text-indigo-500" />
                    Decision Bridge
                </h2>
                <p className="text-xs text-gray-500 mt-1 italic">Where we decide how to handle the hard migration choices and align stakeholders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decisions.map(d => (
                    <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className={cn(
                                "text-[10px] font-black uppercase px-2 py-0.5 rounded-full border",
                                d.priority === 'Critical' ? "border-rose-100 bg-rose-50 text-rose-600" : "border-amber-100 bg-amber-50 text-amber-600"
                            )}>
                                {d.priority}
                            </span>
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                <MessageSquare size={14} />
                            </div>
                        </div>

                        <h4 className="text-sm font-bold text-gray-900 mb-2">{d.title}</h4>
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed flex-1">{d.description}</p>

                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                    {d.stakeholder.charAt(0)}
                                </div>
                                <div className="text-[10px] font-medium text-gray-600">{d.stakeholder}</div>
                            </div>
                            <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{d.status}</div>
                        </div>
                    </div>
                ))}

                <button className="bg-gray-50 h-full rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-gray-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-all group">
                    <UserPlus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Stakeholder</span>
                </button>
            </div>
        </div>
    );
};
