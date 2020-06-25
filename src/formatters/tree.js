const printObj = (obj, depth) => {
  const keys = Object.keys(obj);
  const space = `\n${'    '.repeat(depth + 1)}`;
  const result = keys.map((key) => `${space}${key}: ${obj[key]}`);
  return `{${result}\n${'    '.repeat(depth)}}`;
};

const getTreeValue = (value, depth) => {
  if (typeof value === 'object') {
    return printObj(value, depth + 1);
  }
  return value;
};

const makeTree = (diff, depth = 0) => {
  const space = `\n${'    '.repeat(depth)}`;

  const tree = diff.map((element) => {
    if (element.children !== undefined) {
      return `${space}    ${element.name}: ${makeTree(element.children, depth + 1)}`;
    }
    if (element.status === 'same') {
      return `${space}    ${element.name}: ${getTreeValue(element.valueBefore, depth + 1)}`;
    }
    if (element.status === 'changed') {
      return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
    }
    if (element.status === 'deleted') {
      return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}`;
    }
    return `${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
  });

  return `{${tree}${space}}`;
};

export default makeTree;