"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Users, Mail, Edit2, Check } from 'lucide-react';

export const StakeholderConfirm = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 p-8 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-pink-100 text-pink-700 rounded-lg">
                    <Users size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Confirm Stakeholders</h1>
                    <p className="text-gray-500">Detected from recent Salesforce activity</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {data.teams.map((team: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                {team.team.charAt(0)}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{team.team}</div>
                                <div className="text-sm text-gray-500">Lead: <span className="text-gray-900 font-medium">{team.top_user}</span></div>
                            </div>
                        </div>

                        <div className="text-right flex items-center gap-6">
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Activity</div>
                                <div className="text-sm font-medium text-gray-600">{team.activity}</div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mb-8">
                <Mail className="text-blue-600 mt-1 shrink-0" size={18} />
                <p className="text-sm text-blue-800">
                    We will route approval requests and clarification questions to these leads automatically during the translation phase.
                </p>
            </div>

            <button
                onClick={() => handleAction('confirm_owners')}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl shadow hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
                <Check size={18} /> Confirm & Continue
            </button>

        </div>
    );
};
