import React from 'react';

const NetworkGraph = () => {
    // Enhanced Data: Full Org Taxonomy
    // Clusters:
    // 1. Center: Quote (Core)
    // 2. Top-Left: Products (Blue)
    // 3. Top-Right: Pricing (Green/Yellow)
    // 4. Bottom-Right: Scripts/Legacy (Red - Gaps)
    // 5. Bottom-Left: Approvals/Process (Purple)

    const nodes = [
        // --- CORE CENTER ---
        { id: 'core_quote', x: 400, y: 300, r: 45, label: 'Quote', type: 'core', color: '#f8fafc' }, // Slate-50

        // --- PRODUCTS (Blue) ---
        { id: 'prod_hw', x: 250, y: 150, r: 35, label: 'Hardware', type: 'product', color: '#3b82f6' },
        { id: 'prod_sw', x: 180, y: 220, r: 30, label: 'Software', type: 'product', color: '#3b82f6' },
        { id: 'prod_bundle_lp', x: 220, y: 100, r: 20, label: 'Laptops', type: 'product', color: '#60a5fa' },
        { id: 'prod_bundle_srv', x: 280, y: 80, r: 20, label: 'Servers', type: 'product', color: '#60a5fa' },
        { id: 'prod_opt_cpu', x: 150, y: 160, r: 10, label: 'CPU', type: 'leaf', color: '#93c5fd' },
        { id: 'prod_opt_ram', x: 130, y: 200, r: 10, label: 'RAM', type: 'leaf', color: '#93c5fd' },
        { id: 'prod_opt_ssd', x: 100, y: 240, r: 10, label: 'SSD', type: 'leaf', color: '#93c5fd' },

        // --- PRICING (Green = Good, Yellow = Warn) ---
        { id: 'price_rules', x: 550, y: 180, r: 35, label: 'Price Rules', type: 'logic', color: '#10b981' },
        { id: 'price_disc', x: 620, y: 120, r: 25, label: 'Discounts', type: 'logic', color: '#34d399' },
        { id: 'price_block', x: 650, y: 200, r: 20, label: 'Block Pricing', type: 'logic', color: '#34d399' },
        { id: 'price_partner', x: 580, y: 80, r: 15, label: 'Partner Tier', type: 'logic', color: '#fbbf24' }, // Complex

        // --- GAP / SCRIPTS (Red) ---
        { id: 'gap_scripts', x: 550, y: 450, r: 40, label: 'Legacy Scripts', type: 'gap', color: '#ef4444' }, // FLAGGED
        { id: 'gap_qcp', x: 620, y: 500, r: 25, label: 'QCP.js', type: 'gap', color: '#f87171' },
        { id: 'gap_api', x: 500, y: 520, r: 25, label: 'Ext. API', type: 'gap', color: '#f87171' },

        // --- APPROVALS (Purple) ---
        { id: 'proc_app', x: 250, y: 450, r: 35, label: 'Approvals', type: 'process', color: '#8b5cf6' },
        { id: 'proc_legal', x: 180, y: 500, r: 20, label: 'Legal Chain', type: 'process', color: '#a78bfa' },
        { id: 'proc_fin', x: 280, y: 520, r: 20, label: 'Finance Chain', type: 'process', color: '#a78bfa' },

        // --- ORG NOISE (Small particles connected to core or clusters) ---
        { id: 'n1', x: 380, y: 250, r: 5, label: '', type: 'noise', color: '#cbd5e1' },
        { id: 'n2', x: 420, y: 250, r: 5, label: '', type: 'noise', color: '#cbd5e1' },
        { id: 'n3', x: 380, y: 350, r: 5, label: '', type: 'noise', color: '#cbd5e1' },
        { id: 'n4', x: 420, y: 350, r: 5, label: '', type: 'noise', color: '#cbd5e1' },
    ];

    const links = [
        // Core Connections
        { source: 'core_quote', target: 'prod_hw' },
        { source: 'core_quote', target: 'prod_sw' },
        { source: 'core_quote', target: 'price_rules' },
        { source: 'core_quote', target: 'gap_scripts' },
        { source: 'core_quote', target: 'proc_app' },

        // Product Cluster
        { source: 'prod_hw', target: 'prod_bundle_lp' },
        { source: 'prod_hw', target: 'prod_bundle_srv' },
        { source: 'prod_bundle_lp', target: 'prod_opt_cpu' },
        { source: 'prod_bundle_lp', target: 'prod_opt_ram' },
        { source: 'prod_bundle_lp', target: 'prod_opt_ssd' },

        // Pricing Cluster
        { source: 'price_rules', target: 'price_disc' },
        { source: 'price_rules', target: 'price_block' },
        { source: 'price_rules', target: 'price_partner' }, // Yellow

        // Gap Cluster
        { source: 'gap_scripts', target: 'gap_qcp' },
        { source: 'gap_scripts', target: 'gap_api' },
        { source: 'price_partner', target: 'gap_qcp' }, // Cross-dependency!

        // Approval Cluster
        { source: 'proc_app', target: 'proc_legal' },
        { source: 'proc_app', target: 'proc_fin' },
    ];

    return (
        <div className="w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden relative shadow-inner border border-slate-800">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-white font-bold text-xl tracking-tight">Enterprise Complexity Map</h3>
                <p className="text-slate-400 text-sm mt-1">Full Org Metadata • Verified vs. Risk Areas</p>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 800 600" className="w-full h-full">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Links */}
                {links.map((link, i) => {
                    const s = nodes.find(n => n.id === link.source)!;
                    const t = nodes.find(n => n.id === link.target)!;
                    const isGapLink = s.type === 'gap' || t.type === 'gap';
                    return (
                        <line
                            key={i}
                            x1={s.x} y1={s.y}
                            x2={t.x} y2={t.y}
                            stroke={isGapLink ? '#ef4444' : '#475569'}
                            strokeWidth={isGapLink ? 2 : 1}
                            strokeOpacity={isGapLink ? 0.6 : 0.3}
                            className={isGapLink ? 'animate-pulse' : ''}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id} className="cursor-pointer hover:opacity-90 transition-opacity group">
                        {/* Halo for Core/Gaps */}
                        {(node.type === 'core' || node.type === 'gap') && (
                            <circle cx={node.x} cy={node.y} r={node.r + 15} fill={node.color} opacity="0.1" filter="url(#glow)">
                                {node.type === 'gap' && <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />}
                            </circle>
                        )}

                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.r}
                            fill={node.color}
                            stroke={node.type === 'gap' ? '#fee2e2' : '#1e293b'}
                            strokeWidth="2"
                            className="drop-shadow-lg"
                        />

                        {node.label && (
                            <>
                                <rect
                                    x={node.x - (node.label.length * 4)} y={node.y - 6}
                                    width={node.label.length * 8} height="12"
                                    fill="#0f172a" opacity="0"
                                    className="group-hover:opacity-60 transition-opacity"
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    dy=".3em"
                                    textAnchor="middle"
                                    className={`text-[11px] font-sans font-semibold pointer-events-none drop-shadow-md select-none ${node.type === 'core' ? 'fill-slate-900 text-sm' : 'fill-white'}`}
                                    style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
                                >
                                    {node.label}
                                </text>
                            </>
                        )}
                    </g>
                ))}
            </svg>

            {/* Smart Legend */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
                <div className="bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-xl w-48">
                    <h4 className="text-slate-300 text-xs font-bold uppercase mb-3">Object Categories</h4>
                    <div className="space-y-2 text-xs text-white">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Products (43%)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" /> Standard Logic (35%)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" /> Approvals (12%)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" /> Custom/Gap (10%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkGraph;
