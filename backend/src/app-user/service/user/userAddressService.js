/**
 * Created by jin on 9/11/17.
 */


const MUserBaseInfo = require('./model/userBaseInfo')
const MUserAddress = require('./model/userAddress')



exports.addressList = async (userId) => {
    // GDataChecker.userMobile(userId)

    return MUserAddress.findAll({user : userId})
}


exports.addNewAddress = async (userId, address) => {
    // GDataChecker.userMobile(userId)

    let newAddress = {
        user  : userId,

        province : address.province,
        city : address.province,
        district : address.district,

        detailAddress : address.detailAddress,
        contactPerson : address.contactPerson,
        contactPersonMobilePhone : address.contactPersonMobilePhone
    }


    return MUserAddress.create(newAddress)
}


