/**
 * Created by JinWYP on 7/26/16.
 */

/**
 * config
 */

const path = require('path');

module.exports = {

    debug : false, // debug 为 true 时，用于本地调试
    env : process.env.NODE_ENV || 'development',

    https    : false,
    domain   : 'pay-local.yimei180.com',
    port     : 3000, // 程序运行的端口
    homepage : 'http://pay-local.yimei180.com:3000',

    cookie_secret   : 'this_is_yimeis_secret_key_node_redis__cache_long_',
    auth_cookie_name : 'signed_cookie_username',


    // 应用目录配置
    path_logs : path.join(__dirname, '../../../logs/'),


    // 文件目录配置
    path_file_upload : path.join(__dirname, '../../../files/upload'),
    path_file_upload_tmp : path.join(__dirname, '../../../files/upload_tmp'),
    path_file_download : path.join(__dirname, '../../../files/download'),



    cookie: {
        secret: 'very_long_koa2_express_tekken_nina_jin_kazama'
    },

    redis : {
        host : '127.0.0.1',
        port : 6379,
        db   : 0
    },

    mongodb: {
        "username": "",
        "password": "",
        "hosts": [
            {
                "host": "localhost",
                "port": 27017
            }
        ],
        "database": "koa2user"
    },
};
