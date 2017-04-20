

const validationName = {
    user : {
        usernameWrong : {code:1001, message:"Field validation error,  username length must be 6-30", field:'username'},
        passwordWrong : {code:1002, message:"Field validation error,  password length must be 6-30", field:'password'},
        emailWrong : {code:1003, message:"Field validation error, Email format wrong", field:'email'},
        mobileWrong : {code:1004, message:"Field validation error, mobile number format wrong", field:'mobilePhone'},

        usernameRequired : {code:1006, message:"Field validation error,  username is required", field:'username'},
        passwordRequired : {code:1008, message:"Field validation error,  password is required", field:'password'},
        emailRequired : {code:1009, message:"Field validation error, Email is required", field:'email'},
        mobileRequired : {code:1010, message:"Field validation error, mobile number is required", field:'mobilePhone'},


        usernameExist : {code:1011, message:"Field validation error,  username already exist", field:'username'},
        emailExist : {code:1013, message:"Field validation error,  email already exist", field:'email'},
        mobileExist : {code:1014, message:"Field validation error, mobile phone number already exist", field:'mobilePhone'},

        userNotFound :  {code:1041, message:"User Unauthorized, user not found", field:'username'},
        passwordNotMatch :  {code:1045, message:"User Unauthorized, password not match", field:'password'},
    },

    token : {
        tokenRequired : {code:2001, message:"Field validation error,  accessToken is required", field:'accessToken'},
        tokenLengthWrong : {code:2002, message:"Field validation error,  accessToken length must be 100-200", field:'accessToken'},

        tokenNotFound : {code:2003, message:"User Unauthorized, token not found", field:'X-Access-Token'},
        userNotFound : {code:2005, message:"User Unauthorized, user not found", field:'X-Access-Token'},
        tokenDecodeWrong : {code:2007, message:"User Unauthorized, token wrong", field:'X-Access-Token'},
        tokenExpired : {code:2008, message:"User Unauthorized, token expired", field:'X-Access-Token'}

    },


    pay:{
        payPhone:{code:5500,message:'Field validation error, phone format wrong'}
    },
    order : {
        orderIdWrong : {code:5001, message:'Field validation error, orderId length should be 1 - 100'},
        deliveryAmountWrong : {code:5101, message:'Field validation error, deliveryAmount should be 1 - 999999999'},

        startDate : {code:5201, message:'Field validation error, start date wrong'},
        endDate : {code:5202, message:'Field validation error, end date wrong'},
        categoryType : {code:5204, message:'Field validation error, category type wrong'},
        searchText : {code:5205, message:'Field validation error, search text length should be 1 - 100'}
    },

    captcha : {
        typeWrong : {code:6001, message:'Field validation error, captcha type length should be 2 - 50'},
        textWrong : {code:6002, message:'Field validation error, captcha text length should be 2 - 10'},
        notMatch : {code:6005, message:'Field validation error, captcha text not match'},
        expired : {code:6007, message:'Field validation error, captcha expired'}
    },

    sms : {
        typeWrong : {code:7001, message:'Field validation error, SMS text length should be 6 - 100'},
        textWrong : {code:7002, message:'Field validation error, SMS text length should be 6 - 6'},
        notMatch : {code:7005, message:'Field validation error, SMS text not match'},
        expired : {code:7007, message:'Field validation error, SMS text expired'}
    },

    page : {
        menuTabNumberWrong : {code:9001, message:'Field validation error, menu Tab number should be 1 - 20'},
        pageNumberWrong : {code:9005, message:'Field validation error, page number should be 1 - 100'}
    },

    uploadFile : {
        picExist : {code:9501, message:'Field validation error, upload picture not found'},
    }
};



const getValidationErrorCode = function(propertyName){
    const propertyArray = propertyName.split('.')


    let result = {
        code : 400,
        message:'Field validation error.',
        field : 'Unknown_field'
    };

    if (propertyName){

        if (validationName[propertyArray[0]]){
            result = validationName[propertyArray[0]];

            for(let i = 1, l = propertyArray.length; i < l; i++){

                if (result[propertyArray[i]]){
                    result = result[propertyArray[i]];
                }else{
                    result = {
                        code : 400,
                        message:'Field validation error.',
                        field : 'Unknown_field'
                    };
                }
            }
        }
    }

    return result
};



module.exports = getValidationErrorCode;