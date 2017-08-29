import { Component, OnInit, Input, forwardRef} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-radio',
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
export class RadioComponent implements OnInit, ControlValueAccessor{
    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string;

    @Input() error: string = ''
    @Input('labelclass') labelClass: string = 'col-2';
    @Input('inputclass') inputClass: string = 'col-6';
    @Input('colArrange') colArrange: string = '';


    currentRadio : boolean

    constructor() {}

    ngOnInit(): void {
        console.log('radio')

    }

    getVal(index: any, val: any) {
        console.log(index,val)
        if(index === '1' && val === 'on') {
            this.value = true

        }else {
            this.value = false
        }
        console.log(this.currentRadio)
    }






    onChange (value : any) {}
    onTouched () {}

    get value() {
        console.log('getter: ', this.currentRadio)
        return this.currentRadio
    }

    set value(val: any) {
        console.log('Setter: ', val)
        this.currentRadio = val

        this.onChange(val)
        this.onTouched()
    }


    registerOnChange(fn: any): void {
        console.log('RegisterOnChange: ', fn)
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        console.log('RegisterOnTouched: ', fn)
        this.onTouched = fn
    }

    writeValue(value: any): void {
        // console.log('WriteValue: ', value)
        if (value) {
            this.value = value
        }
    }

}
