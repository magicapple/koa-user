
// Koa application is now a class and requires the new operator.

require('./global-variable');


const logger = require('koa-logger');
const router = require('koa-router')();
const XResponseTime = require('koa-response-time');
const Koa = require('koa');
const debug = require('debug')('koa2-user:server');

const util = require('util')


const app = new Koa();
const log4js = require('./koa2-middleware/logger-log4js');
const response_formatter = require('./koa2-middleware/response-formater');
const api = require('./routes/api/apiv1');



debug("Node Config: ", util.inspect(GConfig, {showHidden: false, depth: null}))




require('./koa2-middleware/error-handler');


app.use(log4js.middleware)
app.use(XResponseTime())
app.use(logger())

app.use(response_formatter());

// Start Router
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());





// Start listening on specified port
app.listen(GConfig.port, () => {
    debug("----- Koa 2.0 server listening on port", GConfig.port);
});

// Start the app with "node --harmony-async-await" flag, and go to http://localhost:3000
