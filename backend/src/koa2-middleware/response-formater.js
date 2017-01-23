/**
 * Created by JinWYP on 23/01/2017.
 */


const response_formatter = async (ctx, next) => {
    //先去执行路由
    await next();

    //如果有返回数据，将返回数据添加到data中
    if (ctx.body) {

        if (Array.isArray(ctx.body)){
            ctx.body = {
                success : true,
                error : null,
                meta : {
                    total : ctx.meta.total,
                    count : ctx.body.length,
                    numPerPage : ctx.meta.numPerPage,
                    offset : ctx.meta.offset,
                    page : ctx.meta.page
                },
                data : ctx.body
            }
        }else {
            ctx.body = {
                success : true,
                error   : null,
                meta    : null,
                data    : ctx.body
            }
        }

    } else {
        ctx.body = {
            success : false,
            message: 'error',
            errorCode: 200,
            field: 'dd',
        }
    }
}


module.exports = response_formatter;