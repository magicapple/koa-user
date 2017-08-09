import { enableProdMode } from '@angular/core'
import {platformBrowser} from '@angular/platform-browser'

import {HomeModuleNgFactory} from '../../aotCompiled/ts/home-module/home.module.ngfactory'

if (process.env.NODE_ENV === 'production') {
    enableProdMode()
}

platformBrowser().bootstrapModuleFactory(HomeModuleNgFactory)

