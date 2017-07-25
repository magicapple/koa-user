import {Component, Input, forwardRef, OnInit, OnChanges, SimpleChange} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
    selector    : 'app-text-input',
    templateUrl : './text-input.component.html',
    styleUrls   : ['./text-input.component.css'],
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => TextInputComponent),
            multi       : true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit, OnChanges {

    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() type: string = 'text'
    @Input() label: string = '标签文字：'
    @Input() error: string = ''

    @Input('labelclass') labelClass: string = 'col-sm-2'
    @Input('inputclass') inputClass: string = 'col-sm-10'


    interValue: string | number = ''

    onChange: any  = () => { return undefined }
    onTouched: any = () => { return undefined }

    constructor() {
        console.log('constructor')
    }

    ngOnInit() {
        console.log('ngOnInit')
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        console.log('ngOnChanges')

        for (const propertyName in changes) {

            if (changes.hasOwnProperty(propertyName)) {
                const currentChange = changes[propertyName]
                console.log('currentChange: ', currentChange)
            }

        }
    }

    get value() {
        // console.log('getter: ', this.interValue)
        return this.interValue
    }

    set value(val: any) {
        console.log('setter: ', val)
        this.interValue = val
        this.onChange(val)
        this.onTouched()
    }


    registerOnChange(fn: any): void {
        console.log('registerOnChange: ', fn)
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        console.log('registerOnTouched: ', fn)
        this.onTouched = fn
    }

    writeValue(value: any): void {
        console.log('writeValue: ', value)
        if (value) {
            this.value = value
        }
    }


    inputOnChange(inputValue: any) {
        this.value = inputValue
    }

}
