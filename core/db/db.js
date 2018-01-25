module.exports = class DB {
    constructor(dbConfig)
    {
        this.config = dbConfig;
        this.connection = null;
    }

    connect()
    {
        throw new Error('Missing required method `connect`');
    }

    disconnect()
    {
        throw new Error('Missing required method `disconnect`');        
    }

    getConfig()
    {
        return this.config;
    }

    getConnection()
    {
        return this.connection;
    }
}
