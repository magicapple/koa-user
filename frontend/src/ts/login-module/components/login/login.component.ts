import {Component, Inject, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { ErrorService } from '../../../bs-form-module/services/httpError.service'


import { formErrorHandler, isMobilePhone, isMatched, checkFieldIsExist } from '../../../bs-form-module/validators/validator'
import {UserLoginService} from '../../../services/userLogin.service'



import {apiPath} from '../../../services/apiPath'


@Component({
    selector    : 'app-login',
    templateUrl : './login.component.html'
})
export class LoginComponent implements OnInit {

    user: any = {}

    registerForm: FormGroup
    loginForm: FormGroup
    ignoreDirty: boolean = false


    constructor(
        @Inject('moduleType') public pageType: string,
        private fb: FormBuilder,
        public userService: UserLoginService,
        private errorService: ErrorService,
    ) {

    }

    ngOnInit(): void {
        this.createRegisterForm()
    }

    registerFormError : any = {}
    registerFormValidationMessages: any = {
        'username'  : {
            'required'      : '请填写用户名!',
            'minlength'     : '用户名长度4-30个字符!',
            'maxlength'     : '用户名长度4-30个字符!',
            'pattern'       : '用户名必须字母开头!',
            'isExist'       : '用户名已经存在!'
        },
        'mobilePhone' : {
            'required'    : '请填写手机号!',
            'mobilePhone' : '手机号格式不正确!',
            'isExist'     : '手机号已经存在!'
        },
        'password'  : {
            'required'      : '请填写密码!',
            'minlength'     : '密码长度6-30个字符!',
            'maxlength'     : '密码长度6-30个字符!'
        },
        'password2'  : {
            'required'      : '请填写确认密码!',
            'minlength'     : '确认密码长度6-30个字符!',
            'maxlength'     : '确认密码长度6-30个字符!',
            'mismatched'    : '确认密码输入不一致!'

        }
    }

    registerFormInputChange(formInputData : any, ignoreDirty : boolean = false) {
        this.registerFormError = formErrorHandler(formInputData, this.registerForm, this.registerFormValidationMessages, ignoreDirty)
    }

    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            'username'    : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]*$/)], [checkFieldIsExist(apiPath.signUpCheckUsername)] ],
            'mobilePhone' : ['', [Validators.required, isMobilePhone() ], [checkFieldIsExist(apiPath.signUpCheckMobilePhone, 'mobilePhone')]],
            'password'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
            'password2'   : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), isMatched('password')] ]
        } )

        this.registerForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false;
            this.registerFormInputChange(data)
        })
    }


    registerFormSubmit() {

        console.log('registerFormOnSubmit', this.registerForm.value)


        if (this.registerForm.invalid) {
            this.registerFormInputChange(this.registerForm.value, true)
            this.ignoreDirty = true
            // return
        }

        this.userService.registerNewUser(this.registerForm.value).subscribe(
            data => {
                console.log('注册成功: ', data)
            },
            error => {this.errorService.handler(error) }
        )

    }


}
