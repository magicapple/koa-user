/**
 * Created by JinWYP on 20/02/2017.
 */

const validationErrorCode = require('./ValidationErrorCode');

/**
 * 自定义Api异常
 */
class ValidationError extends Error{

    //构造方法
    constructor(error_name, error_field){
        super();

        const error = validationErrorCode(error_name);

        this.type = "UserLevelOperationalError";
        this.name = "ValidationError";
        this.status = 400;


        this.code = error.code || 400;
        this.message = error.message || "Field Validation Error";
        this.field = error_field || "unknown_field";
    }
}



module.exports = ValidationError;