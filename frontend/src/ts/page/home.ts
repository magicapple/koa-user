import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { HomeModule } from '../home-module/home.module'
import { environment } from '../environments/environment'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(HomeModule)
