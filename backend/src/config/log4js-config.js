/**
 * log4js 配置文件
 *
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF.
 *
 * 关于log4js的appenders的配置说明
 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
 * https://github.com/tough1985/hello-koa2/blob/master/config/log_config.js
 */

const path = require('path');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../../../logs')


//错误日志目录
const errorPath = "/error";

//错误日志文件名
const errorFileName = "error";

//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// const errorLogPath = path.resolve(__dirname, "../logs/error/error");



//响应日志目录
const responsePath = "/response";

//响应日志文件名
const responseFileName = "response";

//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// var responseLogPath = path.resolve(__dirname, "../logs/response/response");



module.exports = function(pathLog){
    if (pathLog) {
        baseLogPath = pathLog
    }

    errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
    responseLogPath = baseLogPath + responsePath + "/" + responseFileName;


    return {
        "appenders"   : [
            //错误日志
            {
                "category"             : "errorLogger",             //logger名称
                "type"                 : "dateFile",                   //日志类型
                "filename"             : errorLogPath,             //日志输出位置
                "alwaysIncludePattern" : true,          //是否总是有后缀名
                "pattern"              : "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
                "path"                 : errorPath                     //自定义属性，错误日志的根目录
            },
            //响应日志
            {
                "category"             : "responseLogger",
                "type"                 : "dateFile",
                "filename"             : responseLogPath,
                "alwaysIncludePattern" : true,
                "pattern"              : "-yyyy-MM-dd-hh.log",
                "path"                 : responsePath
            }
        ],
        "levels"      :                                   //设置logger名称对应的的日志等级
            {
                "errorLogger" : "ERROR",
                "responseLogger"   : "ALL"
            },
        "baseLogPath" : baseLogPath                  //logs根目录
    }
}