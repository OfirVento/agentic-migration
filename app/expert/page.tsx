"use client";
import React, { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { ActionCard } from '../components/ActionCard';
import { useDemo } from '../components/DemoContext';
import { X, Settings, HelpCircle, LayoutDashboard } from 'lucide-react';
import { CanvasRegistry } from '../components/modules/CanvasRegistry';
import { MissionControl } from '../components/expert/MissionControl';
import { MigrationHealth } from '../components/expert/MigrationHealth';
import { AgentActivityLog } from '../components/expert/AgentActivityLog';
import { ExpertSidebar, ExpertZone } from '../components/expert/ExpertSidebar';
import { InventoryHub } from '../components/expert/InventoryHub';
import { DecisionBridge } from '../components/expert/DecisionBridge';
import { ParityLab } from '../components/expert/ParityLab';
import { AIIntelligence } from '../components/expert/AIIntelligence';
import { cn } from '@/lib/utils';

export default function ExpertToolsPage() {
    const { handleExpertAction, isTyping, currentCanvas, setCurrentCanvas } = useDemo();
    const [activeZone, setActiveZone] = useState<ExpertZone>('dashboard');

    const renderZone = () => {
        switch (activeZone) {
            case 'inventory': return <InventoryHub />;
            case 'decisions': return <DecisionBridge />;
            case 'parity': return <ParityLab />;
            case 'intelligence': return <AIIntelligence />;
            default: return (
                <div className="flex flex-col gap-6">
                    {/* Dashboard Summary Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
                        <div className="md:col-span-3">
                            <MigrationHealth />
                        </div>
                        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <LayoutDashboard size={80} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">System Status</h4>
                            <div className="text-2xl font-bold mb-4">Phase: Discovery</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    AGENTS ONLINE (4)
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold">
                                    <span className="w-2 h-2 bg-white/40 rounded-full" />
                                    CLOUD SYNC ACTIVE
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Main Area */}
                    <div className="flex gap-6">
                        <div className="w-80 shrink-0 flex flex-col">
                            <MissionControl />
                        </div>

                        <div className="flex-1 pr-2 pb-20">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <Settings size={16} className="text-indigo-500" />
                                    Expert Action Hub
                                </h3>
                                <div className="text-[10px] text-gray-400 font-medium">Guidance & Approvals Required</div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <ActionCard
                                    title="Logic Decoder"
                                    variant="accent"
                                    testId="logic-decoder-action"
                                    description="Compare legacy CPQ scripts side-by-side with modern RCA Pricing Procedures for client transparency."
                                    buttonLabel="Open Decoder"
                                    summary="Strategic tool for bridging the 'Translation Gap' and explaining complex code changes to stakeholders."
                                    onClick={() => handleExpertAction('generate_logic_decoder')}
                                    disabled={isTyping}
                                />
                                <ActionCard
                                    title="Workshop Designer"
                                    testId="workshop-designer-action"
                                    description="Create a 60-min expert-guided session plan based on top used flows and identified bottlenecks."
                                    buttonLabel="Generate Agenda"
                                    summary="Plans of action for aligning business owners with the technical migration path."
                                    onClick={() => handleExpertAction('generate_agenda')}
                                    disabled={isTyping}
                                />
                                <ActionCard
                                    title="Parity Test Architect"
                                    testId="parity-test-architect-action"
                                    description="Create CPQ vs RCA parity tests for the most-used quote scenarios found in the scan."
                                    buttonLabel="Build Test Plan"
                                    summary="Automated verification suites to ensure the new system matches legacy pricing exactly."
                                    onClick={() => handleExpertAction('generate_test_plan')}
                                    disabled={isTyping}
                                />
                                <ActionCard
                                    title="Digital Recap AI"
                                    testId="digital-recap-ai-action"
                                    description="Summarize decisions, risks, and next actions since the last scan for the executive sponsor."
                                    buttonLabel="Draft Executive Summary"
                                    summary="Automatically converts technical agent logs into plain-English stakeholder updates."
                                    onClick={() => handleExpertAction('generate_recap')}
                                    disabled={isTyping}
                                />
                            </div>

                            <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4">
                                <HelpCircle className="text-gray-400 shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold text-gray-600 uppercase mb-1">Expert Protocol</h4>
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        Use these tools to intervene when the AI reaches low-confidence thresholds. Every action here updates the **Mission Progress**.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-80 shrink-0 flex flex-col">
                            <AgentActivityLog />
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex h-screen bg-white">
            <ExpertSidebar activeZone={activeZone} onZoneChange={setActiveZone} />

            <div className="flex-1 flex flex-col min-w-0">
                <AppShell
                    title="Migration Command Center"
                    subtitle="Expert-grade orchestrator for CPQ to Revenue Cloud digital transformation."
                >
                    <div className="flex-1">
                        {renderZone()}
                    </div>
                </AppShell>
            </div>

            {/* Overlay for Visual Tools */}
            {currentCanvas && (
                <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                            <div>
                                <h2 className="font-bold text-2xl text-gray-900 tracking-tight">{currentCanvas.title}</h2>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Expert Orchestrator — {currentCanvas.type}</p>
                            </div>
                            <button
                                onClick={() => setCurrentCanvas(null)}
                                className="p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all border border-gray-100"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative bg-gray-50/30">
                            <CanvasRegistry />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
