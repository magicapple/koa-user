import {Component, OnInit, Input, forwardRef, ElementRef, ViewChild, OnChanges, SimpleChange} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'bs-select',
    templateUrl: './selectDropdown.component.html',
    styleUrls: ['./selectDropdown.component.css'],
    host: {
        '(document:click)': 'onClickHideSelect($event)',
        '(document:keydown)': 'onKeyboardSelectOption($event)'
    },
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => SelectDropdownComponent),
            multi       : true
        }
    ]
})
export class SelectDropdownComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string

    @Input('options') optionList: any[]

    @Input() error: string = ''

    @Input('readonly') readonly: boolean

    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-6'


    @ViewChild('optionsListEl') optionsListEl: ElementRef

    interValueCurrentSelected : any = { id : -1 , name : '请选择'}

    isShowSelectOptionList: boolean = false
    currentSelectByKeyboard: number =  -1

    constructor(
        private el: ElementRef
    ) {
        // console.log('constructor')
    }

    ngOnInit(): void {
        console.log('ngOnInit', this.el.nativeElement)
    }


    ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
        // console.log('ngOnChanges')

        for (const propertyName in changes) {

            if (changes.hasOwnProperty(propertyName)) {
                const currentChangeObject = changes[propertyName]

                // if (currentChangeObject.currentValue && currentChangeObject.isFirstChange) {
                //     console.log('currentChangeObject firstChange: ', propertyName, currentChangeObject)
                // }else {
                //     console.log('currentChangeObject secondChange: ', propertyName, currentChangeObject)
                // }

                if (propertyName === 'optionList' && currentChangeObject.currentValue && Array.isArray(currentChangeObject.currentValue)) {
                    this.writeValue(this.interValueCurrentSelected.id)
                }
            }

        }
    }


    showOptions() {
        this.isShowSelectOptionList = !this.isShowSelectOptionList
    }
    filterOptionsList: any = []
    filterOptions(e: any) {

        this.filterOptionsList = []
        if (e.trim() !== '') {
            for (let i = 0; i < this.optionList.length; i ++) {
                if(this.optionList[i].name.indexOf(e) !== -1) {
                    this.filterOptionsList.push(this.optionList[i])
                    this.isShowSelectOptionList = true
                }

            }
        }
    }
    getFilterOption(e: any) {
        if (e.trim() !== '') {
            for (let i = 0; i < this.optionList.length; i ++) {
                if (this.optionList[i].name === e) {
                    this.currentSelectByKeyboard = this.optionList[i]
                    this.value = this.optionList[i]
                }
            }
            console.log(this.currentSelectByKeyboard)
        }

    }

    getCurrentOption(currentOption: any) {
        this.value = currentOption
        this.isShowSelectOptionList = false
        this.currentSelectByKeyboard = this.optionList.indexOf(currentOption)
    }


    //点击选择框以外区域,select选择框隐藏
    onClickHideSelect(event: any) {

        if (!this.optionsListEl.nativeElement.contains(event.target)) {
            this.isShowSelectOptionList = false
        }
    }

    //select 键盘事件
    onKeyboardSelectOption(event: any) {

        if ( this.isShowSelectOptionList) {
            let optionsLength: any
            if(this.readonly) {
                 optionsLength = this.optionList.length
            }else{
                 optionsLength = this.filterOptionsList.length
            }


            if ( event.keyCode === 40) {
                //下

                if ( this.currentSelectByKeyboard < optionsLength - 1) {
                    this.currentSelectByKeyboard ++

                }else {
                    this.currentSelectByKeyboard = 0
                }
            }else if (event.keyCode === 38) {
                //上

                if ( this.currentSelectByKeyboard < 1) {
                    this.currentSelectByKeyboard = optionsLength - 1
                }else {
                    this.currentSelectByKeyboard --
                }

            }else if (event.keyCode === 13) {
                //enter
                if(this.readonly) {
                    this.getCurrentOption(this.optionList[this.currentSelectByKeyboard])
                }else{
                    this.getCurrentOption(this.filterOptionsList[this.currentSelectByKeyboard])
                }

            }

        }
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

        if (Array.isArray(this.optionList)) {

            let tempValue = { id : -1 , name : ''}

            this.optionList.forEach( option => {
                if (option.id === value) {
                    tempValue = option
                }
            })

            this.value = tempValue
            this.currentSelectByKeyboard = this.optionList.indexOf(this.value)
        }
    }

}
