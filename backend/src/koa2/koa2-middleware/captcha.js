/**
 * Created by jin on 8/18/17.
 */

const moment = require('moment')
const captchapng = require('captchapng2');

const mathUtil = require('../../koa2/common-libs/math')
const SMS = require('../../koa2/koa2-libs/sms/alicloud/sms')

const UserService = require('../../app-user/service/user/userService')
const MCaptcha = require('../../app-user/service/user/model/captcha')



const CaptchaExpireMinutes = 10
const SendType = {
    image : 'image',
    sms : 'sms'

}


/**
 * 发送图片验证码
 */
exports.getCaptchaImage = function (captchaType) {
    return async function (ctx, next) {

        let rand = mathUtil.getRandomInt(1000, 9999)
        let png = new captchapng(80, 36, rand); // width,height, numeric captcha

        const captcha = {
            visitorId : ctx.visitor.visitorId,
            sendType: SendType.image,
            type: captchaType,
            code: rand,
            isUsed : false,
            isVerified : false,
            expireDate : moment().add(CaptchaExpireMinutes, 'minutes')
        }

        const captchaData = await MCaptcha.findOneAndUpdate({visitorId: captcha.visitorId, type : captchaType, sendType : SendType.image}, captcha, { upsert : true} )

        ctx.type = 'image/png'
        ctx.body = png.getBuffer()

    }
}


exports.verifyCaptchaImage = function (captchaType) {
    return async function (ctx, next) {

        console.log('ctx.visitor.visitorId: ', ctx.visitor.visitorId)

        GDataChecker.userCaptcha(ctx.request.body.captcha)

        const captchaData = await MCaptcha.findOne({visitorId: ctx.visitor.visitorId, type : captchaType, sendType : SendType.image, code: ctx.request.body.captcha } )

        ctx.body = { captchaWrong : true }
        console.log("captchaData", captchaData)
        if (captchaData) {

            if (!captchaData.isExpired()) {
                captchaData.isVerified = true
                const captchaUpdated = await captchaData.save()
                ctx.body = { captchaWrong : false }
            }
        }
    }
}



exports.verifyImageMiddleware = function(captchaType) {

    return async function (ctx, next) {

        console.log('ctx.visitor.visitorId: ', ctx.visitor.visitorId)

        const captchaData = await MCaptcha.findOne({visitorId: ctx.visitor.visitorId, type : captchaType, sendType : SendType.image, isUsed: false, isVerified: true} )

        console.log('captchaData: ', captchaData)

        if (captchaData) {
            captchaData.isUsed = true
            const captchaUpdated = await captchaData.save()
            return next()

        }else {
            GDataChecker.userCaptchaUsed(captchaData)
        }

    }
}




/**
 * 发送短信验证码
 */
exports.getSMSCode = function (captchaType) {

    return async function (ctx, next) {

        const mobilePhoneNumber = ctx.params.mobilePhone
        GDataChecker.userMobile(mobilePhoneNumber)

        let newUser = await UserService.checkMobilePhoneExist(mobilePhoneNumber);

        if (newUser) {
            GDataChecker.userMobilePhoneExist(newUser.mobilePhone)
        }else {

            let code = mathUtil.getRandomInt(1000, 999999)

            const captcha = {
                visitorId : ctx.visitor.visitorId,
                sendType: SendType.sms,
                type: captchaType,
                code: code,
                mobilePhone: mobilePhoneNumber,
                isUsed : false,
                isVerified : false,
                expireDate : moment().add(CaptchaExpireMinutes, 'minutes')
            }


            /**
             * 发送短信验证码 错误代码
             *
             * https://api.alidayu.com/doc2/apiDetail?apiId=25450
             *
             * isv.BUSINESS_LIMIT_CONTROL
             *
             * 短信验证码，使用同一个签名，对同一个手机号码发送短信验证码，支持1条/分钟，5条/小时，10条/天。一个手机号码通过阿里大于平台只能收到40条/天。
             * 短信通知，使用同一签名、同一模板，对同一手机号发送短信通知，允许每天50条（自然日）。
             *
             */


            const [resultSMS, captchaResult] = await Promise.all([
                // SMS.sendCode(mobilePhoneNumber, code),
                MCaptcha.findOneAndUpdate({visitorId: captcha.visitorId, type : captchaType, sendType : SendType.sms}, captcha, { upsert : true} )
            ]);

            console.log('SMS send success: ', resultSMS)
            console.log('captcha save success: ', captchaResult)

            ctx.body = {smsSendSuccess : true}

        }

    }
}

