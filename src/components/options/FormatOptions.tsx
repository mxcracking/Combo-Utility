import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OutputFormat } from '@/types';

interface FormatOptionsProps {
  outputFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
  title?: string;
  description?: string;
}

export const FormatOptions: React.FC<FormatOptionsProps> = ({
  outputFormat,
  onFormatChange,
  title = "Output Format",
  description = "Choose the format for the processed output"
}) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={outputFormat}
          onValueChange={(value) => onFormatChange(value as OutputFormat)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email:pass" id="email-pass" />
            <Label htmlFor="email-pass" className="flex-1 cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">Email:Password</span>
                <span className="text-sm text-muted-foreground">
                  Keep original email:password format
                </span>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user:pass" id="user-pass" />
            <Label htmlFor="user-pass" className="flex-1 cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">User:Password</span>
                <span className="text-sm text-muted-foreground">
                  Extract username:password from email:password or URL:username:password
                </span>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="flex-1 cursor-pointer">
              <div className="flex flex-col">
                <span className="font-medium">Both Formats</span>
                <span className="text-sm text-muted-foreground">
                  Output both original and username:password formats
                </span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
