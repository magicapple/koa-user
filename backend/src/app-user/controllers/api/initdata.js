
const MUserBaseInfo = require('../../service/user/model/userBaseInfo')
const UserService = require('../../service/user/userService')
const MUserRole = require('../../service/user/model/userRole')


/**
 * 初始化数据
 */



async function createUserRoles (ctx, next) {

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
        return currentRoles
    }else {
        return await MUserRole.create(roleList)
    }

}

exports.createUserRoles = createUserRoles



async function createAdmin (ctx, next) {

    const currentAdmin = await MUserBaseInfo.find1({username : 'admin'})

    if (currentAdmin) {
        return  currentAdmin
    }else {
        return await UserService.signUp({
            username : 'admin',
            mobilePhone : '13564511111',
            email : 'admin@gmail.com',
            password : '123456',
            roles : [
                GMongoose.Types.ObjectId(GConfig.role.normal),
                GMongoose.Types.ObjectId(GConfig.role.admin)
            ]
        })
    }

}

exports.createAdmin = createAdmin



exports.run = async function (ctx, next) {

    const [roles, userAdmin] = await Promise.all([
        createUserRoles (),
        createAdmin()
    ]);

    ctx.body = {
        roles,
        userAdmin
    }
}

