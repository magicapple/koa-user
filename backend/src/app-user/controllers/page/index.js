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