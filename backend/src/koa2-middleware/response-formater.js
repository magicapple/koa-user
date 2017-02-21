/**
 * Created by JinWYP on 23/01/2017.
 */

const log4js = require('./logger-log4js').log4js;
const logger = log4js.getLogger('errorLogger')

const response_formatter = function(ctx){

    //如果有返回数据，将返回数据添加到data中
    if (ctx.body) {
        if (Array.isArray(ctx.body)){
            ctx.body = {
                success : true,
                error : null,
                meta : {
                    total : 0,
                    count : ctx.body.length,
                    numPerPage : 0,
                    offset : 0,
                    page : 0
                },
                data : ctx.body
            }

            if (ctx.meta && ctx.meta.total) {
                ctx.body.meta = {
                    total : ctx.meta.total,
                    count : ctx.body.length,
                    numPerPage : ctx.meta.numPerPage,
                    offset : ctx.meta.offset,
                    page : ctx.meta.page
                }
            }
        }else {
            ctx.body = {
                success : true,
                error   : null,
                meta    : null,
                data    : ctx.body
            }
        }

    }
}



const url_filter = function (pattern, options){

    return async (ctx, next) => {

        const matchedUrl = new RegExp(pattern);


        try {
            // 先去执行路由
            await next(); // wait until we execute the next function down the chain, then continue;


            // 通过正则的url进行格式化处理
            if(typeof pattern === 'undefined'){
                response_formatter(ctx);
            }else if(pattern && matchedUrl.test(ctx.originalUrl)){
                response_formatter(ctx);
            }else{

            }

        } catch (err) {
            ctx.body = {
                success : false,
                error : {
                    code: err.code,
                    message: err.message,
                    field: err.field
                },
                meta : null,
                data : null
            };
            ctx.status = err.status || 500;

            //继续抛，让外层中间件处理日志
            //throw err;

            logger.error('== Server 4XX error : ', err, '== Server koa2 ctx : ', ctx)

        }


    }
}





module.exports = url_filter;