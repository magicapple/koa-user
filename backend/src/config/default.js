/**
 * Created by JinWYP on 7/26/16.
 */

/**
 * config
 */

const path = require("path");

module.exports = {

    debug : false, // debug 为 true 时，用于本地调试

    https    : false,
    domain   : "pay-local.yimei180.com",
    port     : 3000, // 程序运行的端口

    auth_cookie_secret   : "very_long_koa2_express_tekken_nina_jin_kazama",
    auth_cookie_name : "signed_cookie_username",

    loginToken : {
        "jwtTokenSecret" : "koa2-user-secret-x1",
        "jwtTokenExpireDay" : 30,
        "tokenFieldName" : "X-Access-Token"
    },

    // 应用目录配置
    path_logs : path.join(__dirname, "../../../logs/"),


    // 文件目录配置
    path_file_upload : path.join(__dirname, "../../../files/upload"),
    path_file_upload_tmp : path.join(__dirname, "../../../files/upload_tmp"),
    path_file_download : path.join(__dirname, "../../../files/download"),


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
    }
};
