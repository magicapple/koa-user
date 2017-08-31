import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry} from 'angular2-schema-form'

import { BSFormModule } from '../bs-form-module/bs-form.module'
import { BSCommonModule } from '../bs-common-module/bs-common.module'




import {FormDataComponent} from './components/formData/formData.component'

import {FormModelService} from '../services/formModel.service'


@NgModule({
    declarations : [
        FormDataComponent
    ],
    imports      : [
        BrowserModule,
        SchemaFormModule,
        BSFormModule,
        BSCommonModule
    ],
    providers    : [
        FormModelService,
        {provide : WidgetRegistry, useClass : DefaultWidgetRegistry}
    ],
    bootstrap    : [FormDataComponent]
})
export class JsonFormDataModule {
}
