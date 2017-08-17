/**
 * Created by jin on 8/2/17.
 */
const captchapng = require('captchapng2');


exports.login = async function pageLogin(ctx, next) {

    await ctx.render('web/login', { page : {title : '登陆页面 !'} });
}


exports.register = async function pageLogin(ctx, next) {
    await ctx.render('web/register', { page : {title : '注册页面 !'} });
}


exports.getCaptchaImage = async function (ctx, next) {
    let rand = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha

    ctx.type = 'image/png';
    ctx.body = png.getBuffer();

    ctx.session.captcha = rand;  //这里可能需要加载session模块，输出验证码，在别的模块调用参与登陆逻辑验证

}