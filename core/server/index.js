const config = require('config');
const db = require('../db')
const fs = require('fs');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');

const apiConfig = config.get('api');

const server = restify.createServer({
	name: apiConfig.name,
	version: apiConfig.version,
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

module.exports = {
    app: server,
    loadedComponents: [],
    createServer: (port, callback) => {
        server.listen(port || apiConfig.port, callback ? callback() : () => {
            const connection = db.connect();
    
            connection.once('open', () => {
                console.log(`API is listening on port ${apiConfig.port}`);
            });
        });
    
        return server;
    }
}
