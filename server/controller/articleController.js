const ArticleSchema = require("../model/article")
const requestFormat = require("../config/requestFormat")
const ObjectId = require('mongodb').ObjectId;
class ArticleController {
    // 获取文章列表
    async getList(req, res) {
        let {pageSize, pageNow} = req.query;
        let totalSize = await ArticleSchema.count();
        let query = req.query
        let data = await ArticleSchema.find({
            // caption: {"$regex": query.caption},
            // author: {"$regex": query.author},
            // date: {"$gte": query.startDate, "$lte": query.endDate},
           
        }).limit(Number(pageSize)).skip((pageNow-1) * Number(pageSize));
        let result = {
            data: data,
            totalSize,
            pageNow,
            pageSize
        }
        res.send(requestFormat(result))
    }
    // 根据id获取文章
    async getArticle(req, res) {
        let id = req.params.id;
        let result = await ArticleSchema.findOne({"_id": ObjectId(id)})
        res.send(requestFormat(result))
    }
    // 保存/修改文章
    async saveArticle(req, res) {
        let data = req.body;
        let result = null
        if(data._id) {
            result = await ArticleSchema.findByIdAndUpdate(data._id, data)
        } else {
            data.date = new Date().format("YYYY-MM-DD HH:mm:ss")
            let db = new ArticleSchema(data);
            result = await db.save()
        }
      
        res.send(requestFormat(result ? {} : null))
    }

     // 删除文章
     async deleteArticle(req, res) {
        let id = req.params.id;
        let result = await ArticleSchema.findByIdAndRemove(id)
        res.send(requestFormat(result ? {} : null))
    }
}
module.exports = new ArticleController();