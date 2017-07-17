/**
 * Created by JinWYP on 23/01/2017.
 */

const multer          = require('koa-multer');
const upload = multer({ dest: GConfig.path_file_upload });


const auth = require('../../../koa2/koa2-middleware/auth-jwt');

const router = require('koa-router')();
const userController = require('../../controllers/user');
const shopController = require('../../controllers/shop');


const files = async (ctx, next) => {

    console.log('ctx.req.file: ', ctx.req.file)

    ctx.body = ctx.req.file;
}


router.post('/upload', upload.single('file'), files);


router.post('/user/signup', userController.registerNewUser);
router.post('/user/signup/wechat', userController.registerUserWeChat);

router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);



router.get('/users/session', auth(), userController.getSessionUserInfo);



router.get('/shops', shopController.getShopList);
router.post('/shops', shopController.postNewShop);


module.exports = router;

