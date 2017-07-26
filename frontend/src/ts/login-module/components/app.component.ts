import {Component, OnInit} from '@angular/core'
import { Http} from '@angular/http'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms'

import { Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of'




@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html'
})
export class AppComponent implements OnInit{

    active: boolean = true
    submitted: boolean = true

    bids : any = [
        { name : 'one222', bid : 10 },
        { name : 'two', bid : 20 }
    ]


    hero: any = {
        name : '',
        bid : ''
    }

    heroForm: FormGroup

    constructor(
        private fb: FormBuilder,
        // private db: AngularFireDatabase,
        private http: Http
    ) {

    }

    ngOnInit(): void {

        // this.bidList = this.db.list('/users')


        this.buildForm()
    }


    buildForm(): void {
        this.heroForm = this.fb.group({
            'name': [this.hero.name, [ Validators.required, Validators.minLength(4), Validators.maxLength(8)] ],
            'bid': [this.hero.bid, Validators.required ],
            'switcher': [true, Validators.required ]
        })

        this.heroForm.valueChanges
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

        if (!this.heroForm) { return }

        const form = this.heroForm

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
        this.submitted = true
        this.hero = this.heroForm.value
        console.log('onSubmit', this.hero)

        // this.bidList.push(this.heroForm.value)
    }

    addHero() {
        this.hero = {
            name : ''
        }

        this.buildForm()

        this.active = false
        setTimeout(() => this.active = true, 0)
    }


}
