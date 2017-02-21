const debug  = require('debug')('koa2-user:error');
const log4js = require('./logger-log4js').log4js;
const logger = log4js.getLogger('errorLogger')



// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){

    var newError = null;

    if (typeof error.type === 'undefined'){
        newError = new SystemError(500, error.message, error);
        newError.stack = error.stack;
    }else{
        newError = error;
    }

    logger.error('== Server 5XX UncaughtException : ', error)
    debug('== Server 5XX UncaughtException : ', error)

    process.exit(1);
});




// To render unhandled rejections created in BlueBird:
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p){
    logger.error('== Server 5XX UnhandledRejection at Promise: ', JSON.stringify(p), ". Reason: ", reason);
});


// While PrettyError.start() works out of the box with when.js` unhandled rejections,
// now that wer'e manually rendering errors, we have to instead use npmjs.org/packages/pretty-monitor
// to handle when.js rejections.
