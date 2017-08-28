/**
 * Created by jin on 8/10/17.
 */

const prefix = '/api'
const apiPath = {
    getSignUpCaptcha : '/web/signup/captcha',
    signUpCheckCaptcha : prefix + '/user/signup/captcha',
    signUpCheckUsername : prefix + '/user/signup/username',
    signUpCheckMobilePhone : prefix + '/user/signup/phone',
    signUpGetSMSCode : prefix + '/user/signup/sms',
    signUpCheckSMSCode : prefix + '/user/signup/smscode',
    signUp : prefix + '/user/signup',
    signUpByMobile : prefix + '/user/signupmobile',

    login : prefix + '/user/login'
}


export { apiPath }
