import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PasswordOptions, NotContainOptions, InsertOptions, ModifyOptions } from '@/types';

interface PasswordOptionsProps {
  tool: 'pass-optimiser' | 'insert-text' | 'modify' | 'pass-not-contain';
  passwordOptions: PasswordOptions;
  notContainOptions: NotContainOptions;
  insertOptions: InsertOptions;
  modifyOptions: ModifyOptions;
  onPasswordOptionsChange: (options: PasswordOptions) => void;
  onNotContainOptionsChange: (options: NotContainOptions) => void;
  onInsertOptionsChange: (options: InsertOptions) => void;
  onModifyOptionsChange: (options: ModifyOptions) => void;
}

export const PasswordOptionsPanel: React.FC<PasswordOptionsProps> = ({
  tool,
  passwordOptions,
  notContainOptions,
  insertOptions,
  modifyOptions,
  onPasswordOptionsChange,
  onNotContainOptionsChange,
  onInsertOptionsChange,
  onModifyOptionsChange,
}) => {
  if (tool === 'pass-optimiser') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Password Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="length"
                checked={passwordOptions.length}
                onCheckedChange={(checked) => 
                  onPasswordOptionsChange({ ...passwordOptions, length: checked as boolean })
                }
              />
              <Label htmlFor="length">Filter by Length</Label>
            </div>
            
            {passwordOptions.length && (
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="min" className="w-12">Min:</Label>
                  <Input
                    id="min"
                    type="number"
                    min="0"
                    max="999"
                    value={passwordOptions.min || ''}
                    onChange={(e) => 
                      onPasswordOptionsChange({ ...passwordOptions, min: parseInt(e.target.value) || undefined })
                    }
                    className="w-24"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="max" className="w-12">Max:</Label>
                  <Input
                    id="max"
                    type="number"
                    min="0"
                    max="999"
                    value={passwordOptions.max || ''}
                    onChange={(e) => 
                      onPasswordOptionsChange({ ...passwordOptions, max: parseInt(e.target.value) || undefined })
                    }
                    className="w-24"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Must Contain:</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={passwordOptions.uppercase}
                  onCheckedChange={(checked) => 
                    onPasswordOptionsChange({ ...passwordOptions, uppercase: checked as boolean })
                  }
                />
                <Label htmlFor="uppercase">Uppercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={passwordOptions.lowercase}
                  onCheckedChange={(checked) => 
                    onPasswordOptionsChange({ ...passwordOptions, lowercase: checked as boolean })
                  }
                />
                <Label htmlFor="lowercase">Lowercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="number"
                  checked={passwordOptions.number}
                  onCheckedChange={(checked) => 
                    onPasswordOptionsChange({ ...passwordOptions, number: checked as boolean })
                  }
                />
                <Label htmlFor="number">Number</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbol"
                  checked={passwordOptions.symbol}
                  onCheckedChange={(checked) => 
                    onPasswordOptionsChange({ ...passwordOptions, symbol: checked as boolean })
                  }
                />
                <Label htmlFor="symbol">Symbol</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tool === 'insert-text') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Insert Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={insertOptions.position}
            onValueChange={(value) => onInsertOptionsChange({ ...insertOptions, position: value as 'before' | 'after' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="before" id="before" />
              <Label htmlFor="before">Before password</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="after" id="after" />
              <Label htmlFor="after">After password</Label>
            </div>
          </RadioGroup>
          
          <div className="space-y-2">
            <Label htmlFor="text">Text to insert:</Label>
            <Input
              id="text"
              type="text"
              value={insertOptions.text}
              onChange={(e) => onInsertOptionsChange({ ...insertOptions, text: e.target.value })}
              placeholder="Enter text..."
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tool === 'modify') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Modify First Character</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={modifyOptions.type}
            onValueChange={(value) => onModifyOptionsChange({ type: value as 'uppercase' | 'lowercase' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="uppercase" id="uppercase-mod" />
              <Label htmlFor="uppercase-mod">Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lowercase" id="lowercase-mod" />
              <Label htmlFor="lowercase-mod">Lowercase</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    );
  }

  if (tool === 'pass-not-contain') {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Must Not Contain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="not-uppercase"
                checked={notContainOptions.notUppercase}
                onCheckedChange={(checked) => 
                  onNotContainOptionsChange({ ...notContainOptions, notUppercase: checked as boolean })
                }
              />
              <Label htmlFor="not-uppercase">Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="not-lowercase"
                checked={notContainOptions.notLowercase}
                onCheckedChange={(checked) => 
                  onNotContainOptionsChange({ ...notContainOptions, notLowercase: checked as boolean })
                }
              />
              <Label htmlFor="not-lowercase">Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="not-number"
                checked={notContainOptions.notNumber}
                onCheckedChange={(checked) => 
                  onNotContainOptionsChange({ ...notContainOptions, notNumber: checked as boolean })
                }
              />
              <Label htmlFor="not-number">Number</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="not-symbol"
                checked={notContainOptions.notSymbol}
                onCheckedChange={(checked) => 
                  onNotContainOptionsChange({ ...notContainOptions, notSymbol: checked as boolean })
                }
              />
              <Label htmlFor="not-symbol">Symbol</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};