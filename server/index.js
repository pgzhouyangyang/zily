const express = require('express')
const mongo = require("./config/mongo")
const registerRouter = require("./router")
const app = express()
const port = 8083
mongo.connect();
registerRouter(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))