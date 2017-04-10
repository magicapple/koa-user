

const validationName = {
    user : {
        usernameWrong : {code:1001, message:'Field validation error, orderId length should be 6 - 100'},
        passwordWrong : {code:1002, message:'Field validation error, orderId length should be 6 - 100'},
        payPasswordWrong : {code:1003, message:'Field validation error, User payPassword length should be 6 - 20'},
        emailWrong : {code:1006, message:'Field validation error, orderId length should be 6 - 100'},
        mobileWrong : {code:1007, message:'Field validation error, orderId length should be 6 - 100'},

        usernameExist : {code:1011, message:'Field validation error, orderId length should be 6 - 100'},
        passwordExist : {code:1012, message:'Field validation error, orderId length should be 6 - 100'},
        emailExist : {code:1013, message:'Field validation error, orderId length should be 6 - 100'},
        mobileExist : {code:1014, message:'Field validation error, orderId length should be 6 - 100'},

        usernameNotFound : {code:1101, message:'Field validation error, orderId length should be 6 - 100'},
        passwordNotMatch : {code:1102, message:'Field validation error, orderId length should be 6 - 100'}
    },

    token : {
        tokenNotFound : {code:2001, message:'Field validation error, orderId length should be 6 - 100'},
        userNotFound : {code:2002, message:'Field validation error, orderId length should be 6 - 100'},
        tokenDecodeWrong : {code:2005, message:'Field validation error, orderId length should be 6 - 100'},
        tokenExpired : {code:2007, message:'Field validation error, orderId length should be 6 - 100'},
        tokenLengthWrong : {code:2008, message:'Field validation error, orderId length should be 6 - 100'}
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
        message:'Field validation error.'
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
                        message:'Field validation error.'
                    };
                }
            }
        }
    }

    return result
};



module.exports = getValidationErrorCode;