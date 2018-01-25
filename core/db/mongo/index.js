const mongoose = require('mongoose');
const DB = require('../db');

module.exports = class MongoDB extends DB {
    
    /**
     * MongoDB constructor.
     */
    constructor(dbConfig)
    {
        super(dbConfig);
    }

    connect()
    {
        const config = this.getConfig();

        mongoose.Promise = global.Promise;
        mongoose.connect(config.uri, { useMongoClient: true });
    
        this.connection = mongoose.connection;

        this.connection.on('error', err => {
            // TODO: make this stuff beaty..
            console.error(err);
            process.exit(1);
        });

        return this.connection;
    }

    disconnect()
    {
        this.getConnection().close();

        return this;
    }
}