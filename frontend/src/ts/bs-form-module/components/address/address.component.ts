import {Component, OnInit, Input, forwardRef, ElementRef, ViewChild} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'bs-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css'],
    host: {
        '(document:click)': 'onClickHideSelect($event)'
    },
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => SelectAddressComponent),
            multi       : true
        }
    ]
})
export class SelectAddressComponent implements OnInit, ControlValueAccessor {

    @Input('fc') currentFormControl: FormControl = new FormControl()
    @Input() label: string

    @Input('options') optionList: any[]

    @Input() error: string = ''

    @Input('labelclass') labelClass: string = 'col-2'
    @Input('inputclass') inputClass: string = 'col-6'


    @ViewChild('optionsListEl') optionsListEl: ElementRef

    currentProvince: any = {
        name: '请选择省'
    }
    currentCity: any = {
        name: '市'
    }
    currentDistrict: any = {
        name: '区'
    }


    interValueCurrentSelected : any = {
        province: '请选择省',
        city: '市',
        district: '区',
        provinceId: '',
        cityId: '',
        districtId: ''
    }

    isShowSelectOptionList: boolean = false

    constructor(
        private el: ElementRef
    ) {
        // console.log('constructor')
    }

    ngOnInit(): void {
        // console.log('ngOnInit', this.el.nativeElement)
    }

    showOptions() {
        this.isShowSelectOptionList = !this.isShowSelectOptionList
    }


    currentTab: string = 'province'

    cityList: any = []
    districtList: any = []

    tabChange(event: any) {

        if(event === 'province'){
            this.currentTab = 'province'

        }else if(event === 'city'){
            this.currentTab = 'city'

        }else if(event === 'district'){
            this.currentTab = 'district'

        }
    }


    getCurrentProvince(province: any) {
        this.currentProvince = province

        // console.log(province)
        this.cityList = this.currentProvince.cities

        if(this.currentProvince.name === '北京' || this.currentProvince.name === '天津' || this.currentProvince.name === '上海' || this.currentProvince.name === '重庆' || this.currentProvince.name === '香港' || this.currentProvince.name === '澳门' ) {
            this.currentTab = 'district'
            this.currentCity = province.cities[0]
            this.districtList = this.currentCity.counties

        }else {
            this.currentTab = 'city'
            this.currentCity.name = '市'

        }

        this.currentDistrict.name = '区'

    }
    getCurrentCity(city: any) {
        console.log(city)
        this.currentCity = city
        this.districtList = city.counties
        this.currentTab = 'district'
        this.currentDistrict.name = '区'
    }

    getCurrentDistrict(district: any) {
        this.currentDistrict = district

        this.value = {
            province: this.currentProvince.name,
            provinceId: this.currentProvince.id,
            city: this.currentCity.name,
            cityId: this.currentCity.id,
            district: this.currentDistrict.name,
            districtId: this.currentDistrict.id
        }

        this.isShowSelectOptionList = false
    }

    //点击选择框以外区域,select选择框隐藏
    onClickHideSelect(event: any) {

        if (!this.optionsListEl.nativeElement.contains(event.target)) {
            this.isShowSelectOptionList = false
            this.currentTab = 'province'
        }
    }



    onChange (value : any) {}
    onTouched () {}

    get value() {
        // console.log('getter: ', this.value)
        return this.interValueCurrentSelected
    }

    set value(val: any) {
        console.log('Setter: ', val)
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

        if (Array.isArray(this.optionList)) {


            this.currentProvince = this.optionList.find(province => province.id === value.provinceId) || {name: '请选择省'}
            this.currentCity = this.currentProvince.cities.find(city => city.id === value.cityId) || {name: '市'}
            this.currentDistrict = this.currentCity.counties.find(district => district.id === value.districtId) || {name: '区'}

            this.value = {
                province: this.currentProvince.name,
                provinceId: this.value.provinceId,
                city: this.currentCity.name,
                cityId: this.value.cityId,
                district: this.currentDistrict.name,
                districtId: this.value.districtId
            }
        }
    }

}
