import { Component, OnInit, Input, forwardRef} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
    selector: 'bs-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css'],
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => RadioComponent),
            multi       : true
        }
    ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {
    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string

    @Input() error: string = ''
    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-6'
    @Input() stacked: boolean = false


    @Input('sourceList') sourceList: any[]

    interValueCurrentRadio : any = { id : -1 , name : '请选择'}

    currentRadio : boolean

    constructor() {}

    ngOnInit(): void {
        console.log('radio')

    }

    chooseRadio(currentRadio: any) {
        this.value = currentRadio
    }



    onChange (value : any) {}
    onTouched () {}

    get value() {
        return this.interValueCurrentRadio
    }

    set value(val: any) {
        this.interValueCurrentRadio = val

        this.onChange(val.id)
        this.onTouched()
    }


    registerOnChange(fn: any): void {
        // console.log('RegisterOnChange: ', fn)
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        // console.log('RegisterOnTouched: ', fn)
        this.onTouched = fn
    }

    writeValue(value: any): void {
        // console.log('WriteValue: ', value)
        if (Array.isArray(this.sourceList)) {
            this.value = this.sourceList.find(option => option.id === value) || { id : -1 , name : '是'}
        }
    }

}
