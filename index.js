const fs = require('fs');
const config = require('config');
const server = require('./core/server');
const Router = require('./core/component/router');
const apiConfig = config.get('api');
const app = server.app;

// const namespaces = {
//     root: __dirname,
//     components_path: () => `${path}/app/components`,
//     core_path: () => `${this.root}/core`,
//     errors_path: () => `${this.root}/core/errors`
// }

// API index uri..

server.app.get('/', (req, res) => res.send(`Hello from ${apiConfig.name}`))

const components_path = `${__dirname}/app/components`;
const components = fs.readdirSync(components_path);

if (components.length) {
    for (let i in components) {
        let componentStat = fs.statSync(`${components_path}/${components[i]}`);

        if (componentStat && componentStat.isDirectory()) {
            let Component = require(`${components_path}/${components[i]}`);

            let component = new Component(server.app, components[i]);

            let router = new Router(server.app, component);

            component.load(router);

            if (component.isLoaded()) {
                server.loadedComponents.push(component);
            } else {
                throw new Error(`Unable to load component ${components[i]}`);
            }
        } else {
            throw new Error('Unable to initialize application components.');
        }
    }
} else {
    throw new Error('Missing components in application!');
}

server.createServer();

module.exports = server;
