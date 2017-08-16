import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'


import { BSCommonModule } from '../bs-common-module/bs-common.module'



import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'


import {ForbiddenValidatorDirective} from './validators/custom-validator'


import {ErrorService} from './services/httpError.service'

@NgModule({
    declarations : [
        SwitchComponent,
        TextInputComponent,
        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,

        BSCommonModule
    ],
    providers    : [
        ErrorService
    ],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        TextInputComponent,
        SwitchComponent
    ],
    bootstrap    : []
})
export class BSFormModule {}
