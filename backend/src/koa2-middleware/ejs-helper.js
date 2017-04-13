/**
 * Created by jinwyp on 4/12/17.
 */




function ejsHelper (options) {

    return async function (ctx, next) {
        ctx.state = ctx.state || {};
        ctx.state.timeNow = new Date();
        ctx.state.ip = ctx.ip;
        ctx.state.version = '1.0.0';
        return next();
    }
}



module.exports = ejsHelper