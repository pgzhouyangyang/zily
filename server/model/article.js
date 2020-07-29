const mongo = require("mongoose")
const ArticleSchema = new mongo.Schema({
    caption: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        default: new Date().format("YYYY-MM-DD HH:mm:ss")
    },
    content: {
        type: String, 
        required: true
    },
    describe: String,
    contentHtml: String,
    words: Number,
    status: Number,
    public: Number,
    readNum: {
        type: Number,
        default: 0
    },
    likeNum: {
        type: Number,
        default: 0
    },
    thumbnail: {
        url: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        }
    },
    music: {
        url: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        }
    },
    author: {
        type: String,
        default: "admin"
    },
    isTop: {
        type: Boolean,
        default: false
    }
})

module.exports = mongo.model("article", ArticleSchema, "article")