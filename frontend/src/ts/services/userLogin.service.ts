
/**
 * Created by jin on 8/10/17.
 */

import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable'

import {apiPath} from './apiPath'


@Injectable()
export class UserLoginService {

    constructor(
        private http: HttpClient
    ) {
    }

    checkUsername(username : string): Observable<any> {

        return this.http.post(apiPath.signUpCheckUsername, {username : username})
    }
}
