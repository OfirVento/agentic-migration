"use client";
import React, { ReactNode } from 'react';
import { MissionBar } from './MissionBar';
import { clsx } from 'clsx';

interface AppShellProps {
    chat: ReactNode;
    canvas: ReactNode;
}

export const AppShell = ({ chat, canvas }: AppShellProps) => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            <MissionBar />
            <div className="flex flex-1 overflow-hidden">
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
            </div>
        </div>
    );
};
