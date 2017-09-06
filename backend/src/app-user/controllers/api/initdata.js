
const MUserRole = require('../../service/user/model/userRole')
/**
 * 初始化数据
 */




exports.createUserRoles = async (ctx, next) => {

    const roleList = [
        {
            name : 'normal',
            displayName : '普通用户',
            permissions : [
                'user.create'
            ]
        },
        {
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

