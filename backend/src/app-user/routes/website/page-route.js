/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')()

const pageIndex = require('../../controllers/page/index')
const pageLogin = require('../../controllers/page/login')

const pageAdminHome = require('../../controllers/page/adminHome')


router.redirect('/', '/web/index')

router.get('/signup', pageLogin.register)
router.get('/login', pageLogin.login)

router.get('/index', pageIndex.index)
router.get('/userhome', pageIndex.userHome)








router.get('/admin', pageAdminHome.pageHome)

module.exports = router

