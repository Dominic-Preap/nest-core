/**
 * ----------------------------------------------------------------------
 * I18next Type-Safe Converter Function
 *
 * @example Used in package.json by run the command `yarn i18next`
 * @summary A tool to generate typescript enum for i18next from json file
 * ----------------------------------------------------------------------
 */

const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// Get list of files in the locales directory
const directoryPath = resolve('.', 'assets', 'locales', 'en');
const files = readdirSync(directoryPath);

const keys = [];
files.forEach(file => {
  // Check if fileName is default namespace `translation`
  const namespace = file.replace('.json', '');
  const defaultNamespace = namespace === 'translation';

  // Read file and map json key combine with namespace
  const str = readFileSync(resolve(directoryPath, file));
  const data = JSON.parse(str);
  const d = Object.keys(data).map(d => (defaultNamespace ? d : `${namespace}:${d}`));
  keys.push(...d);
});

// Text with initial information
let text = `/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

export type I18NextTranslate =`;

keys.forEach(key => (text += `\n  | '${key}'`));
text += ';';

// Write text into typing file back
const resultFile = resolve('.', 'src', 'lib', 'i18next', 'i18next.typing.ts');
writeFileSync(resultFile, text);
