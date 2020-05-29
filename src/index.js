import fs from 'fs';

export default (firstPathFile, secondPathFile) => {
  const firstJsonFile = fs.readFileSync(firstPathFile, 'utf8');
  const secondJsonFile = fs.readFileSync(secondPathFile, 'utf8');

  const objFromFirstJsonFile = JSON.parse(firstJsonFile);
  const keysFromFirstObj = Object.keys(objFromFirstJsonFile);

  const objFromSecondJsonFile = JSON.parse(secondJsonFile);
  const keysFromSecondObj = Object.keys(objFromSecondJsonFile);

  const allKeysFromObjects = [...new Set(keysFromFirstObj.concat(keysFromSecondObj))];

  const changes = allKeysFromObjects.map((key) => {
    const valueFromFirstObj = objFromFirstJsonFile[key];
    const valueFromSecondObj = objFromSecondJsonFile[key];
    if (valueFromFirstObj === undefined) {
      return `+ ${key}: ${valueFromSecondObj}`;
    } else if (valueFromSecondObj === undefined) {
      return `- ${key}: ${valueFromFirstObj}`;
    } else if (valueFromFirstObj === valueFromSecondObj) {
      return `  ${key}: ${valueFromSecondObj}`;
    }
    return `- ${key}: ${valueFromFirstObj}\n+ ${key}: ${valueFromSecondObj}`;
  });
  const result  = changes.join('\n');
  return `{\n${result}\n}`;
};