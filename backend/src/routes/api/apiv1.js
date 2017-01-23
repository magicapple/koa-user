/**
 * Created by JinWYP on 23/01/2017.
 */


const router = require('koa-router')();
const userController = require('../../controllers/user');

router.get('/getUser', userController.getUser);
router.post('/registerUser', userController.registerUser);

module.exports = router;