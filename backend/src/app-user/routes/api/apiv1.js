/**
 * Created by JinWYP on 23/01/2017.
 */

const multer          = require('koa-multer')
const upload = multer({ dest: GConfig.pathFileUpload })


const auth = require('../../../koa2/koa2-middleware/auth-jwt')
const authRole = require('../../../koa2/koa2-middleware/auth-role')
const UserRoleService = require('../../service/user/userRoleService')


const router = require('koa-router')()
const initController = require('../../controllers/api/initdata')
const userController = require('../../controllers/api/user')
const userAddressController = require('../../controllers/api/userAddress')


const formController = require('../../controllers/api/form')
const testController = require('../../controllers/api/test')

const userConstant = require("../../service/user/userConstant")
const captcha = require("../../../koa2/koa2-middleware/captcha")



const files = async (ctx, next) => {

    console.log('ctx.req.file: ', ctx.req.file)

    ctx.body = ctx.req.file
}


router.post('/upload', upload.single('file'), files)




router.post('/init', initController.run)


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
router.post('/users/session/info', auth(), userController.saveUserBasicInfo)
router.post('/users/session/password', auth(), authRole(UserRoleService.permissions.user.updatePassword), userController.modifyUserPassword)


router.get('/users/address', auth(), userAddressController.getUserAddressListById)
router.post('/users/address', auth(), userAddressController.addNewAddress)
router.put('/users/address/:addressId', auth(), userAddressController.updateNewAddress)



router.get('/test/users', testController.getUsers)
router.post('/test/users', testController.getUsers)
router.put('/test/users/:userId', testController.getUsers)

router.get('/test/teams', testController.getTeams)
router.get('/test/departments', testController.getDepartments)

router.get('/test/yings', testController.getOrderList)
router.post('/test/yings', testController.getOrderList)
router.put('/test/yings/:id', testController.getOrderList)




router.post('/test/shops', testController.postNewShop)





router.get('/form/models', formController.getFormModelList)
router.post('/form/models', formController.postNewFormModel)
router.get('/form/models/:id', formController.getFormModel)

router.get('/form/models/:id/formdata', formController.getFormDataList)
router.post('/form/models/:id/formdata', formController.postNewFormData)








module.exports = router

