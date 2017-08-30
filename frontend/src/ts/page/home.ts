import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { UserHomeModule } from '../home-module/userHome.module'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(UserHomeModule)
