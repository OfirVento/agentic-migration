"use client";
import React from 'react';
import { useDemo } from '../DemoContext';
import { Boxes, FileText, Zap, Shield, FileCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils exists

export const DependencyMap = () => {
    const { currentCanvas, handleAction } = useDemo();
    const data = currentCanvas?.data;

    // Mock Graph Layout (Simplified for Prototype)
    // In a real app this would use D3 or React Flow
    // We'll create a static, nice-looking layout

    const getNodeIcon = (type: string) => {
        if (type === 'Bundle') return Boxes;
        if (type === 'Price Rule') return Zap;
        if (type === 'Approval') return Shield;
        if (type === 'Template') return FileCheck;
        return FileText; // Field/Option
    };

    const getNodeColor = (type: string) => {
        if (type === 'Bundle') return 'bg-indigo-100 text-indigo-700 border-indigo-200';
        if (type === 'Price Rule' || type === 'Product Rule') return 'bg-amber-100 text-amber-700 border-amber-200';
        if (type === 'Approval') return 'bg-red-100 text-red-700 border-red-200';
        if (type === 'Template') return 'bg-green-100 text-green-700 border-green-200';
        return 'bg-gray-100 text-gray-600 border-gray-200';
    };

    // Positions for "Star" layout around central bundle
    const positions = [
        { top: '50%', left: '50%' }, // Center (Bundle)
        { top: '20%', left: '50%' }, // Top (Options)
        { top: '30%', left: '75%' }, // Top Right (Fields)
        { top: '50%', left: '80%' }, // Right (Rules)
        { top: '70%', left: '75%' }, // Bottom Right (Rules)
        { top: '80%', left: '50%' }, // Bottom (Approvals)
        { top: '50%', left: '20%' }, // Left (Template)
    ];

    // Helper to place nodes roughly in circle
    // We are hand-waving the layout heavily here for visual effect in prototype
    const renderedNodes = data.nodes?.map((node: any, idx: number) => {
        // Manual overrides for the demo dataset to look nice
        let pos = { top: '50%', left: '50%' };
        if (node.id === 'bundle') pos = { top: '50%', left: '50%' };
        if (node.id === 'opt1') pos = { top: '25%', left: '40%' };
        if (node.id === 'opt2') pos = { top: '25%', left: '50%' };
        if (node.id === 'opt3') pos = { top: '25%', left: '60%' };

        if (node.id === 'field1') pos = { top: '40%', left: '25%' };
        if (node.id === 'field2') pos = { top: '60%', left: '25%' }; // Seat Count -> Rule

        if (node.id === 'rule1') pos = { top: '60%', left: '60%' }; // Volume Discount
        if (node.id === 'rule2') pos = { top: '50%', left: '75%' };
        if (node.id === 'pr1') pos = { top: '35%', left: '70%' };

        if (node.id === 'appr') pos = { top: '75%', left: '60%' }; // Approval (linked to rule)
        if (node.id === 'doc') pos = { top: '75%', left: '40%' };

        const Icon = getNodeIcon(node.type);

        return (
            <div key={node.id}
                className={cn("absolute w-32 p-3 rounded-lg border shadow-sm flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 z-10 bg-white", getNodeColor(node.type))}
                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                onClick={() => handleAction('to_translation')} // Demo shortcut
            >
                <Icon size={20} />
                <div className="text-[10px] font-bold text-center leading-tight">{node.label}</div>
                <div className="text-[9px] opacity-75">{node.type}</div>
            </div>
        );
    });

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

            <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 border-b pb-2 bg-white/80 inline-block px-2 rounded">Dependency Map</h1>
                    <p className="text-sm text-gray-500 bg-white/80 inline-block px-2">Visualizing impact for "Laptop Package"</p>
                </div>
                <button className="pointer-events-auto bg-white border border-gray-200 shadow-sm text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    Fit to screen
                </button>
            </div>

            <div className="flex-1 relative overflow-hidden">
                {/* Edges (SVG Overlay) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Manual lines matching the manual positions roughly */}
                    {/* Bundle -> Options */}
                    <line x1="50%" y1="50%" x2="40%" y2="25%" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="50%" y1="50%" x2="50%" y2="25%" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="50%" y1="50%" x2="60%" y2="25%" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Fields -> Rules */}
                    <line x1="25%" y1="60%" x2="60%" y2="60%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" /> {/* Seat -> Vol Discount */}

                    {/* Rule -> Approval */}
                    <line x1="60%" y1="60%" x2="60%" y2="75%" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Bundle -> Doc */}
                    <line x1="50%" y1="50%" x2="40%" y2="75%" stroke="#cbd5e1" strokeWidth="2" />
                </svg>

                {renderedNodes}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg border border-gray-200 shadow-sm text-xs space-y-2 z-20">
                <div className="font-semibold">Legend</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-500" /> Bundle structure</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-amber-500" /> Logic (Rules)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-red-500" /> Approvals</div>
            </div>

        </div>
    );
};
