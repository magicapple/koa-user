/**
 * Created by jin on 8/18/17.
 */

const captchapng = require('captchapng2');

const mathUtil = require('../../koa2/common-libs/math')

const MCaptcha = require('../../app-user/service/user/model/captcha')



exports.getCaptchaImage = function (captchaType) {
    return async function (ctx, next) {

        let rand = mathUtil.getRandomInt(1000, 9999)
        let png = new captchapng(80, 30, rand); // width,height, numeric captcha

        const captcha = {
            visitorId : ctx.visitor.visitorId,
            type: captchaType,
            code: rand
        }

        const captchaData = await MCaptcha.findOneAndUpdate({visitorId: captcha.visitorId, type : captcha.type }, captcha, { upsert : true} )

        ctx.type = 'image/png'
        ctx.body = png.getBuffer()

    }
}


exports.verifyCaptcha = function (captchaType) {
    return async function (ctx, next) {

        GDataChecker.userCaptcha(ctx.request.body.captcha)

        const captchaData = await MCaptcha.findOne({visitorId: ctx.visitor.visitorId, type : captchaType } )

        if (captchaData) {
            ctx.body = { captchaVerified : true };
        } else {
            ctx.body = { captchaVerified : false };
        }

    }
}



exports.verifyMiddleware = function(captchaType) {



    return async function (ctx, next) {

        const visitorId = ctx.cookies.get(options.key , {signed : options.signed})


        const visitor = {
            visitorId: '',
            ipv4: ctx.ipv4 || '',
            ipv6: ctx.ipv6 || '',
            deviceType: ctx.userDevice || '',
            userAgent : ctx.header['user-agent']
        }

        if (ctx.userAgent) {
            visitor.browser = ctx.userAgent.browser
            visitor.browserVersion = ctx.userAgent.version

            visitor.OS = ctx.userAgent.platform
            visitor.OSVersion = ctx.userAgent.os

            visitor.isMobile = ctx.userAgent.isMobile
            visitor.isDesktop = ctx.userAgent.isDesktop

        }


        if (!visitorId) {
            visitor.visitorId = nanoid()

            ctx.cookies.set(options.key, uuid, options)

            ctx.visitor = await MVisitor.create(visitor)

        }else {
            ctx.visitor = await MVisitor.find1({visitorId: visitorId})

            if (!ctx.visitor) {
                visitor.visitorId = visitorId
                ctx.visitor = await MVisitor.create(visitor)
            }
        }

        return next()
    }
}