const config = require('config');
const db = require('../db')
const fs = require('fs');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');

const apiConfig = config.get('api');

const api = {
    createServer: (options, callback) => {
        const defaultOptions = {
            name: apiConfig.name,
            version: apiConfig.version,
            // key: config.get('license.key'),
            // certificate: config.get('license.certificate')
        };
        const serverOptions = Object.assign({}, defaultOptions, options);
        const server = restify.createServer(serverOptions);
        
        api.api = server;   
        
        server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
        server.use(restifyPlugins.acceptParser(server.acceptable));
        server.use(restifyPlugins.queryParser({ mapParams: true }));
        server.use(restifyPlugins.fullResponse());

        server.listen(apiConfig.port || 5000, () => {
            const connection = db.connect();
    
            connection.once('open', () => {
                callback.call(null, server);

                console.log(`API is listening on port ${apiConfig.port}`);
            });
        });

        return server;
    }
}

module.exports = api
