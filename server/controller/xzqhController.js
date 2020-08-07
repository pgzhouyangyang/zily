const requestFormat = require("../config/requestFormat")
const mongo = require("mongoose")
const xzqhSchema = new mongo.Schema({
    code: Number,
    name: String
})
const xzqhModel = mongo.model("xzqh", xzqhSchema, "xzqh")
class XzqhController {
    async getXzqh(req, res) {
        let code = req.params.id;
        let result = await xzqhModel.find({
            pcode: code || 0
        })
        res.send(requestFormat(result))
    }   

}

module.exports = new XzqhController();