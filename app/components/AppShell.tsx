"use client";
import React, { ReactNode } from 'react';
import { MissionBar } from './MissionBar';
import { ClarificationInbox } from './ClarificationInbox';
import { useDemo } from './DemoContext';
import { MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface AppShellProps {
    chat?: ReactNode;
    canvas?: ReactNode;
    children?: ReactNode;
    title?: string;
    subtitle?: string;
}

export const AppShell = ({ chat, canvas, children, title, subtitle }: AppShellProps) => {
    const { blockers, resolveBlocker, handleExpertAction } = useDemo();

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            <MissionBar />

            {/* Page Header (Optional) */}
            {title && (
                <div className="px-8 py-6 pb-0 shrink-0 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
                    </div>
                    {/* Debug Trigger for Blocker Simulation */}
                    <button
                        onClick={() => handleExpertAction('simulate_blocker')}
                        className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
                        title="Debug: Simulate Blocker"
                    >
                        <MessageCircle size={16} />
                    </button>
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                {children ? (
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        {children}
                    </div>
                ) : (
                    <>
                        {/* Left: Chat */}
                        <div className="w-[450px] flex flex-col border-r border-gray-200 bg-white shrink-0">
                            {chat}
                        </div>

                        {/* Right: Canvas */}
                        <div className="flex-1 overflow-hidden relative bg-gray-50 p-6 flex flex-col">
                            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                {canvas}
                            </div>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};
