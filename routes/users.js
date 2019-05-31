const JWT = require('jsonwebtoken')
const GROUP_NAME = `users`

module.exports = [
    {
        method:'POST',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply) => {
            function generaateJWT(jwtInfo) {
                const payload = {
                    userId:jwtInfo.userId,
                    exp:Math.floor(new Date().getTime()/1000 + 7*24*60*60)
                }
                return JWT.sign(payload,process.env.JWT_SECRET)
            }
            reply(
                generaateJWT({
                    userId:1
                })
            )
        },
        config: {
            tags:['api',GROUP_NAME],
            description:'测试jwt签发',
            auth:false//约定测接口不参与jwt验证
        }
    }
]