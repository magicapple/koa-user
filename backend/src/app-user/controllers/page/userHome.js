/**
 * Created by jin on 8/2/17.
 */



exports.userHome = async function pageUserHome(ctx, next) {

    await ctx.render('web/home', { page : {title : 'User Home !'} });
}

