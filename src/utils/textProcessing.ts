import { PasswordOptions, NotContainOptions, InsertOptions, ModifyOptions, MailFilterOptions, RemoveListOptions, ComboOptimizerOptions, ULPCleanerOptions, OutputFormat } from '@/types';

export const randomize = (text: string): string => {
  const lines = text.split(/\r?\n/);
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }
  return lines.join("\n");
};

export const captureRemover = (text: string): string => {
  const lines = text.split(/\r?\n/);
  const validLines: string[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Check if it's a simple email:password format
    if (/^[0-9a-zA-Z_.]+@[0-9a-zA-Z_.]+:[\S]+$/.test(trimmedLine)) {
      validLines.push(trimmedLine);
      continue;
    }
    
    // Check if it's a simple URL:username:password format
    if (/^https?:\/\/[^\s]+:[^\s]+:[^\s]+$/.test(trimmedLine)) {
      validLines.push(trimmedLine);
      continue;
    }
    
    // Handle complex lines with multiple credentials
    // First, try to extract email:password patterns - improved regex
    const emailMatches = trimmedLine.match(/[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+:[^\s:]+/g);
    if (emailMatches) {
      validLines.push(...emailMatches);
    }
    
    // Then extract URL:username:password patterns - improved to handle all website URLs
    const urlMatches = trimmedLine.match(/https?:\/\/[^\s:]+:[^\s:]+:[^\s]+/g);
    if (urlMatches) {
      validLines.push(...urlMatches);
    }
    
    // If we found matches, we're done with this line
    if (emailMatches || urlMatches) {
      continue;
    }
    
    // For lines that don't match the above patterns but contain colons,
    // try a more sophisticated approach to extract credentials
    if (trimmedLine.includes(':')) {
      // Split by colons and analyze each segment
      const parts = trimmedLine.split(':');
      const credentials: string[] = [];
      
      for (let i = 0; i < parts.length - 1; i++) {
        const current = parts[i];
        const next = parts[i + 1];
        
        // Check if current part looks like an email
        if (/[0-9a-zA-Z_.-]+@[0-9a-zA-Z_.-]+/.test(current)) {
          credentials.push(`${current}:${next}`);
        }
        // Check if current part looks like a username (not a URL and not just numbers)
        else if (!current.startsWith('http') && 
                 !current.match(/^[0-9]+$/) && // Not just numbers
                 current.length > 2 && 
                 /[a-zA-Z0-9]/.test(current) &&
                 next && 
                 next.length > 2 && 
                 /[a-zA-Z0-9]/.test(next) &&
                 !next.startsWith('http')) { // Next part is not a URL
          credentials.push(`${current}:${next}`);
        }
      }
      
      // Filter out invalid credentials and duplicates
      const validCredentials = credentials.filter(cred => {
        const [user, pass] = cred.split(':');
        return user && pass && 
               user.length > 1 && 
               pass.length > 1 &&
               !user.match(/^[^a-zA-Z0-9@]+$/) &&
               !pass.match(/^[^a-zA-Z0-9]+$/) &&
               !user.includes('www.') && // Exclude URLs
               !user.includes('.com') && // Exclude all .com URLs
               !user.includes('.org') && // Exclude all .org URLs
               !user.includes('.de') && // Exclude all .org URLs
               !user.includes('.net') && // Exclude all .net URLs
               !user.includes('login') && // Exclude login pages
               !user.includes('signup') && // Exclude signup pages
               !user.includes('http'); // Exclude any HTTP URLs
      });
      
      // Remove duplicates
      const uniqueCredentials = [...new Set(validCredentials)];
      validLines.push(...uniqueCredentials);
    }
  }
  
  return validLines.join("\n");
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

export const comboOptimiser = (text: string, options: ComboOptimizerOptions = {}): string => {
  let result = captureRemover(text);
  result = removeDuplicates(result);
  result = removeEmptyLines(result);
  
  // Apply format selection if specified
  if (options.outputFormat) {
    result = applyOutputFormat(result, options.outputFormat);
  }
  
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

// Helper function to apply output format
export const applyOutputFormat = (text: string, format: OutputFormat): string => {
  const lines = text.split(/\r?\n/).filter(line => line.trim());
  
  switch (format) {
    case 'email:pass':
      // Keep only email:password format
      return lines.filter(line => line.includes('@')).join('\n');
    
    case 'user:pass':
      // Convert email:password to user:password format
      // Also handle URL:username:password format - automatically remove links
      return lines.map(line => {
        if (line.includes('@')) {
          // Handle email:password format
          return emailToUser(line);
        } else if (line.includes('://') && line.split(':').length >= 3) {
          // Handle URL:username:password format - extract just username:password
          const parts = line.split(':');
          if (parts.length >= 3) {
            const username = parts[parts.length - 2];
            const password = parts[parts.length - 1];
            return `${username}:${password}`;
          }
        }
        return line;
      }).filter(line => line.trim()).join('\n');
    
    case 'both':
      // Return both formats - automatically remove links from URLs
      const emailPassLines = lines.filter(line => line.includes('@'));
      const userPassLines = lines.map(line => {
        if (line.includes('@')) {
          return emailToUser(line);
        } else if (line.includes('://') && line.split(':').length >= 3) {
          // Handle URL:username:password format - extract just username:password
          const parts = line.split(':');
          if (parts.length >= 3) {
            const username = parts[parts.length - 2];
            const password = parts[parts.length - 1];
            return `${username}:${password}`;
          }
        }
        return line;
      }).filter(line => line.trim());
      return [...emailPassLines, ...userPassLines].join('\n');
    
    default:
      return text;
  }
};

// ULP Cleaner - similar to combo optimizer but with different processing
export const ulpCleaner = (text: string, options: ULPCleanerOptions = {}): string => {
  let result = captureRemover(text);
  result = removeDuplicates(result);
  result = removeEmptyLines(result);
  
  // Apply format selection if specified
  if (options.outputFormat) {
    result = applyOutputFormat(result, options.outputFormat);
  }
  
  return result;
};

// Link Analyzer - extracts credentials from URLs and normalizes them
export const analyzeAndRemoveLinks = (text: string, customDomains: string[] = []): { 
  hasLinks: boolean; 
  linkCount: number; 
  cleanedText: string; 
  removedLinks: string[] 
} => {
  const lines = text.split(/\r?\n/);
  const cleanedLines: string[] = [];
  const removedLinks: string[] = [];
  let linkCount = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      cleanedLines.push(line);
      continue;
    }
    
    // Check if line contains URLs with credentials - expanded to catch all URL patterns
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    const urls = trimmedLine.match(urlRegex);
    
    if (urls && urls.length > 0) {
      let hasValidCredentials = false;
      
      urls.forEach(url => {
        removedLinks.push(url);
        linkCount++;
        
        // Try to extract credentials from URL
        const credentials = extractCredentialsFromUrl(url);
        if (credentials !== 'NO_CREDENTIALS_FOUND') {
          cleanedLines.push(credentials);
          hasValidCredentials = true;
        }
      });
      
      // If no valid credentials found, try to extract from the whole line
      if (!hasValidCredentials) {
        const lineCredentials = extractCredentialsFromLine(trimmedLine, customDomains);
        if (lineCredentials !== 'NO_CREDENTIALS_FOUND') {
          cleanedLines.push(lineCredentials);
        }
      }
    } else {
      // Check if line has credentials without URLs
      const lineCredentials = extractCredentialsFromLine(trimmedLine, customDomains);
      if (lineCredentials !== 'NO_CREDENTIALS_FOUND') {
        cleanedLines.push(lineCredentials);
      } else {
        cleanedLines.push(line);
      }
    }
  }
  
  return {
    hasLinks: linkCount > 0,
    linkCount,
    cleanedText: cleanedLines.join('\n'),
    removedLinks
  };
};

// Extract credentials from URL patterns
const extractCredentialsFromUrl = (url: string): string => {
  // Pattern 1: https://domain.com:username:password
  const directPattern = /https?:\/\/[^\/]+:([^:\s]+):([^:\s]+)/;
  const directMatch = url.match(directPattern);
  if (directMatch) {
    return `${directMatch[1]}:${directMatch[2]}`;
  }
  
  // Pattern 2: .../email:username:password or .../user:username:password
  const markerPattern = /(?:email|user|username|login)[:\/]{1,2}([^:\/\s]+):([^:\s]+)/;
  const markerMatch = url.match(markerPattern);
  if (markerMatch) {
    return `${markerMatch[1]}:${markerMatch[2]}`;
  }
  
  // Pattern 3: Last two colon-separated tokens after last slash or domain
  const lastTwoPattern = /([^:\/\s]+):([^:\s]+)$/;
  const lastTwoMatch = url.match(lastTwoPattern);
  if (lastTwoMatch) {
    return `${lastTwoMatch[1]}:${lastTwoMatch[2]}`;
  }
  
  return 'NO_CREDENTIALS_FOUND';
};

// Extract credentials from line with new rules
const extractCredentialsFromLine = (line: string, customDomains: string[] = []): string => {
  // Skip if contains MISSING-USER or MISSING-PASS
  if (line.includes('MISSING-USER') || line.includes('MISSING-PASS')) {
    return 'NO_CREDENTIALS_FOUND';
  }
  
  // Split by colons to analyze structure
  const parts = line.split(':');
  
  if (parts.length === 2) {
    // Normal pair - keep as-is
    return line;
  }
  
  if (parts.length > 2) {
    // Multiple colons - extract valid pairs
    const validPairs: string[] = [];
    
    for (let i = 0; i < parts.length - 1; i++) {
      const current = parts[i].trim();
      const next = parts[i + 1].trim();
      
      // Check if current part looks like email/username
      const isEmail = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(current);
      const isUsername = /^[A-Za-z0-9._-]+$/.test(current) && current.length > 1;
      
      // Check if next part looks like password (not a URL/domain)
      const isPassword = !isUrlOrDomain(next, customDomains) && next.length > 0;
      
      if ((isEmail || isUsername) && isPassword) {
        validPairs.push(`${current}:${next}`);
        i++; // Skip next part as it's already used as password
      }
    }
    
    if (validPairs.length > 0) {
      return validPairs.join('\n');
    }
  }
  
  // Fallback: try regex extraction
  const emailPattern = /([\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}):([^:\s/]+)/;
  const emailMatch = line.match(emailPattern);
  if (emailMatch) {
    return `${emailMatch[1]}:${emailMatch[2]}`;
  }
  
  const userPattern = /([A-Za-z0-9._-]+):([^:\s/]+)/;
  const userMatch = line.match(userPattern);
  if (userMatch) {
    return `${userMatch[1]}:${userMatch[2]}`;
  }
  
  return 'NO_CREDENTIALS_FOUND';
};

// Check if a string is a URL or domain
const isUrlOrDomain = (str: string, customDomains: string[] = []): boolean => {
  const urlPattern = /^(https?:\/\/|www\.|ftp:\/\/)/i;
  const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
  const commonDomains = [
    'twitch.tv', 'roblox.com', 'facebook.com', 'discord.com', 'login', 'signup',
    'google.com', 'steamcommunity.com', 'accounts.google.com', 'minecraft.net',
    'epicgames.com', 'netflix.com', 'amazon.com', 'paypal.com', 'instagram.com',
    'tiktok.com', 'twitter.com', 'youtube.com', 'spotify.com', 'github.com',
    'microsoft.com', 'apple.com', 'adobe.com', 'dropbox.com', 'linkedin.com'
  ];
  
  const allDomains = [...commonDomains, ...customDomains];
  
  return urlPattern.test(str) || 
         domainPattern.test(str) || 
         allDomains.some(domain => str.includes(domain)) ||
         str.includes('.com') || str.includes('.org') || str.includes('.net') ||
         str.includes('.edu') || str.includes('.gov') || str.includes('.io');
};