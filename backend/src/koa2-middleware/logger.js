/**
 * Created by JinWYP on 23/01/2017.
 */


async function logger (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}



module.exports = logger

