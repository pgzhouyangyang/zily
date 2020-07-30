const ArticleSchema = require("../model/article")
const requestFormat = require("../config/requestFormat")
const ObjectId = require('mongodb').ObjectId;
class ArticleController {
    // 获取文章列表
    async getList(req, res) {

        let query = {
            caption: {"$regex": req.query.caption || ""},
            author: {"$regex": req.query.author || ""}
        };
        for (const key in req.query) {
            let value = req.query[key];
            if(!value || value == "null" ||value == "undefined") {
                delete req.query[key]
            }
        }

        let {pageSize, pageNow} = req.query;
        let totalSize = await ArticleSchema.countDocuments();
        if(req.baseUrl == "/web") {
            query.status = 1
        }
        if(req.query.startDate && req.query.endDate) {
            query.date = {"$gte": req.query.startDate, "$lte": req.query.endDate}
        } else {
            if(req.query.startDate) {
                query.date = {"$gte": req.query.startDate}
            }
            if(req.query.endDate) {
                query.date = {"$lte": req.query.endDate}
            }
        }
        console.log(query)
        let data = await ArticleSchema.find(query).limit(Number(pageSize)).skip((pageNow-1) * Number(pageSize));
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