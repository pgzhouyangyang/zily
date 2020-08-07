const requestFormat = require("../config/requestFormat")
const mongo = require("mongoose")
const fs = require("fs")
const ArticleSchema = require("../model/article")
// 首页设置
const indexConfigSchema = new mongo.Schema({
    cover: String,
    sysName: String,
    coverBackground: String
})
const indexConfigModel = mongo.model("indexConfig", indexConfigSchema, "indexConfig")


class SettingController {
    async indexConfig(req, res) {
        let data = req.body;
        let item = await indexConfigModel.findOne({});
        const filePath = req.file ? (req.file.path).replace(/\\/g, "\/") : "";
        console.log(filePath)
        if (filePath) {
            try {
                fs.unlinkSync(`./${item.cover}`);
            } catch (error) {

            }
            data.cover = filePath;
        }
        let result = await indexConfigModel.findOneAndUpdate({}, data, {upsert: true});
        res.send(requestFormat(result ? {} : null))
    }
    async getConfig(req, res) {
        let result = await indexConfigModel.findOne()
        res.send(requestFormat(result || {}))
    }
    async getWebConfig(req, res) {
        let result = await indexConfigModel.findOne().select({"_id": 0});
        let top = await ArticleSchema.findOne({isTop: true});
        let data = {
            cover: result.cover,
            coverBackground: result.coverBackground,
            sysName: result.sysName,
            article: top
        }
        res.send(requestFormat(data))
    }
    

}

module.exports = new SettingController();