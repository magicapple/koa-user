import {Component, OnInit, Input, forwardRef, ElementRef, ViewChild} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import {isUndefined} from 'util'

@Component({
    selector: 'bs-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    host: {
        '(document:click)': 'onClickHideSelect($event)'
    },
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => DatePickerComponent),
            multi       : true
        }
    ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string

    @Input() error: string = ''

    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-3'

    @ViewChild('datepicker') datePickerEl: ElementRef

    interValueDate : any = { year : 2017 , month : 12}

    isShowDatePicker: boolean = false
    currentSelectByKeyboard: number =  -1

    constructor(
        private el: ElementRef
    ) {
        // console.log('constructor')
    }

    ngOnInit(): void {
        // console.log('ngOnInit', this.el.nativeElement)
    }

    showDatePicker() {
        this.isShowDatePicker = !this.isShowDatePicker
    }

    getDate(event : any) {
        this.value = event
        console.log(event)
    }


    //点击选择框以外区域,隐藏datepicker
    onClickHideSelect(event: any) {

        if (!this.datePickerEl.nativeElement.contains(event.target)) {
            this.isShowDatePicker = false
        }
    }



    onChange (value : any) { return }
    onTouched () { return }

    get value() {
        // console.log('getter: ', this.interValueCurrentSelected)
        return this.interValueDate
    }

    set value(val: any) {
        // console.log('Setter: ', val)
        this.interValueDate = val

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

        if (value) {
            this.interValueDate = value
        }
    }

}
