### 一、什么是 JSON-Server

[Github 仓库](https://github.com/typicode/json-server)

### 基本使用

#### 1.安装依赖

  ```javascript
  npm install json-server
  ```
#### 2.设置运行目录

新增如下文件`__json__mock/db.json`，其中 `db.json`内容如下

  ```javascript
  {
    users: []
  }
  ```
#### 3.启动服务

```javascript  
json-server --watch db.json --port 3001
```

启动参数

|  参数   | 说明  | 
|  ----  | ----  |
| `--host`  | 主机地址, 这里设置了 `0.0.0.0` ，之后通过本机 IP 来访问即可。同一个局域网内的其他设备也可以通过这个地址来访问。 |
| `--middlewares`  | 指定中间件 |
| `--routes` | 指定路由文件 | 
| `--watch` | 监听文件 | 
| `--config` | 指定配置文件 | 
| `--port` | 端口号| 
| `--static` | 设置静态文件 |
| `--read-only` | 只读 |
| `--delay` | 接口延时(ms) |

#### 4.访问服务

```javascript 
http://localhost:4000/users
```

### 二、HTTP 中间层服务

```javascript

GET    /users    - 列表
GET    /users/1  - 详情
POST   /users    - 创建
PUT    /users/1  - 覆盖
PATCH  /users/1  - 更新
DELETE /users/1  - 删除

```

#### 2.1 GET-过滤

```javascript
GET /users?id=1001&name=feng // 筛选
GET /users?id=1&id=2  // 筛选多个
GET /comments?author.name=yuhua // 筛选嵌套对象
```

#### 2.2 GET-排序

通过`_sort` 参数设置排序标的； `_order`参数设置排序顺序 (默认升序)

```javascript
GET /users?_sort=views&_order=asc
```

#### 2.3 GET-切片

- 通过`_start/_end` 参数设置起始点
  - 注意数组中内容索引默认为 0
  - 查找的范围为 [_start, _end)
-  `_limit`参数设置每页行数
  - `_end`与`limit`同时存在时，后者会被忽略

```javascript
GET /users/1/comments?_start=1&_end=3 // 索引项1和2的两条
GET /users/1/comments?_start=2&_limit=10 // 索引项1开始的共计10条数据
```
> 将切片与排序参数组合使用可以完成排序分页功能 `GET /users?_sort=age&_order=desc&_start=0&_limit=1`

#### 2.4 GET-操作符

- `_gte / _lte` - 比较
  - `GET /users?age_gte=10&age_lte=20`
- `_ne` - 不等于
  - `GET /posts?id_ne=1`
- `_like` - 模糊匹配 %like%
  - `GET /posts?title_like=server`



### 三、静态资源服务器


可以使用 JSON Server 为HTML、JS和CSS提供服务，只需创建`./public`目录或使用`--static`设置不同的静态文件目录。

```javascript
json-server db.json --static ./__json__mock
// 然后访问 http://localhost:4000/ 自动展示 __json__mock 目录下的 index.html

```

## 四、进阶使用

### 4.1 关联查询

关系拼装可以把关联的2个接口的数据拼接起来并返回。其中有2种查询关系：

- 包含子资源 `_embed`
- 包含父资源 `_expand`

准备以下数据方便演示

```javascript
{
  "posts": [
    { "id": 1, "title": "文章111", "author": "张三" },
    { "id": 2, "title": "文章222", "author": "李四" }
  ],
  "comments": [
    { "id": 1, "body": "some comment 1", "postId": 1 },
    { "id": 2, "body": "some comment 2", "postId": 1 },
    { "id": 3, "body": "some comment 3", "postId": 2 }
  ]
}
```

#### 包含子资源 `_embed`

可以简单的理解为，查询主体和附属的`_embed` 为 `1:N` 的关系，会将子资源作为数组填充在父资源中

> `http://localhost:3000/posts?_embed=comments`

返回如下数据

```javascript
[
    {
        "id": 1,
        "title": "文章111",
        "author": "张三",
        "comments": [
            {
                "id": 1,
                "body": "some comment 1",
                "postId": 1
            },
            {
                "id": 2,
                "body": "some comment 2",
                "postId": 1
            }
        ]
    },
    {
        "id": 2,
        "title": "文章222",
        "author": "李四",
        "comments": [
            {
                "id": 3,
                "body": "some comment 3",
                "postId": 2
            }
        ]
    }
]
```

#### 包含子资源 `_expand`

可以简单的理解为，查询主体和附属的`_expand` 为 `1:1` 的关系，会将父资源作为单独的属性填充在子资源中

> `http://localhost:3000/comments?_expand=post`

```javascript
[
    {
        "id": 1,
        "body": "some comment 1",
        "postId": 1,
        "post": {
            "id": 1,
            "title": "文章111",
            "author": "张三"
        }
    },
    {
        "id": 2,
        "body": "some comment 2",
        "postId": 1,
        "post": {
            "id": 1,
            "title": "文章111",
            "author": "张三"
        }
    },
    {
        "id": 3,
        "body": "some comment 3",
        "postId": 2,
        "post": {
            "id": 2,
            "title": "文章222",
            "author": "李四"
        }
    }
]
```
### 4.2 配置路由

启动服务时，使用配置参数，指定路由文件启动服务，就可以自定义路由，比如我们对资源`users`不想使用默认的访问路由，则可以如下操作

1、创建 routes.json

```javascript
{
  "/api/*": "/$1"
}
```

2、启动服
```javascript
json-server db.json --routes routes.json
```

3、访问路由

```javascript
http://localhost:3000/api/posts
```

上面只是提供了一种基础的修改路径前缀的方式，实际上有更多的规则可以使用，比如：

```javascript
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

生效后，可以有如下的效果

```javascript
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```