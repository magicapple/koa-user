# 该项目为学习 Nodejs 框架 Koa2 的教程


## 项目从零起步的配置

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
5. 安装 [koa-router] koa 路由库 ``` npm install koa-router --save``` 
6. 安装 [koa-log4] koa2 log4js-node 日志模块 ``` npm i --save koa-log4@2 ``` 
6. 安装 [koa-static] koa2 koa-static 静态服务器模块 ``` npm install --save koa-static ``` 


## 项目测试所用到的库
1. 安装 [chai] 库用于在测试时,支持BDD断言语法  ``` npm install --save-dev chai ``` 



[Node.js]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[3m安装法]: https://cnodejs.org/topic/57f628098489e7ca69f4e839


[koa]: http://koajs.com/
[nodemon]: https://github.com/remy/nodemon
[mocha]: https://mochajs.org/
[chai]: http://chaijs.com/


[debug]: https://github.com/visionmedia/debug
[lodash]: https://github.com/lodash/lodash
[koa-convert]: https://github.com/koajs/convert
[koa-logger]: https://github.com/koajs/logger
[koa-log4]: https://github.com/dominhhai/koa-log4js
[koa-router]: https://github.com/alexmingoia/koa-router
[koa-static]: https://github.com/koajs/static



### 参考项目

https://github.com/yonyou-yyfax/hello-koa2
https://github.com/guo-yu/koa-guide
