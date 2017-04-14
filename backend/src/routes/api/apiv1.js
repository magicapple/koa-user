/**
 * Created by JinWYP on 23/01/2017.
 */


const router = require('koa-router')();
const userController = require('../../controllers/user');
const shopController = require('../../controllers/shop');



router.post('/users', userController.registerNewUser);


router.get('/user/session', userController.getSessionUserInfo);



router.get('/shops', shopController.getShopList);
router.post('/shops', shopController.postNewShop);


module.exports = router;