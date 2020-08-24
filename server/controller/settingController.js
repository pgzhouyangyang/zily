const requestFormat = require("../config/requestFormat")

const fs = require("fs")
const ArticleSchema = require("../model/article")
const indexConfigSchema = require("../model/setting")


class SettingController {
    async indexConfig(req, res) {
        let data = req.body;
        let item = await indexConfigSchema.findOne({});
        const filePath = req.file ? (req.file.path).replace(/\\/g, "\/") : "";
        if (filePath) {
            try {
                fs.unlinkSync(`./${item.cover}`);
            } catch (error) {

            }
            data.cover = filePath;
        }
        let result = await indexConfigSchema.findOneAndUpdate({}, data, {upsert: true});
        res.send(requestFormat(result ? {} : null))
    }
    async getConfig(req, res) {
        let result = await indexConfigSchema.findOne()
        res.send(requestFormat(result || {}))
    }
    async getWebConfig(req, res) {
        let result = await indexConfigSchema.findOne().select({"_id": 0});
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