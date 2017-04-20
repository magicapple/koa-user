/**
 * Created by JinWYP on 23/01/2017.
 */


const UserService = require('../service/user/userService')
const MUserToken = require('../service/user/model/userToken');


/**
 * 注册新用户
 */
exports.registerNewUser = async (ctx, next) => {

    const userPostData = ctx.request.body;

    let newUser = await UserService.signUp(userPostData);

    ctx.body = newUser;

}


exports.login = async (ctx, next) => {

    const userPostData = ctx.request.body;

    let resultUser = await UserService.login(userPostData);

    let userToken = await MUserToken.generateToken(resultUser, ctx);

    ctx.body = userToken;

}


exports.logout = async (ctx, next) => {

    const userPostData = ctx.request.body;

    let userToken = await UserService.logout(userPostData);

    ctx.body = userToken;

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





