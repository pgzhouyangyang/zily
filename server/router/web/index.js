const express = require('express');
const router = express.Router();

// // 文章
const ArticleController = require("../../controller/articleController")

// // 获取文章
router.get("/article", ArticleController.getList)

router.get("/article/:id", ArticleController.getArticle)

module.exports = router