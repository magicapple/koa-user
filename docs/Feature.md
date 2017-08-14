# 项目功能介绍


## 项目配置文件

1. 在项目backend/src/config 目录下 default.js 为默认配置字段.每个文件名称对应该环境的配置,例如development.js和production.js 对应开发环境和生产环境.


## 用户系统

#### 用户注册

1. 用户在网站直接注册. 有两种注册方式,通过邮件注册和使用手机号注册.  
2. 当通过邮件注册, 用户先输入邮件地址, 点击发送邮件按钮. 然后用户需要在打开邮箱里面邮件里面的链接,进入注册页面.输入用户名和密码后,注册成功. 
3. 当通过手机注册, 用户先输入手机号, 获取验证码, 然后进入注册页面. 输入用户名和密码后,注册成功.


#### 用户微信联合登陆
1. 验证几个字段长度是否合格 jsCode, signature, encrytedData, iv  
2. 通过code 向微信请求 获取openid和seesion_key   
3. 校验session_key 长度 并且 如果上面返回的errcode字段不为空 则继续 
4. 通过sha1 算法把rawData 和 session_key 生成签名2 与 签名signature 字段 比对
5. 通过 session_key 和 iv字段解密 encryptedData 
6. 用nickname 作为用户名注册，如果nickname长度不够则用 “wx-”前缀 加 openid 作为用户名注册
7. 注册成功后，生成新token返回给前端，如果用户的openid已存在则不注册新用户 直接生成token返回给前端



#### 用户登录

1. 用户登录功能.使用jwt作为 token. 登陆成功返回 字段accessToken, 具体格式如下. 同时生成cookie, cookie的key默认为 X-Access-Token.

```json
{
  "success": true,
  "error": null,
  "meta": null,
  "data": {
    "_id": "5901c2c17f8d76717be0759a",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTAxYWNjYWNlMTNmYjZmY2E1ZTBhODgiLCJpYXQiOjE0OTMzNDkxNjYsImV4cCI6MTQ5NTk0MTE2Nn0.EnYZuSnwt-M9C6h78JZfiElEpBb8WOUmZJN6CEWl1r0",
    "createdAt": "2017-04-27T10:06:57.572Z"
  }
}

```


2. 用户退出登陆.需要发起post提交字段accessToken, 退出登陆时删除相应token.


#### 用户认证 

1. 所有请求需要在http 的 header中增加 'Authorization' 的key, 值为Bearer前缀 "Bearer Tokenxxxxxx" .
2. koa框架如果认证失败会返回401错误. 认证成功后用户信息可以通过ctx.state.userInfo 获取.

