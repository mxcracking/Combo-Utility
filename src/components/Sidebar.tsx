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
  'combo-optimiser': <Filter className="w-5 h-5" />,
  'ulp-cleaner': <Filter className="w-5 h-5" />,
  'capture-remover': <XCircle className="w-5 h-5" />,
  'remove-duplicate': <Hash className="w-5 h-5" />,
  'get-duplicate': <Copy className="w-5 h-5" />,
  'randomize': <Shuffle className="w-5 h-5" />,
  'remove-empty-lines': <Minus className="w-5 h-5" />,
  'sort-lines': <SortAsc className="w-5 h-5" />,
  'email-to-user': <User className="w-5 h-5" />,
  'email-to-email': <Mail className="w-5 h-5" />,
  'pass-optimiser': <Key className="w-5 h-5" />,
  'insert-text': <Type className="w-5 h-5" />,
  'modify': <Edit3 className="w-5 h-5" />,
  'pass-not-contain': <XCircle className="w-5 h-5" />,
  'mailfilter-default': <AtSign className="w-5 h-5" />,
  'multi-domain': <List className="w-5 h-5" />,
  'removelist-default': <Trash2 className="w-5 h-5" />,
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
    <aside className="w-56 border-r border-border bg-sidebar-background/50 backdrop-blur-sm shadow-xl">
      <div className="p-4">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-foreground mb-2">Tools</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>

        {/* Tools List */}
        <div className="space-y-2">
          {currentTools.map((tool, index) => (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
              className={cn(
                "w-full group relative overflow-hidden rounded-xl transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
                  activeTool === tool.id
                    ? "bg-gradient-to-r from-primary to-accent shadow-xl shadow-primary/25"
                    : "bg-sidebar-accent/60 hover:bg-sidebar-accent/80 border border-border/50"
              )}
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                  activeTool === tool.id
                    ? "bg-background/20 text-background shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-md group-hover:shadow-primary/20"
                )}>
                  {toolIcons[tool.id]}
                </div>
                
                <div className="flex-1 text-left">
                  <span className={cn(
                    "font-semibold transition-all duration-300",
                    activeTool === tool.id
                      ? "text-background text-base"
                      : "text-foreground group-hover:text-foreground text-sm"
                  )}>
                    {tool.label}
                  </span>
                </div>

                {activeTool === tool.id && (
                  <div className="w-2 h-2 bg-background rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Active indicator */}
              {activeTool === tool.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-border/50">
          <div className="flex justify-center gap-4">
            {/* Dein Discord Server - D (Sakura) */}
            <a 
              href="https://discord.desync.top/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              title="Discord Server (D)"
            >
              <span className="text-white font-bold text-xs">D</span>
            </a>
            
            {/* Anderer Discord Server - K (Schwarz-Grau) */}
            <a 
              href="https://discord.gg/jdRTBGcaNp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
              title="Discord Server (K)"
            >
              <span className="text-white font-bold text-xs">K</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};