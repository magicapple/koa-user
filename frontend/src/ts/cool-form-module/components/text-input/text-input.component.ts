import {Component, Input, forwardRef, OnInit, OnChanges, SimpleChange} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms'

@Component({
    selector    : 'app-text-input',
    templateUrl : './text-input.component.html',
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
    @Input() label: string = '标签文字:'
    @Input() hint: string = ''
    @Input() error: string = ''

    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-6'


    interValue: string | number = ''

    onChange: any  = () => { return undefined }
    onTouched: any = () => { return undefined }

    constructor() {
        // console.log('constructor')
    }

    ngOnInit() {
        // console.log('ngOnInit')
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        // console.log('ngOnChanges')

        for (const propertyName in changes) {

            if (changes.hasOwnProperty(propertyName)) {
                const currentChangeObject = changes[propertyName]

                if (currentChangeObject.currentValue && currentChangeObject.isFirstChange) {
                    // console.log('currentChangeObject firstChange: ', currentChangeObject)
                }else {
                    // console.log('currentChangeObject secondChange: ', currentChangeObject)
                }

            }
        }
    }

    get value() {
        // console.log('getter: ', this.interValue)
        return this.interValue
    }

    set value(val: any) {
        // console.log('Setter: ', val)
        this.interValue = val
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
        // console.log('WriteValue: ', value)
        if (value) {
            this.value = value
        }
    }


    inputOnChange(inputValue: any) {
        this.value = inputValue
    }

}
