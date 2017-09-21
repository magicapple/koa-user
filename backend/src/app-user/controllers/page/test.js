/**
 * Created by jin on 8/2/17.
 */



exports.test1 = async function pageIndex(ctx, next) {
    const users = [
        {name : 'Dead Horse'},
        {name : 'Jack'},
        {name : 'Tom'}
    ];

    const user = null
    await ctx.render('web/index', { page : {title : 'Homepage !'}, users:users, user:user });
}



exports.test2 = async function pageIndex(ctx, next) {

    await ctx.render('test/test', { page : {title : 'Homepage !'} });
}


exports.wx = async function pageIndex(ctx, next) {

    await ctx.render('test/wx');
}


