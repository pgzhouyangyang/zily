const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/";
const dbName = "zily";
module.exports = {
    connect() {
        mongoose.connect(url + dbName,{  
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        mongoose.connection.on('connected', () => {
            console.log('数据库连接成功');
        });
        mongoose.connection.on('disconnected', (err) => {
            console.log(err)
        });
        mongoose.connection.on('error', (err) => {
            console.log(err)
        })
    }
}

