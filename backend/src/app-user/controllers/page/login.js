/**
 * Created by jin on 8/2/17.
 */
const captchapng = require('captchapng2');
const nanoid = require('nanoid')

const mathUtil = require('../../../koa2/common-libs/math')
const userConstant = require("../../service/user/userConstant");
const MCaptcha = require('../../service/user/model/captcha')

exports.login = async function pageLogin(ctx, next) {

    await ctx.render('web/login', { page : {title : '登陆页面 !'} });
}


exports.register = async function pageLogin(ctx, next) {
    await ctx.render('web/register', { page : {title : '注册页面 !'} });
}





exports.getCaptchaImage = async function (ctx, next) {

    let rand = mathUtil.getRandomInt(1000, 9999)
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha

    const captcha = {
        visitorId : ctx.visitor.visitorId,
        type: userConstant.captchaType.signup,

        code: rand
    }

    const captchaData = await MCaptcha.findOneAndUpdate({visitorId: captcha.visitorId, type : captcha.type }, captcha, { upsert : true} )


    ctx.type = 'image/png'
    ctx.body = png.getBuffer()

    console.log('captchaData', captchaData)
}