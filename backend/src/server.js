
// Koa application is now a class and requires the new operator.
const convert = require('koa-convert')
const logger = require('koa-logger')
const router = require('koa-router')();
const Koa = require('koa');
const debug = require('debug')('koa2-user:server');


const app = new Koa();
const api = require('./routes/api/apiv1');

const config = require('./config');
console.log(config)





app.use(convert(logger()))
// Start Router
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());



// uses async arrow functions
app.use(async (ctx, next) => {
    try {
        await next(); // wait until we execute the next function down the chain, then continue;
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});




// Start listening on specified port
app.listen(config.port, () => {
    debug("----- Koa 2.0 server listening on port", config.port);
});

// Start the app with "node --harmony-async-await" flag, and go to http://localhost:3000