import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'


import { BSCommonModule } from '../bs-common-module/bs-common.module'



import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { SelectDropdownComponent } from './components/selectDropdown/selectDropdown.component'
import { RadioComponent } from './components/radio/radio.component'


import {ForbiddenValidatorDirective} from './validators/custom-validator'


import {HttpService} from './services/http.service'

@NgModule({
    declarations : [
        SwitchComponent,
        TextInputComponent,
        SelectDropdownComponent,
        RadioComponent,

        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,

        BSCommonModule
    ],
    providers    : [
        HttpService
    ],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        TextInputComponent,
        SwitchComponent,
        SelectDropdownComponent,
        RadioComponent
    ],
    bootstrap    : []
})
export class BSFormModule {}
