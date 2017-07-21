/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')();


async function pageWebIndex(ctx, next) {
    const users = [
              {name : 'Dead Horse'},
              {name : 'Jack'},
              {name : 'Tom'}
          ];
    await ctx.render('web/index', { page : {title : 'Homepage !'}, users:users });
}

async function pageAdminHome(ctx, next) {

    await ctx.render('admin/adminIndex', { page: { title : 'Admin Homepage !' }});
}




router.redirect('/', '/web/index');

router.get('/index', pageWebIndex);


router.get('/admin', pageAdminHome);

module.exports = router;

