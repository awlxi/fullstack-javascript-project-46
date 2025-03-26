#!/usr/bin/env node

const { Command } = require('commander');
const { parseFile } = require('./parsers');
const path = require('path');

const genDiff = (data1, data2) => {
  const allKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const diff = allKeys
    .map((key) => {
      if (!(key in data2)) {
        return `- ${key}: ${data1[key]}`;
      } else if (!(key in data1)) {
        return `+ ${key}: ${data2[key]}`;
      } else if (data1[key] !== data2[key]) {
        return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
      } else {
        return `  ${key}: ${data1[key]}`;
      }
    })
    .join('\n');
  return diff;
};

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    try {
      const data1 = parseFile(path.resolve(filepath1));
      const data2 = parseFile(path.resolve(filepath2));
      console.log(genDiff(data1, data2));
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

if (require.main === module) {
  program.parse(process.argv);
}

module.exports = { genDiff, program };
