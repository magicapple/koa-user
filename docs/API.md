# API 返回格式文档 

### API 接口文档请看docs/api 目录




### 接口返回格式

#### 接口成功返回 

成功返回数组,包括meta字段表示分页相关信息

```
{
    success : true,
    error : null,
    meta : {
        total : 100,
        count : 10,
        offset : 0,
        page : 1
    },
    data : [
        {
            id : 11,
            orderNo : 1001
        },
        {
            id : 12,
            orderNo : 1002
        },
        {
            id : 13,
            orderNo : 1003
        },
        {
            id : 14,
            orderNo : 1004
        },
        {
            id : 15,
            orderNo : 1005
        },
        {
            id : 16,
            orderNo : 1006
        },
        {
            id : 17,
            orderNo : 1007
        },
        {
            id : 18,
            orderNo : 1008
        },
        {
            id : 19,
            orderNo : 1009
        },
        {
            id : 20,
            orderNo : 1010
        }
    ]
}
```


成功返回对象,不包括meta字段

```
{
    "success" : true,
    "error" : null,
    "meta" : null,
    "data" : {
        "id" : 11,
        "orderNo" : 1001
    }
}
```

#### 接口失败返回 
失败返回,包括error字段, 不包括meta字段

```
{
    success : false,
    error : {
        code:1001,
        message: 'Field validation error,  order id length must be 4-30',
        field: 'orderId'
    },
    meta : null,
    data : null
}
```

注意如果是删除资源,删除成功 也要返回该资源

```
{
    success : true,
    error : null,
    meta : null,
    data : {
        id : 11,
        orderNo : 1001
    }
}
```


## API 设计参考文章

[RESTful API 设计与工程实践](http://blog.m31271n.com/2017/03/02/RESTful-API-%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5/)
