import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'


import { BSCommonModule } from '../bs-common-module/bs-common.module'
import { NgbDatepickerModule } from './components/ngb-datepicker/datepicker.module';



import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { SelectDropdownComponent } from './components/selectDropdown/selectDropdown.component'
import { RadioComponent } from './components/radio/radio.component'
import { DatePickerComponent } from './components/datepicker/datepicker.component'



import {ForbiddenValidatorDirective} from './validators/custom-validator'


import {HttpService} from './services/http.service'

@NgModule({
    declarations : [
        SwitchComponent,
        TextInputComponent,
        SelectDropdownComponent,
        RadioComponent,
        DatePickerComponent,

        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,

        BSCommonModule,
        NgbDatepickerModule.forRoot()
    ],
    providers    : [
        HttpService
    ],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        NgbDatepickerModule,

        TextInputComponent,
        SwitchComponent,
        SelectDropdownComponent,
        RadioComponent,
        DatePickerComponent
    ],
    bootstrap    : []
})
export class BSFormModule {}
