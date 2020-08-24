const express = require('express');
const router = express.Router();
const indexController = require("../../controller/indexInfoController")

// 首页信息
router.get("/indexInfo", indexController.getInfo)

module.exports = router