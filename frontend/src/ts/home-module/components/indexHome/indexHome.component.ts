import {Component, OnInit} from '@angular/core'

import { HttpService } from '../../../bs-form-module/services/http.service'



@Component({
  selector: 'app-user-home',
  templateUrl: './indexHome.component.html',
  styleUrls: ['./indexHome.component.css']
})
export class IndexHomeComponent implements OnInit {


    constructor(
        private httpService: HttpService
    ) {

    }


    ngOnInit(): void {
        // this.createUserInfoForm()
        // this.getCurrentUserInfo()
    }




}
