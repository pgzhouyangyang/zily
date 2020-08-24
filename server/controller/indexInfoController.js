const requestFormat = require("../config/requestFormat")
const mongo = require("mongoose")

const ArticleSchema = require("../model/article")
const UsreSchema = require("../model/user")

class IndexInfoController {
    async getInfo(req, res) {
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        let [aCount, uCount, aAdd, uAdd] = await Promise.all([
            ArticleSchema.countDocuments(),
            UsreSchema.countDocuments(),
            ArticleSchema.find({date: {"$gte": start.format("YYYY-MM-DD HH:mm:ss"), "$lte": end.format("YYYY-MM-DD HH:mm:ss")}}),
            UsreSchema.find({regTime: {"$gte": start.format("YYYY-MM-DD HH:mm:ss"), "$lte": end.format("YYYY-MM-DD HH:mm:ss")}})
        ])
        let result = {
            aCount,
            uCount,
            aAdd: aAdd.length,
            uAdd: uAdd.length
        }
        res.send(requestFormat(result))
    }   

}

module.exports = new IndexInfoController();