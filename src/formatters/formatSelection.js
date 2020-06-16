import makePlain from './plain.js';
import makeTree from './tree.js';
import makeJson from './json.js';

const formatSelection = (diff, format) => {
  switch (format) {
    case 'tree':
      return makeTree(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw Error('Unexpected format:', format);
  }
};

export default formatSelection;