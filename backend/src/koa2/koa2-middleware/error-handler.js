const debug  = require('debug')('koa2-user:error');
const debug400  = require('debug')('koa2-user:error400');




function checkIsXHR (req){
    let isXHR = false;

    let type = req.accepts('html', 'json', 'text');

    if (req.get('X-Requested-With') === 'XMLHttpRequest'){

        if (req.is('application/json') || req.is('application/x-www-form-urlencoded')){
            isXHR = true;
        }
    }

    if (req.is('application/json')){
        isXHR = true;
    }

    if (req.get('Content-Type') === 'application/json'){
        isXHR = true;
    }

    if (type === 'json'){
        isXHR = true;
    }


    return isXHR;

}



function serverLog (error, ctx){
    if (ctx.status >= 500){
        GLogger.error('===== Server 5XX UncaughtException : ', error, '\n ----- Server Koa2 Context : ', ctx);
        debug('===== Server 5XX UncaughtException : ', error, '\n ----- Server Koa2 Context : ', ctx);
    }else {
        if (ctx.status >= 400){
            if (ctx.status === 404) {
                // GLogger.error('===== 404 Page Not Found : ', error, '\n ----- Server Koa2 Context : ', ctx)
                debug400('===== Server 404 Page Not Found : ', error, '\n ----- Server Koa2 Context : ', ctx)

            } else {

                // GLogger.error('===== Server 4XX Bad Request : ', error, '\n ----- Server Koa2 Context : ', ctx)
                debug400('===== Server 4XX Bad Request : ', error, '\n ----- Server Koa2 Context : ', ctx)
            }
        }
    }

}



// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){

    let newError = null;

    if (error && typeof error.type === 'undefined'){
        newError = new GSystemError(500, error.message, error);
        newError.stack = error.stack;
    }else{
        newError = error;
    }

    GLogger.error('===== Server 5XX UncaughtException : ', error)
    debug('===== Server 5XX UncaughtException : ', error)

    process.exit(1);
});



// To render unhandled rejections created in BlueBird:
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p){
    GLogger.error('===== Server 5XX UnhandledRejection at Promise: ', JSON.stringify(p), "\n Reason: ", reason);
    debug('===== Server 5XX UnhandledRejection at Promise: ', JSON.stringify(p), "\n Reason: ", reason);
});






function productionErrorHandler (app, options){

    options = options || {}
    options.env = options.env || 'development'

    app.on('error', (error, ctx) =>{

    })

    app.proxy = true;  // If your Koa or Express server is properly configured, the protocol property of the request will be set to match the protocol reported by the proxy in the X-Forwarded-Proto header.

    return async (ctx, next) => {
        try {

            ctx.state.xhr = (ctx.request.get('X-Requested-With') === 'XMLHttpRequest');

            // Security Header for content sniffing
            ctx.set('X-Content-Type-Options', 'nosniff');


            // console.log("==== Header application/json : ", ctx.request.is('application/json'), ctx.request.is('application/x-www-form-urlencoded'))
            // console.log("==== Header Content-Type : ", ctx.request.get('Content-Type'), ctx.request.get('Content-Type') === 'application/json')
            // console.log("==== Header accepts : ", ctx.request.accepts('html', 'json', 'text'))

            await next();

            // Handle 404 upstream.

            ctx.status = ctx.status || 404;
            if (ctx.status === 404) {
                throw(new GPageNotFoundError())
            }

        } catch (error) {

            ctx.status = error.status || 500;

            if (checkIsXHR(ctx.request)){

                if (options.env === 'production'){
                    error.stack = ''
                }

            }else {

                if (ctx.status >= 500){
                    ctx.state.title = '500 系统错误, 请稍后重试!'
                    await ctx.render('error/error', { error : error });
                }

                if (ctx.status >= 400){
                    if (ctx.status === 404) {
                        await ctx.render('error/404', { error : error });
                    } else {
                        await ctx.render('error/400', { error : error });
                    }
                }
            }

            serverLog(error, ctx)

            // ctx.app.emit('error', error, ctx);
        }
    };

}


module.exports = productionErrorHandler;