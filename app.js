const Hapi = require("hapi")
const config = require("./config")
const routes = require("./routes")
const pluginHapiSwagger = require("./plugins/hapi-swagger.js")
const app = new Hapi.Server()
app.connection({
    host:config.host,
    port:config.port
})
async function main() {
    await app.register([
        ...pluginHapiSwagger
    ])
    app.route([
        ...routes
    ])
    await app.start();
    console.log('服务已启动：http://'+ config.host + ':' + config.port)
}

main();