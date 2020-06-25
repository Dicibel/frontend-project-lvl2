import fs from 'fs';

import path from 'path';

import yaml from 'js-yaml';

import ini from 'ini';

export const readFile = (pathToFile) => {
  const absolutePath = path.resolve(pathToFile);
  return fs.readFileSync(absolutePath, 'utf8');
};

export const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw Error('Unexpected format:', format);
  }
};