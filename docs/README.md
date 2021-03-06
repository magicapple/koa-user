# 该项目为学习 Nodejs 框架 Koa2 的教程


## 从零起步的配置

1. 使用 [Node.js] V7.8 以上版本运行, Mac电脑建议通过 ``` nvm install node ```安装 [Node.js].  需要先安装nvm,运行脚本 ``` curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash``` . 或参考[3m安装法]
2. 在 项目根目录配置 .npmrc 文件, 加速 npm 安装源.

全局配置 .npmrc 文件方法如下:
- 安装 node-sass 网速比较卡时  可以 运行 ```npm config set registry https://registry.npm.taobao.org```  
- 然后 编辑 ~/.npmrc 加入下面内容
```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```


3. 添加 .gitignore 忽略不需要的文件,不要上传的 github 上. 包括 webstorm 的项目文件
4. 设置 Webstorm 不检查分号结尾, 取消以下设置项的复选框  设置 Preferences -> Editor -> Inspections -> Javascript -> Code style issue -> Unterminated statement 





## 环境搭建需要库 

1. 安装 [koa] 框架 ``` npm install --save koa ```
2. 使用 [nodemon] ``` npm i -g nodemon ``` 在修改代码后自动重启服务器, node v7 版本启动需要使用 --harmony-async-await 参数. 具体请看 npm run dev 命令.
3. nodemon.json 文件为 [nodemon] 的配置文件.
4. 安装 [mocha] 框架 ``` npm install -g mocha ``` 作为单元测试工具. 运行命令 ```npm test ``` 进行测试. 使用 ``` npm test -- --grep 'length' ``` 测试指定测试.



## 项目运行所用到的库

1. 安装 [debug] 库用于显示调式信息  ``` npm i -S debug``` 
2. 安装 [lodash] ``` npmS lodash``` 
3. 安装 [koa-convert] 用来转换 koa v1版本的 middleware ``` npmS koa-convert ``` 
4. 安装 [koa-logger] 用来显示调试日志 ``` npmS koa-logger``` 
5. 安装 [koa-log4] koa2 的 log4js-node 日志模块 ``` npm i --save koa-log4@2 ``` 
6. 安装 [koa-router] koa2 路由库 ``` npm install koa-router --save``` 
7. 安装 [koa-static] koa2 的 koa-static 静态服务器模块 ``` npm install --save koa-static ``` 
8. 安装 [koa-mount] koa2 的 koa-mount 可以指定路径挂载middleware，结合koa-static 可以指定静态资源的路径 ``` npm install --save koa-mount ``` 
9. 安装 [koa-ejs]  koa2的 支持 ejs 的HTML模版引擎  ``` npmS koa-ejs ``` 
10. 安装 [koa-bodyparser] koa2 的 koa-bodyparser 获取post表单内容模块 ``` npm install --save koa-bodyparser ``` 
11. 安装 [koa-response-time] koa2 在 response header 上, 增加 X-Response-Time 相应时间 ``` npm install --save koa-bodyparser ``` 
12. 安装 [kcors] koa2 跨域CORS 模块 ``` npm install --save kcors ``` 
13. 安装 [koa-useragent] koa2 查看 请求Header中的UserAgent 模块 ``` npm install --save koa-useragent ``` 
14. 安装 [koa-jwt]  koa2 针对每个路由的需要验证jwt token 的中间件
15. 安装 [koa-multer]  koa2 上传文件组件
16. 安装 [koa-session]  koa2 session中间件, Simple session middleware for Koa 
17. 安装 [koa-helmet]  koa2 提高安全性中间件, Helmet helps you secure your apps by setting various HTTP headers. 


20. 安装 [validator] 验证数据校验库
21. 安装 [bcrypt] 密码加密库
22. 安装 [jsonwebtoken] 用于登录的 JSON Web Tokens
23. 安装 [moment] 处理时间日期库
24. 安装 [ipaddr.js] 处理 IPv6 和 IPv4 地址的库
25. 安装 [captchapng] 处理图形验证码
26. 安装 [nanoid] 生成UUID

30. 安装 [superagent] node.js HTTP client. Node.js发起 Http请求的库




### 第三方短信服务库
1. [@alicloud/sms-sdk] 阿里云发短信的库


### mongodb 相关库

1. 安装 [mongoose] mongodb 的Node.js的 ORM 操作数据库的库


## 项目测试所用到的库

1. 安装 [chai] 库用于在测试时,支持BDD断言语法  ``` npm install --save-dev chai ``` 







[Node.js]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[3m安装法]: https://cnodejs.org/topic/57f628098489e7ca69f4e839



[nodemon]: https://github.com/remy/nodemon
[mocha]: https://mochajs.org/
[chai]: http://chaijs.com/
[superagent]: https://github.com/visionmedia/superagent


[lodash]: https://github.com/lodash/lodash
[moment]: https://github.com/moment/moment/
[validator]: https://github.com/chriso/validator.js
[bcrypt]: https://github.com/kelektiv/node.bcrypt.js
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[ipaddr.js]: https://github.com/whitequark/ipaddr.js/commits/master
[captchapng2]: https://github.com/Lellansin/captchapng
[nanoid]: https://github.com/ai/nanoid




[koa]: http://koajs.com/
[debug]: https://github.com/visionmedia/debug
[koa-convert]: https://github.com/koajs/convert
[koa-logger]: https://github.com/koajs/logger
[koa-log4]: https://github.com/dominhhai/koa-log4js
[koa-router]: https://github.com/alexmingoia/koa-router
[koa-static]: https://github.com/koajs/static
[koa-mount]: https://github.com/koajs/mount
[koa-ejs]: https://github.com/koajs/ejs
[koa-bodyparser]: https://github.com/koajs/bodyparser
[koa-response-time]: https://github.com/koajs/response-time
[koa-useragent]: https://github.com/rvboris/koa-useragent
[kcors]: https://github.com/koajs/cors
[koa-jwt]: https://github.com/koajs/jwt
[koa-multer]: https://github.com/koa-modules/multer
[koa-session]: https://github.com/koajs/session
[koa-helmet]: https://github.com/venables/koa-helmet

[mongoose]: http://mongoosejs.com/

[@alicloud/sms-sdk]: https://www.npmjs.com/package/@alicloud/sms-sdk





### 参考项目

https://github.com/yonyou-yyfax/hello-koa2
https://github.com/guo-yu/koa-guide
https://github.com/chentsulin/simple-koa2-example
https://github.com/ecmadao/Learn-Koa2
https://github.com/moajs/moa2
https://github.com/xiongwilee/koa-grace
https://github.com/yi-ge/koa2-API-scaffold
https://github.com/yujintang/koa2-server
https://github.com/lanvige/koa2-boilerplate
https://github.com/perminder-klair/kickoff-koa2




### Koa2 教程
https://ecmadao.gitbooks.io/learn-koa2
https://github.com/guo-yu/koa-guide
https://github.com/chenshenhai/koa2-note






