import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry} from 'angular2-schema-form'

import {FormModelListComponent} from './components/formModel/formModelList.component'

import {FormModelService} from '../services/formModel.service'


@NgModule({
    declarations : [
        FormModelListComponent
    ],
    imports      : [
        BrowserModule,
        SchemaFormModule
    ],
    providers    : [
        FormModelService,
        {provide : WidgetRegistry, useClass : DefaultWidgetRegistry}
    ],
    bootstrap    : [FormModelListComponent]
})
export class JsonFormDataModule {
}
