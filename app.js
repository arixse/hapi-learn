const Hapi = require("hapi")
const env = require("env2")("./.env")
const config = require("./config")
const routes = require("./routes")
const pluginHapiSwagger = require("./plugins/hapi-swagger.js")
const pluginPagination = require('./plugins/hapi-pagination')
const hapiAuthJWT = require('hapi-auth-jwt2')
const pluginHapiAuthJWT = require('./plugins/hapi-auth-jwt2')
const app = new Hapi.Server()
app.connection({
    host:config.host,
    port:config.port
})
async function main() {
    await app.register([
        hapiAuthJWT,
        pluginPagination,
        ...pluginHapiSwagger,
    ])
    pluginHapiAuthJWT(app);
    app.route([
        ...routes
    ])
    await app.start();
    console.log('服务已启动：http://'+ config.host + ':' + config.port)
}

main();