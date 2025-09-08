import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TextEditor } from '@/components/TextEditor';
import { PasswordOptionsPanel } from '@/components/options/PasswordOptions';
import { MailFilterOptionsPanel } from '@/components/options/MailFilterOptions';
import { RemoveListOptionsPanel } from '@/components/options/RemoveListOptions';
import { DomainResults } from '@/components/DomainResults';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import {
  Tool,
  ToolCategory,
  PasswordOptions,
  NotContainOptions,
  InsertOptions,
  ModifyOptions,
  MailFilterOptions,
  RemoveListOptions,
} from '@/types';
import * as textProcessing from '@/utils/textProcessing';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('combo-filter');
  const [activeTool, setActiveTool] = useState<Tool>('combo-optimiser');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [domainResults, setDomainResults] = useState<{ [key: string]: string }>({});
  const [removeListResult, setRemoveListResult] = useState<string>('');

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

    try {
      switch (activeTool) {
        // Combo Filter tools
        case 'combo-optimiser':
          result = textProcessing.comboOptimiser(inputText);
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
            <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
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

                {activeTool === 'multi-domain' && Object.keys(domainResults).length > 0 && (
                  <DomainResults results={domainResults} />
                )}

                {removeListResult && (
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Removed Items</h3>
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
                )}

                {showMailFilterOptions && (
                  <MailFilterOptionsPanel
                    tool={activeTool as any}
                    options={mailFilterOptions}
                    onOptionsChange={setMailFilterOptions}
                  />
                )}

                {showRemoveListOptions && (
                  <RemoveListOptionsPanel
                    options={removeListOptions}
                    onOptionsChange={setRemoveListOptions}
                  />
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