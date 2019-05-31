const joi = require('joi')
const models = require('../models')
const {paginationDefine} = require("../utils/router-helper")
const GROUP_NAME = `shops`

module.exports = [
    {
        method:'GET',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply) =>{
            const {rows:results,count:totalCount} = 
            await models.shops.findAndCount({
                attributes:[
                    'id','name'
                ],
                limit:request.query.limit,
                offset:(request.query.page-1)*request.query.limit
            })
            reply({results,totalCount})
        },
        config: {
            tags:['api',GROUP_NAME],
            description:`获取店铺列表`,
            validate:{
                query:{
                    ...paginationDefine
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