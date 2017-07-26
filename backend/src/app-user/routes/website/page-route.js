/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')();


async function pageWebHome(ctx, next) {
    const users = [
              {name : 'Dead Horse'},
              {name : 'Jack'},
              {name : 'Tom'}
          ];
    await ctx.render('web/home', { page : {title : 'Homepage !'}, users:users });
}

async function pageWebLogin(ctx, next) {
    await ctx.render('web/login', { page : {title : 'Login !'} });
}


async function pageAdminHome(ctx, next) {

    await ctx.render('admin/adminIndex', { page: { title : 'Admin Homepage !' }});
}




router.redirect('/', '/web/home');

router.get('/login', pageWebLogin);
router.get('/home', pageWebHome);



router.get('/admin', pageAdminHome);

module.exports = router;

