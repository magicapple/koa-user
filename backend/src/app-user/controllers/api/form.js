/**
 * Created by jin on 8/31/17.
 */

const FormService = require('../../service/formModel/formService')
const MFormData = require('../../service/formModel/model/formData')
const MFormModel = require('../../service/formModel/model/formModel')




/**
 * 获取表单模型列表
 */
exports.getFormModelList = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = await MFormModel.findAll({})
}


/**
 * 发布表单模型
 */
exports.postNewFormModel = async (ctx, next) => {

    console.log(ctx.request.body)

    const mySchema = {
        "properties": {
            "email": {
                "type": "string",
                "description": "email",
                "format": "email"
            },
            "password": {
                "type": "string",
                "description": "Password"
            },
            "rememberMe": {
                "type": "boolean",
                "default": false,
                "description": "Remember me"
            }
        },
        "required": ["email","password","rememberMe"]
    }

    const uiSchema = {
        "properties": {
            "email": {
                "type": "string",
                "description": "email",
                "format": "email"
            },
            "password": {
                "type": "string",
                "description": "Password",
                "widget": "password"// == "widget": {"id": "password"}
            },
            "rememberMe": {
                "type": "boolean",
                "default": false,
                "description": "Remember me"
            }
        }
    }

    const newForm = {
        "modelSchema": JSON.stringify(ctx.request.body.modelSchema),
        "uiSchema": JSON.stringify(ctx.request.body.uiSchema),
    }

    ctx.body = await MFormModel.create(newForm)

}




/**
 * 获取某个表单模型
 */
exports.getFormModel = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = await MFormModel.find1({_id:ctx.params.id})
}




/**
 * 获取某个表单模型的表单数据列表
 */
exports.getFormDataList = async (ctx, next) => {
    console.log('ctx.params.id', ctx.params.id)
    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body  = await MFormData.findAll({modelSchemaId: ctx.params.id})
}



/**
 * 发布表单数据
 */
exports.postNewFormData = async (ctx, next) => {

    console.log(ctx.request.body)

    const newFormData = {
        modelSchemaId: ctx.request.body.modelSchemaId,
        postData: JSON.stringify(ctx.request.body.postData),
    }

    ctx.body = await MFormData.create(newFormData)
}

