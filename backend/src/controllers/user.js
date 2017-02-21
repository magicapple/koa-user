/**
 * Created by JinWYP on 23/01/2017.
 */


const ValidationError = require('../errors/ValidationError');


/**
 * 获取当前登录用户信息
 */
exports.getSessionUserInfo = async (ctx, next) => {
    throw new ValidationError('xXXXXX', 'xxxxxx');

    ctx.body = {
        username: '阿，希爸',
        age: 30
    }
}



/**
 * 注册新用户
 */
exports.registerNewUser = async (ctx, next) => {

    ctx.body = [
        {
            username : '阿，希爸',
            age      : 30
        }
    ]

    ctx.meta = {
        total : 10,
        numPerPage : 10,
        offset : 10,
        page : 1
    }

}


