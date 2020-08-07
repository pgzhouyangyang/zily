const express = require('express');
const router = express.Router();
const multer  = require('multer');
const SettingController = require("../../controller/settingController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/cover`)
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
      cb(null, filename)
    }
  })
 var upload = multer({ storage: storage })

// 首页设置
router.post("/indexConfig", upload.single('file'), SettingController.indexConfig)

// 获取首页设置
router.get("/indexConfig", SettingController.getConfig)

module.exports = router