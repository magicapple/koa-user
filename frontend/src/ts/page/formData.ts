import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { JsonFormDataModule } from '../json-form-module/jsonFormData.module'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(JsonFormDataModule)
