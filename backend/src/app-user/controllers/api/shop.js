
/**
 * 获取商户列表
 */
exports.getShopList = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = [
        {
            shopName : '饿了吗线下体验店',
            shopDescription : '饿了吗线下体验店',
            shopPic : '/pic/xxx.jpg',
        },
        {
            shopName : '美团线下体验店',
            shopDescription : '美团线下体验店',
            shopPic : '/pic/xxx.jpg',
        },
        {
            shopName : '和记小厨',
            shopDescription : '和记小厨',
            shopPic : '/pic/xxx.jpg',
        }
    ]
}


/**
 * 发布商户信息
 */
exports.postNewShop = async (ctx, next) => {

    console.log(ctx.request.body)

    ctx.body = ctx.request.body
}

