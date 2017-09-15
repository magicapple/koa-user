import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { BSFormModule } from '../bs-form-module/bs-form.module'
import { BSCommonModule } from '../bs-common-module/bs-common.module'


import { AdminHomeComponent } from './components/adminHome/adminHome.component'
import { BasicInfoComponent } from './components/basicInfo/basicInfo.component'

import { UserInfoService } from '../services/userInfo.service'


const userHomeRoutes: Routes = [
    {path : '', redirectTo : '/info/basic', pathMatch : 'full'},
    {path : 'info/basic', component : BasicInfoComponent},
    {path : '**', redirectTo : '/info/basic', pathMatch : 'full'},
]


@NgModule({
    declarations : [
        AdminHomeComponent,
        BasicInfoComponent
    ],
    imports      : [
        BrowserModule,

        BSFormModule,
        BSCommonModule,

        RouterModule.forRoot( userHomeRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )

    ],
    providers    : [
        UserInfoService
    ],
    bootstrap    : [AdminHomeComponent]
})
export class AdminHomeModule { }
