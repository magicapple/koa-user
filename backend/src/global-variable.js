/**
 * Created by JinWYP on 21/02/2017.
 */



global.GPromise = require('bluebird');
global.GDirUtil = require('./koa2-utils/create-directory')();
global.GConfig = require('./config');
global.GProjectPath = process.cwd()



global.SystemError = require('./errors/SystemError');
global.ValidationError = require('./errors/ValidationError');
