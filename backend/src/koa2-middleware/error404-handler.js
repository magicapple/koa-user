/**
 * Created by jinwyp on 4/12/17.
 */



function pageNotFoundHandler (options) {

    return async function (ctx, next) {

        await next();

        // Handle 404 upstream.

        ctx.status = 404;
        throw(new GPageNotFoundError())

    }
}



module.exports = pageNotFoundHandler