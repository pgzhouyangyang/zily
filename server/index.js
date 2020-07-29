const express = require('express')
const mongo = require("./config/mongo")
const bodyParser = require('body-parser')
const registerRouter = require("./router")
require("./config/common")
const app = express()
const port = 8083
mongo.connect();
app.use(express.static(__dirname));
app.use(express.json())                                 // JSON转换
app.use(bodyParser.json());                             // 数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));    // 解析post请求数据
registerRouter(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))