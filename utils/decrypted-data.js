const crypto = require('crypto')

const decryptData = (encryptedData,iv,sessionkey,appid)=>{
    const encryptedDataNew = Buffer.from(encryptedData,'base64');
    const sessionKeyNew = Buffer.from(sessionkey,'base64');
    const ivNew = Buffer.from(iv,'base64');
    let decode = '';
    try {
        //解密
        const decipher = crypto.createDecipheriv('aes-128-cbc',sessionKeyNew,ivNew);
        //设置自动 padding 为 true,删除填充补位
        decipher.setAutoPadding(true);
        decoded = decipher.update(encryptedData,'binary','utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
        //decoded是解密后的用户信息
    } catch(e) {
        throw new Error('Illegal Buffer')；
    }
    //解密后的用户数据中会有一个watermark属性，这个属性包含这个小程序的appid和时间戳
    //下面是校验appid
    if(decoded.watermark.appid !== appid) {
        throw new Error('Illegal Buffer');
    }
    return decoded;
}

module.exports = decryptData