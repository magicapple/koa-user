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

    currentUser : any

    genderDataList : any[] = [
        { id : 1, name : '男'},
        { id : 2, name : '女'},
        { id : 3, name : '男变性女'},
        { id : 4, name : '女变性男'}
    ]

    marryDataList : any[] = [
        { id : 10, name : '已婚'},
        { id : 20, name : '未婚'}
    ]

    constructor(
        private fb: FormBuilder,
        public userService: UserLoginService,
        private httpService: HttpService
    ) {

    }



    ngOnInit(): void {
        this.createUserInfoForm()
        this.getCurrentUserInfo()
    }

    userInfoFormError : any = {}
    userInfoFormValidationMessages: any = {
        'firstName'  : {
            'required'      : '请填写名字!',
            'minlength'     : '名字长度1-100个字符!',
            'maxlength'     : '名字长度1-100个字符!',
            'pattern'       : '名字必须字母开头!',
            'isExist'       : '名字已经存在!'
        },
        'lastName'  : {
            'required'      : '请填写姓!',
            'minlength'     : '姓长度1-100个字符!',
            'maxlength'     : '姓长度1-100个字符!',
            'pattern'       : '姓必须字母开头!',
            'isExist'       : '姓已经存在!'
        },
        'nickname'  : {
            'required'      : '请填写昵称!',
            'minlength'     : '昵称长度4-30个字符!',
            'maxlength'     : '昵称长度4-30个字符!',
            'pattern'       : '昵称必须字母开头!',
            'isExist'       : '昵称已经存在!'
        },
        'mobilePhone' : {
            'required'    : '请填写手机号!',
            'mobilePhone' : '手机号格式不正确!',
            'isExist'     : '手机号已经存在!'
        },
        'gender'  : {
            'required'      : '请填写性别!'
        },
        'married'  : {
            'required'      : '请填写婚姻状况!'
        }
    }

    userInfoFormInputChange(formInputData : any, ignoreDirty : boolean = false) {
        this.userInfoFormError = formErrorHandler(formInputData, this.userInfoForm, this.userInfoFormValidationMessages, ignoreDirty)
    }

    createUserInfoForm(user: any = {}): void {

        console.log('user: ', user)
        if (!user.firstName) {user.firstName = ''}
        if (!user.lastName) {user.lastName = ''}
        if (!user.nickname) {user.nickname = ''}
        if (!user.gender) {user.gender = ''}
        if (!user.married) {user.married = ''}

        this.userInfoForm = this.fb.group({
            'firstName'    : [user.firstName, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'lastName'    : [user.lastName, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'nickname'    : [user.nickname, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'gender'    : [user.gender, [Validators.required] ],
            'married'    : [user.married, [Validators.required] ]
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

        this.userService.saveUserInfo(this.userInfoForm.value).subscribe(
            data => {
                console.log('保存用户信息成功: ', data)
                this.httpService.successHandler(data)
            },
            error => {this.httpService.errorHandler(error) }
        )

    }

    getCurrentUserInfo () {
        this.userService.getUserInfo().subscribe(
            data => {
                this.currentUser = data.data

                this.userInfoForm.patchValue({
                    'firstName'    : data.data.firstName,
                    'lastName'    : data.data.lastName,
                    'nickname'    : data.data.nickname,
                    'gender'    : data.data.gender,
                    'married'    : data.data.married
                })





                console.log('当前登陆的用户信息: ', data)
            },
            error => {this.httpService.errorHandler(error) }
        )
    }


}
