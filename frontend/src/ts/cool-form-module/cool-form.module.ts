import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'


import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'


import {ForbiddenValidatorDirective} from './components/validators/custom-validator'

@NgModule({
    declarations : [
        SwitchComponent,
        TextInputComponent,
        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers    : [],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        TextInputComponent,
        SwitchComponent
    ],
    bootstrap    : []
})
export class CoolFormModule {}
