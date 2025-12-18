"use client";
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
    title: string;
    description: string;
    buttonLabel: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'accent';
    summary?: string;
    testId?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    buttonLabel,
    onClick,
    disabled,
    variant = 'primary',
    summary,
    testId
}) => {
    const variants = {
        primary: "border-gray-200 hover:border-indigo-200 hover:shadow-indigo-50",
        secondary: "border-gray-200 hover:border-emerald-200 hover:shadow-emerald-50",
        accent: "border-indigo-200 bg-indigo-50/10 hover:shadow-indigo-100",
    };

    return (
        <div className={cn(
            "group bg-white p-6 rounded-2xl border shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden",
            variants[variant]
        )}>
            {variant === 'accent' && (
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={40} className="text-indigo-600" />
                </div>
            )}

            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                {title}
                {variant === 'accent' && <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Alpha</span>}
            </h3>

            <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">
                {description}
            </p>

            {summary && (
                <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-[11px] text-gray-500 italic leading-snug">
                        {summary}
                    </p>
                </div>
            )}

            <div className="mt-auto">
                <button
                    onClick={onClick}
                    disabled={disabled}
                    data-testid={testId}
                    className={cn(
                        "w-full py-3 px-4 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 relative overflow-hidden",
                        disabled ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400" :
                            variant === 'accent' ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200/50 shadow-lg" :
                                "bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-700"
                    )}
                >
                    <span className="relative z-10">{buttonLabel}</span>
                    <ArrowRight size={16} className={cn(
                        "transition-transform group-hover:translate-x-1",
                        variant === 'accent' ? "text-white" : "text-gray-400 group-hover:text-white"
                    )} />
                </button>
            </div>
        </div>
    );
};
