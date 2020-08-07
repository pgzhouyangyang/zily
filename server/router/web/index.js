const express = require('express');
const router = express.Router();

// // 文章
const ArticleController = require("../../controller/articleController")

// // 获取文章
router.get("/article", ArticleController.getList)

router.get("/article/:id", ArticleController.getArticle)

// like
router.post("/article_like/:id", ArticleController.like)
// read
router.post("/article_read/:id", ArticleController.like)

const SettingController = require("../../controller/settingController")
// 获取首页设置
router.get("/indexConfig", SettingController.getWebConfig)



module.exports = router