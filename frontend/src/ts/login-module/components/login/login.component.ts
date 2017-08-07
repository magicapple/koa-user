import {Component, OnInit} from '@angular/core'
import { Http} from '@angular/http'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { isMobilePhone } from '../../../cool-form-module/components/validators/mobilePhone'


@Component({
    selector    : 'app-login',
    templateUrl : './login.component.html'
})
export class LoginComponent implements OnInit {

    user: any = {
        username : '',
        mobilePhone : ''
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


    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            'username': [this.user.username, [ Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
            'mobilePhone': [this.user.mobilePhone, Validators.required, isMobilePhone ]
        })

        this.registerForm.valueChanges
            .subscribe(data => this.onValueChanged(data))


        // this.onValueChanged() // (re)set validation messages now
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


    formErrors: any = {
        'name'  : '',
        'bid' : ''
    }


    validationMessages: any = {
        'name'  : {
            'required'      : 'Name is required.',
            'minlength'     : 'Name must be at least 4 characters long.',
            'maxlength'     : 'Name cannot be more than 24 characters long.',
            'forbiddenName' : 'Someone named "Bob" cannot be a hero.'
        },
        'bid' : {
            'required' : 'bid is required.',
            'toolow' : 'bid is too low.'

        }
    }

    onValueChanged(data?: any) {
        // console.log('data: ', data)

        if (!this.registerForm) { return }

        const form = this.registerForm

        for (const field in this.formErrors) {
            // clear previous error message (if any)

            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = ''

                const control = form.get(field)

                if (control && control.dirty && !control.valid) {
                    console.log('control.errors: ', control)

                    const messages = this.validationMessages[field]
                    for (const key in control.errors) {

                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' | '
                        }

                    }
                }
            }
        }
    }


    onSubmit() {
        this.user = this.registerForm.value
        console.log('onSubmit', this.user)

    }


}
