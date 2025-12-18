"use client";
import React from 'react';
import { ShieldCheck, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthGaugeProps {
    label: string;
    value: number;
    subtext: string;
    color: 'emerald' | 'indigo' | 'amber';
}

const HealthGauge = ({ label, value, subtext, color }: HealthGaugeProps) => {
    const colorClasses = {
        emerald: 'text-emerald-500 bg-emerald-500',
        indigo: 'text-indigo-500 bg-indigo-500',
        amber: 'text-amber-500 bg-amber-500',
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</div>
                    <div className="text-2xl font-black text-gray-900 leading-none">{value}%</div>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">{subtext}</div>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", colorClasses[color].split(' ')[1])}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

export const MigrationHealth = () => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    Migration Health
                </h3>
                <p className="text-xs text-gray-500 mt-1 italic">A live health check for your migration, alerting you to logic gaps before they become bugs.</p>
            </div>

            <div className="space-y-6">
                <HealthGauge
                    label="Logic Parity"
                    value={94}
                    subtext="Verified"
                    color="emerald"
                />
                <HealthGauge
                    label="Data Coverage"
                    value={68}
                    subtext="Mapped"
                    color="indigo"
                />
                <HealthGauge
                    label="Risk Score"
                    value={12}
                    subtext="Low Confidence"
                    color="amber"
                />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={14} />
                    +4.2% since last snapshot
                </div>
                <button className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest">
                    View Full Audit
                </button>
            </div>
        </div>
    );
};
