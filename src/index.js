/* eslint-disable consistent-return */
// eslint-disable-next-line array-callback-return
import _ from 'lodash';
import path from 'path';
import { readFile, parse } from './utils/utils.js';
import formatSelection from './formatters/formatSelection.js';

const getDiff = (before, after) => {
  const keysFromFirstObj = Object.keys(before);
  const keysFromSecondObj = Object.keys(after);

  const allKeys = _.uniq(keysFromFirstObj.concat(keysFromSecondObj));

  const callback = (key) => {
    if (_.has(before, key) && !_.has(after, key)) {
      return {
        name: key,
        valueBefore: before[key],
        valueAfter: null,
        status: 'deleted',
      };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return {
        name: key,
        valueBefore: null,
        valueAfter: after[key],
        status: 'added',
      };
    }
    if (_.has(before, key) && _.has(after, key)) {
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return {
          name: key,
          children: getDiff(before[key], after[key]),
        };
      }
      if (before[key] === after[key]) {
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: after[key],
          status: 'same',
        };
      }
      return {
        name: key,
        valueBefore: before[key],
        valueAfter: after[key],
        status: 'changed',
      };
    }
  };
  const changes = allKeys.map((key) => callback(key));
  return changes;
};

const getDataFormat = (absolutePathToFile) => path.extname(absolutePathToFile).slice(1);

const gendiff = (firstPathToFile, secondPathToFile, format) => {
  const before = parse(readFile(firstPathToFile), getDataFormat(firstPathToFile));
  const after = parse(readFile(secondPathToFile), getDataFormat(secondPathToFile));

  const diff = getDiff(before, after);
  const result = formatSelection(diff, format);
  return result;
};

export default gendiff;