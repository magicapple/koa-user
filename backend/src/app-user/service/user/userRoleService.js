/**
 * Created by jinwyp on 4/14/17.
 */


const validator = require('validator')

const MUserBaseInfo = require('./model/userBaseInfo')
const MUserRole = require('./model/userRole')
const MUserToken = require('./model/userToken')
const MVisitor = require('./model/visitor')



const resourceList = [
    'user'
]

const actionList = [
    'getList', 'getOwn', 'create', 'update', 'updatePassword', 'delete'
]

const getPermissions = function (){
    let result = {}

    resourceList.forEach( resource => {
        result[resource] = {}

        actionList.forEach( action => {
            result[resource][action] = resource + '.' + action
        })
    })
    // console.log("permissions: ", result)
    return result

}

const permissions = getPermissions()

exports.permissions = permissions




exports.checkUserPermission = (user, permission) => {
    let isPassed = false
    user.roles.forEach( (role )=> {
        if (role.checkPermission(permission)) {
            isPassed = true;
        }
    })

    if (!isPassed) {
        GDataChecker.userRolePermission(permission)
    }

    return isPassed
}


