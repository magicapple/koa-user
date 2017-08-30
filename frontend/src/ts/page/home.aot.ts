import { enableProdMode } from '@angular/core'
import { platformBrowser } from '@angular/platform-browser'

import {UserHomeModuleNgFactory} from '../../aotCompiled/ts/home-module/userHome.module.ngfactory'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowser().bootstrapModuleFactory(UserHomeModuleNgFactory)

