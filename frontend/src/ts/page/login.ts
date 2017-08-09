import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { LoginModule } from '../login-module/login.module'
import { environment } from '../environments/environment'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowserDynamic(
    [ {provide: 'moduleType', useValue: 'login' } ]
).bootstrapModule(LoginModule)
