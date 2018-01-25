const PG = require('pg');
const DB = require('../db');

module.exports = class PostgresDB extends DB {
    
    /**
     * PostgresDB constructor
     */
    constructor(dbConfig)
    {
        super(dbConfig);
    }

    connect()
    {
        const config = this.getConfig();

        const pg = new PG();

        this.connection = pg.connect();
    
        return this.connection;
    }
}
