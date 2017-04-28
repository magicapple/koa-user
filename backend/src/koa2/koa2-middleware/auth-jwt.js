/**
 * Created by jinwyp on 4/20/17.
 */


const koaJwt             = require('koa-jwt');

const UserService        = require('../../app-user/service/user/userService');


function authMiddleware(options) {

    return koaJwt({
        debug : true,
        secret : GConfig.loginToken.jwtTokenSecret,
        cookie : GConfig.loginToken.tokenFieldName,
        key : 'userToken',  // add token info to ctx.state.userToken
        isRevoked : async (ctx, decodeToken, token) => {

            ctx.state.userInfo = await UserService.userInfo(decodeToken);
            return false;
        }
    })
}


module.exports = authMiddleware;

