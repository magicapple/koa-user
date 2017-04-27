/**
 * Created by JinWYP on 21/02/2017.
 */



global.GPromise = require('bluebird');
global.GMongoose = require('mongoose');
global.GSchema = GMongoose.Schema;
global.GObjectId = GSchema.Types.ObjectId;

GMongoose.Promise = GPromise;




global.GDirUtil = require('./koa2/common-libs/create-directory');
global.GConfig = require('./config');
global.GLogger = require('./koa2/koa2-middleware/logger-log4js').logger;
global.GProjectPath = process.cwd()



global.GSystemError = require('./koa2/errors/SystemError');
global.GPageNotFoundError = require('./koa2/errors/PageNotFoundError');
global.GValidationError = require('./koa2/errors/ValidationError');
global.GUnauthenticatedAccessError = require('./koa2/errors/UnauthenticatedAccessError');

global.GDataChecker = require('./app-user/business-libs/data-checker');
