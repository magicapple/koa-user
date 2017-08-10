
/**
 * Created by jin on 8/10/17.
 */

import {HttpErrorResponse} from '@angular/common/http'


const subscribeErrorHandler = (error: HttpErrorResponse) => {

    if (error.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('Observable 发生前端错误!! ', error.error.message)
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.log(`Observable 发生后端请求错误!! ${error.status}, body was: ${error.error}`)

        if (error && error.status === 401 ) {
            window.location.href = '/web/login'
        } else {
            if (error && error.status === 400) {
                console.log('Http 400 请求发生错误!! ', error)

            }else if (error && error.status === 404) {
                console.log('Http 404 请求发生错误!! ', error)

            }else if (error && error.status === 500) {
                console.log('Http 500 请求发生错误!! ', error)

            }else {
                console.log('Http 请求发生错误!! ', error)
            }

        }
    }

}


const removeEmptyProperty = ( source : any) => {

    const sourceTemp = JSON.parse(JSON.stringify(source))

    function removeEmptyKeys (sourceObject : any) {
        if ( typeof sourceObject === 'object' && sourceObject && !Array.isArray(sourceObject)) {
            for (const prop in sourceObject) {
                if (sourceObject.hasOwnProperty(prop)) {

                    if ( typeof sourceObject[prop] === 'object' &&  sourceObject[prop] && !Array.isArray(sourceObject[prop])) {

                        if (Object.keys(sourceObject[prop]).length > 0 ) {
                            removeEmptyKeys (sourceObject[prop])
                        }

                        if (Object.keys(sourceObject[prop]).length === 0 ) {
                            // console.log('Property: ', prop, sourceObject[prop])
                            delete sourceObject[prop]
                        }

                    }else if ( Array.isArray(sourceObject[prop]) && sourceObject[prop].length === 0 ) {
                        delete sourceObject[prop]

                    }else if ( typeof sourceObject[prop] === 'number' && sourceObject[prop] === 0 ) {
                        delete sourceObject[prop]

                    }else if ( !sourceObject[prop] ) {
                        delete sourceObject[prop]
                    }
                }
            }
        }
    }

    removeEmptyKeys(sourceTemp)

    return sourceTemp
}



export {subscribeErrorHandler, removeEmptyProperty}
