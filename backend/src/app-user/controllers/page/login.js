/**
 * Created by jin on 8/2/17.
 */


exports.pageLogin = async function pageLogin(ctx, next) {

    await ctx.render('web/login', { page : {title : '登陆页面 !'} });
}


exports.pageRegister = async function pageLogin(ctx, next) {

    await ctx.render('web/register', { page : {title : '注册页面 !'} });
}
