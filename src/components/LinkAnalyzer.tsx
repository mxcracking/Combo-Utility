import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Download, CheckCircle, AlertTriangle, Zap, Link, Plus, X } from 'lucide-react';
import { analyzeAndRemoveLinks } from '@/utils/textProcessing';

interface LinkAnalyzerProps {
  processedText: string;
  onAnalyzeComplete: (cleanedText: string, removedLinks: string[]) => void;
}

export const LinkAnalyzer: React.FC<LinkAnalyzerProps> = ({ processedText, onAnalyzeComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    hasLinks: boolean;
    linkCount: number;
    cleanedText: string;
    removedLinks: string[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [customDomains, setCustomDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');

  const handleAnalyze = async () => {
    // Check if there's processed text to analyze
    if (!processedText || processedText.trim() === '') {
      // Show "Process first" message
      setAnalysisResult({
        hasLinks: false,
        linkCount: 0,
        cleanedText: '',
        removedLinks: []
      });
      setShowResults(true);
      return;
    }
    
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Dramatic delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeAndRemoveLinks(processedText, customDomains);
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setShowResults(true);
    
    if (result.hasLinks) {
      onAnalyzeComplete(result.cleanedText, result.removedLinks);
    }
  };

  const downloadCleanedText = () => {
    if (!analysisResult) return;
    
    const blob = new Blob([analysisResult.cleanedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_credentials.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addCustomDomain = () => {
    if (newDomain.trim() && !customDomains.includes(newDomain.trim())) {
      setCustomDomains([...customDomains, newDomain.trim()]);
      setNewDomain('');
    }
  };

  const removeCustomDomain = (domain: string) => {
    setCustomDomains(customDomains.filter(d => d !== domain));
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Analyze</CardTitle>
          <CardDescription>
            After-process you can analyze and clean credentials. Your task is to clean and normalize input lines into valid credential pairs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-domain">Custom Domains</Label>
            <div className="flex space-x-2">
              <Input
                id="custom-domain"
                placeholder="e.g., example.com, mysite.org"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomDomain()}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomDomain}
                disabled={!newDomain.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {customDomains.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {customDomains.map((domain) => (
                  <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                    {domain}
                    <button
                      onClick={() => removeCustomDomain(domain)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Start Analysis</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-pulse">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Analysis in progress...</h3>
                <p className="text-muted-foreground">Extracting credentials from URLs</p>
                <div className="mt-2 flex space-x-1">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showResults && analysisResult && (
        <div className="space-y-4">
          {!processedText || processedText.trim() === '' ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Process first</strong> - Please process some text before analyzing.
              </AlertDescription>
            </Alert>
          ) : analysisResult.hasLinks ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Credentials extracted!</strong> {analysisResult.linkCount} URLs processed.
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {analysisResult.linkCount} URLs
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>No URLs found</strong> in the processed data.
              </AlertDescription>
            </Alert>
          )}

          {analysisResult.hasLinks && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Analysis Complete</span>
                </CardTitle>
                <CardDescription>
                  Credentials extracted and normalized to user:pass format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg border">
                      <div className="font-medium">URLs processed:</div>
                      <div className="font-semibold">{analysisResult.linkCount}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg border">
                      <div className="font-medium">Credentials extracted:</div>
                      <div className="font-semibold">
                        {analysisResult.cleanedText.split('\n').filter(line => line.trim() && line !== 'NO_CREDENTIALS_FOUND').length}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={downloadCleanedText}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Extracted Credentials
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
