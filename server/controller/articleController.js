const ArticleSchema = require("../model/article")
const requestFormat = require("../config/requestFormat")
const ObjectId = require('mongodb').ObjectId;
const fs = require("fs")
class ArticleController {
    // 获取文章列表
    async getList(req, res) {

        let query = {
            caption: { "$regex": req.query.caption || "" },
            author: { "$regex": req.query.author || "" }
        };
        for (const key in req.query) {
            let value = req.query[key];
            if (!value || value == "null" || value == "undefined") {
                delete req.query[key]
            }
        }

        let { pageSize, pageNow } = req.query;
        let totalSize = await ArticleSchema.countDocuments();
        if (req.baseUrl == "/web") {
            query.status = 1;
            query.isTop = false;
        }
        if (req.query.startDate && req.query.endDate) {
            query.date = { "$gte": req.query.startDate + " 00:00:00", "$lte": req.query.endDate + " 23:59:59" }
        } else {
            if (req.query.startDate) {
                query.date = { "$gte": req.query.startDate + " 00:00:00" }
            }
            if (req.query.endDate) {
                query.date = { "$lte": req.query.endDate + " 23:59:59" }
            }
        }
        let data = await ArticleSchema.find(query).limit(Number(pageSize)).skip((pageNow - 1) * Number(pageSize)).sort("-date");
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
        let result = null;
       
        if (req.baseUrl == "/web") {
            result = await ArticleSchema.findByIdAndUpdate(id, {
                $inc: { 'readNum': 1 }
            })
        }
        result = await ArticleSchema.findOne({"_id": ObjectId(id)})
        res.send(requestFormat(result))
    }
    // 保存/修改文章
    async saveArticle(req, res) {
        let data = req.body;
        let result = null;

        if (data.isTop) {
            ArticleSchema.update({ isTop: true }, { isTop: false }, { multi: true }).then(res => {
            });
        }

        if (data._id) {
            result = await ArticleSchema.findByIdAndUpdate(data._id, data)
        } else {
            data.date = new Date().format("YYYY-MM-DD HH:mm:ss")
            data.author = req.user.username;
            let db = new ArticleSchema(data);
            result = await db.save()
        }



        res.send(requestFormat(result ? {} : null))
    }

    // 删除文章
    async deleteArticle(req, res) {
        let id = req.params.id;

        let ids = id.split(",").map(id => ObjectId(id))
      
        let queryList = await ArticleSchema.find({ "_id": { "$in": ids } });
        let result = await ArticleSchema.deleteMany({"_id": {"$in": ids}});
        queryList.forEach(item => {
            // 删除关联附件
            try {
                fs.unlinkSync(`./${item.thumbnail.url}`);
                fs.unlinkSync(`./${item.music.url}`);
            } catch (error) {

            }
        })


        res.send(requestFormat(result ? {} : null))
    }


    // 更新发布状态
    async updateStatus(req, res) {
        let id = req.params.id;
        let { status } = req.body;
        let result = await ArticleSchema.findByIdAndUpdate(id, { status })
        res.send(requestFormat(result ? {} : null))
    }

    // like
    async like(req, res) {
        let id = req.params.id;
        let result = await ArticleSchema.findByIdAndUpdate(id, {  $inc: { 'likeNum': 1 } })
        res.send(requestFormat(result ? {} : null))
    }

    // read
    async read(req, res) {
        let id = req.params.id;
        let result = await ArticleSchema.findByIdAndUpdate(id, {  $inc: { 'readNum': 1 } })
        res.send(requestFormat(result ? {} : null))
    }

}
module.exports = new ArticleController();