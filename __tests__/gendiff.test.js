import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

describe.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('%s', (file1, file2) => {
  test.each([
    ['tree', 'tree.txt'],
    ['plain', 'plain.txt'],
    ['json', 'json.json'],
  ])('%s', (format, result) => {
    const path1 = getPath(file1);
    const path2 = getPath(file2);
    const pathToResult = getPath(result);

    const expected = readFileSync(pathToResult, 'utf-8');
    const diff = genDiff(path1, path2, format);
    expect(diff).toEqual(expected);
  });
});