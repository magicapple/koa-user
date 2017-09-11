
const MUserRole = require('../../service/user/model/userRole')
/**
 * 初始化数据
 */




exports.createUserRoles = async (ctx, next) => {

    const roleList = [
        {
            "_id" : ObjectId("59ae7885cba8a4766ee00eeb"),
            name : 'normal',
            displayName : '普通用户',
            permissions : [
                'user.create'
            ]
        },
        {
            "_id" : ObjectId("59ae7885cba8a4766ee00eec"),
            name : 'admin',
            displayName : '管理员',
            permissions : [
                'user.create'
            ]
        }
    ]

    const currentRoles = await MUserRole.findAll({})

    if (currentRoles && currentRoles.length > 0) {
        ctx.body = currentRoles
    }else {
        ctx.body = await MUserRole.create(roleList)
    }

}

