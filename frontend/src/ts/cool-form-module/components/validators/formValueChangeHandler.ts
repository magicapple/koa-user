/**
 * Created by jin on 8/8/17.
 */


import {FormGroup} from '@angular/forms'



// Form Validations Error Message Handler

export function formErrorHandler (formData: Object, fb: FormGroup, validationErrorMessage: Object, ignoreDirty : boolean = false) {

    if (!(fb instanceof FormGroup)) { return null }

    const errorMessageContainer: Object = {}


    function getValidationErrorMessage (formGroupSource: any, errorMessageInput: any, errorMessageOutput: any,  needDirty : boolean = false) {

        for (const field in formGroupSource) {

            if (formGroupSource.hasOwnProperty(field)) {

                const control = formGroupSource.get(field)

                if (control instanceof FormGroup) {
                    // 递归

                    errorMessageOutput[field] = {}
                    if (typeof errorMessageInput[field] === 'undefined') {
                        errorMessageInput[field] = {}
                    }

                    getValidationErrorMessage(control, errorMessageInput[field], errorMessageOutput[field], needDirty)

                }else {
                    if (control && !control.valid) {
                        // console.log('control: ', field, control.errors)

                        if (needDirty || control.dirty) {
                            for (const key in control.errors) {

                                if (control.errors.hasOwnProperty(key)) {

                                    if (typeof errorMessageInput[field] === 'undefined') {
                                        errorMessageInput[field] = {}
                                    }
                                    if (typeof errorMessageInput[field][key] === 'undefined') {
                                        errorMessageInput[field][key] = field + '.' + key + ' 字段没有定义错误信息'
                                    }
                                    errorMessageOutput[field] = errorMessageInput[field][key] + ' '
                                }
                            }
                        }
                    }
                }

            }
        }
    }

    getValidationErrorMessage(fb, validationErrorMessage, errorMessageContainer, ignoreDirty)
    // console.log('message: ', errorMessageContainer)

    return errorMessageContainer

}


