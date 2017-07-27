import {platformBrowser} from '@angular/platform-browser'

import {HomeModuleNgFactory} from '../../aotCompiled/ts/home-module/home.module.ngfactory'


platformBrowser().bootstrapModuleFactory(HomeModuleNgFactory)

