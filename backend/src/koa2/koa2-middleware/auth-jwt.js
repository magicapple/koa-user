/**
 * Created by jinwyp on 4/20/17.
 */


const koaJwt             = require('koa-jwt');

const userService        = require('../../app-user/service/user/userService');


function authMiddleware(options) {

    return koaJwt({
        debug : true,
        secret : GConfig.loginToken.jwtTokenSecret,
        cookie : GConfig.loginToken.tokenFieldName,
        key : 'userToken',
        isRevoked : async (ctx, decodeToken, token) => {

            ctx.state.userInfo = await userService.userInfo(decodeToken);
            return false;
        }
    })
}


module.exports = authMiddleware;

