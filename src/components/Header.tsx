import React from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { ToolCategory } from '@/types';

interface HeaderProps {
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
}

const categories: { id: ToolCategory; label: string }[] = [
  { id: 'combo-filter', label: 'Combo Filter' },
  { id: 'password-tools', label: 'Password Tools' },
  { id: 'mail-filter', label: 'Mail Filter' },
  { id: 'remove-list', label: 'Remove List' },
];

export const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-card/80 border-b border-border animate-slide-in-up">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-bounce-in">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent animate-float hover-glow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-left animate-shimmer">
              ComboUtility
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                style={{ animationDelay: `${index * 0.08}s` }}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 animate-slide-in-right hover-lift",
                  "relative overflow-hidden group",
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-button animate-glow"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground hover:shadow-md"
                )}
              >
                <span className="relative z-10">{category.label}</span>
                {activeCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-slow" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};