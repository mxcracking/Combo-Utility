import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Zap, Filter, Key, Mail, Trash2, ArrowRight, Github, Twitter } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Filter className="w-5 h-5" />,
      title: "Combo Filter",
      description: "Clean, optimize and transform your data",
      emoji: "🎯"
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Password Tools",
      description: "Validate and modify passwords efficiently",
      emoji: "🔐"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Mail Filter",
      description: "Filter emails by domain and criteria",
      emoji: "📧"
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: "Remove List",
      description: "Remove specific items from your lists",
      emoji: "🗑️"
    }
  ];

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

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 hover-scale animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    {feature.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      {feature.title}
                      <span>{feature.emoji}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              onClick={() => navigate('/app')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-button text-primary-foreground px-8 hover-scale group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-2">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/10 hover:border-primary"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/10 hover:border-primary"
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p>Built with 💛 for developers and data professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};