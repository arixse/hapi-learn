const JWT = require('jsonwebtoken')
const joi = require('joi')
const axios = require('axios')
const models = require('../models')
const decryptData  = require('../utils/decrypted-data')
const GROUP_NAME = `users`
const config = require('../config')

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
        handler:async (req,reply)=>{
            const appid = config.wxAppId;
            const secret = config.wxSecret;
            //encryptedData:加密的用户信息，包含openid,unionid
            //iv:对 encryptedData 加密蒜素风的初始响亮，解密 encryptedData 时要用到
            //rawData:userInfo 的 json 字符串，不包含 openid,unionid
            //signature:使用sha1对rawData+session_key签名得到的字符串
            //userInfo:用户信息的对象，不包含openid和unionid,供前端使用
            const {code,encryptedData,iv} = req.payload;
            const response = await axios({
                url:'https://api.weixin.qq.com/sns/jscode2session',
                method:'GET',
                params:{
                    appid,
                    secret,
                    js_code:code,
                    grand_type:'authorization_code'
                }
            });
            const {openid,session_key:sessionkey} = response.data;
            
            //基于 openid 查找或者创建一个用户
            const user = await models.users.findOrCreate({
                where:{open_id:openid}
            })

            //decrypt 解码用户信息
            const userInfo = decryptData(encryptedData,iv,sessionkey,appid);
            await models.users.update({
                nick_name:userInfo.nickName,
                gender:userInfo.gender,
                avatar_url:userInfo.avatarUrl,
                open_id:openid,
                session_key:sessionkey,
            },{
                where:{open_id:openid}
            })
            //签发jwt
            const generateJWT = (jwtInfo)=>{
                const payload = {
                    userId:jwtInfo.userId,
                    exp:Math.floor(new Date().getTime()/1000+7*24*60*60)
                }
                return JWT.sign(payload,config.jwtSecret)
            }
            reply(generateJWT({
                userId:user[0].id
            }))
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