import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { LoginModule } from '../login-module/login.module'
import { environment } from '../environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic(
    [ {provide: 'moduleType', useValue: 'register' } ]
).bootstrapModule(LoginModule)
