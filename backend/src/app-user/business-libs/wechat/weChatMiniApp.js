/**
 * Created by jin on 5/2/17.
 */

const crypto = require('crypto')
const superAgent = require('superagent')

const debug  = require('debug')('koa2-user:weChat');



function sha1( data ) {
    let generator = crypto.createHash('sha1');
    generator.update( data )
    return generator.digest('hex')
}


class weChatMiniApp {
    constructor(appid, secret) {
        this.appid = appid;
        this.secret = secret;
    }

    getSessionKeyAndOpenId (js_code) {

        // 文档 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject

        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${js_code}&grant_type=authorization_code`;
        // debug('----- 微信 API 通过 code 换取 session_key 和 openid 的 url: ', url);

        return superAgent.get(url).then(function(result){
            return result
        })

    }


    /**
     *  加密数据解密算法
     *  http://www.ionic.wang/weixin/api/signature.html
     */

    decryptUserInfo (sessionKey, encryptedData, iv) {

        // base64 decode
        sessionKey = new Buffer(sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')

        let resultDecoded;

        try {
            // 解密
            let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)

            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)

            let decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')

            resultDecoded = JSON.parse(decoded)

            // debug('----- 微信用户信息 解密后 data: ', resultDecoded)

        } catch (err) {
            throw new Error('Illegal Buffer')
        }

        if (resultDecoded.watermark.appid !== this.appid) {
            throw new Error('Illegal Buffer')
        }

        return resultDecoded
    }


    /**
     *  签名校验
     *  https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html
     *  http://www.ionic.wang/weixin/api/signature.html
     */
    verifyUserInfoSignature (rawData, session_key, signature){

        const signatureRaw = sha1(rawData + session_key);

        // debug('----- 微信 getUserInfo 签名校验: ', signatureRaw, signature, signatureRaw === signature)

        return signatureRaw === signature;
    }


}



function init(appid, secret){
    return new weChatMiniApp(appid, secret)
}

module.exports = init;