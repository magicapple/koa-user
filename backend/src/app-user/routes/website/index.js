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
    await ctx.render('web/index', { title : 'Homepage !', users:users });
}

async function pageAdminHome(ctx, next) {

    await ctx.render('admin/adminIndex', { layout: false, title : 'Admin Homepage !' });
}




router.redirect('/', 'index');

router.get('/index', pageWebIndex);


router.get('/admin', pageAdminHome);

module.exports = router;

