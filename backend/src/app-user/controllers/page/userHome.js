/**
 * Created by jin on 8/2/17.
 */


async function pageWebHome(ctx, next) {
    const users = [
        {name : 'Dead Horse'},
        {name : 'Jack'},
        {name : 'Tom'}
    ];
    await ctx.render('web/home', { page : {title : 'Homepage !'}, users:users });
}
