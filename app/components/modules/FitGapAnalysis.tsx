import React, { useRef } from 'react';
import NetworkGraph from '../visualizations/NetworkGraph';
import SankeyDiagram from '../visualizations/SankeyDiagram';
import Treemap from '../visualizations/Treemap';
import { ArrowDown, Info } from 'lucide-react';

const FitGapAnalysis = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScrollNext = () => {
        if (!containerRef.current) return;
        const { scrollTop, clientHeight } = containerRef.current;
        // Scroll down by one viewport height
        containerRef.current.scrollTo({
            top: scrollTop + clientHeight * 0.8, // 80% of viewport to keep context
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Fit-Gap Analysis</h2>
                    <p className="text-sm text-gray-500">Visualizing migration complexity and coverage</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Export Report
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Share with Team
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth relative">
                <div className="max-w-5xl mx-auto p-8 space-y-12 pb-32">

                    {/* Section 1: Complexity Network */}
                    <section id="complexity-network" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                1. Complexity Network
                                <Info size={16} className="text-gray-400 cursor-help" />
                            </h3>
                            <span className="text-xs text-gray-500">Force-Directed View</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-3xl">
                            Visualizes the interdependency between CPQ artifacts. Red nodes indicate identified gaps or circular dependencies that require manual remediation.
                        </p>
                        <NetworkGraph />
                    </section>

                    <div className="flex justify-center text-gray-300">
                        <ArrowDown size={24} className="animate-bounce opacity-50" />
                    </div>

                    {/* Section 2: Impact Heatmap (SWAPPED: Was Section 3) */}
                    <section id="impact-heatmap" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                2. Impact Heatmap
                                <Info size={16} className="text-gray-400 cursor-help" />
                            </h3>
                            <span className="text-xs text-gray-500">Treemap Volume Analysis</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-3xl">
                            Sizes blocks by transaction volume (impact) and colors them by readiness state. Focus your QA efforts on the largest red blocks.
                        </p>
                        <Treemap />
                    </section>

                    <div className="flex justify-center text-gray-300">
                        <ArrowDown size={24} className="animate-bounce opacity-50" />
                    </div>

                    {/* Section 3: Migration Flow (SWAPPED: Was Section 2) */}
                    <section id="migration-flow" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                3. Migration Flow
                                <Info size={16} className="text-gray-400 cursor-help" />
                            </h3>
                            <span className="text-xs text-gray-500">Sankey Diagram</span>
                        </div>
                        <p className="text-gray-600 text-sm max-w-3xl">
                            Tracks the flow of logic from Legacy CPQ to the new RCA architecture. Thinner lines generally indicate consolidation or efficiency gains. Red paths show broken workflows.
                        </p>
                        <SankeyDiagram />
                    </section>

                </div>
            </div>

            {/* Floating Navigation Button */}
            <button
                onClick={handleScrollNext}
                className="absolute bottom-6 right-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
                aria-label="Scroll to next diagram"
            >
                <ArrowDown size={24} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default FitGapAnalysis;
