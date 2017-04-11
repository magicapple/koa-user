/**
 * Created by JinWYP on 21/02/2017.
 */



global.GPromise = require('bluebird');
global.GDirUtil = require('./common-libs/create-directory');
global.GConfig = require('./config');
global.GLogger = require('./koa2-middleware/logger-log4js').logger;
global.GProjectPath = process.cwd()



global.GSystemError = require('./errors/SystemError');
global.GValidationError = require('./errors/ValidationError');
