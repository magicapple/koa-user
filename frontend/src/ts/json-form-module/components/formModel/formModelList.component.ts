import {Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'


import { HttpService } from '../../../bs-form-module/services/http.service'

import { FormModelService } from '../../../services/formModel.service'



@Component({
    selector    : 'app-root',
    templateUrl : './formModelList.component.html',
    styleUrls   : ['./formModelList.component.css']
})
export class FormModelListComponent implements OnInit {

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


    formModelSchema: any = {
        "properties" : {
            "modelSchema"      : {
                "type"        : "string",
                "description" : "Model Schema",
                "widget" : "textarea"
            },
            "uiSchema"   : {
                "type"        : "string",
                "description" : "UI Schema",
                "widget" : "textarea"
            }
        },
        "required"   : ["modelSchema", "uiSchema"]
    }


    newFormModel : any = {}

    showFormData(value: any) {
        // console.log(value)
        this.newFormModel = value
    }


    getFormModel(task: any) {
        console.log(task.modelSchema)
        // this.formModelSchema = JSON.parse(task.modelSchema)
    }

    createNewFormModels() {
        console.log(this.newFormModel.modelSchema)
        if (!this.newFormModel.modelSchema) {

            return this.httpService.errorMessage('', '不符合JSON规范')
        }

        const tempJson = this.safelyParseJSON(this.newFormModel.modelSchema)

        if (!tempJson) {
            console.log('tempJson', tempJson)

            return this.httpService.errorMessage('', '不符合JSON规范')
        }

        this.fmService.createFormModel({ modelSchema : tempJson}).subscribe(
            data => {
                this.httpService.successHandler(data, '创建成功!')
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
