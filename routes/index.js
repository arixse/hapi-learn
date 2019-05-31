const shopRoutes = require("./shops")
const orderRoutes = require('./orders')
const usersRoutes = require('./users')
module.exports = [
    ...shopRoutes,
    ...orderRoutes,
    ...usersRoutes
]