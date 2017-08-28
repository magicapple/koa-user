/**
 * Created by jin on 8/2/17.
 */



exports.userHome = async function pageUserHome(ctx, next) {

    const user = null
    await ctx.render('web/home', { page : {title : 'User Home !'},  user:user });
}

