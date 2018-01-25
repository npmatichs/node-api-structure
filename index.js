const fs = require('fs');
const config = require('config');
const server = require('./core/server');
const apiConfig = config.get('api');
const api = server.api;
const rootPath = __dirname;

const namespaces = {
    components_path: () => `${rootPath}/app/components`,
    core_path: () => `${rootPath}/core`,
    errors_path: () => `${rootPath}/core/errors`,
    license_path: () => `${rootPath}/license`
}

// API index uri..
server.createServer({
    // certificate: fs.readFileSync(`${namespaces.license_path()}/certificate`),
    // key: fs.readFileSync(`${namespaces.license_path()}//key`),
}, (api) => {
    api.get('/', (req, res) => res.send(`Hello from ${apiConfig.name}`))

    const components = fs.readdirSync(namespaces.components_path());

    if (components.length) {
        for (let i in components) {
            let componentStat = fs.statSync(`${namespaces.components_path()}/${components[i]}`);

            if (componentStat && componentStat.isDirectory()) {
        
                let componentRoutes = require(`${namespaces.components_path()}/${components[i]}/routes`);

                componentRoutes.call(null, api);

                // server.app.use((req, res, next) => {
                //     componentRoutes.call(null, api);
                
                //     next();
                // })
            } else {
                throw new Error('Unable to initialize application components.');
            }
        }
    } else {
        throw new Error('Missing components in application!');
    }
});

module.exports = server;
