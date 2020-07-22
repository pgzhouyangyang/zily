const express = require('express');
const router = express.Router();

// // 文章
const ArticleController = require("../../controller/articleController")

// // 获取文章
router.get("/user", ArticleController.getList)


module.exports = router