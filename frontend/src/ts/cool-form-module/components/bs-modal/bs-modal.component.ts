import {Component, OnInit} from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms'



@Component({
    selector    : 'app-bs-modal',
    templateUrl : './bs-modal.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private fb: FormBuilder
    ) {

    }

    ngOnInit(): void {

    }

}
