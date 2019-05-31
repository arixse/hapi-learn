const JWT = require('jsonwebtoken')
const joi = require('joi')
const GROUP_NAME = `users`

module.exports = [
    {
        method:'POST',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply) => {
            function generateJWT(jwtInfo) {
                const payload = {
                    userId:jwtInfo.userId,
                    exp:Math.floor(new Date().getTime()/1000 + 7*24*60*60)
                }
                return JWT.sign(payload,process.env.JWT_SECRET)
            }
            reply(
                generateJWT({
                    userId:1
                })
            )
        },
        config: {
            tags:['api',GROUP_NAME],
            description:'测试jwt签发',
            auth:false//约定测接口不参与jwt验证
        }
    },
    {
        method:'POST',
        path:`/${GROUP_NAME}/wxLogin`,
        handler:async (request,reply)=>{
            reply()
        },
        config: {
            auth:false,
            tags:['api',GROUP_NAME],
            validate:{
                payload:{
                    code:joi.string().required().description('微信用户登陆的临时的code'),
                    encryptedData:joi.string().required().description('微信用户信息cryptedData'),
                    iv:joi.string().required().description('微信用户信息iv')
                }
            }
        }
    }
]