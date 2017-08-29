import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'


import { BSFormModule } from '../bs-form-module/bs-form.module'
import { BSCommonModule } from '../bs-common-module/bs-common.module'


import { IndexHomeComponent } from './components/indexHome/indexHome.component'

import { UserLoginService } from '../services/userLogin.service'



@NgModule({
    declarations : [
        IndexHomeComponent
    ],
    imports      : [
        BrowserModule,

        BSFormModule,
        BSCommonModule

    ],
    providers    : [
        UserLoginService
    ],
    bootstrap    : [IndexHomeComponent]
})
export class UserHomeModule { }
