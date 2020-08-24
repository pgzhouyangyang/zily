
const mongo = require("mongoose")

// 首页配置
const indexConfigSchema = new mongo.Schema({
    cover: String,
    sysName: String,
    coverBackground: String
})
module.exports = mongo.model("indexConfig", indexConfigSchema, "indexConfig")