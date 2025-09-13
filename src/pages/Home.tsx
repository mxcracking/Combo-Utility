import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Zap, ArrowRight, Github } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-fade-in" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary to-accent animate-pulse-slow">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ComboUtility
              </span>
              <span className="block text-2xl md:text-3xl mt-2 text-muted-foreground font-normal">
                Professional Text Processing Toolkit ⚡
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform, filter, and optimize your text data with powerful tools designed for efficiency and precision.
            </p>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate('/app', { replace: true })}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-button text-primary-foreground px-8 hover-glow group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-2">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/10 hover:border-primary"
                onClick={() => window.open('https://github.com/mxcracking/Combo-Utility-v1', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p className="hover-glow cursor-default">Built with 💛 for developers and data professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};