"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { ScanScope } from './ScanScope';
import { ScanProgress } from './ScanProgress';
import { UsageRadar } from './UsageRadar';
import { HealthSummary } from './HealthSummary';
import { DependencyMap } from './DependencyMap';
import { PhaseScopeProposal } from './PhaseScopeProposal';
import { StakeholderConfirm } from './StakeholderConfirm';
import { TranslationCanvas } from './TranslationCanvas';
import { ReplayProgress } from './ReplayProgress';
import { DiffViewer } from './DiffViewer';
import { RunTimeline } from './RunTimeline';
import { RunSummary } from './RunSummary';
import FitGapAnalysis from './FitGapAnalysis';
import { LogicDecoder } from './LogicDecoder';

export const CanvasRegistry = () => {
    const { currentCanvas } = useDemo();

    if (!currentCanvas) return <div className="p-8 text-center text-gray-400">Waiting for agent to initialize canvas...</div>;

    switch (currentCanvas.type) {
        case 'scan_scope': return <ScanScope />;
        case 'scan_progress': return <ScanProgress />;
        case 'usage_radar': return <UsageRadar />;
        case 'health_summary': return <HealthSummary />;
        case 'dependency_map': return <DependencyMap />;
        case 'phase_scope_proposal': return <PhaseScopeProposal />;
        case 'phase_scope_proposal_builder': return <PhaseScopeProposal />; // Re-use same component
        case 'stakeholder_confirm': return <StakeholderConfirm />;
        case 'translation_canvas': return <TranslationCanvas />;
        case 'replay_progress': return <ReplayProgress />;
        case 'diff_viewer': return <DiffViewer />;
        case 'run_timeline': return <RunTimeline />;
        case 'run_summary': return <RunSummary />;
        case 'fit_gap_analysis': return <FitGapAnalysis />;
        case 'logic_decoder': return (
            <div className="p-8 bg-gray-50/50 h-full overflow-y-auto">
                <LogicDecoder
                    legacyCode={currentCanvas.data.legacyCode}
                    rcaLogic={currentCanvas.data.rcaLogic}
                    title={currentCanvas.data.title}
                    description={currentCanvas.data.description}
                />
            </div>
        );

        // Fallback for not-yet-implemented modules to avoid crash
        default: return (
            <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
                <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white shrink-0">
                    <h2 className="font-semibold text-gray-900">{currentCanvas.title}</h2>
                    <span className="text-xs font-mono text-gray-400 uppercase">{currentCanvas.type}</span>
                </div>
                <div className="flex-1 overflow-auto p-6 bg-gray-50/50">
                    <pre className="text-xs font-mono text-gray-600 bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-auto max-h-[600px]">
                        {JSON.stringify(currentCanvas.data, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }
};
