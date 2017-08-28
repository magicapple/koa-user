/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')()

const pageIndex = require('../../controllers/page/index')
const pageLogin = require('../../controllers/page/login')
const pageUserHome = require('../../controllers/page/userHome')

const pageAdminHome = require('../../controllers/page/adminHome')

const userConstant = require("../../service/user/userConstant");
const captcha = require("../../../koa2/koa2-middleware/captcha");



router.redirect('/', '/web/index')

router.get('/signup/captcha', captcha.getCaptchaImage(userConstant.captchaType.signup))

router.get('/signup', pageLogin.register)
router.get('/login', pageLogin.login)

router.get('/index', pageIndex.index)
router.get('/home', pageUserHome.userHome)




router.get('/admin', pageAdminHome.adminHome)





router.get('/wx', async function pageIndex(ctx, next) {
    await ctx.render('test/wx');
})









module.exports = router

