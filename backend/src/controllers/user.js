/**
 * Created by JinWYP on 23/01/2017.
 */



const superAgent = require('superagent')

const UserService = require('../service/user/userService')
const MUserToken = require('../service/user/model/userToken');

const tokenFieldName = GConfig.loginToken.tokenFieldName;
const TOKEN_EXPIRATION_SEC = 60 * 60 * 24 * GConfig.loginToken.jwtTokenExpireDay;



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

    ctx.cookies.set(tokenFieldName, userToken.accessToken, { maxAge: TOKEN_EXPIRATION_SEC, httpOnly: true })
    ctx.body = userToken;

}


exports.logout = async (ctx, next) => {

    const userTokenPostData = ctx.request.body.accessToken || ctx.cookies.get(tokenFieldName);

    let userToken = await UserService.logout(userTokenPostData);
    ctx.body = userToken || { message : 'Logout success, Token not found'};

}



/**
 * 获取当前用户信息
 */
exports.getSessionUserInfo = async (ctx, next) => {

    console.log("Decode token:", ctx.state.user)

    let user = await UserService.userInfo(ctx.state.user);
    ctx.body = user
}







/**
 * 第三方登录 微信注册新用户
 */

exports.registerUserWeChat = async (ctx, next) => {

    const jscode = ctx.request.body.code || '';

    const appid = 'wx48eb5eda518e52a9';
    const secret = '939ef96f22327cf4ef4243c9e4268e92';

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${jscode}&grant_type=authorization_code`;
    console.log('Request 微信 API 获取 openid url: ', url);

    let wxUserResult = await superAgent.get(url);
    let wxUserSession = JSON.parse(wxUserResult.text)

    console.log('微信 openid : ', wxUserSession);

    if (wxUserSession.errcode){
        ctx.body = wxUserSession;
    }else{

        // 在我们系统注册新用户

        const newUserWeChat = {
            username : 'wx-' + wxUserSession.openid.substr(0,27),
            idWeChatOpenID :  wxUserSession.openid,
            password : 'wx12345678'
        }

        let newUser = await UserService.signUpWeChat(newUserWeChat);

        let userToken = await MUserToken.generateToken(newUser, ctx, wxUserSession.wxUserSession);

        ctx.body = userToken;
    }


}
