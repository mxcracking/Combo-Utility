import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RemoveListOptions } from '@/types';

interface RemoveListOptionsProps {
  options: RemoveListOptions;
  onOptionsChange: (options: RemoveListOptions) => void;
}

export const RemoveListOptionsPanel: React.FC<RemoveListOptionsProps> = ({
  options,
  onOptionsChange,
}) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Remove List Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="list">List (one item per line):</Label>
          <Textarea
            id="list"
            value={options.list}
            onChange={(e) => onOptionsChange({ ...options, list: e.target.value })}
            placeholder="Enter items to remove..."
            className="min-h-[120px] font-mono text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="removed"
              checked={options.removed}
              onCheckedChange={(checked) => 
                onOptionsChange({ ...options, removed: checked as boolean })
              }
            />
            <Label htmlFor="removed">Show removed items</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exact-match-remove"
              checked={options.exactMatch}
              onCheckedChange={(checked) => 
                onOptionsChange({ ...options, exactMatch: checked as boolean })
              }
            />
            <Label htmlFor="exact-match-remove">Exact Match</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};