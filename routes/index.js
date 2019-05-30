const shopRoutes = require("./shops")
const orderRoutes = require('./orders')
module.exports = [
    {
        method:'GET',
        path:'/',
        handler:(request,reply)=>{
            reply('Hello ')
        },
        config: {
            tags:['api','tests'],
            description:'测试'
        } 
    },
    ...shopRoutes,
    ...orderRoutes
]