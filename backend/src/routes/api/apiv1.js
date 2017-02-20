/**
 * Created by JinWYP on 23/01/2017.
 */


const router = require('koa-router')();
const userController = require('../../controllers/user');

router.get('/user/session', userController.getSessionUserInfo);


router.post('/users', userController.registerNewUser);

module.exports = router;