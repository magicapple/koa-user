/**
 * Created by jin on 7/25/17.
 */


import { BrowserModule} from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { HttpModule} from '@angular/http'
import { ReactiveFormsModule} from '@angular/forms'

import { LoginComponent } from './components/login/login.component'
import { CoolFormModule } from '../cool-form-module/cool-form.module'

@NgModule({
    declarations : [
        LoginComponent
    ],
    imports      : [
        CoolFormModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule
    ],
    providers    : [],
    bootstrap    : [LoginComponent]
})
export class LoginModule {}


