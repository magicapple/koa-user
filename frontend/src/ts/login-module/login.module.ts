/**
 * Created by jin on 7/25/17.
 */


import { BrowserModule} from '@angular/platform-browser'
import { NgModule} from '@angular/core'

import { LoginComponent } from './components/login/login.component'
import { CoolFormModule } from '../cool-form-module/cool-form.module'


import { UserLoginService } from '../services/userLogin.service'



@NgModule({
    declarations : [
        LoginComponent
    ],
    imports      : [
        CoolFormModule,
        BrowserModule
    ],
    providers    : [
        UserLoginService
    ],
    bootstrap    : [LoginComponent]
})
export class LoginModule {}


