export type ToolCategory = 'combo-filter' | 'password-tools' | 'mail-filter' | 'remove-list';

export type ComboFilterTool = 
  | 'combo-optimiser'
  | 'ulp-cleaner'
  | 'capture-remover'
  | 'remove-duplicate'
  | 'get-duplicate'
  | 'randomize'
  | 'remove-empty-lines'
  | 'sort-lines'
  | 'email-to-user'
  | 'email-to-email';

export type PasswordTool = 
  | 'pass-optimiser'
  | 'insert-text'
  | 'modify'
  | 'pass-not-contain';

export type MailFilterTool = 
  | 'mailfilter-default'
  | 'multi-domain';

export type RemoveListTool = 'removelist-default';

export type Tool = ComboFilterTool | PasswordTool | MailFilterTool | RemoveListTool;

export interface PasswordOptions {
  length?: boolean;
  min?: number;
  max?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  number?: boolean;
  symbol?: boolean;
}

export interface NotContainOptions {
  notUppercase?: boolean;
  notLowercase?: boolean;
  notNumber?: boolean;
  notSymbol?: boolean;
}

export interface InsertOptions {
  position: 'before' | 'after';
  text: string;
}

export interface ModifyOptions {
  type: 'uppercase' | 'lowercase';
}

export interface MailFilterOptions {
  domain: string;
  exactMatch?: boolean;
  domains?: string[];
  remaining?: boolean;
}

export interface RemoveListOptions {
  list: string;
  removed?: boolean;
  exactMatch?: boolean;
}

export type OutputFormat = 'email:pass' | 'user:pass' | 'both';

export interface ComboOptimizerOptions {
  outputFormat?: OutputFormat;
}

export interface ULPCleanerOptions {
  outputFormat?: OutputFormat;
}