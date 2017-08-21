/**
 * Created by JinWYP on 7/26/16.
 */

/**
 * config
 */

const path = require("path")

module.exports = {

    https    : false,
    domain   : "pay-local.yimei180.com",
    port     : 3000, // 程序运行的端口,

    pathViewTemplate : path.join(__dirname, '../views/src'),

    cookieSecret   : "very_long_koa2_express_tekken_nina_jin_kazama",
    cookieName : "koa2:session",

    authToken : {
        secret : "koa2-user-secret-x1",
        expireDay : 30,
        fieldName : "X-Access-Token"
    },

    // 应用目录配置
    pathLogs : path.join(__dirname, "../../../logs/"),


    // 文件目录配置
    pathFileUpload : path.join(__dirname, "../../../files/upload"),
    pathFileUploadTemp : path.join(__dirname, "../../../files/upload_tmp"),
    pathFileDownload : path.join(__dirname, "../../../files/download"),


    redis : {
        host : "127.0.0.1",
        port : 6379,
        db   : 0
    },

    mongodb: {
        "scheme": "mongodb",
        "hosts": [
            {
                "host": "localhost",
                "port": 27017
            }
        ],
        "username": "",
        "password": "",

        // "options": {
        //     "authSource": "@dmin"
        // },
        "database": "koa2user"

    },


    weChatMiniApp : {
        appId : "wx63852d7027018b3b",
        secret : "a4d1f671cbae2544b3e43e6c519bb7f6"
    },

    smsNexmo : {
        API_KEY : '',
        API_SECRET : ''
    }
}


