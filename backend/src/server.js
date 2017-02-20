
// Koa application is now a class and requires the new operator.
const convert = require('koa-convert')
const logger = require('koa-logger')
const router = require('koa-router')();
const Koa = require('koa');
const debug = require('debug')('koa2-user:server');


const app = new Koa();
const response_formatter = require('./koa2-middleware/response-formater');
const api = require('./routes/api/apiv1');

const util = require('util')
const config = require('./config');
console.log("Node Config: ", util.inspect(config, {showHidden: false, depth: null}))





app.use(convert(logger()))
app.use(response_formatter());

// Start Router
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());







// Start listening on specified port
app.listen(config.port, () => {
    debug("----- Koa 2.0 server listening on port", config.port);
});

// Start the app with "node --harmony-async-await" flag, and go to http://localhost:3000

