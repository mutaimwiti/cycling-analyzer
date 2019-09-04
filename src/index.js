const {Database} = require('sqlite3');
const {writeDataToFile} = require('./utils');
const {logger} = require('loggery');
require('dotenv').config();

const db = new Database(process.env.DB_FILE);

db.serialize(() => {
  db.all("SELECT SPEED_ARRAY FROM main_table", (err, rows) => {
    let speeds = [];

    rows.forEach(({SPEED_ARRAY}) => {
      const parsed = JSON.parse(SPEED_ARRAY);

      speeds = speeds.concat(parsed);
    });

    const sorted = speeds.sort((x, y) => x - y);

    logger().info('Writing sorted speeds');
    writeDataToFile(sorted, 'sorted_speeds');
    logger().info('Done writing sorted speeds');

    const stats = {};

    stats.average = Math.round((speeds.reduce((x, y) => x + y, 0) / speeds.length) * 100) / 100;
    stats.max = Math.max(...speeds);
    stats.min = Math.min(...speeds);

    logger().info('Writing stats');
    writeDataToFile(stats, 'stats');
    logger().info('Done writing stats');

  });
});

db.close();
