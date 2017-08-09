import {Component, Inject, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { formErrorHandler, isMobilePhone } from '../../../cool-form-module/components/validators/validator'


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
        private fb: FormBuilder
    ) {

    }

    ngOnInit(): void {

        this.createRegisterForm()
    }

    registerFormError : any = {}
    registerFormValidationMessages: any = {
        'username'  : {
            'required'      : '请填写用户名!',
            'minlength'     : '用户名长度4-20个字符!',
            'maxlength'     : '用户名长度4-20个字符!'
        },
        'mobilePhone' : {
            'required' : '请填写手机号!',
            'mobilePhone' : '手机号格式不正确!'
        },
        'password'  : {
            'required'      : '请填写密码!',
            'minlength'     : '密码长度6-20个字符!',
            'maxlength'     : '密码长度6-20个字符!'
        },
        'password2'  : {
            'required'      : '请填写确认密码!',
            'minlength'     : '确认密码长度6-20个字符!',
            'maxlength'     : '确认密码长度6-20个字符!'
        }

    }

    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            'username'    : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)] ],
            'mobilePhone' : ['', [Validators.required, isMobilePhone() ]],
            'password'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
            'password2'   : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ]
        })

        this.registerForm.valueChanges.subscribe(data => { this.registerFormError = formErrorHandler(data, this.registerForm, this.registerFormValidationMessages) } )
    }


    registerFormSubmit() {

        console.log('registerFormOnSubmit', this.registerForm.value)


        if (this.registerForm.invalid) {
            this.registerFormError = formErrorHandler(this.registerForm.value, this.registerForm, this.registerFormValidationMessages, true)
            return
        }

    }


    /*mininumBid2(control : AbstractControl) : Observable<ValidationErrors | null> {
        return this.bidList.map( bids => bids[bids.length - 1 ])
            .map(bid => {
                // console.log('value: ', control.value, bid.bid)
                if (control.value > bid.bid) {
                    console.log('value yes: ', control.value, bid.bid)
                    return null
                }else {
                    console.log('value no: ', control.value, bid.bid)
                    return { toolow : {expected : bid.bid}}
                }
            })
    }
*/
/*    mininumBid(control : AbstractControl) : Observable<ValidationErrors | null> {
        return this.http.get('/assets/data.json')
            .map( response => response.json())
            .map( bids => bids[bids.length - 1 ])
            .map(bid => {
                // console.log('value: ', control.value, bid.bid)
                if (control.value > bid.bid) {
                    console.log('value yes: ', control.value, bid.bid)
                    return null
                }else {
                    console.log('value no: ', control.value, bid.bid)
                    return { toolow : {expected : bid.bid, actual: control.value}}
                }
            })
    }*/



}
