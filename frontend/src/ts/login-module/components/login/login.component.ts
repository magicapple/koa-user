import {Component, OnInit} from '@angular/core'
import { Http} from '@angular/http'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { formErrorHandler, isMobilePhone } from '../../../cool-form-module/components/validators/validator'


@Component({
    selector    : 'app-login',
    templateUrl : './login.component.html'
})
export class LoginComponent implements OnInit {

    user: any = {
        username : '',
        mobilePhone : '',
        password: '',
        password2 : ''
    }

    registerForm: FormGroup
    loginForm: FormGroup

    constructor(
        private fb: FormBuilder,
        private http: Http
    ) {

    }

    ngOnInit(): void {

        this.createRegisterForm()
    }


    formValidationMessages: any = {
        'username'  : {
            'required'      : 'Name is required.',
            'minlength'     : 'Name must be at least 4 characters long.',
            'maxlength'     : 'Name cannot be more than 24 characters long.',
            'forbiddenName' : 'Someone named "Bob" cannot be a hero.'
        },
        'mobilePhone' : {
            'required' : 'bid is required.',
            'toolow' : 'bid is too low.'
        }
    }


    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            'username'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
            'mobilePhone' : ['', [Validators.required, isMobilePhone]],
            'password'    : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
            'password2'   : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ]
        })

        this.registerForm.valueChanges.subscribe(data => formErrorHandler(data, this.registerForm, this.formValidationMessages))

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




    onSubmit() {
        this.user = this.registerForm.value
        console.log('onSubmit', this.user)

    }


}
