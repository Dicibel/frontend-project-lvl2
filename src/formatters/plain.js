const getValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const makePlain = (diff, depth = 0, rout = '') => {
  const plainResult = diff.map((element) => {
    const propertyName = rout + element.name;

    if (element.status === 'same') {
      return `Property ${propertyName} - not changed`;
    }
    if (element.status === 'added') {
      return `Property ${propertyName} - added with value: ${getValue(element.valueAfter)}`;
    }
    if (element.status === 'deleted') {
      return `Property ${propertyName} - deleted`;
    }
    if (element.status === 'changed') {
      return `Property ${propertyName} - changed from ${getValue(element.valueBefore)} to ${getValue(element.valueAfter)}`;
    }
    return `${makePlain(element.children, depth + 1, `${propertyName}.`)}`;
  }, []);

  return plainResult.join('\n');
};

export default makePlain;