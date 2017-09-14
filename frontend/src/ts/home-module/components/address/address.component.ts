import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { HttpService } from '../../../bs-form-module/services/http.service'


import { formErrorHandler } from '../../../bs-form-module/validators/validator'
import { UserLoginService } from '../../../services/userLogin.service'




@Component({
  selector: 'app-user-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

    userAddressForm: FormGroup
    ignoreDirty: boolean = false

    isShowForm: boolean = false

    addressList : any[] = []

    constructor(
        private fb: FormBuilder,
        public userService: UserLoginService,
        private httpService: HttpService
    ) {

    }



    ngOnInit(): void {
        this.createuserAddressForm()
        this.getUserAddress()
    }

    getUserAddress () {
        this.userService.getUserAddressList().subscribe(
            data => {
                this.addressList = data.data

                console.log('当前用户的收货地址: ', data)
            },
            error => {this.httpService.errorHandler(error) }
        )
    }


    userAddressFormError : any = { addressXX : []}
    userAddressFormValidationMessages: any = {
        'province'  : {
            'required'      : '请填写名字!',
            'minlength'     : '名字长度1-100个字符!',
            'maxlength'     : '名字长度1-100个字符!',
            'pattern'       : '名字必须字母开头!',
            'isExist'       : '名字已经存在!'
        },
        'city'  : {
            'required'      : '请填写姓!',
            'minlength'     : '姓长度1-100个字符!',
            'maxlength'     : '姓长度1-100个字符!',
            'pattern'       : '姓必须字母开头!',
            'isExist'       : '姓已经存在!'
        },
        'district'  : {
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
        }
    }

    userAddressFormInputChange(formInputData : any, ignoreDirty : boolean = false) {
        this.userAddressFormError = formErrorHandler(formInputData, this.userAddressForm, this.userAddressFormValidationMessages, ignoreDirty)
    }

    createuserAddressForm(user: any = {}): void {

        if (!user.firstName) {user.firstName = ''}
        if (!user.lastName) {user.lastName = ''}
        if (!user.nickname) {user.nickname = ''}
        if (!user.gender) {user.gender = ''}
        if (!user.marriage) {user.marriage = ''}

        this.userAddressForm = this.fb.group({
            'firstName'    : [user.firstName, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'lastName'    : [user.lastName, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'nickname'    : [user.nickname, [Validators.required, Validators.minLength(1), Validators.maxLength(1000)] ],
            'gender'    : [user.gender, [Validators.required] ],
            'marriage'    : [user.marriage, [Validators.required] ],
            'address'    : this.fb.group({
                street: ['', [Validators.required] ],
                city: ['', [Validators.required] ]
            }),
            'addressXX'    : this.fb.array([
                this.fb.group({
                    street: ['', [Validators.required] ],
                    city: ['', [Validators.required] ]
                }),
                this.fb.group({
                    street: ['', [Validators.required] ],
                    city: ['', [Validators.required] ]
                })
            ])
        } )

        this.userAddressForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.userAddressFormInputChange(data)
        })
    }


    userAddressFormSubmit() {
        console.log('当前信息: ', this.userAddressForm.invalid, this.userAddressFormError)
        if (this.userAddressForm.invalid) {
            this.userAddressFormInputChange(this.userAddressForm.value, true)
            this.ignoreDirty = true
            return
        }

        this.userService.saveUserInfo(this.userAddressForm.value).subscribe(
            data => {
                console.log('保存用户信息成功: ', data)
                this.httpService.successHandler(data)
            },
            error => {this.httpService.errorHandler(error) }
        )

    }




}
