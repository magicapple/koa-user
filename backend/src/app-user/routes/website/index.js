/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')();


async function pageIndex(ctx, next) {
    const users = [
              {name : 'Dead Horse'},
              {name : 'Jack'},
              {name : 'Tom'}
          ];
    await ctx.render('websiteIndex', { title : 'Homepage !', users:users });
}



router.redirect('/', 'index');
router.get('/index', pageIndex);


module.exports = router;