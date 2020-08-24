const express = require('express');
const router = express.Router();

// 文章
const ArticleController = require("../../controller/articleController")

// // 获取文章
router.get("/article", ArticleController.getList)

router.get("/article/:id", ArticleController.getArticle)

// like
router.post("/article_like/:id", ArticleController.like)
// read
router.post("/article_read/:id", ArticleController.like)


// 设置
const SettingController = require("../../controller/settingController")
// 获取首页设置
router.get("/indexConfig", SettingController.getWebConfig)


// 评论
const CommitController = require("../../controller/commitController")
router.post("/commit", CommitController.commit)
router.get("/commit/:id", CommitController.getCommitList)

module.exports = router