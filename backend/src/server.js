
// Koa application is now a class and requires the new operator.

require('./global-variable');
require('./koa2-libs/mongoose-connect');


const util            = require('util');
const path            = require('path');
const Koa             = require('koa');
const logger          = require('koa-logger');
const XResponseTime   = require('koa-response-time');
const koaStaticServer = require('koa-static');
const ejs             = require('koa-ejs');
const router          = require('koa-router')();
const bodyParser      = require('koa-bodyparser');
const cors            = require('kcors');
const debug           = require('debug')('koa2-user:server');


const app                    = new Koa();
const log4js                 = require('./koa2-middleware/logger-log4js');
const errorHandler           = require('./koa2-libs/error-handler');
const responseFormatter      = require('./koa2-middleware/response-formater');
const ejsHelper              = require('./koa2-middleware/ejs-helper');
const PageNotFoundMiddleware = require('./koa2-middleware/error404-handler');
const apiRoutes              = require('./routes/api/apiv1');
const webRoutes              = require('./routes/website/index');



// debug("Node Config: ", util.inspect(GConfig, {showHidden: false, depth: null}))



app.use(errorHandler(app)); // 全局错误处理

app.use(log4js.middleware)
app.use(logger()) // 记录所用方式与时间
app.use(XResponseTime()) // 设置Header
app.use(bodyParser()); // body解析
app.use(cors()); // 跨域资源共享 CORS



// 静态文件夹
app.use(koaStaticServer(path.join(__dirname, 'public'), {
    maxage : 1000 * 60 * 60 * 24 * 365,
    hidden : false, // 默认不返回隐藏文件
    gzip : false
}));

// 设置渲染引擎
ejs(app, {
    root: path.join(__dirname, 'views'),
    layout: 'indexLayout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});

app.use(ejsHelper());

app.use(responseFormatter('/api', {isInclude:true}));


// Start Router 路由
router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
router.use('/web', webRoutes.routes(), webRoutes.allowedMethods());

app.use(router.routes(), router.allowedMethods());
app.use(PageNotFoundMiddleware());




// Start listening on specified port
app.listen(GConfig.port, () => {
    debug("----- Server Koa 2.0 listening on port ", GConfig.port);
});

// Start the app with "node --harmony-async-await" flag, and go to http://localhost:3000
