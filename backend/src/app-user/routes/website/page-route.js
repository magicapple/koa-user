/**
 * Created by jinwyp on 4/12/17.
 */




const router = require('koa-router')()

const userConstant = require("../../service/user/userConstant");
const captcha = require("../../../koa2/koa2-middleware/captcha");

const auth = require('../../../koa2/koa2-middleware/auth-jwt');



const pageTest = require('../../controllers/page/test')

const pageLogin = require('../../controllers/page/login')
const pageUserHome = require('../../controllers/page/userHome')
const pageAdminHome = require('../../controllers/page/adminHome')


const pageJsonForm = require('../../controllers/page/jsonForm')


router.get('/test1', pageTest.test1)
router.get('/test2', pageTest.test2)
router.get('/wx', pageTest.wx)





router.redirect('/', '/web/index')

router.get('/signup/captcha', captcha.getCaptchaImage(userConstant.captchaType.signup))

router.get('/signup', pageLogin.register)
router.get('/login', pageLogin.login)


router.get('/home', auth(), pageUserHome.userHome)
router.get('/home/*', auth(), pageUserHome.userHome)




router.get('/admin', auth(), pageAdminHome.adminHome)
router.get('/admin/*', auth(), pageAdminHome.adminHome)

router.get('/form/models', pageJsonForm.formModelList)
router.get('/form/data', pageJsonForm.formData)














module.exports = router

