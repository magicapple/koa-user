/**
 * Created by jin on 8/16/17.
 */


import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'


import { BSModalComponent } from '../bs-common-module/components/bs-modal/bs-modal.component'


import {ModalService} from './services/modal.service'

@NgModule({
    declarations : [
        BSModalComponent
    ],
    imports      : [
        CommonModule,
    ],
    providers    : [
        ModalService
    ],
    exports:      [
        CommonModule,

        BSModalComponent

    ],
    bootstrap    : []
})
export class BSCommonModule {}
