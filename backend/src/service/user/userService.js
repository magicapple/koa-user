/**
 * Created by jinwyp on 4/14/17.
 */



let MUserBaseInfo = require('./model/userBaseInfo');



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
        let mobileIsExist = await MUserBaseInfo.findOne({email:user.email}).exec()
        GDataChecker.userMobilePhoneExist(mobileIsExist);

    }

    let createdUser = await MUserBaseInfo.create(newUser);
    return MUserBaseInfo.find1ById(createdUser._id)

};


