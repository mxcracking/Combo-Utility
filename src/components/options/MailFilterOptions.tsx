import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MailFilterOptions } from '@/types';

interface MailFilterOptionsProps {
  tool: 'mailfilter-default' | 'multi-domain';
  options: MailFilterOptions;
  onOptionsChange: (options: MailFilterOptions) => void;
}

export const MailFilterOptionsPanel: React.FC<MailFilterOptionsProps> = ({
  tool,
  options,
  onOptionsChange,
}) => {
  if (tool === 'mailfilter-default') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Mail Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Domain name (e.g., @gmail.com):</Label>
            <Input
              id="domain"
              type="text"
              value={options.domain}
              onChange={(e) => onOptionsChange({ ...options, domain: e.target.value })}
              placeholder="@example.com"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exact-match"
              checked={options.exactMatch}
              onCheckedChange={(checked) => 
                onOptionsChange({ ...options, exactMatch: checked as boolean })
              }
            />
            <Label htmlFor="exact-match">Exact Match</Label>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tool === 'multi-domain') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Multi-Domain Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domains">Domain list (one per line):</Label>
            <Textarea
              id="domains"
              value={options.domains?.join('\n') || ''}
              onChange={(e) => onOptionsChange({ 
                ...options, 
                domains: e.target.value.split('\n').filter(d => d.trim()) 
              })}
              placeholder="@gmail.com&#10;@yahoo.com&#10;@hotmail.com"
              className="min-h-[120px] font-mono text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remaining"
                checked={options.remaining}
                onCheckedChange={(checked) => 
                  onOptionsChange({ ...options, remaining: checked as boolean })
                }
              />
              <Label htmlFor="remaining">Show remaining domains</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exact-match-multi"
                checked={options.exactMatch}
                onCheckedChange={(checked) => 
                  onOptionsChange({ ...options, exactMatch: checked as boolean })
                }
              />
              <Label htmlFor="exact-match-multi">Exact Match</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};