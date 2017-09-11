/**
 * Created by jinwyp on 4/20/17.
 */


const koaJwt = require('koa-jwt')

const UserService     = require('../../app-user/service/user/userService')
const UserRoleService = require('../../app-user/service/user/userRoleService')

function authMiddleware(options) {

    return koaJwt({
        debug : true,
        secret : GConfig.authToken.secret,
        cookie : GConfig.authToken.fieldName,
        key : 'userToken',  // add token info to ctx.state.userToken
        isRevoked : async (ctx, decodeToken, token) => {

            ctx.state.user = await UserService.userInfo(decodeToken)

            console.log('ctx.state: ', ctx.state)

            return false
        }
    })
}


module.exports = authMiddleware

