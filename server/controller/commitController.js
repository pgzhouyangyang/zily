const CommotSchema = require("../model/commit")
const requestFormat = require("../config/requestFormat")
const ObjectId = require('mongodb').ObjectId;
class CommotController {
    async commit(req, res) {
        let data = req.body;
        data.time = new Date().format("YYYY-MM-DD HH:mm:ss");
        let result = await CommotSchema.create(req.body);
        if(result.type == 1) {
            result._doc['child'] = []
        }
        res.send(requestFormat(result))
    }

    async getCommitList(req, res) {
        let id = req.params.id;
        let result = await CommotSchema.find({articleId: id});
        const data = result.reduce((total, item)=> {
            if(item.type == 1) {
                total.unshift(item);
                item._doc['child'] = []
            } else {
                total[total.findIndex(i=> i._id == item.pId)]._doc['child'].push(item)
            }
            return total
        }, [])
        let total = result.length;
        res.send(requestFormat({data, total}))
    }
}

module.exports = new CommotController()