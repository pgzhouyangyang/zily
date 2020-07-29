const express = require('express');
const router = express.Router();

const ArticleController = require("../../controller/articleController")

// 获取文章
router.get("/article", ArticleController.getList)


// 根据id获取文章
router.get("/article/:id", ArticleController.getArticle)

// 保存文章
router.post("/article", ArticleController.saveArticle)

// 删除文章
router.post("/deleteArticle/:id", ArticleController.deleteArticle)
module.exports = router