const config = require('config');

const apiConfig = config.get('api');

// load driver.
const DBDriver = require(`./${apiConfig.db.driver}`);

let driver = new DBDriver(apiConfig.db);

let _db = {
    driver: driver,
    db: null,
    connect: () => _db.db = driver.connect(),
    disconnect: () => driver.disconnect()
}

module.exports = _db;
