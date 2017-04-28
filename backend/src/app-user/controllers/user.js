/**
 * Created by JinWYP on 23/01/2017.
 */


const superAgent = require('superagent')

const WXBizDataCrypt = require('../business-libs/wechat/WXBizDataCrypt');

const headerToken = require('../../koa2/common-libs/header/auth-header')
const UserService = require('../service/user/userService')
const MUserToken = require('../service/user/model/userToken')

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


/**
 * 登陆
 */
exports.login = async (ctx, next) => {

    const userPostData = ctx.request.body;

    let resultUser = await UserService.login(userPostData);
    let userToken = await MUserToken.generateToken(resultUser, ctx);

    ctx.cookies.set(tokenFieldName, userToken.accessToken, { maxAge: TOKEN_EXPIRATION_SEC, httpOnly: true })
    ctx.body = userToken;

}


/**
 * 退出登陆
 */
exports.logout = async (ctx, next) => {

    const userTokenPostData = ctx.request.body.accessToken || ctx.cookies.get(tokenFieldName) || headerToken(ctx);

    ctx.cookies.set(tokenFieldName, userToken.accessToken, { maxAge: TOKEN_EXPIRATION_SEC, httpOnly: true })

    let userToken = await UserService.logout(userTokenPostData);
    ctx.body = userToken || { message : 'Logout success, Token not found'};

}



/**
 * 获取当前用户信息
 */
exports.getSessionUserInfo = async (ctx, next) => {

    ctx.body = ctx.state.userInfo
}







/**
 * 第三方登录 微信注册新用户
 */

exports.registerUserWeChat = async (ctx, next) => {

    console.log('=============== 微信 ==============');

    console.log('微信注册用户Post信息 : ', ctx.request.body);

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

        /**
         * 签名校验 和 加密数据解密算法
         *  http://www.ionic.wang/weixin/api/signature.html
         */

        const encryptedData = ctx.request.body.encryptedData
        const iv = ctx.request.body.iv

        const sessionKey = wxUserSession.session_key;

        let pc = new WXBizDataCrypt(appid, sessionKey)

        const dataDecoded = pc.decryptData(encryptedData , iv)

        console.log('微信用户信息 解密后 data: ', dataDecoded)

        // 解密后的数据为
        //
        // data = {
        //   "nickName": "Band",
        //   "gender": 1,
        //   "language": "zh_CN",
        //   "city": "Guangzhou",
        //   "province": "Guangdong",
        //   "country": "CN",
        //   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
        //   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
        //   "watermark": {
        //     "timestamp": 1477314187,
        //     "appid": "wx4f4bc4dec97d474b"
        //   }
        // }



        // 在我们系统注册新用户 如果有昵称则使用昵称作为username注册用户，否则使用openid作为username

        let username = dataDecoded.nickName || 'wx-' + wxUserSession.openid;

        if (username.length <6) username = 'wx-' + wxUserSession.openid

        const newUserWeChat = {
            username : username,
            idWeChatOpenID :  wxUserSession.openid,
            password : 'wx12345678',
            nickname : dataDecoded.nickName || ''
        }

        let newUser = await UserService.signUpWeChat(newUserWeChat);

        let userToken = await MUserToken.generateToken(newUser, ctx, wxUserSession.session_key);

        ctx.body = userToken;
    }



}
