import {Component, OnInit, Input, forwardRef, ElementRef, ViewChild, OnChanges, SimpleChange} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import {check} from "../../../../../../frontend-admin/node_modules/@angular/tsc-wrapped/src/tsc";

@Component({
    selector: 'bs-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => CheckboxComponent),
            multi       : true
        }
    ]
})
export class CheckboxComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string

    @Input('options') optionList: any[]

    @Input() error: string = ''


    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-6'


    interValueCurrentSelected : any = []


    constructor(
        private el: ElementRef
    ) {
        // console.log('constructor')
    }

    ngOnInit(): void {
        console.log('ngOnInit')
    }


    ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
        console.log('ngOnChanges')

        for (const propertyName in changes) {

            if (changes.hasOwnProperty(propertyName)) {
                const currentChangeObject = changes[propertyName]

                if (propertyName === 'optionList' && currentChangeObject.currentValue && Array.isArray(currentChangeObject.currentValue)) {
                    this.writeValue(this.interValueCurrentSelected)
                }
            }

        }
    }


    getCurrentOption(currentOption: any, event: any) {
        if (event.checked) {
            if (this.interValueCurrentSelected.indexOf(currentOption) === -1) {
                this.interValueCurrentSelected.push(currentOption)
            }
        }else {
            this.interValueCurrentSelected.splice(this.interValueCurrentSelected.indexOf(currentOption),1)
        }

        this.value = this.interValueCurrentSelected

    }






    onChange (value : any) { return }
    onTouched () { return }

    get value() {
        // console.log('getter: ', this.interValueCurrentSelected)
        return this.interValueCurrentSelected
    }

    set value(val: any) {
        // console.log('Setter: ', val)
        this.interValueCurrentSelected = val

        this.onChange(val)
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
        console.log('WriteValue: ', value)

        // if (Array.isArray(this.optionList)) {
        //
        //     let tempValue = []
        //
        //     this.optionList.forEach( option => {
        //         if (option.id === value) {
        //             tempValue = option
        //         }
        //     })
        //
        //     this.value = tempValue
        // }
    }

}
