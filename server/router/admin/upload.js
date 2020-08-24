const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const ArticleSchema = require("../../model/article")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const name = file.mimetype.includes('image') ? 'images' : 'music';
    cb(null, `./uploads/${name}`)
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
    cb(null, filename)
  }
})

var upload = multer({ storage: storage })
// 上传文件
router.post("/upload", upload.single('file'), (req, res) => {
  const filePath = (req.file.path).replace(/\\/g, "\/");
  res.json({
    status: 100,
    msg: '上传成功',
    url: `/${filePath}`
  });
})
// 删除文件
router.post("/deleteFile", async (req, res) => {
  let url = req.body.url;
  const localFile = `./${url}`;
  fs.unlink(localFile, ()=>null);

  try {
      // 删除文章关联url
      let article = await ArticleSchema.findOne({
        "$or": [{ "thumbnail.url": url }, { "thumbnail.url": url }]
      })
      let prop = article.thumbnail.url == url ? "thumbnail" : "music";
      await ArticleSchema.findByIdAndUpdate(article._id, { [prop]: {} })
  } catch (error) {
    
  }

  res.json({
    status: 100,
    msg: '删除成功'
  });

})
module.exports = router