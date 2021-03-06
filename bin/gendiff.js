#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstFilePath> <secondFilePath>')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.format));
  });
program.parse(process.argv);