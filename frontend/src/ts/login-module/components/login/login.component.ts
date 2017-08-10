import {Component, Inject, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import {subscribeErrorHandler} from '../../../services/httpErrorHandler'
import { formErrorHandler, isMobilePhone, isMatched, usernameCheckExist } from '../../../cool-form-module/components/validators/validator'
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

    constructor(
        @Inject('moduleType') public pageType: string,
        private fb: FormBuilder,
        public userService: UserLoginService
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
            'usernameExist' : '用户名已经存在!'
        },
        'mobilePhone' : {
            'required' : '请填写手机号!',
            'mobilePhone' : '手机号格式不正确!'
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

    registerFormInputChange(formInputData : any) {
        this.registerFormError = formErrorHandler(formInputData, this.registerForm, this.registerFormValidationMessages, true)
    }

    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            'username'    : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]*$/)], [usernameCheckExist(apiPath.signUpCheckUsername)] ],
            'mobilePhone' : ['', [Validators.required, isMobilePhone() ]],
            'password'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
            'password2'   : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), isMatched('password')] ]
        } )

        this.registerForm.valueChanges.subscribe(data => { this.registerFormInputChange(data) } )
    }


    registerFormSubmit() {

        console.log('registerFormOnSubmit', this.registerForm.value)


        if (this.registerForm.invalid) {
            this.registerFormInputChange(this.registerForm.value)
            return
        }

        this.userService.checkUsername(this.registerForm.value.username).subscribe(
            data => { console.log(data)},
            subscribeErrorHandler
        )

    }


}
