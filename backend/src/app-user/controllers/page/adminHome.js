/**
 * Created by jin on 8/2/17.
 */


exports.adminHome = async function pageAdminHome(ctx, next) {

    await ctx.render('admin/adminIndex', { page: { title : 'Admin Homepage !' }});
}




