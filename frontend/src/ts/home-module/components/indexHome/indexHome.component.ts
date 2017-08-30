import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { HttpService } from '../../../bs-form-module/services/http.service'


import { formErrorHandler } from '../../../bs-form-module/validators/validator'
import {UserLoginService} from '../../../services/userLogin.service'




@Component({
  selector: 'app-user-home',
  templateUrl: './indexHome.component.html',
  styleUrls: ['./indexHome.component.css']
})
export class IndexHomeComponent implements OnInit {

    userInfoForm: FormGroup
    ignoreDirty: boolean = false

    constructor(
        private fb: FormBuilder,
        public userService: UserLoginService,
        private httpService: HttpService
    ) {

    }

    sexDataList : any[] = [
        { id : 10, name : '男'},
        { id : 20, name : '女'},
        { id : 30, name : '女同'}
    ]

    ngOnInit(): void {
        this.createLoginForm()
    }

    userInfoFormError : any = {}
    userInfoFormValidationMessages: any = {
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
        'sex'  : {
            'required'      : '请填写性别!'
        }
    }

    userInfoFormInputChange(formInputData : any, ignoreDirty : boolean = false) {
        this.userInfoFormError = formErrorHandler(formInputData, this.userInfoForm, this.userInfoFormValidationMessages, ignoreDirty)
    }

    createLoginForm(): void {
        this.userInfoForm = this.fb.group({
            'username'    : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]*$/)] ],
            'sex'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ]
        } )
        this.userInfoForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.userInfoFormInputChange(data)
        })
    }


    userInfoFormSubmit() {

        if (this.userInfoForm.invalid) {
            this.userInfoFormInputChange(this.userInfoForm.value, true)
            this.ignoreDirty = true
            return
        }

        this.userService.login(this.userInfoForm.value).subscribe(
            data => {
                console.log('登陆成功: ', data)
                this.httpService.successHandler(data)
            },
            error => {this.httpService.errorHandler(error) }
        )

    }


}
