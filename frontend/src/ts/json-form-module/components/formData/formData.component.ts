import {Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'


import { HttpService } from '../../../bs-form-module/services/http.service'

import { FormModelService } from '../../../services/formModel.service'



@Component({
    selector    : 'app-root',
    templateUrl : './formData.component.html',
    styleUrls   : ['./formData.component.css']
})
export class FormDataComponent implements OnInit {

    formModelList: any[] = []

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private fmService: FormModelService
    ) {

    }

    ngOnInit(): void {
        this.getFormModels()
    }

    getFormModels() {
        this.fmService.getFormModelList().subscribe(
            data => {
                this.formModelList = data.data
                this.httpService.successHandler(data, '获取信息成功!')
            },
            error => {this.httpService.errorHandler(error) }
        )
    }

    currentTask : any = {}

    formModelSchema: any = {
        "properties" : {
            "modelSchema"      : {
                "type"        : "string",
                "description" : "Model Schema",
                "widget" : "textarea"
            }
        },
        "required"   : ["modelSchema", "uiSchema"]
    }


    newFormData : any = {}

    showFormData(value: any) {
        // console.log(value)
        this.newFormData = value
    }


    getFormModel(task: any) {
        this.currentTask = task
        this.formModelSchema = JSON.parse(task.modelSchema)
    }

    getFormData (task: any) {

        this.fmService.getFormDataByFormModelId(task._id).subscribe(
            data => {
                this.httpService.successHandler(data, '查看成功!')
            },
            error => {this.httpService.errorHandler(error) }
        )


    }


    createNewFormData() {

        const newFormData = {
            modelSchemaId : this.currentTask._id,
            postData : this.newFormData
        }

        console.log(newFormData)

        this.fmService.createFormData(newFormData).subscribe(
            data => {
                this.httpService.successHandler(data, '提交成功!')
            },
            error => {this.httpService.errorHandler(error) }
        )
    }



    safelyParseJSON (json: any) {
        // This function cannot be optimised, it's best to
        // keep it small!

        let parsed : any = false

        try {
            parsed = JSON.parse(json)
            console.log('parsed', parsed)
        } catch (e) {
            // Oh well, but whatever...
        }

        return parsed // Could be undefined!
    }

}
