import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule} from '@angular/http'
import { ReactiveFormsModule} from '@angular/forms'


import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'


import {ForbiddenValidatorDirective} from './components/custom-validatior'

@NgModule({
    declarations : [
        SwitchComponent,
        TextInputComponent,
        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpModule,
        ReactiveFormsModule
    ],
    providers    : [],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,

        TextInputComponent,
        SwitchComponent
    ],
    bootstrap    : []
})
export class CoolFormModule {}
