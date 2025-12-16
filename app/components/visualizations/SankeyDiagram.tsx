import React from 'react';

const SankeyDiagram = () => {
    // Advanced Flow Data: Multi-Stage Migration
    // Stage 1: Legacy Inputs (Left)
    // Stage 2: Transformation Engine (Middle)
    // Stage 3: Target State (Right)

    // Simplified Bezier paths for demo (simulating calculated layout)
    const flows = [
        // 1. Products -> Catalog (Clean Fit)
        { d: "M 50 80 C 250 80, 550 60, 750 60", color: "#3b82f6", width: 40, label: "Product Definition" },

        // 2. Price Rules -> Pricing Procedure (Transformation)
        { d: "M 50 160 C 300 160, 500 120, 750 120", color: "#10b981", width: 60, label: "Pricing Logic" },

        // 3. Discount Schedules -> Pricing Procedure (Consolidation)
        { d: "M 50 220 C 300 220, 500 140, 750 130", color: "#10b981", width: 30, opacity: 0.4 },

        // 4. Scripts -> Fallout (Gap)
        { d: "M 50 300 C 200 300, 400 350, 750 350", color: "#ef4444", width: 15, label: "Legacy Script Fallout" }, // Red line to Manual

        // 5. Quote Templates -> Document Gen (Direct)
        { d: "M 50 360 C 300 360, 600 240, 750 240", color: "#8b5cf6", width: 25, label: "Output Docs" },

        // 6. Workflow Rules -> Orchestration (Optimization)
        { d: "M 50 420 C 300 420, 500 200, 750 200", color: "#f59e0b", width: 20, label: "Approvals" }
    ];

    return (
        <div className="w-full h-[500px] bg-white rounded-xl overflow-hidden relative shadow-sm border border-gray-100 flex flex-col">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-gray-900 font-semibold text-lg flex items-center gap-2">
                    Data Transformation Flow
                </h3>
                <p className="text-gray-500 text-sm">Legacy Objects → Migration Engine → Target Architecture</p>
            </div>

            <div className="flex-1 relative mt-12">
                <svg width="100%" height="100%" viewBox="0 0 800 450" className="w-full h-full">
                    {/* Column Headers */}
                    <text x="50" y="20" className="text-xs fill-gray-900 font-bold uppercase text-center" textAnchor="middle">Legacy Source</text>
                    <text x="400" y="20" className="text-xs fill-blue-600 font-bold uppercase text-center" textAnchor="middle">Transformation Layer</text>
                    <text x="750" y="20" className="text-xs fill-gray-900 font-bold uppercase text-center" textAnchor="middle">Target RCA</text>

                    {/* Left Nodes (Source Categories) */}
                    <g transform="translate(40, 60)">
                        <rect width="20" height="40" rx="4" fill="#3b82f6" /> {/* Products */}
                        <rect y="80" width="20" height="60" rx="4" fill="#10b981" /> {/* Rules */}
                        <rect y="150" width="20" height="30" rx="4" fill="#10b981" opacity="0.6" /> {/* Schedules */}
                        <rect y="230" width="20" height="15" rx="4" fill="#ef4444" /> {/* Scripts */}
                        <rect y="290" width="20" height="25" rx="4" fill="#8b5cf6" /> {/* Docs */}
                        <rect y="350" width="20" height="20" rx="4" fill="#f59e0b" /> {/* Workflow */}
                    </g>

                    {/* Right Nodes (Target Pillars) */}
                    <g transform="translate(740, 40)">
                        <rect width="20" height="40" rx="4" fill="#3b82f6" /> {/* Catalog */}
                        <rect y="60" width="20" height="80" rx="4" fill="#10b981" /> {/* Pricing Proc */}
                        <rect y="150" width="20" height="30" rx="4" fill="#f59e0b" /> {/* Orchestration */}
                        <rect y="190" width="20" height="30" rx="4" fill="#8b5cf6" /> {/* Doc Gen */}
                        <rect y="300" width="20" height="20" rx="4" fill="#ef4444" opacity="0.8" /> {/* Fallout/Manual Queue */}
                    </g>

                    {/* Flow Paths with Pulse on Fallout */}
                    {flows.map((flow, i) => (
                        <g key={i} className="group">
                            <path
                                d={flow.d}
                                fill="none"
                                stroke={flow.color}
                                strokeWidth={flow.width}
                                strokeOpacity="0.4"
                                className="transition-all duration-500 group-hover:stroke-opacity-80"
                                style={{ strokeLinecap: 'round' }}
                            />
                            {/* Hover Label */}
                            <text dy="-5">
                                <textPath href={`#path-${i}`} startOffset="50%" textAnchor="middle" className="fill-gray-600 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-white">
                                    {flow.label}
                                </textPath>
                            </text>
                            <path id={`path-${i}`} d={flow.d} fill="none" /> {/* Hidden path for text */}

                            {/* Particle Effect for flow */}
                            <circle r="3" fill="white">
                                <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={flow.d} />
                            </circle>
                        </g>
                    ))}

                </svg>

                {/* Analysis Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-6 py-3 rounded-full flex gap-8">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase font-bold">Auto-Mapped</div>
                        <div className="text-lg font-bold text-emerald-600">88%</div>
                    </div>
                    <div className="text-center border-l border-gray-200 pl-8">
                        <div className="text-xs text-gray-500 uppercase font-bold">Consolidated</div>
                        <div className="text-lg font-bold text-blue-600">12%</div>
                    </div>
                    <div className="text-center border-l border-gray-200 pl-8">
                        <div className="text-xs text-gray-500 uppercase font-bold">Fallout (Gap)</div>
                        <div className="text-lg font-bold text-red-500">5 Items</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SankeyDiagram;
