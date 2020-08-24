const mongo = require("mongoose")

const CommitSchema = new mongo.Schema({
    articleId: String,
    name: String,
    email: String,
    image: Number,
    time: String,
    commit: String,
    type: { // 类型 1评论 2回复 3深度回复
        type: Number,
        default: 1
    },
    pId: String,
    reply_name: String,
    reply_email: String,
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongo.model('commit', CommitSchema, "commit")