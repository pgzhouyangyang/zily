const mongo = require("mongoose")
const ArticleSchema = new mongo.Schema({
    title: {
        type: Number, 
        required: true
    },
    date: String,
    content: {
        type: String, 
        required: true
    },
    readNum: {
        type: Number,
        default: 0
    },
    likeNum: {
        type: Number,
        default: 0
    },
    thumbnailUrl: {
        type: String,
        default: ""
    },
    music: {
        type: String,
        default: ""
    }
})

module.exports = mongo.model("article", ArticleSchema, "article")