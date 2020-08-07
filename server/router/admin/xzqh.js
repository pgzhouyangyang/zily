const express = require('express');
const router = express.Router();

const XzqhController = require("../../controller/xzqhController")

// 获取行政区划
router.get("/getXzqh/:id", XzqhController.getXzqh)

module.exports = router