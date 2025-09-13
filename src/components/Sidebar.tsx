import React from 'react';
import { cn } from '@/lib/utils';
import { Tool, ToolCategory } from '@/types';
import { 
  Filter, Hash, Shuffle, Copy, Minus, SortAsc, Mail, User,
  Key, Type, Edit3, XCircle, AtSign, List, Trash2
} from 'lucide-react';

interface SidebarProps {
  activeCategory: ToolCategory;
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const toolIcons: Record<Tool, React.ReactNode> = {
  'combo-optimiser': <><Filter className="w-4 h-4" /> <span className="text-xs">🎯</span></>,
  'ulp-cleaner': <><Filter className="w-4 h-4" /> <span className="text-xs">🧹</span></>,
  'capture-remover': <><XCircle className="w-4 h-4" /> <span className="text-xs">✂️</span></>,
  'remove-duplicate': <><Hash className="w-4 h-4" /> <span className="text-xs">🔍</span></>,
  'get-duplicate': <><Copy className="w-4 h-4" /> <span className="text-xs">📋</span></>,
  'randomize': <><Shuffle className="w-4 h-4" /> <span className="text-xs">🎲</span></>,
  'remove-empty-lines': <><Minus className="w-4 h-4" /> <span className="text-xs">🧹</span></>,
  'sort-lines': <><SortAsc className="w-4 h-4" /> <span className="text-xs">📊</span></>,
  'email-to-user': <><User className="w-4 h-4" /> <span className="text-xs">👤</span></>,
  'email-to-email': <><Mail className="w-4 h-4" /> <span className="text-xs">📧</span></>,
  'pass-optimiser': <><Key className="w-4 h-4" /> <span className="text-xs">🔐</span></>,
  'insert-text': <><Type className="w-4 h-4" /> <span className="text-xs">✏️</span></>,
  'modify': <><Edit3 className="w-4 h-4" /> <span className="text-xs">🔧</span></>,
  'pass-not-contain': <><XCircle className="w-4 h-4" /> <span className="text-xs">🚫</span></>,
  'mailfilter-default': <><AtSign className="w-4 h-4" /> <span className="text-xs">📬</span></>,
  'multi-domain': <><List className="w-4 h-4" /> <span className="text-xs">🌐</span></>,
  'removelist-default': <><Trash2 className="w-4 h-4" /> <span className="text-xs">🗑️</span></>,
};

const tools: Record<ToolCategory, { id: Tool; label: string }[]> = {
  'combo-filter': [
    { id: 'combo-optimiser', label: 'Combo Optimiser' },
    { id: 'ulp-cleaner', label: 'ULP Cleaner' },
    { id: 'capture-remover', label: 'Capture Remover' },
    { id: 'remove-duplicate', label: 'Remove Duplicate' },
    { id: 'get-duplicate', label: 'Get Duplicate' },
    { id: 'randomize', label: 'Randomize' },
    { id: 'remove-empty-lines', label: 'Remove Empty Lines' },
    { id: 'sort-lines', label: 'Sort Lines' },
    { id: 'email-to-user', label: 'Email:Pass→ User:Pass' },
    { id: 'email-to-email', label: 'Email:Pass→ Email' },
  ],
  'password-tools': [
    { id: 'pass-optimiser', label: 'Pass Optimiser' },
    { id: 'insert-text', label: 'Insert Text' },
    { id: 'modify', label: 'Modify' },
    { id: 'pass-not-contain', label: 'Not Contains' },
  ],
  'mail-filter': [
    { id: 'mailfilter-default', label: 'Mail Filter' },
    { id: 'multi-domain', label: 'Multi-Domain' },
  ],
  'remove-list': [
    { id: 'removelist-default', label: 'Remove List' },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, activeTool, onToolChange }) => {
  const currentTools = tools[activeCategory];

  return (
    <aside className="w-64 border-r border-border bg-sidebar-background/50 backdrop-blur-sm animate-slide-in-left">
      <div className="p-4 space-y-2">
        {currentTools.map((tool, index) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            style={{ animationDelay: `${index * 0.06}s` }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 animate-slide-in-right",
              "hover:bg-sidebar-accent group hover-lift relative overflow-hidden",
              "border border-transparent hover:border-primary/20",
              activeTool === tool.id
                ? "bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 shadow-glow animate-glow"
                : ""
            )}
          >
            <span className={cn(
              "flex items-center gap-1 transition-all duration-300 relative z-10",
              activeTool === tool.id ? "text-primary scale-110 animate-bounce-in" : "text-muted-foreground group-hover:text-foreground group-hover:scale-105"
            )}>
              {toolIcons[tool.id]}
            </span>
            <span className={cn(
              "text-sm font-medium transition-all duration-300 relative z-10",
              activeTool === tool.id ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {tool.label}
            </span>
            {activeTool === tool.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse-slow" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};