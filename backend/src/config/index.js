/**
 * Created by JinWYP on 22/01/2017.
 */


"use strict";

const lodash = require("lodash");
const defaultConfig = require('./default.js');
const env = process.env.NODE_ENV || 'development';
const currentConfig = require('./' + env);



/**
 * 扩展配置文件路径 配置文件名分别为
 * development.js 开发环境
 * testing.js 测试环境
 * staging.js 线上 staging 环境
 * production.js 线上 生产环境
 *
 */




module.exports = lodash.merge({}, defaultConfig, currentConfig);


