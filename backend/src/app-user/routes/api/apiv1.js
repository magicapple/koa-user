/**
 * Created by JinWYP on 23/01/2017.
 */

const multer          = require('koa-multer')
const upload = multer({ dest: GConfig.pathFileUpload })


const auth = require('../../../koa2/koa2-middleware/auth-jwt')

const router = require('koa-router')()
const initController = require('../../controllers/api/initdata')
const userController = require('../../controllers/api/user')
const userAddressController = require('../../controllers/api/userAddress')

const shopController = require('../../controllers/api/shop')
const formController = require('../../controllers/api/form')


const userConstant = require("../../service/user/userConstant")
const captcha = require("../../../koa2/koa2-middleware/captcha")



const files = async (ctx, next) => {

    console.log('ctx.req.file: ', ctx.req.file)

    ctx.body = ctx.req.file
}


router.post('/upload', upload.single('file'), files)




router.post('/init/userrole', initController.createUserRoles)


router.post('/user/signup', captcha.verifyImageMiddleware(userConstant.captchaType.signup), userController.registerNewUser)
router.post('/user/signupmobile', captcha.verifySMSCodeMiddleware(userConstant.captchaType.signup), userController.registerNewUser)

router.post('/user/signup/username', userController.registerUsernameCheck)
router.post('/user/signup/phone', userController.registerMobilePhoneCheck)

router.post('/user/signup/captcha', captcha.verifyCaptchaImage(userConstant.captchaType.signup))
router.get('/user/signup/sms/:mobilePhone', captcha.verifyImageMiddleware(userConstant.captchaType.signup, 3), captcha.getSMSCode(userConstant.captchaType.signup))
router.post('/user/signup/smscode', captcha.verifySMSCode(userConstant.captchaType.signup))



router.post('/user/signup/wechat', userController.registerUserWeChat)




router.post('/user/login', userController.login)
router.post('/user/logout', userController.logout)



router.get('/users/session', auth(), userController.getSessionUserInfo)
router.post('/users/info', auth(), userController.saveUserBasicInfo)


router.get('/users/address', auth(), userAddressController.getUserAddressListById)
router.post('/users/address', auth(), userAddressController.addNewAddress)



router.get('/shops', shopController.getShopList)
router.post('/shops', shopController.postNewShop)





router.get('/form/models', formController.getFormModelList)
router.post('/form/models', formController.postNewFormModel)
router.get('/form/models/:id', formController.getFormModel)

router.get('/form/models/:id/formdata', formController.getFormDataList)
router.post('/form/models/:id/formdata', formController.postNewFormData)



module.exports = router

