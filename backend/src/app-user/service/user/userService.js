/**
 * Created by jinwyp on 4/14/17.
 */


const validator = require('validator');

const MUserBaseInfo = require('./model/userBaseInfo');
const MUserToken = require('./model/userToken');



exports.signUp = async (user) => {

    GDataChecker.username(user.username);
    GDataChecker.userPassword(user.password);

    let newUser = {
        username  : user.username,
        password : user.password
    };

    if (user.email){
        GDataChecker.userEmail(user.email);
        newUser.email = user.email;

    }else if (user.mobilePhone){
        GDataChecker.userMobile(user.mobilePhone);
        newUser.mobilePhone = user.mobilePhone;

    }else {
        // At least email is required for signUp
        GDataChecker.userEmail(user.email);
    }


    let usernameIsExist = await MUserBaseInfo.findOne({username : user.username}).exec()
    GDataChecker.usernameExist(usernameIsExist);

    if (user.email ){
        let emailIsExist = await MUserBaseInfo.findOne({email:user.email}).exec()
        GDataChecker.userEmailExist(emailIsExist);

    }else if (user.mobilePhone){
        let mobileIsExist = await MUserBaseInfo.findOne({mobilePhone:user.mobilePhone}).exec()
        GDataChecker.userMobilePhoneExist(mobileIsExist);
    }

    let createdUser = await MUserBaseInfo.create(newUser);
    return MUserBaseInfo.find1ById(createdUser._id)

};




exports.login = async (user) =>{

    GDataChecker.userPassword(user.password);

    let queryUser = {};


    if (validator.isMobilePhone(user.username, 'zh-CN')){
        queryUser.mobilePhone = user.username;

    }else if (validator.isEmail(user.username)){
        queryUser.email = user.username;

    }else{
        GDataChecker.username(user.username);
        queryUser.username = user.username;
    }

    let resultUser = await MUserBaseInfo.findOne(queryUser).exec()
    GDataChecker.loginUserNotFound(resultUser);


    let isPasswordMatch = await resultUser.comparePassword(user.password)
    GDataChecker.loginUserUnauthorized(isPasswordMatch);

    return resultUser;

};





exports.logout = async (userToken) =>{

    GDataChecker.token(userToken);

    let resultToken = await MUserToken.removeToken(userToken);

    return resultToken;

};




exports.signUpWeChat = async (user) => {

    GDataChecker.username(user.username);
    GDataChecker.userPassword(user.password);
    GDataChecker.userWeChatOpenID(user.idWeChatOpenID);

    let newUser = {
        username  : user.username,
        password : user.password,
        idWeChatOpenID : user.idWeChatOpenID
    };


    let weChatOpenIdIsExist = await MUserBaseInfo.findOne({idWeChatOpenID : user.idWeChatOpenID}).exec()
    if (weChatOpenIdIsExist){
        return MUserBaseInfo.find1ById(weChatOpenIdIsExist._id)
    }else{
        let createdUser = await MUserBaseInfo.create(newUser);
        return MUserBaseInfo.find1ById(createdUser._id)
    }

};



exports.userInfo = async (userToken) =>{

    let resultUser = await MUserBaseInfo.find1({_id:userToken._id});

    return resultUser;

};
