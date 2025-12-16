"use client";
import { DemoProvider, useDemo } from './components/DemoContext';
import { AppShell } from './components/AppShell';
import React, { useRef, useEffect, useState } from 'react';
import { AgentRole, ChatMessage, AgentTask } from './components/DemoContext';
import { User, Layers, Radio, Search, Play, CheckCircle, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import { CanvasRegistry } from './components/modules/CanvasRegistry';
import { ChatMessageItem } from './components/ChatMessageItem';

// --- Placeholder Components for Chat and Canvas ---

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

  const icons = {
    Navigator: Layers,
    Scanner: Search,
    Coach: User,
    Planner: Radio,
    Translator: ArrowRight, // temp
    Prover: CheckCircle,
    Runner: Play,
    system: Bot,
    assistant: Bot,
    user: User
  };

  // If specific avatar provided (e.g. Gemini), show it or initial
  if (avatarUrl) {
    return (
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-900/20 shrink-0">
        <span className="text-xs font-bold text-white">G3</span>
      </div>
    );
  }

  // Default icons based on role
  const Icon = icons[role] || Bot;

  return (
    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", roleColors[role] || roleColors['assistant'])}>
      <Icon size={16} />
    </div>
  );
};

const ThinkingBubble = ({ label }: { label?: string }) => (
  <div className="flex gap-3 animate-pulse">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
      <div className="flex gap-0.5">
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
    <div className="text-sm text-gray-400 pt-1.5 italic">{label || "Thinking..."}</div>
  </div>
);

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

export const TaskCard = ({ task }: { task: AgentTask }) => {
  if (!task) return null;
  return (
    <div className="mb-6 mx-1 rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-gray-800">{task.title}</span>
        </div>
        <span className="text-xs font-mono text-gray-500">{task.status}</span>
      </div>

      {/* Steps */}
      <div className="p-4 space-y-3">
        {task.steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              {step.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
              {step.status === 'running' && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
              {step.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
            </div>
            <span className={cn(
              "text-sm transition-colors",
              step.status === 'completed' ? "text-gray-500" :
                step.status === 'running' ? "text-blue-700 font-medium" :
                  "text-gray-400"
            )}>
              {step.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatInput = () => {
  const { handleUserMessage, isTyping } = useDemo();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    handleUserMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Anything"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="absolute right-2 top-2 p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-0 disabled:pointer-events-none transition-all"
        >
          <ArrowRight size={16} />
        </button>
      </form>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 pointer-events-none">
        {/* Optional: Floating scroll to bottom indicator could go here */}
      </div>
    </div>
  );
};

const ChatArea = () => {
  const { chatHistory, isTyping, transitionTo, currentTask, tasksHistory, typingLabel, handleAction } = useDemo();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, currentTask]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Messages List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">

        {/* 1. Render all messages */}
        {chatHistory.map((msg, index) => (
          <ChatMessageItem
            key={msg.id}
            msg={msg}
            isLast={index === chatHistory.length - 1}
          />
        ))}

        {/* 2. Render the Active Task Card at the bottom ONLY if it is NOT already rendered inline */}
        {currentTask && !chatHistory.some(m => m.meta?.taskId === currentTask.id) && (
          <TaskCard task={currentTask} />
        )}

        {isTyping && <ThinkingBubble label={typingLabel || "Thinking..."} />}
        <div ref={bottomRef} />
      </div>

      {/* Sticky Input Area */}
      <ChatInput />
    </div>
  );
};

const CanvasArea = () => {
  return <CanvasRegistry />;
};

const Main = () => {
  return <AppShell chat={<ChatArea />} canvas={<CanvasArea />} />;
};

export default function Page() {
  return (
    <Main />
  );
}
