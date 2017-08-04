/**
 * Created by jin on 8/2/17.
 */


exports.pageHome = async function pageHome(ctx, next) {

    await ctx.render('admin/adminIndex', { page: { title : 'Admin Homepage !' }});
}

