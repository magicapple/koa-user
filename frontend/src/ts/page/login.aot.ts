import {platformBrowser} from '@angular/platform-browser'

import {LoginModuleNgFactory} from '../../aotCompiled/ts/login-module/login.module.ngfactory'


platformBrowser().bootstrapModuleFactory(LoginModuleNgFactory)

