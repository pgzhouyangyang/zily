const mongo = require("mongoose")
const User = new mongo.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regTime: String,
    sex: String,
    email: String,
    birthday: String,
    address: Array,
    address1: String,
    introduction: String,
    avatar: String,
    name: String,
    phone: String,
    age: String,
    status: {
        type: Number,
        default: 0
    }
})

module.exports = mongo.model("user", User, "user")