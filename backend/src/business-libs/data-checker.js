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
        if (!validator.isLength(username, 6, 30))  return throw409('user.usernameWrong', field);
    },
    userPassword : function (password, field){
        if (!validator.isLength(password, 6, 30)) return throw409('user.passwordWrong', field);
    },
    userEmail : function (email, field){
        if (!email) return throw409('user.emailRequired', field);
        if (!validator.isEmail(email)) return throw409('user.emailWrong', field);
    },
    userMobile : function (mobile, field){
        if (!validator.isMobilePhone(mobile, 'zh-CN')) return throw409('user.mobileWrong', field);
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


    loginUserNotFound : function (user, field){
        if (!user) return throw401('user.userNotFound', field);
    },

    loginUserUnauthorized : function (isPasswordMatch, field){
        if (!isPasswordMatch) return throw401('user.passwordNotMatch', field);
    },


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
    //
    //
    //
    //
    // token : function (token, next){
    //     if (!validator.isLength(token, 100, 200)) return throw409(code.token.tokenLengthWrong.code, code.token.tokenLengthWrong.message, code.token.tokenLengthWrong.field, next);
    // },
    //
    // tokenNotFound : function (token, next){
    //     if (!token) return throw401(code.token.tokenNotFound.code, code.token.tokenNotFound.message, code.token.tokenNotFound.field, next);
    // },
    // tokenUserNotFound : function (user, next){
    //     if (!user) return throw401(code.token.userNotFound.code, code.token.userNotFound.message, code.token.userNotFound.field, next);
    // },
    // tokenDecodeWrong : function (token, next){
    //     if (!token) return throw401(code.token.tokenDecodeWrong.code, code.token.tokenDecodeWrong.message, code.token.tokenDecodeWrong.field, next);
    // },
    // tokenExpired : function (tokenIsExpired, next){
    //     if (tokenIsExpired) return throw401(code.token.tokenExpired.code, code.token.tokenExpired.message, code.token.tokenExpired.field, next);
    // }

};



module.exports = validation;