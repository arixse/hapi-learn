const joi = require('joi')
const GROUP_NAME = `shops`

module.exports = [
    {
        method:'GET',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply) =>{
            reply()
        },
        config: {
            tags:['api',GROUP_NAME],
            description:`获取店铺列表`,
            validate:{
                query:{
                    limit:joi.number().integer().min(1).default(10).description("每页条数"),
                    page:joi.number().integer().min(1).default(1).description("当前页数")
                }
            }
        }
    },
    {
        method:'GET',
        path:`/${GROUP_NAME}/{shopId}/goods`,
        handler:async (request,reply) =>{
            reply()
        },
        config: {
            tags:['api',GROUP_NAME],
            description:`获取某个店铺商品列表`
        }
    }
]