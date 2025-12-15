import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
    title: string;
    description: string;
    buttonLabel: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({ title, description, buttonLabel, onClick, disabled }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">
                {description}
            </p>
            <div className="mt-auto">
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className="w-full py-2.5 px-4 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 font-semibold rounded-lg border border-gray-200 hover:border-indigo-200 transition-all text-sm flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {buttonLabel}
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </button>
            </div>
        </div>
    );
};
