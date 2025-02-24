#!/usr/bin/env node

const { Command } = require('commander');
const { parseFile } = require('./parsers');
const path = require('path');
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

      console.log('File 1:', data1);
      console.log('File 2:', data2);
    } catch (error) {
      console.error('Error:', error.message);
    }
  })
  .parse(process.argv);
