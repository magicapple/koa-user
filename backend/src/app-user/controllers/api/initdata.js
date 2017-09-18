
const MUserRole = require('../../service/user/model/userRole')
/**
 * 初始化数据
 */


'getList', 'getOwn', 'create', 'update', 'updatePassword', 'delete'

exports.createUserRoles = async (ctx, next) => {

    const roleList = [
        {
            "_id" : GMongoose.Types.ObjectId("59ae7885cba8a4766ee00eeb"),
            name : 'normal',
            displayName : '普通用户',
            permissions : [
                'user.getOwn',
                'user.update',
                'user.updatePassword'
            ]
        },
        {
            "_id" : GMongoose.Types.ObjectId("59ae7885cba8a4766ee00eec"),
            name : 'admin',
            displayName : '管理员',
            permissions : [
                'user.getList',
                'user.getOwn',
                'user.create',
                'user.update',
                'user.updatePassword',
                'user.delete'
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

