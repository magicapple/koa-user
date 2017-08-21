/**
 * Created by jin on 8/18/17.
 */

const moment = require('moment')
const captchapng = require('captchapng2');

const mathUtil = require('../../koa2/common-libs/math')

const MCaptcha = require('../../app-user/service/user/model/captcha')



exports.getCaptchaImage = function (captchaType) {
    return async function (ctx, next) {

        let rand = mathUtil.getRandomInt(1000, 9999)
        let png = new captchapng(80, 36, rand); // width,height, numeric captcha

        const captcha = {
            visitorId : ctx.visitor.visitorId,
            type: captchaType,
            code: rand,
            isUsed : false,
            isVerified : false,
            expireDate : moment().add(10, 'minutes')
        }

        const captchaData = await MCaptcha.findOneAndUpdate({visitorId: captcha.visitorId, type : captcha.type }, captcha, { upsert : true} )

        ctx.type = 'image/png'
        ctx.body = png.getBuffer()

    }
}


exports.verifyCaptcha = function (captchaType) {
    return async function (ctx, next) {

        console.log('ctx.visitor.visitorId: ', ctx.visitor.visitorId)

        GDataChecker.userCaptcha(ctx.request.body.captcha)

        const captchaData = await MCaptcha.findOne({visitorId: ctx.visitor.visitorId, type : captchaType, code: ctx.request.body.captcha } )

        ctx.body = { captchaWrong : true }

        if (captchaData) {

            if (!captchaData.isExpired()) {
                captchaData.isVerified = true
                const captchaUpdated = await captchaData.save()
                ctx.body = { captchaWrong : false }
            }
        }
    }
}



exports.verifyMiddleware = function(captchaType) {

    return async function (ctx, next) {

        console.log('ctx.visitor.visitorId: ', ctx.visitor.visitorId)

        const captchaData = await MCaptcha.findOne({visitorId: ctx.visitor.visitorId, type : captchaType,  isUsed: false, isVerified: true} )

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