#!/usr/bin/env ts-node

import * as ampValidator from 'amphtml-validator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the AMP HTML file
const ampHtmlPath = path.join(__dirname, '../public/amp.html');
const ampHtml = fs.readFileSync(ampHtmlPath, 'utf8');

console.log('🔍 Validating AMP page with official validator...');
console.log('📄 AMP file:', ampHtmlPath);
console.log('📊 File size:', (ampHtml.length / 1024).toFixed(2) + ' KB');
console.log('');

// Validate the AMP HTML
ampValidator.getInstance().then(function (validator: any) {
  const result = validator.validateString(ampHtml);
  
  console.log('📊 Validation Results:');
  console.log('   Status:', result.status);
  console.log('   Errors:', result.errors.length);
  console.log('');

  if (result.status === 'PASS') {
    console.log('🎉 AMP validation PASSED!');
    console.log('✅ Your AMP page is valid and ready for production.');
  } else {
    console.log('❌ AMP validation FAILED');
    console.log('🔧 Please fix the following issues:');
    console.log('');
  }

  // Display errors
  if (result.errors.length > 0) {
    console.log('🚨 ERRORS:');
    result.errors.forEach((error: any, index: number) => {
      console.log(`   ${index + 1}. Line ${error.line}: ${error.message}`);
      if (error.specUrl) {
        console.log(`      More info: ${error.specUrl}`);
      }
    });
    console.log('');
  }

  // Summary
  if (result.status === 'PASS') {
    console.log('✅ AMP page is ready for Google indexing!');
    console.log('💡 Your AMP page will load faster on mobile devices.');
  } else {
    console.log('🔧 Fix the errors above and run validation again.');
  }

  console.log('');
  console.log('💡 Additional resources:');
  console.log('   - AMP Documentation: https://amp.dev/documentation/');
  console.log('   - AMP Validator: https://validator.ampproject.org/');
  console.log('   - Google Search Console: https://search.google.com/search-console');

}).catch(function (error: any) {
  console.log('❌ Error running AMP validator:', error.message);
}); 