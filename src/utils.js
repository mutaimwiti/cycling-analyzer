const fs = require('fs');
const {logger} = require('loggery');

const writeDataToFile = (data, fileName) => {
  const json = JSON.stringify(data, null, 2);

  try {
    fs.writeFileSync(`out/${fileName}.json`, json)
  } catch (error) {
    logger().error('An error occurred trying to write to file', error);
  }
};

module.exports = {
  writeDataToFile
};
