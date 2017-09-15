
/**
 * Created by jin on 8/10/17.
 */

import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


import {apiPath} from './apiPath'


@Injectable()
export class UserInfoService {

    constructor(
        private http: HttpClient
    ) {
    }


    private behaviorSubject : any = new BehaviorSubject(null)


    sendUserInfoMessage(user: any): Observable<any> {
        return this.behaviorSubject.next(user)
    }


    getUserInfo(): Observable<any> {
        return this.behaviorSubject.asObservable()
    }

    clearUserInfo() {
        this.behaviorSubject.next(null)
    }



    getUserInfoHttp(): Observable<any> {

        return this.http.get(apiPath.getUserInfo)
    }

    saveUserInfo(user : any): Observable<any> {

        return this.http.post(apiPath.saveUserInfo, user)
    }

    getUserAddressList(): Observable<any> {

        return this.http.get(apiPath.getUserAddressList)
    }

    createUserAddress(address : any): Observable<any> {

        return this.http.post(apiPath.saveUserAddressList, address)
    }

    updateUserAddress(addressId : string, address : any): Observable<any> {

        return this.http.put(apiPath.saveUserAddressList + '/' + addressId, address)
    }
}
