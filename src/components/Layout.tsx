import React from 'react';
import { cn } from '@/lib/utils';
import { ParticleBackground } from '@/components/ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-fade-in" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      <div className="relative z-10 animate-fade-in">
        {children}
      </div>
    </div>
  );
};