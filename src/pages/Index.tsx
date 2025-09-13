import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TextEditor } from '@/components/TextEditor';
import { FileProcessor } from '@/components/FileProcessor';
import { PasswordOptionsPanel } from '@/components/options/PasswordOptions';
import { MailFilterOptionsPanel } from '@/components/options/MailFilterOptions';
import { RemoveListOptionsPanel } from '@/components/options/RemoveListOptions';
import { FormatOptions } from '@/components/options/FormatOptions';
import { DomainResults } from '@/components/DomainResults';
import { LinkAnalyzer } from '@/components/LinkAnalyzer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { FileText, Type } from 'lucide-react';
import {
  Tool,
  ToolCategory,
  PasswordOptions,
  NotContainOptions,
  InsertOptions,
  ModifyOptions,
  MailFilterOptions,
  RemoveListOptions,
  ComboOptimizerOptions,
  ULPCleanerOptions,
} from '@/types';
import * as textProcessing from '@/utils/textProcessing';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('combo-filter');
  const [activeTool, setActiveTool] = useState<Tool>('combo-optimiser');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [domainResults, setDomainResults] = useState<{ [key: string]: string }>({});
  const [removeListResult, setRemoveListResult] = useState<string>('');
  const [processingMode, setProcessingMode] = useState<'text' | 'file'>('text');
  const [showAnimations, setShowAnimations] = useState(false);
  const [processedText, setProcessedText] = useState<string>('');
  const [showLinkAnalyzer, setShowLinkAnalyzer] = useState(false);

  // Enable animations after a short delay to prevent interference with graphics
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimations(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Options states
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const [notContainOptions, setNotContainOptions] = useState<NotContainOptions>({
    notUppercase: false,
    notLowercase: false,
    notNumber: false,
    notSymbol: false,
  });

  const [insertOptions, setInsertOptions] = useState<InsertOptions>({
    position: 'before',
    text: '',
  });

  const [modifyOptions, setModifyOptions] = useState<ModifyOptions>({
    type: 'uppercase',
  });

  const [mailFilterOptions, setMailFilterOptions] = useState<MailFilterOptions>({
    domain: '',
    exactMatch: false,
    domains: [],
    remaining: false,
  });

  const [removeListOptions, setRemoveListOptions] = useState<RemoveListOptions>({
    list: '',
    removed: false,
    exactMatch: false,
  });

  const [comboOptimizerOptions, setComboOptimizerOptions] = useState<ComboOptimizerOptions>({
    outputFormat: 'email:pass',
  });

  const [ulpCleanerOptions, setULPCleanerOptions] = useState<ULPCleanerOptions>({
    outputFormat: 'email:pass',
  });

  const handleCategoryChange = (category: ToolCategory) => {
    setActiveCategory(category);
    setDomainResults({});
    setRemoveListResult('');
    
    // Set default tool for each category
    switch (category) {
      case 'combo-filter':
        setActiveTool('combo-optimiser');
        break;
      case 'password-tools':
        setActiveTool('pass-optimiser');
        break;
      case 'mail-filter':
        setActiveTool('mailfilter-default');
        break;
      case 'remove-list':
        setActiveTool('removelist-default');
        break;
    }
  };

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool);
    setDomainResults({});
    setRemoveListResult('');
  };

  const handleProcess = () => {
    if (!inputText.trim()) {
      toast({
        title: "No input",
        description: "Please enter some text to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    let result = inputText;
    setShowLinkAnalyzer(false);

    try {
      switch (activeTool) {
        // Combo Filter tools
        case 'combo-optimiser':
          result = textProcessing.comboOptimiser(inputText, comboOptimizerOptions);
          break;
        case 'ulp-cleaner':
          result = textProcessing.ulpCleaner(inputText, ulpCleanerOptions);
          break;
        case 'capture-remover':
          result = textProcessing.captureRemover(inputText);
          break;
        case 'remove-duplicate':
          result = textProcessing.removeDuplicates(inputText);
          break;
        case 'get-duplicate':
          result = textProcessing.getDuplicates(inputText);
          break;
        case 'randomize':
          result = textProcessing.randomize(inputText);
          break;
        case 'remove-empty-lines':
          result = textProcessing.removeEmptyLines(inputText);
          break;
        case 'sort-lines':
          result = textProcessing.sortLines(inputText);
          break;
        case 'email-to-user':
          result = textProcessing.emailToUser(inputText);
          break;
        case 'email-to-email':
          result = textProcessing.emailToEmail(inputText);
          break;

        // Password Tools
        case 'pass-optimiser':
          result = textProcessing.passwordOptimiser(inputText, passwordOptions);
          break;
        case 'insert-text':
          if (!insertOptions.text) {
            toast({
              title: "Missing text",
              description: "Please enter text to insert",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          result = textProcessing.insertText(inputText, insertOptions);
          break;
        case 'modify':
          result = textProcessing.modifyPassword(inputText, modifyOptions);
          break;
        case 'pass-not-contain':
          result = textProcessing.passwordNotContain(inputText, notContainOptions);
          break;

        // Mail Filter
        case 'mailfilter-default':
          if (!mailFilterOptions.domain) {
            toast({
              title: "Missing domain",
              description: "Please enter a domain to filter",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          result = textProcessing.mailFilterDefault(inputText, mailFilterOptions);
          break;
        case 'multi-domain':
          if (!mailFilterOptions.domains || mailFilterOptions.domains.length === 0) {
            toast({
              title: "Missing domains",
              description: "Please enter domains to filter",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          const multiResults = textProcessing.multiDomainFilter(inputText, mailFilterOptions);
          setDomainResults(multiResults);
          setIsProcessing(false);
          return;

        // Remove List
        case 'removelist-default':
          if (!removeListOptions.list) {
            toast({
              title: "Missing list",
              description: "Please enter items to remove",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }
          const removeResult = textProcessing.removeListDefault(inputText, removeListOptions);
          result = removeResult.main;
          if (removeResult.removed) {
            setRemoveListResult(removeResult.removed);
          }
          break;
      }

      setInputText(result);
      setProcessedText(result);
      setShowLinkAnalyzer(true);
      toast({
        title: "Processed",
        description: "Text has been processed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const showPasswordOptions = activeCategory === 'password-tools';
  const showMailFilterOptions = activeCategory === 'mail-filter';
  const showRemoveListOptions = activeCategory === 'remove-list';
  const showComboOptimizerOptions = activeTool === 'combo-optimiser';
  const showULPCleanerOptions = activeTool === 'ulp-cleaner';

  return (
    <Layout>
      <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar
          activeCategory={activeCategory}
          activeTool={activeTool}
          onToolChange={handleToolChange}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {/* Hero Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-3">
                {activeTool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-muted-foreground text-base">
                Professional text processing with advanced tools and intelligent filtering
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
              <div className="space-y-6">
                {/* Mode Toggle */}
                <div className={`flex items-center gap-3 ${showAnimations ? 'animate-fade-in' : ''}`}>
                  <Button
                    onClick={() => setProcessingMode('text')}
                    variant={processingMode === 'text' ? 'default' : 'outline'}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                  >
                    <Type className="mr-2 h-5 w-5" />
                    Text Mode
                  </Button>
                  <Button
                    onClick={() => setProcessingMode('file')}
                    variant={processingMode === 'file' ? 'default' : 'outline'}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    File Mode
                  </Button>
                </div>

                {processingMode === 'text' ? (
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 animate-slide-in-up hover-lift">
                    <CardContent className="p-6">
                      <TextEditor
                        value={inputText}
                        onChange={setInputText}
                        onProcess={handleProcess}
                        isProcessing={isProcessing}
                        placeholder="Paste your text here to begin processing..."
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <div className="animate-slide-in-up">
                    <FileProcessor
                      activeTool={activeTool}
                      passwordOptions={passwordOptions}
                      mailFilterOptions={mailFilterOptions}
                      removeListOptions={removeListOptions}
                      insertOptions={insertOptions}
                      modifyOptions={modifyOptions}
                      notContainOptions={notContainOptions}
                      comboOptimizerOptions={comboOptimizerOptions}
                      ulpCleanerOptions={ulpCleanerOptions}
                    />
                  </div>
                )}

                {activeTool === 'multi-domain' && Object.keys(domainResults).length > 0 && (
                  <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                    <DomainResults results={domainResults} />
                  </div>
                )}

                {removeListResult && (
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 animate-slide-in-up hover-lift" style={{ animationDelay: '0.3s' }}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 animate-fade-in">Removed Items</h3>
                      <TextEditor
                        value={removeListResult}
                        onChange={() => {}}
                        onProcess={() => {}}
                        placeholder="Removed items will appear here..."
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                {showPasswordOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <PasswordOptionsPanel
                      tool={activeTool as any}
                      passwordOptions={passwordOptions}
                      notContainOptions={notContainOptions}
                      insertOptions={insertOptions}
                      modifyOptions={modifyOptions}
                      onPasswordOptionsChange={setPasswordOptions}
                      onNotContainOptionsChange={setNotContainOptions}
                      onInsertOptionsChange={setInsertOptions}
                      onModifyOptionsChange={setModifyOptions}
                    />
                  </div>
                )}

                {showMailFilterOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <MailFilterOptionsPanel
                      tool={activeTool as any}
                      options={mailFilterOptions}
                      onOptionsChange={setMailFilterOptions}
                    />
                  </div>
                )}

                {showRemoveListOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <RemoveListOptionsPanel
                      options={removeListOptions}
                      onOptionsChange={setRemoveListOptions}
                    />
                  </div>
                )}

                {showComboOptimizerOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <FormatOptions
                      outputFormat={comboOptimizerOptions.outputFormat || 'email:pass'}
                      onFormatChange={(format) => setComboOptimizerOptions({ ...comboOptimizerOptions, outputFormat: format })}
                      title="Combo Optimizer Format"
                      description="Choose the output format for the combo optimizer"
                    />
                  </div>
                )}

                {showComboOptimizerOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    <LinkAnalyzer
                      processedText={processedText}
                      onAnalyzeComplete={(cleanedText, removedLinks) => {
                        setInputText(cleanedText);
                        toast({
                          title: "Credentials extracted!",
                          description: `${removedLinks.length} URLs processed and credentials normalized`,
                        });
                      }}
                    />
                  </div>
                )}

                {showULPCleanerOptions && (
                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <FormatOptions
                      outputFormat={ulpCleanerOptions.outputFormat || 'email:pass'}
                      onFormatChange={(format) => setULPCleanerOptions({ ...ulpCleanerOptions, outputFormat: format })}
                      title="ULP Cleaner Format"
                      description="Choose the output format for the ULP cleaner"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Index;