/**
 * Created by jin on 8/2/17.
 */



exports.index = async function pageIndex(ctx, next) {
    const users = [
        {name : 'Dead Horse'},
        {name : 'Jack'},
        {name : 'Tom'}
    ];

    const user = null
    await ctx.render('web/index', { page : {title : 'Homepage !'}, users:users, user:user });
}


exports.userHome = async function pageIndex(ctx, next) {

    const user = null
    await ctx.render('web/home', { page : {title : 'User Home !'},  user:user });
}