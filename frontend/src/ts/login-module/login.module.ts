/**
 * Created by jin on 7/25/17.
 */


import { BrowserModule} from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { HttpModule} from '@angular/http'
import { ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './components/app.component'
import { CoolFormModule } from '../cool-form-module/cool-form.module'

@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        CoolFormModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class LoginModule {}


