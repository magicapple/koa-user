/**
 * Created by jin on 9/11/17.
 */


const UserAddressService = require('../../service/user/userAddressService')



/**
 * 获取当前用户所有收货地址
 */
exports.getUserAddressListById = async (ctx, next) => {

    let addressList = await UserAddressService.addressList(ctx.state.user._id);
    ctx.body = addressList
}


/**
 * 新建用户收货地址
 */
exports.addNewAddress = async (ctx, next) => {

    let address = await UserAddressService.addNewAddress(ctx.state.user._id, ctx.request.body);
    ctx.body = address
}
