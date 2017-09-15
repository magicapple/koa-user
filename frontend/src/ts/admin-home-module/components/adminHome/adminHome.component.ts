import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { HttpService } from '../../../bs-form-module/services/http.service'


import { formErrorHandler } from '../../../bs-form-module/validators/validator'




@Component({
  selector: 'app-admin-home',
  templateUrl: './adminHome.component.html',
  styleUrls: ['./adminHome.component.css']
})
export class AdminHomeComponent implements OnInit {

    isLeftMenuCollapsed : boolean = false
    currentMenu : string = ''


    menuList : any[] = [
        {}
    ]


    constructor(
        // private httpService: HttpService
    ) {
        // this.getCurrentUserInfo()
    }



    ngOnInit(): void {
        // this.getCurrentUserInfo()
    }


    toggleLeftMenu () {
        this.isLeftMenuCollapsed = !this.isLeftMenuCollapsed
    }

    clickMenu (menu : string) {
        this.currentMenu = menu
    }


}
