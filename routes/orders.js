
const joi = require("joi")
const GROUP_NAME = `orders`

module.exports = [
    {
        method:'POST',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply)=>{
            reply();
        },
        config:{
            tags:['api',GROUP_NAME],
            description:'创建订单',
            validate:{
                payload:{
                    goodsList:joi.array().items(
                        joi.object().keys({
                            goods_id:joi.number().integer(),
                            count:joi.number().integer()
                        })
                    )
                }
            }
        }
    },
    {
        method:'POST',
        path:`/${GROUP_NAME}/{orderId}/pay`,
        handler:async (request,reply) =>{
            reply()
        },
        config:{
            tags:['api',GROUP_NAME],
            description:'支付订单',
            validate:{
                params:{
                    orderId:joi.string().required()
                }
            }
        }
    }
]