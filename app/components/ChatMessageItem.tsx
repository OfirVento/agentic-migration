import React, { useState, useEffect } from 'react';
import { User, Layers, Radio, Search, Play, CheckCircle, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypewriterText } from './TypewriterText';
import { AgentRole, ChatMessage, useDemo } from './DemoContext';
import { TaskCard } from '../page'; // We'll need to export TaskCard from page.tsx or move it

// Re-using logic from page.tsx for Avatar
const AgentAvatar = ({ role, displayName, avatarUrl }: { role: AgentRole, displayName?: string, avatarUrl?: string }) => {
    const roleColors: Record<string, string> = {
        'system': 'bg-gray-700 text-gray-300',
        'assistant': 'bg-blue-600/20 text-blue-400',
        'user': 'bg-purple-600 text-white',
        'Navigator': 'bg-purple-100 text-purple-700',
        'Scanner': 'bg-blue-100 text-blue-700',
        'Coach': 'bg-pink-100 text-pink-700',
        'Planner': 'bg-amber-100 text-amber-700',
        'Translator': 'bg-indigo-100 text-indigo-700',
        'Prover': 'bg-emerald-100 text-emerald-700',
        'Runner': 'bg-slate-100 text-slate-700',
    };

    const icons: any = {
        Navigator: Layers,
        Scanner: Search,
        Coach: User,
        Planner: Radio,
        Translator: ArrowRight,
        Prover: CheckCircle,
        Runner: Play,
        system: Bot,
        assistant: Bot,
        user: User
    };

    if (avatarUrl) {
        return (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-900/20 shrink-0">
                <span className="text-xs font-bold text-white">G3</span>
            </div>
        );
    }

    const Icon = icons[role] || Bot;

    return (
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", roleColors[role] || roleColors['assistant'])}>
            <Icon size={16} />
        </div>
    );
};

const ReasoningBlock = ({ steps }: { steps: string[] }) => {
    const [isOpen, setIsOpen] = useState(true);
    if (!steps || steps.length === 0) return null;

    return (
        <div className="mb-3 rounded-lg border border-indigo-100 bg-indigo-50/50 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
                <span className="flex-1 text-left flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Reasoning Process
                </span>
                <span className="text-[10px] opacity-70">{isOpen ? 'Hide' : 'Show'}</span>
            </button>

            {isOpen && (
                <div className="px-3 pb-3 space-y-1.5">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-2 text-xs text-indigo-800/80 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                            <span className="opacity-50 select-none">•</span>
                            <span>{step}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface ChatMessageItemProps {
    msg: ChatMessage;
    isLast: boolean;
}

export const ChatMessageItem = ({ msg, isLast }: ChatMessageItemProps) => {
    const { transitionTo, handleAction, tasksHistory } = useDemo();
    const [showActions, setShowActions] = useState(!isLast); // Show immediately if not last

    // If it WAS last but now isn't, ensure actions are shown
    useEffect(() => {
        if (!isLast) setShowActions(true);
    }, [isLast]);

    const handleTypingComplete = React.useCallback(() => {
        setShowActions(true);
    }, []);

    return (
        <div className={cn("flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
        )}>
            {msg.role !== 'user' && <AgentAvatar role={msg.role} displayName={msg.agentName} avatarUrl={msg.avatar} />}

            <div className={cn("flex flex-col max-w-[85%]",
                msg.role === 'user' ? "items-end" : "items-start"
            )}>
                {msg.role !== 'user' && (
                    <span className="text-xs font-semibold text-gray-500 mb-1 ml-1">{msg.agentName}</span>
                )}

                {msg.reasoning && <ReasoningBlock steps={msg.reasoning} />}

                <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all",
                    msg.role === 'user'
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                )}>
                    {msg.role === 'user' ? (
                        msg.content
                    ) : (
                        <TypewriterText
                            text={msg.content}
                            isActive={isLast}
                            onComplete={handleTypingComplete}
                        />
                    )}
                </div>

                {/* INLINE TASK CARD */}
                {msg.meta?.taskId && tasksHistory?.[msg.meta.taskId] && (
                    <div className="mt-4 w-full">
                        <TaskCard task={tasksHistory[msg.meta.taskId]} />
                    </div>
                )}

                {/* ACTIONS - Only show if showActions is true */}
                {msg.actions && (
                    <div className={cn("flex flex-wrap gap-2 mt-3 w-full transition-opacity duration-500",
                        showActions ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}>
                        {msg.actions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (action.next_state) {
                                        transitionTo(action.next_state);
                                    } else if (action.action_id) {
                                        handleAction(action.action_id);
                                    } else if (action.effect === 'toast') {
                                        alert(`${action.label} - This feature is coming soon!`);
                                    }
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all group shadow-sm"
                            >
                                {action.label}
                                <ArrowRight size={12} className="opacity-50 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
