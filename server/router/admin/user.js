const express = require('express');
const router = express.Router();
const multer  = require('multer');

const UserController = require("../../controller/userController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/avatar`)
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
      cb(null, filename)
    }
  })
 var upload = multer({ storage: storage })



// 登录
router.post("/login", UserController.login)
// 注册
router.post("/register", UserController.register)
// 添加用户
router.post("/addUser", upload.single('file'), UserController.addUser)

// 删除用户
router.post("/deleteUser/:id", UserController.deleteUser)

// 启用/禁用
router.post("/updateUserStatus/:id", UserController.updateUserStatus)

// 用户列表
router.get("/user", UserController.getUserList)

// 获取用户
router.get("/user/:id", UserController.getUser)

module.exports = router