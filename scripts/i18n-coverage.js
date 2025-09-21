#!/usr/bin/env node

/**
 * i18n Coverage Scanner
 * Scans the codebase for hardcoded strings and missing translation keys
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = 'src';
const LOCALES_DIR = 'src/locales';
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ar'];

// Patterns to detect hardcoded strings
const HARDCODED_PATTERNS = [
  // JSX text content (excluding t(), className, etc.)
  /<[^>]*>([^<]*[a-zA-Z][^<]*)<\/[^>]*>/g,
  // String literals in JSX attributes (excluding common props)
  /(?:placeholder|title|alt|aria-label)=["']([^"']+)["']/g,
  // Toast messages
  /toast\.(success|error|info|warning)\(["']([^"']+)["']/g,
  // Button/label text
  /(?:label|text):\s*["']([^"']+)["']/g,
];

// Patterns to ignore (legitimate non-translatable content)
const IGNORE_PATTERNS = [
  /className=/, /style=/, /href=/, /src=/, /id=/, /key=/,
  /\$\{/, /{/, /}/, /console\./, /import/, /export/,
  /\/\*/, /\/\//, /\*\//, /^\s*$/, /^[0-9]+$/,
  /^[a-zA-Z0-9_-]+\.(js|ts|jsx|tsx|css|scss|json)$/,
  /^(true|false|null|undefined)$/,
  /^[A-Z_]+$/,  // Constants
  /^\d+(\.\d+)?(px|rem|em|%|vh|vw|deg)$/, // CSS values
];

// Function to load translation files
function loadTranslations() {
  const translations = {};
  
  for (const lang of SUPPORTED_LANGUAGES) {
    const filePath = path.join(LOCALES_DIR, `${lang}.json`);
    if (fs.existsSync(filePath)) {
      try {
        translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (error) {
        console.error(`Error loading ${lang}.json:`, error.message);
        translations[lang] = {};
      }
    } else {
      console.warn(`Missing translation file: ${lang}.json`);
      translations[lang] = {};
    }
  }
  
  return translations;
}

// Function to extract all keys from a translation object
function extractKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null) {
      keys.push(...extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Function to scan files for hardcoded strings
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Skip files that are mostly configuration or data
  if (filePath.includes('config') || filePath.includes('.d.ts')) {
    return issues;
  }
  
  const lines = content.split('\n');
  
  lines.forEach((line, lineNumber) => {
    // Skip comments and imports
    if (line.trim().startsWith('//') || 
        line.trim().startsWith('/*') || 
        line.trim().startsWith('*') ||
        line.trim().startsWith('import') ||
        line.trim().startsWith('export')) {
      return;
    }
    
    // Check for potential hardcoded strings
    for (const pattern of HARDCODED_PATTERNS) {
      const matches = line.matchAll(pattern);
      
      for (const match of matches) {
        const text = match[1] || match[2];
        
        if (text && !IGNORE_PATTERNS.some(p => p.test(text) || p.test(line))) {
          // Check if it looks like a translatable string
          if (text.length > 2 && /[a-zA-Z]/.test(text) && !text.startsWith('t(')) {
            issues.push({
              file: filePath,
              line: lineNumber + 1,
              text: text.trim(),
              context: line.trim()
            });
          }
        }
      }
    }
  });
  
  return issues;
}

// Function to scan directory recursively
function scanDirectory(dir) {
  const issues = [];
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      issues.push(...scanDirectory(fullPath));
    } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(entry)) {
      issues.push(...scanFile(fullPath));
    }
  }
  
  return issues;
}

// Function to check translation completeness
function checkTranslationCompleteness(translations) {
  const baseKeys = extractKeys(translations.en || {});
  const report = { total: baseKeys.length, languages: {} };
  
  for (const lang of SUPPORTED_LANGUAGES) {
    const langKeys = extractKeys(translations[lang] || {});
    const missing = baseKeys.filter(key => !langKeys.includes(key));
    const extra = langKeys.filter(key => !baseKeys.includes(key));
    
    report.languages[lang] = {
      coverage: ((langKeys.length / baseKeys.length) * 100).toFixed(1),
      missing: missing.length,
      extra: extra.length,
      missingKeys: missing.slice(0, 10), // Show first 10 missing keys
    };
  }
  
  return report;
}

// Main execution
function main() {
  console.log('🔍 Starting i18n coverage scan...\n');
  
  // 1. Load translations
  console.log('📁 Loading translation files...');
  const translations = loadTranslations();
  
  // 2. Check translation completeness
  console.log('📊 Checking translation completeness...');
  const completenessReport = checkTranslationCompleteness(translations);
  
  console.log('\n📈 Translation Coverage Report:');
  console.log(`Total keys in base language (en): ${completenessReport.total}`);
  
  for (const [lang, stats] of Object.entries(completenessReport.languages)) {
    console.log(`${lang}: ${stats.coverage}% (${stats.missing} missing, ${stats.extra} extra)`);
    if (stats.missing > 0) {
      console.log(`  Missing: ${stats.missingKeys.join(', ')}${stats.missing > 10 ? '...' : ''}`);
    }
  }
  
  // 3. Scan for hardcoded strings
  console.log('\n🔍 Scanning for hardcoded strings...');
  const hardcodedIssues = scanDirectory(SRC_DIR);
  
  if (hardcodedIssues.length > 0) {
    console.log(`\n⚠️  Found ${hardcodedIssues.length} potential hardcoded strings:`);
    
    // Group by file
    const byFile = hardcodedIssues.reduce((acc, issue) => {
      if (!acc[issue.file]) acc[issue.file] = [];
      acc[issue.file].push(issue);
      return acc;
    }, {});
    
    for (const [file, issues] of Object.entries(byFile)) {
      console.log(`\n📄 ${file}:`);
      issues.slice(0, 5).forEach(issue => {
        console.log(`  Line ${issue.line}: "${issue.text}"`);
      });
      if (issues.length > 5) {
        console.log(`  ... and ${issues.length - 5} more`);
      }
    }
  } else {
    console.log('✅ No hardcoded strings found!');
  }
  
  // 4. Generate summary
  const totalMissing = Object.values(completenessReport.languages)
    .reduce((sum, lang) => sum + lang.missing, 0);
  
  console.log('\n📋 Summary:');
  console.log(`- Translation coverage: ${Object.values(completenessReport.languages).map(l => l.coverage + '%').join(', ')}`);
  console.log(`- Total missing translations: ${totalMissing}`);
  console.log(`- Hardcoded strings found: ${hardcodedIssues.length}`);
  
  // Exit with error code if issues found
  const hasIssues = totalMissing > 0 || hardcodedIssues.length > 0;
  if (hasIssues) {
    console.log('\n❌ Issues found! Please fix before deployment.');
    process.exit(1);
  } else {
    console.log('\n✅ i18n coverage check passed!');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, scanDirectory, checkTranslationCompleteness };