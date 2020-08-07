const express = require('express')
const mongo = require("./config/mongo")
const bodyParser = require('body-parser')
const expressJwt = require("express-jwt")
const registerRouter = require("./router")

const app = express()
const port = 8083
mongo.connect();

require("./config/common")

app.use(express.json())                                 // JSON转换
app.use(bodyParser.json());                             // 数据JSON类型
app.use(bodyParser.urlencoded({ extended: true }));    // 解析post请求数据
app.use(express.static(__dirname));

app.use(expressJwt({
    secret: "zily",
    algorithms: ["HS256"]
}).unless({
    path: ['/admin/login', "/admin/register"]  //除了这个地址，其他的URL都需要验证
}));

// 中间件
app.use((err, req, res, next) => {
    // 跳过前台接口验证
    if(/^\/web/.test(req.path)){
        return next();
    }
    // Token过期
    if (err.name === "UnauthorizedError") {
        res.status(err.status || 401);
        res.send({
            message: '登录超时，请重新登录',
            errcode: 401,
            time: err.inner.expiredAt
        })
        return
    }
});

registerRouter(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))