import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Upload, FileText, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import * as textProcessing from '@/utils/textProcessing';
import { Tool } from '@/types';

interface FileProcessorProps {
  activeTool: Tool;
  passwordOptions?: any;
  mailFilterOptions?: any;
  removeListOptions?: any;
  insertOptions?: any;
  modifyOptions?: any;
  notContainOptions?: any;
  comboOptimizerOptions?: any;
  ulpCleanerOptions?: any;
}

export const FileProcessor: React.FC<FileProcessorProps> = ({
  activeTool,
  passwordOptions,
  mailFilterOptions,
  removeListOptions,
  insertOptions,
  modifyOptions,
  notContainOptions,
  comboOptimizerOptions,
  ulpCleanerOptions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [preview, setPreview] = useState<string>('');

  const PREVIEW_LIMIT = 1000; // Show only first 1000 characters

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setProcessedContent('');
    setPreview('');

    // Create preview with better error handling
    try {
      // Check file type - be more flexible with file extensions
      const allowedExtensions = ['.txt', '.log', '.csv', '.json', '.xml', '.html', '.md', '.js', '.ts', '.py', '.java', '.cpp', '.c', '.h', '.php', '.rb', '.go', '.rs', '.sql', '.sh', '.bat', '.ps1'];
      const hasValidExtension = allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      
      if (!file.type.includes('text') && !file.type.includes('application/json') && !file.type.includes('application/xml') && !hasValidExtension) {
        toast({
          title: "Unsupported file type",
          description: "Please select a text-based file. Supported formats: .txt, .log, .csv, .json, .xml, .html, .md, .js, .ts, .py, .java, .cpp, .c, .h, .php, .rb, .go, .rs, .sql, .sh, .bat, .ps1",
          variant: "destructive",
        });
        return;
      }

      // Read file with different methods
      let text: string;
      
      try {
        // Try reading as text first
        text = await file.text();
      } catch (textError) {
        try {
          // If text() fails, try reading as ArrayBuffer and converting
          const arrayBuffer = await file.arrayBuffer();
          const decoder = new TextDecoder('utf-8', { fatal: false });
          text = decoder.decode(arrayBuffer);
        } catch (bufferError) {
          throw new Error('Unable to read file content');
        }
      }

      // Validate that we got some content
      if (!text || text.length === 0) {
        throw new Error('File appears to be empty');
      }

      const previewText = text.length > PREVIEW_LIMIT 
        ? text.substring(0, PREVIEW_LIMIT) + '...' 
        : text;
      setPreview(previewText);
      
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);
      toast({
        title: "File loaded! 📂",
        description: `${file.name} (${fileSizeMB}MB) loaded successfully`,
      });
    } catch (error) {
      console.error('File reading error:', error);
      setSelectedFile(null);
      setPreview('');
      toast({
        title: "Error loading file",
        description: error instanceof Error ? error.message : "Failed to read the file content. Please try a different file.",
        variant: "destructive",
      });
    }
  };

  const processFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Read file with better error handling
      let text: string;
      try {
        text = await selectedFile.text();
      } catch (readError) {
        clearInterval(progressInterval);
        setIsProcessing(false);
        setProcessingProgress(0);
        toast({
          title: "Error reading file",
          description: "The file could not be read. Please check if the file is corrupted or try a different file.",
          variant: "destructive",
        });
        return;
      }
      
      setProcessingProgress(50);

      let result = text;

      // Process based on active tool
      switch (activeTool) {
        case 'combo-optimiser':
          result = textProcessing.comboOptimiser(text, comboOptimizerOptions || {});
          break;
        case 'ulp-cleaner':
          result = textProcessing.ulpCleaner(text, ulpCleanerOptions || {});
          break;
        case 'capture-remover':
          result = textProcessing.captureRemover(text);
          break;
        case 'remove-duplicate':
          result = textProcessing.removeDuplicates(text);
          break;
        case 'get-duplicate':
          result = textProcessing.getDuplicates(text);
          break;
        case 'randomize':
          result = textProcessing.randomize(text);
          break;
        case 'remove-empty-lines':
          result = textProcessing.removeEmptyLines(text);
          break;
        case 'sort-lines':
          result = textProcessing.sortLines(text);
          break;
        case 'email-to-user':
          result = textProcessing.emailToUser(text);
          break;
        case 'email-to-email':
          result = textProcessing.emailToEmail(text);
          break;
        case 'pass-optimiser':
          result = textProcessing.passwordOptimiser(text, passwordOptions || {});
          break;
        case 'insert-text':
          if (!insertOptions?.text) {
            toast({
              title: "Missing text",
              description: "Please enter text to insert",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          result = textProcessing.insertText(text, insertOptions);
          break;
        case 'modify':
          result = textProcessing.modifyPassword(text, modifyOptions || {});
          break;
        case 'not-contain':
          result = textProcessing.passwordNotContain(text, notContainOptions || {});
          break;
        case 'mailfilter-default':
          result = textProcessing.mailFilterDefault(text, mailFilterOptions || {});
          break;
        case 'multi-domain':
          const multiResult = textProcessing.multiDomainFilter(text, mailFilterOptions || {});
          result = Object.entries(multiResult)
            .map(([domain, content]) => `=== ${domain} ===\n${content}`)
            .join('\n\n');
          break;
        case 'remove-list-default':
          const removeResult = textProcessing.removeListDefault(text, removeListOptions || {});
          result = removeResult.main;
          if (removeResult.removed) {
            result += '\n\n=== REMOVED ITEMS ===\n' + removeResult.removed;
          }
          break;
        default:
          result = text;
      }

      clearInterval(progressInterval);
      setProcessingProgress(100);
      setProcessedContent(result);

      // Update preview with processed content
      const previewText = result.length > PREVIEW_LIMIT 
        ? result.substring(0, PREVIEW_LIMIT) + '...' 
        : result;
      setPreview(previewText);

      toast({
        title: "Processing complete! ✨",
        description: `File processed successfully. ${result.split('\n').length} lines processed.`,
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing the file. Please try again or check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const handleDownload = () => {
    if (!processedContent) return;

    const blob = new Blob([processedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = selectedFile ? `processed_${selectedFile.name}` : 'processed_output.txt';
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded! 💾",
      description: "Processed file has been downloaded successfully",
    });
  };

  const handleClear = () => {
    setSelectedFile(null);
    setProcessedContent('');
    setPreview('');
    setProcessingProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Cleared! 🧹",
      description: "File processor has been cleared",
    });
  };

  const getFileStats = () => {
    if (!selectedFile) return null;
    
    const originalLines = preview.split('\n').length;
    const processedLines = processedContent ? processedContent.split('\n').length : 0;
    
    const fileSizeKB = selectedFile.size / 1024;
    const fileSizeMB = fileSizeKB / 1024;
    
    return {
      fileName: selectedFile.name,
      fileSize: fileSizeMB >= 1 ? `${fileSizeMB.toFixed(1)}MB` : `${fileSizeKB.toFixed(1)}KB`,
      originalLines,
      processedLines,
      reduction: processedContent ? Math.round((1 - processedLines / originalLines) * 100) : 0
    };
  };

  const stats = getFileStats();

  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in-delayed">
      <Card className="border-dashed border-2 border-muted-foreground/25 hover-lift animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 animate-slide-in-right">
            <FileText className="h-5 w-5 animate-float" />
            File Processor
          </CardTitle>
          <CardDescription className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Upload large text files for processing. Only a preview is shown to prevent crashes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Selection */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleFileSelect}
              variant="outline"
              className="h-24 border-dashed border-2 hover:border-primary hover:bg-primary/5 hover-lift animate-bounce-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="mt-1">
                  <Upload className="h-6 w-6 animate-float" />
                </div>
                <span className="text-sm">
                  {selectedFile ? 'Select another file' : 'Click to upload file'}
                </span>
                <span className="text-xs text-muted-foreground">
                  Unlimited file size
                </span>
              </div>
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.log,.csv,.json,.xml,.html,.md,.js,.ts,.py,.java,.cpp,.c,.h,.php,.rb,.go,.rs,.sql,.sh,.bat,.ps1"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Info */}
            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats?.fileSize} • {stats?.originalLines} lines
                  </p>
                </div>
                <Badge variant="secondary">
                  {selectedFile.type || 'text/plain'}
                </Badge>
              </div>
            )}
          </div>

          {/* Processing Controls */}
          {selectedFile && (
            <div className="flex gap-2">
              <Button
                onClick={processFile}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Process File
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownload}
                disabled={!processedContent}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
              >
                Clear
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing file...</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}

          {/* Results Stats */}
          {processedContent && stats && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.processedLines}
                </p>
                <p className="text-xs text-muted-foreground">Processed Lines</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.reduction}%
                </p>
                <p className="text-xs text-muted-foreground">Reduction</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      {(preview || processedContent) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Preview {processedContent ? '(Processed)' : '(Original)'}
            </CardTitle>
            <CardDescription>
              Showing first {PREVIEW_LIMIT} characters to prevent crashes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className={cn(
                "text-xs font-mono bg-muted/50 p-4 rounded-lg max-h-60 overflow-auto",
                "border border-border/50"
              )}>
                {preview}
              </pre>
              {(processedContent || preview).length > PREVIEW_LIMIT && (
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Preview only
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
