import { Component, ElementRef, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms'

import {ModalService} from '../../services/modal.service'



@Component({
    selector    : 'app-bs-modal',
    templateUrl : './bs-modal.component.html'
})
export class BsModalComponent implements OnInit {

    title : string = '弹出框标题'
    message : string = '弹出框内容'

    private element: any

    constructor(
        private el: ElementRef,
        private modalService: ModalService
    ) {
        this.element = $(el.nativeElement)
    }

    ngOnInit(): void {

        // $('#modalGlobal').modal('show')

        this.element = $('#modalGlobal')

        this.modalService.getModal().subscribe( data => {
            console.log('Modal data: ', data)

            if (data && data.title || data && data.message) {
                this.title = data.title || '抱歉，出错了！'
                this.message = data.message || '请联系网站管理员！'

                this.element.modal('show')
            }
        })
    }

}
