/**
 * Created by JinWYP on 23/01/2017.
 */


const UserService = require('../service/user/userService')



/**
 * 注册新用户
 */
exports.registerNewUser = async (ctx, next) => {

    const userPostData = ctx.request.body;
    let newUser = {};

    GDataChecker.username(userPostData.username);
    GDataChecker.userPassword(userPostData.password);

    if (userPostData.email ){
        newUser = await UserService.signUp(userPostData);
    }

    if (userPostData.mobile){
        newUser = await UserService.signUp(userPostData);
    }

    ctx.body = newUser;

}



/**
 * 获取当前登录用户信息
 */
exports.getSessionUserInfo = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = {
        username: '阿，希爸',
        age: 30
    }
}





