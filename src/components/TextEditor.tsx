import React, { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Download, Copy, Play, Loader2, Upload, Trash2, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onProcess: () => void;
  isProcessing?: boolean;
  placeholder?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ 
  value, 
  onChange, 
  onProcess, 
  isProcessing = false,
  placeholder = "Paste your text here... 📝"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      onChange(text);
      toast({
        title: "Imported! 📂",
        description: `${file.name} loaded successfully`,
      });
    }
  };

  const handleClear = () => {
    onChange('');
    toast({
      title: "Cleared! 🧹",
      description: "Text area has been cleared",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'output.txt';
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Downloaded! 💾",
      description: "File has been downloaded successfully",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied! 📋",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const lineCount = value.split('\n').length;
  const charCount = value.length;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="relative flex-1 group">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full h-full min-h-[400px] font-mono text-sm resize-none",
            "bg-card/50 backdrop-blur-sm border-border/50",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-all duration-300 animate-fade-in"
          )}
        />
        {value && (
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity animate-slide-in-right">
            <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              📊 {lineCount} lines
            </span>
            <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              ✏️ {charCount} chars
            </span>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.log,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex gap-2">
        <Button
          onClick={onProcess}
          disabled={!value || isProcessing}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-button animate-scale-in hover-scale"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing... ⚙️
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Process ✨
            </>
          )}
        </Button>
        <Button
          onClick={handleImport}
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:border-primary animate-fade-in hover-scale"
          title="Import file"
        >
          <Upload className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleClear}
          disabled={!value}
          variant="outline"
          size="icon"
          className="hover:bg-destructive/10 hover:border-destructive animate-fade-in hover-scale"
          title="Clear text"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleCopy}
          disabled={!value}
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:border-primary animate-fade-in hover-scale"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!value}
          variant="outline"
          size="icon"
          className="hover:bg-primary/10 hover:border-primary animate-fade-in hover-scale"
          title="Download file"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};