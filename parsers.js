const fs = require('fs');
const path = require('path');

const parseJson = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(`Error parsing file ${filePath}: ${error.message}`);
  }
};

const parseFile = (filePath) => {
  const fileExtension = path.extname(filePath);
  switch (fileExtension) {
    case '.json':
      return parseJson(filePath);
    default:
      throw new Error(`Unsupported format: ${fileExtension}`);
  }
};

module.exports = { parseFile };

