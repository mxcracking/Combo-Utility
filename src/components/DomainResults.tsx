import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DomainResultsProps {
  results: { [key: string]: string };
}

export const DomainResults: React.FC<DomainResultsProps> = ({ results }) => {
  const handleCopy = async (text: string, domain: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied! 📋",
        description: `${domain} results copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (text: string, domain: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${domain.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(results).map(([domain, text], index) => (
        <Card 
          key={domain} 
          className="bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in hover-scale"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {domain === 'remaining' ? '📦 Remaining Domains' : `🌐 ${domain}`}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover-scale"
                onClick={() => handleCopy(text, domain)}
                disabled={!text}
                title="Copy to clipboard"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover-scale"
                onClick={() => handleDownload(text, domain)}
                disabled={!text}
                title="Download file"
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              readOnly
              placeholder="No results found 🔍"
              className="min-h-[150px] font-mono text-xs"
            />
            {text && (
              <div className="mt-2 text-xs text-muted-foreground">
                📊 {text.split('\n').filter(l => l).length} lines
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};