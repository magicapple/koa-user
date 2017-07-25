import { BrowserModule} from '@angular/platform-browser'
import { NgModule} from '@angular/core'
import { HttpModule} from '@angular/http'
import { ReactiveFormsModule, FormsModule} from '@angular/forms'

import {AppComponent} from './components/app.component'

import { SwitchComponent } from './components/switch/switch.component';
import { TextInputComponent } from './components/text-input/text-input.component'


import {ForbiddenValidatorDirective} from './components/custom-validatior';

@NgModule({
    declarations : [
        AppComponent,
        SwitchComponent,
        TextInputComponent,
        ForbiddenValidatorDirective
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
