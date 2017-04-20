/**
 * Created by jinwyp on 4/20/17.
 */


const koaJwt             = require('koa-jwt');


function authMiddleware(options) {

    return koaJwt({
        secret : GConfig.loginToken.jwtTokenSecret,
        cookie : GConfig.loginToken.tokenFieldName
    })
}


module.exports = authMiddleware;

