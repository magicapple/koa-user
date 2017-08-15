import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'


import { BsModalComponent } from './components/bs-modal/bs-modal.component'

import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'


import {ForbiddenValidatorDirective} from './validators/custom-validator'


import {ModalService} from './services/modal.service'
import {ErrorService} from './services/httpError.service'

@NgModule({
    declarations : [
        BsModalComponent,
        SwitchComponent,
        TextInputComponent,
        ForbiddenValidatorDirective
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers    : [
        ErrorService,
        ModalService
    ],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        BsModalComponent,

        TextInputComponent,
        SwitchComponent
    ],
    bootstrap    : []
})
export class CoolFormModule {}
