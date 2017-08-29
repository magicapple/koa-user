import { Component, OnInit, Input, forwardRef} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    host: {
        '(document:click)': 'onClickHideSelect($event)',
        '(document:keydown)': 'onClickSelectOption($event)'
    },
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => SelectComponent),
            multi       : true
        }
    ]
})
export class SelectComponent implements OnInit, ControlValueAccessor{
    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string;
    @Input() dataSource: Array<any>;

    @Input() error: string = ''
    @Input('labelclass') labelClass: string = 'col-2';
    @Input('inputclass') inputClass: string = 'col-6';


    currentSelected : any = '请选择'

    constructor() {}

    ngOnInit(): void {
        console.log(this.dataSource)
        this.dataSource.forEach( (item, index)=> {
            if (this.value === item.id){
                this.currentSelected = item.id
            }
        })


    }

    selectOnChange(value: any){
        this.dataSource.forEach( (item, index)=> {
            if (value === item.id){
                this.currentSelected = item.id
                this.value =  item.id
            }
        })
    }

    selectOption: boolean = false
    showSelectOption() {
        this.selectOption = true
    }

    targetLi: any;
    targetInput: any;

    getTargetVal(val: any, selectOptions: any,selectInput: any) {
        this.targetLi = selectOptions
        this.targetInput = selectInput


        this.selectOption = false
        this.dataSource.forEach( (item, index)=> {
            if (val === item.id){
                this.currentSelected = item.name
                this.value =  item.id
                console.log(this.currentSelected)
            }
        })
    }

    //点击选择框以外区域,select选择框隐藏
    onClickHideSelect(event: any) {
        const eventClass = event.target.className
        if(this.targetInput) {
            if(eventClass.indexOf(this.targetInput) === -1 && eventClass.indexOf(this.targetLi) === -1) {
                this.selectOption = false
            }
        }else {
            if(eventClass.indexOf('row') !== -1) {
                this.selectOption = false
            }

        }
    }

    //select键盘事件
    activeIndex: number = 0
    onClickSelectOption(event: any) {

        if(this.selectOption) {
            if(event.keyCode == 40){
                //下
                if(this.activeIndex < this.dataSource.length-1) {
                    this.activeIndex ++

                }else {
                    this.activeIndex = 0
                }
            }else if (event.keyCode == 38){
                //上
                this.activeIndex --
                if(this.activeIndex < 0) {
                    this.activeIndex = this.dataSource.length-1
                }

            }else if (event.keyCode == 13){
                //enter
                this.dataSource.forEach( (item, index)=> {
                    if (index === this.activeIndex){
                        this.currentSelected = item.name
                        this.value =  item.id
                        this.selectOption = false
                    }
                })

            }

        }
    }





    selectValue : any


    onChange (value : any) {}
    onTouched () {}

    get value() {
        console.log('getter: ', this.selectValue)
        return this.selectValue
    }

    set value(val: any) {
        console.log('Setter: ', val)
        this.selectValue = val

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
