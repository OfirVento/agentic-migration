"use client";
import React from 'react';
import { AppShell } from '../components/AppShell';
import { ActionCard } from '../components/ActionCard';
import { useDemo } from '../components/DemoContext';
import { FileText, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExpertToolsPage() {
    const { expertOutputs, handleExpertAction, isTyping } = useDemo();

    return (
        <AppShell
            title="Expert Consultant Tools"
            subtitle="Generate client deliverables and manage deployment readiness"
        >
            <div className="flex gap-8 h-full">

                {/* Main Grid Area */}
                <div className="flex-1 overflow-y-auto pr-2 pb-20">
                    <div className="grid grid-cols-2 gap-6">
                        <ActionCard
                            title="Generate workshop agenda"
                            description="Create a 60-min expert-guided session plan based on top used flows and identified bottlenecks."
                            buttonLabel="Generate Agenda"
                            onClick={() => handleExpertAction('generate_agenda')}
                            disabled={isTyping}
                        />
                        <ActionCard
                            title="Generate parity test plan"
                            description="Create CPQ vs RCA parity tests for the most-used quote scenarios found in the scan."
                            buttonLabel="Generate Test Plan"
                            onClick={() => handleExpertAction('generate_test_plan')}
                            disabled={isTyping}
                        />
                        <ActionCard
                            title="Draft client recap"
                            description="Summarize decisions, risks, and next actions since the last scan for the executive sponsor."
                            buttonLabel="Draft Email"
                            onClick={() => handleExpertAction('generate_recap')}
                            disabled={isTyping}
                        />
                        <ActionCard
                            title="Create execution checklist"
                            description="Turn the migration blueprint into run-ready tasks with owners and sequencing."
                            buttonLabel="Create Checklist"
                            onClick={() => handleExpertAction('generate_checklist')}
                            disabled={isTyping}
                        />
                        <ActionCard
                            title="Analyze recent changes"
                            description="Detect new rules, catalog edits, or usage shifts since the last snapshot."
                            buttonLabel="Run Diff Analysis"
                            onClick={() => handleExpertAction('analyze_changes')}
                            disabled={isTyping}
                        />
                    </div>
                </div>

                {/* Right Sidebar: Recent Outputs */}
                <div className="w-80 flex flex-col shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Recent Outputs</h3>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto space-y-3">
                            {expertOutputs && expertOutputs.length > 0 ? (
                                expertOutputs.map((item, i) => (
                                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all group cursor-pointer">
                                        <div className="p-2 bg-white rounded-lg border border-gray-100 text-indigo-600 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900 leading-tight mb-1">{item.title}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock size={10} />
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-400">
                                    <FileText size={32} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-sm">No artifacts generated yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </AppShell>
    );
}
