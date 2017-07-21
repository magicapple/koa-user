import { BrowserModule} from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { HttpModule} from '@angular/http'
import { ReactiveFormsModule, FormsModule} from '@angular/forms'

import {AppComponent} from './components/app.component'



@NgModule({
    declarations : [
        AppComponent
    ],
    imports      : [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule
    ],
    providers    : [],
    bootstrap    : [AppComponent]
})
export class CoolFormModule {
}
