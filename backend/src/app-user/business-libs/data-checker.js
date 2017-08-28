/**
 * Created by jinwyp on 4/14/17.
 */


const validator = require('validator');




function throw409 (codeName, field){
    field = field || '';
    throw (new GValidationError(codeName, field))
}


function throw401 (codeName, field){
    field = field || '';
    throw (new GUnauthenticatedAccessError(codeName, field))
}




let validation = {
    username : function (username, field){
        if (!username) return throw409('user.usernameRequired', field);
        if (!validator.isLength(username, 4, 30))  return throw409('user.usernameWrong', field);
        if (!validator.matches(username, /^[a-zA-Z][a-zA-Z0-9_]*$/))  return throw409('user.usernameWrong', field);
    },
    userPassword : function (password, field){
        if (!password) return throw409('user.passwordRequired', field);
        if (!validator.isLength(password, 6, 30)) return throw409('user.passwordWrong', field);
    },
    userEmail : function (email, field){
        if (!email) return throw409('user.emailRequired', field);
        if (!validator.isEmail(email)) return throw409('user.emailWrong', field);
    },
    userMobile : function (mobilePhone, field){
        if (!mobilePhone) return throw409('user.mobileRequired', field);
        if (!validator.isMobilePhone(mobilePhone, 'zh-CN')) return throw409('user.mobileWrong', field);
    },

    userCaptcha : function (captcha, field){
        if (!captcha) return throw409('user.captchaRequired', field);
        if (!validator.isLength(captcha, 4, 4)) return throw409('user.captchaWrong', field);
    },

    userSMSCode : function (smsCode, field){
        if (!smsCode) return throw409('user.smsCodeRequired', field);
        if (!validator.isLength(smsCode, 6, 6)) return throw409('user.smsCodeWrong', field);
    },

    userCaptchaUsed : function (captcha, field){
        if (!captcha) return throw409('user.captchaUsed', field);
        if (!validator.isLength(captcha, 4, 4)) return throw409('user.captchaUsed', field);
    },

    userCaptchaTooManyTimes : function (captcha, field){
        if (!captcha) return throw409('user.captchaTooManyTimes', field);
        if (!validator.isLength(captcha, 4, 4)) return throw409('user.captchaTooManyTimes', field);
    },

    userSMSCodeUsed : function (smsCode, field){
        if (!smsCode) return throw409('user.smsCodeUsed', field);
        if (!validator.isLength(smsCode, 6, 6)) return throw409('user.smsCodeUsed', field);
    },

    userSMSCodeFrequently : function (smsCode, field){
        if (!smsCode) return throw409('user.smsCodeFrequently', field);
        if (!validator.isLength(smsCode, 6, 6)) return throw409('user.smsCodeFrequently', field);
    },


    userWeChatJsCode : function (js_code, field){
        if (!js_code) return throw409('user.weChatJsCodeRequired', field);
        if (!validator.isLength(js_code, 32, 50))  return throw409('user.weChatJsCodeWrong', field);
    },
    userWeChatOpenID : function (openId, field){
        if (!openId) return throw409('user.weChatOpenIDRequired', field);
        if (!validator.isLength(openId, 28, 30))  return throw409('user.weChatOpenIDWrong', field);
    },
    userWeChatUnionID : function (unionId, field){
        if (!unionId) return throw409('user.weChatUnionIDRequired', field);
        if (!validator.isLength(unionId, 29, 30))  return throw409('user.weChatUnionIDWrong', field);
    },
    userWeChatEncryptedData : function (encryptedData, field){
        if (!encryptedData) return throw409('user.weChatEncryptedDataRequired', field);
        if (!validator.isLength(encryptedData, 100, 1000))  return throw409('user.weChatEncryptedDataWrong', field);
    },
    userWeChatUserInfoIV : function (iv, field){
        if (!iv) return throw409('user.weChatUserInfoIVRequired', field);
        if (!validator.isLength(iv, 24, 24))  return throw409('user.weChatUserInfoIVWrong', field);
    },
    userWeChatUserSessionKey : function (session_key, field){
        if (!session_key) return throw409('user.weChatUserSessionKeyRequired', field);
        if (!validator.isLength(session_key, 24, 24))  return throw409('user.weChatUserSessionKeyWrong', field);
    },
    userWeChatUserInfoSignature : function (signature, field){
        if (!signature) return throw409('user.weChatUserInfoSignatureRequired', field);
        if (!validator.isLength(signature, 40, 40))  return throw409('user.weChatUserInfoSignatureWrong', field);
    },


    usernameExist : function (user, field){
        if (user) return throw409('user.usernameExist', field);
    },
    userEmailExist : function (user, field){
        if (user) return throw409('user.emailExist', field);
    },
    userMobilePhoneExist : function (user, field){
        if (user) return throw409('user.mobileExist', field);
    },
    userWeChatOpenIDExist : function (user, field){
        if (user) return throw409('user.weChatOpenIDExist', field);
    },



    loginUserNotFound : function (user, field){
        if (!user) return throw409('user.userNotFound', field);
    },

    loginUserUnauthorized : function (isPasswordMatch, field){
        if (!isPasswordMatch) return throw409('user.passwordNotMatch', field);
    },


    token : function (token, field){
        if (!token) return throw409('token.tokenRequired', field);
        if (!validator.isLength(token, 100, 200)) return throw409('token.tokenLengthWrong', field);
    },

    // tokenNotFound : function (token, next){
    //     if (!token) return throw401(code.token.tokenNotFound.code, code.token.tokenNotFound.message, code.token.tokenNotFound.field, next);
    // },
    // tokenUserNotFound : function (user, next){
    //     if (!user) return throw401(code.token.userNotFound.code, code.token.userNotFound.message, code.token.userNotFound.field, next);
    // },

    tokenDecodeWrong : function (token, field){
        if (token) return throw401('token.tokenDecodeWrong', field);
    },

    tokenExpired : function (tokenIsExpired, next){
        if (tokenIsExpired) return throw401('token.tokenDecodeWrong', field);
    }



    // businessMessageType : function (type, next){
    //     if (businessMessageTypeList.indexOf(type) === -1) return throw409(code.user.businessMessageTypeWrong.code, code.user.businessMessageTypeWrong.message, code.user.businessMessageTypeWrong.field);
    // },
    // SMScode : function (code, next){
    //     if (!validator.isLength(code, 6, 6)) return throw409(code.user.SMSCodeLengthWrong, code.user.SMSCodeLengthWrong.message, code.user.SMSCodeLengthWrong.field);
    // },
    //
    // SMScodeNotFound : function (code, next){
    //     if (!code) return throw409(code.user.SMSCodeNotFound.code, code.user.SMSCodeNotFound.message, code.user.SMSCodeNotFound.field);
    // },
    // SMScodeExpired : function (isExpired, next){
    //     if (isExpired) return throw409(code.user.SMSCodeExpired.code, code.user.SMSCodeExpired.message, code.user.SMSCodeExpired.field);
    // },



};



module.exports = validation;