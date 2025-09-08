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
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-card/80 border-b border-border animate-fade-in">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-scale-in">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent animate-pulse-slow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-left">
              ComboUtility
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 animate-slide-in-right hover-scale",
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-button animate-pulse-slow"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};