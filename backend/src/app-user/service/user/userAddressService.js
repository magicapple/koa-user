/**
 * Created by jin on 9/11/17.
 */


const MUserBaseInfo = require('./model/userBaseInfo')
const MUserAddress = require('./model/userAddress')


exports.addressListCount = async (userId) => {
    GDataChecker.userId(userId)

    return MUserAddress.count({user : userId})
}

exports.addressList = async (userId, pagination) => {
    GDataChecker.userId(userId)

    return MUserAddress.findAll({user : userId}, {pageSize : pagination.pageSize, pageNo: pagination.pageNo})
}


exports.addNewAddress = async (userId, address) => {
    GDataChecker.userId(userId)

    GDataChecker.userAddress(address)

    let newAddress = {
        user  : userId,

        province : address.province,
        provinceId : address.provinceId,
        city : address.city,
        cityId : address.cityId,
        district : address.district,
        districtId : address.districtId,

        detailAddress : address.detailAddress,
        contactPerson : address.contactPerson,
        contactPersonMobilePhone : address.contactPersonMobilePhone
    }

    if (address.addressCodeName) { GDataChecker.userAddressCodeName(address.addressCodeName); newAddress.addressCodeName = address.addressCodeName }
    if (address.postalCode) { GDataChecker.userAddressPostalCode(address.postalCode); newAddress.postalCode = address.postalCode }
    if (address.contactPersonFixedPhone) { GDataChecker.userAddressContactPersonFixedPhone(address.contactPersonFixedPhone); newAddress.contactPersonFixedPhone = address.contactPersonFixedPhone }
    if (address.contactPersonEmail) { GDataChecker.userAddressContactPersonEmail(address.contactPersonEmail); newAddress.contactPersonEmail = address.contactPersonEmail }

    return MUserAddress.create(newAddress)
}


exports.updateAddress = async (userId, addressId, address) => {

    GDataChecker.userId(userId)
    GDataChecker.userAddressId(addressId)

    GDataChecker.userAddress(address)

    if (address.addressCodeName) { GDataChecker.userAddressCodeName(address.addressCodeName);  }
    if (address.postalCode) { GDataChecker.userAddressPostalCode(address.postalCode);  }
    if (address.contactPersonFixedPhone) { GDataChecker.userAddressContactPersonFixedPhone(address.contactPersonFixedPhone);  }
    if (address.contactPersonEmail) { GDataChecker.userAddressContactPersonEmail(address.contactPersonEmail);  }


    return MUserAddress.findOneAndUpdate({_id : addressId}, address , {new : true})
}

