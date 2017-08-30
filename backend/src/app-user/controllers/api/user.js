/**
 * Created by JinWYP on 23/01/2017.
 */



const WXBizDataCrypt = require('../../business-libs/wechat/WXBizDataCrypt');
const weChatMiniApp = require('../../business-libs/wechat/weChatMiniApp');


const headerToken = require('../../../koa2/common-libs/authorization-header/auth-header')
const UserService = require('../../service/user/userService')
const MUserToken = require('../../service/user/model/userToken')



const tokenFieldName = GConfig.authToken.fieldName;
const TOKEN_EXPIRATION_SEC = 1000 * 60 * 60 * 24 * GConfig.authToken.expireDay;



/**
 * 注册新用户
 */
exports.registerNewUser = async (ctx, next) => {

    const userPostData = ctx.request.body;

    let newUser = await UserService.signUp(userPostData);
    ctx.body = newUser;

}

/**
 * 注册检查用户名是否重复
 */
exports.registerUsernameCheck = async (ctx, next) => {

    let newUser = await UserService.checkUsernameExist(ctx.request.body.username);

    if (newUser) {
        ctx.body = { usernameIsExist : true };
    } else {
        ctx.body = { usernameIsExist : false };
    }

}

/**
 * 注册检查手机号是否重复
 */
exports.registerMobilePhoneCheck = async (ctx, next) => {

    let newUser = await UserService.checkMobilePhoneExist(ctx.request.body.mobilePhone);

    if (newUser) {
        ctx.body = { mobilePhoneIsExist : true };
    } else {
        ctx.body = { mobilePhoneIsExist : false };
    }

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

    let userToken = await UserService.logout(userTokenPostData)
    ctx.cookies.set(tokenFieldName, null, { maxAge: TOKEN_EXPIRATION_SEC, httpOnly: true })

    ctx.body = userToken || { message : 'Logout success, but token not found'};

}



/**
 * 获取当前用户信息
 */
exports.getSessionUserInfo = async (ctx, next) => {

    ctx.body = ctx.state.user
}

/**
 * 修改用户基本信息
 */
exports.saveUserBasicInfo = async (ctx, next) => {

    let user = await UserService.saveUserBasicInfo(ctx.state.user._id, ctx.request.body)

    ctx.body = user

}







/**
 * 第三方登录 微信注册新用户
 */

exports.registerUserWeChat = async (ctx, next) => {

    console.log('----- 微信注册用户Post信息 : ', ctx.request.body);

    const jsCode = ctx.request.body.code || "";
    const signature = ctx.request.body.signature || "";
    const encryptedData = ctx.request.body.encryptedData || "";
    const iv = ctx.request.body.iv || ""; //对称解密算法初始向量

    GDataChecker.userWeChatJsCode(jsCode);
    GDataChecker.userWeChatUserInfoSignature(signature);

    GDataChecker.userWeChatEncryptedData(encryptedData);
    GDataChecker.userWeChatUserInfoIV(iv);


    const appId = GConfig.weChatMiniApp.appId;
    const secret = GConfig.weChatMiniApp.secret;

    let miniApp = new weChatMiniApp(appId, secret );

    let wxUserResult = await miniApp.getSessionKeyAndOpenId(jsCode);
    let wxUserSession = JSON.parse(wxUserResult.text)

    // 文档 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject
    console.log('----- 微信 openid : ', wxUserSession);

    GDataChecker.userWeChatUserSessionKey(wxUserSession.session_key);
    if (wxUserSession.errcode){

        // 如果微信返回错误码, 直接把微信返回的信息返回给前端
        ctx.body = wxUserSession;
    }else{

        /**
         * 签名校验 和 加密数据解密算法
         *  http://www.ionic.wang/weixin/api/signature.html
         */

        const isValid = miniApp.verifyUserInfoSignature(ctx.request.body.rawData, wxUserSession.session_key, signature)
        const dataDecoded = miniApp.decryptUserInfo(wxUserSession.session_key, encryptedData, iv)

        // 解密后的数据范例为
        const simpleData = {
          "nickName": "Band",
          "gender": 1,
          "language": "zh_CN",
          "city": "Guangzhou",
          "province": "Guangdong",
          "country": "CN",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
          "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
          "watermark": {
            "timestamp": 1477314187,
            "appid": "wx4f4bc4dec97d474b"
          }
        }


        // 在我们系统注册新用户 如果有昵称则使用昵称作为username注册用户，否则使用openid作为username
        let username = dataDecoded.nickName || 'wx-' + wxUserSession.openid;
        if (username.length <6) username = 'wx-' + wxUserSession.openid

        const newUserWeChat = {
            username : username,
            idWeChatOpenID :  wxUserSession.openid,
            password : 'wx12345678',
            nickname : dataDecoded.nickName || '',

            openid : wxUserSession.openid,
            gender : dataDecoded.gender,

            avatarUrl : dataDecoded.avatarUrl,
            language : dataDecoded.language,

            country : dataDecoded.country,
            province : dataDecoded.province,
            city : dataDecoded.city,
        }

        let newUser = await UserService.signUpWeChat(newUserWeChat);
        let userToken = await MUserToken.generateToken(newUser, ctx, wxUserSession.session_key);

        ctx.body = userToken;
    }

}
