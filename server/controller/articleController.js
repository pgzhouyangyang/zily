const ArticleSchema = require("../model/article")
const requestFormat = require("../config/requestFormat")
const ObjectId = require('mongodb').ObjectId;
class ArticleController {
    async getList(req, res) {
        let {pageSize, pageNow} = req.query;
        let totalSize = await ArticleSchema.count();
        let data = await ArticleSchema.find({}).limit(Number(pageSize)).skip((pageNow-1) * Number(pageSize));
        let result = {
            data: data,
            totalSize,
            pageNow,
            pageSize
        }
        res.send(requestFormat(result))
    }

    async getArticle(req, res) {
        let id = req.params.id;
        
        let result = await ArticleSchema.findOne({"_id": ObjectId(id)})
        console.log(result)
        res.send(requestFormat(result))
    }
}
module.exports = new ArticleController();