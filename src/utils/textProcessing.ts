import { PasswordOptions, NotContainOptions, InsertOptions, ModifyOptions, MailFilterOptions, RemoveListOptions } from '@/types';

export const randomize = (text: string): string => {
  const lines = text.split(/\r?\n/);
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }
  return lines.join("\n");
};

export const captureRemover = (text: string): string => {
  const match = text.match(/[0-9a-zA-Z_.]+@[0-9a-zA-Z_.]+:[\S]+/g);
  if (!match) return "";
  return match.join("\n");
};

export const removeDuplicates = (text: string): string => {
  const lines = text.split(/\r?\n/);
  const newline = [...new Set(lines)];
  return newline.join("\n");
};

export const getDuplicates = (text: string): string => {
  const lines = text.split(/\r?\n/);
  const map: Record<string, boolean> = {};
  const newline = lines.filter(element => {
    if (map[element]) {
      return true;
    } else {
      map[element] = true;
      return false;
    }
  });
  const uniqueDuplicates = [...new Set(newline)];
  return uniqueDuplicates.join("\n");
};

export const sortLines = (text: string): string => {
  const lines = text.split(/\r?\n/);
  lines.sort();
  return lines.join("\n");
};

export const removeEmptyLines = (text: string): string => {
  const regex = /^\s*$(?:\r\n?|\n)/gm;
  return text.replace(regex, "");
};

export const emailToUser = (text: string): string => {
  const regex = /([0-9a-zA-Z_.]+)@[0-9a-zA-Z_.]+:([\S]+)/gm;
  return text.replace(regex, "$1:$2");
};

export const emailToEmail = (text: string): string => {
  const regex = /[0-9a-zA-Z_.]+@[0-9a-zA-Z_.]+/gm;
  const match = text.match(regex);
  if (!match) return "";
  return match.join("\n");
};

export const comboOptimiser = (text: string): string => {
  let result = captureRemover(text);
  result = removeDuplicates(result);
  result = removeEmptyLines(result);
  return result;
};

export const passwordOptimiser = (text: string, options: PasswordOptions): string => {
  let result = text;
  
  // Length filtering
  if (options.length && (options.min !== undefined || options.max !== undefined)) {
    let regex: RegExp;
    if (options.min !== undefined && options.max !== undefined) {
      regex = new RegExp(`^.*:[\\S]{${options.min},${options.max}}$`, 'gm');
    } else if (options.min !== undefined) {
      regex = new RegExp(`^.*:[\\S]{${options.min},}$`, 'gm');
    } else if (options.max !== undefined) {
      regex = new RegExp(`^.*:[\\S]{0,${options.max}}$`, 'gm');
    } else {
      return result;
    }
    
    const match = result.match(regex);
    result = match ? match.join("\n") : "";
  }
  
  // Contains filtering
  if (options.uppercase || options.lowercase || options.number || options.symbol) {
    let rupper = options.uppercase ? "(?=.*[A-Z])" : "";
    let rlower = options.lowercase ? "(?=.*[a-z])" : "";
    let rnum = options.number ? "(?=.*\\d)" : "";
    let rsymbol = options.symbol ? "(?=.*[*\\.!@#$%^&\"',.?~`_+\\-])" : "";
    
    const regex = new RegExp(`^.*:${rupper}${rlower}${rnum}${rsymbol}[\\S]*$`, "gm");
    const match = result.match(regex);
    result = match ? match.join("\n") : "";
  }
  
  return result;
};

export const insertText = (text: string, options: InsertOptions): string => {
  if (options.position === 'before') {
    const regex = /:/gm;
    return text.replace(regex, ':' + options.text);
  } else {
    const regex = /$/gm;
    return text.replace(regex, options.text);
  }
};

export const modifyPassword = (text: string, options: ModifyOptions): string => {
  const regex = /(?<=:)(\w)/gm;
  if (options.type === 'uppercase') {
    return text.replace(regex, (a) => a.toUpperCase());
  } else {
    return text.replace(regex, (a) => a.toLowerCase());
  }
};

export const passwordNotContain = (text: string, options: NotContainOptions): string => {
  let rupper = options.notUppercase ? "(?![A-Z])" : "";
  let rlower = options.notLowercase ? "(?![a-z])" : "";
  let rnum = options.notNumber ? "(?![0-9])" : "";
  let rsymbol = options.notSymbol ? "(?![*\\.!@#$%^&\"',.?~`_+\\-])" : "";
  
  const regex = new RegExp(`^.*:(?:${rupper}${rlower}${rnum}${rsymbol}.)*$`, "gm");
  const match = text.match(regex);
  return match ? match.join("\n") : "";
};

export const mailFilterDefault = (text: string, options: MailFilterOptions): string => {
  if (!options.domain) return text;
  
  let domain = options.domain.replace('.', '\\.');
  let regex: RegExp;
  
  if (options.exactMatch) {
    domain = domain.replace('@', '').replace(':', '');
    regex = new RegExp(`^.*(?<=@)[\\S]*${domain}[\\S]*(?<=:)[\\S]*`, "gm");
  } else {
    regex = new RegExp(`^.*${domain}[\\S]*`, "gm");
  }
  
  const match = text.match(regex);
  return match ? match.join("\n") : "";
};

export const multiDomainFilter = (text: string, options: MailFilterOptions): { [key: string]: string } => {
  const results: { [key: string]: string } = {};
  let remainingText = text;
  
  if (options.domains) {
    options.domains.forEach(domain => {
      let cleanDomain = domain.replace('.', '\\.');
      let regex: RegExp;
      
      if (options.exactMatch) {
        cleanDomain = cleanDomain.replace('@', '').replace(':', '');
        regex = new RegExp(`^.*(?<=@)[\\S]*${cleanDomain}[\\S]*(?<=:)[\\S]*`, "gm");
      } else {
        regex = new RegExp(`^.*${cleanDomain}[\\S]*`, "gm");
      }
      
      const match = text.match(regex);
      results[domain] = match ? match.join("\n") : "";
      
      if (options.remaining) {
        const remainRegex = new RegExp(`^(?:(?!${cleanDomain}).)*$`, "gm");
        const remainMatch = remainingText.match(remainRegex);
        remainingText = remainMatch ? remainMatch.join("\n") : "";
      }
    });
    
    if (options.remaining) {
      results['remaining'] = remainingText;
    }
  }
  
  return results;
};

export const removeListDefault = (text: string, options: RemoveListOptions): { main: string; removed?: string } => {
  const listItems = options.list.split(/\r?\n/).filter(item => item.trim());
  let result = text;
  let removed = "";
  
  if (options.removed) {
    const lines = text.split(/\r?\n/);
    const allLines = [...lines, ...listItems];
    const map: Record<string, boolean> = {};
    
    const duplicates = allLines.filter(element => {
      if (map[element]) {
        return true;
      } else {
        map[element] = true;
        return false;
      }
    });
    
    removed = [...new Set(duplicates)].join("\n");
  }
  
  listItems.forEach(item => {
    const regex = new RegExp(`^(?:(?!\\b${item}\\b).*)$`, "gm");
    const match = result.match(regex);
    result = match ? match.join("\n") : "";
  });
  
  return { main: result, removed };
};