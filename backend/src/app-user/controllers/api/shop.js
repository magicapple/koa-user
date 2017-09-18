
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





exports.getUsers = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = [
        {
            id : 1,
            deptId : 1,
            phone : '13022117050',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        },

        {
            id : 2,
            deptId : 1,
            phone : '13022117051',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        },

        {
            id : 3,
            deptId : 1,
            phone : '13022117052',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        }
    ]
}


