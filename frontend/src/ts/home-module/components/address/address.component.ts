import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { HttpService } from '../../../bs-form-module/services/http.service'

import { formErrorHandler, isMobilePhone, isMatched, checkFieldIsExist } from '../../../bs-form-module/validators/validator'
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


    userAddressFormError : any = {}
    userAddressFormValidationMessages: any = {
        'contactPerson'  : {
            'required'      : '请填写收货人!',
            'minlength'     : '名字长度1-100个字符!',
            'maxlength'     : '名字长度1-100个字符!',
            'pattern'       : '名字必须字母开头!',
            'isExist'       : '名字已经存在!'
        },
        'addressObj'  : {
            'required'      : '请填写地区!'
        },
        'detailAddress'  : {
            'required'      : '请填写详细地址!',
            'minlength'     : '详细地址长度4-500个字符!',
            'maxlength'     : '详细地址长度4-500个字符!',
            'pattern'       : '昵称必须字母开头!',
            'isExist'       : '昵称已经存在!'
        },
        'contactPersonMobilePhone' : {
            'required'    : '请填写手机号!',
            'mobilePhone' : '手机号格式不正确!',
            'isExist'     : '手机号已经存在!'
        },
        'contactPersonFixedPhone' : {
            'required'    : '请填写固定电话!',
            'mobilePhone' : '固定电话格式不正确!',
            'isExist'     : '固定电话已经存在!'
        },
        'contactPersonEmail' : {
            'required'    : '请填写邮箱!',
            'email' : '邮箱格式不正确!'
        },
        'postalCode' : {
            'required'    : '请填写邮编!'
        },
        'addressCodeName' : {
            'required'    : '请填写地址别名!'
        }
    }

    userAddressFormInputChange(formInputData : any, ignoreDirty : boolean = false) {
        this.userAddressFormError = formErrorHandler(formInputData, this.userAddressForm, this.userAddressFormValidationMessages, ignoreDirty)
    }

    createuserAddressForm(address: any = {}): void {

        if (!address.contactPerson) {address.contactPerson = ''}
        if (!address.addressObj) {address.addressObj = {
            provinceId: 110000,
            cityId: 110100,
            districtId: 110104
        }}

        this.userAddressForm = this.fb.group({
            'contactPerson'    : [address.contactPerson, [Validators.required] ],
            'addressObj'    : [address.addressObj, [Validators.required] ],
            'detailAddress'    : [address.detailAddress, [Validators.required, Validators.minLength(4), Validators.maxLength(500)] ],
            'contactPersonMobilePhone'    : [address.contactPersonMobilePhone, [Validators.required, isMobilePhone()] ],
            'contactPersonFixedPhone'    : [address.contactPersonFixedPhone ],
            'contactPersonEmail'    : [address.contactPersonEmail, [Validators.email] ],
            'postalCode'    : [address.postalCode ],
            'addressCodeName'    : [address.addressCodeName ]
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


    showForm() {
        this.isShowForm = !this.isShowForm
    }


    collection: any = [{id: 1}, {id: 2}, {id: 3}]

    getItems() {
        this.collection = this.getItemsFromServer()
    }

    getItemsFromServer() {
        return [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
    }



    trackByFn(index: any, item: any) {
        return item ? item._id : undefined
    }


}
