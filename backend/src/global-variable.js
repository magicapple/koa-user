/**
 * Created by JinWYP on 21/02/2017.
 */



global.GPromise = require('bluebird');
global.GMongoose = require('mongoose');
global.GSchema = GMongoose.Schema;
global.GObjectId = GSchema.Types.ObjectId;

GMongoose.Promise = GPromise;




global.GDirUtil = require('./common-libs/create-directory');
global.GConfig = require('./config');
global.GLogger = require('./koa2-middleware/logger-log4js').logger;
global.GProjectPath = process.cwd()



global.GSystemError = require('./errors/SystemError');
global.GPageNotFoundError = require('./errors/PageNotFoundError');
global.GValidationError = require('./errors/ValidationError');
global.GUnauthenticatedAccessError = require('./errors/UnauthenticatedAccessError');

global.GDataChecker = require('./business-libs/data-checker');
