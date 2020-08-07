const UsreSchema = require("../model/user")
const requestFormat = require("../config/requestFormat")
const jwt = require("jsonwebtoken");
const { json } = require("express");
const ObjectId = require('mongodb').ObjectId;
const fs = require("fs")
class UserController {
    async login(req, res) {
        let data = req.body;
        let result = await UsreSchema.findOne({username: data.username});
        if(result) {
            if(result.status) {
                res.send(requestFormat(null, {
                    message: "该用户已禁用，请联系管理员"
                }))
            } else if(result.password !== data.password) {
                res.send(requestFormat(null, {
                    message: "密码输入错误"
                }))
            } else {
                res.send(requestFormat({
                    username: result.username,
                    avatar: result.avatar,
                    token: jwt.sign({
                        username: result.username,
                        password: result.password
                    }, "zily", {
                        expiresIn: 10 * 60 * 24,  // 24小时过期
                        algorithm: "HS256"
                    })
                }));
            }
        } else {
            res.send(requestFormat(null, {
                message: "用户名不存在"
            }))
        }
    }
    async register(req, res) {
        let data = req.body;
        let item = await UsreSchema.findOne({username: data.username});
        if(item) {
           return  res.send(requestFormat(null, {
                message: "用户名已存在"
            }))
        }
        data.regTime = new Date().format("YYYY-MM-DD HH:mm:ss");
        let db = new UsreSchema(data);
        let result = await db.save();
        res.send(requestFormat(result ? {} : null))
    }

    async addUser(req, res) {
        let data = req.body;
        const filePath = req.file ? (req.file.path).replace(/\\/g,"\/") : "";
        let item = await UsreSchema.findOne({username: data.username});
        let result = null;
        if(filePath) {
            data.avatar = filePath;
            try {
                fs.unlinkSync( `./${item.avatar}`);
            } catch (error) {
                
            }
        }
        data.address = (data.address || []).map(item=> {
            return JSON.parse(item)
        })
        if(data._id) {
            result = await UsreSchema.findByIdAndUpdate(data._id, data)
        } else {
            if(item) {
               return res.send(requestFormat(null, {
                    message: "用户名已存在"
                }))
            }
            data.regTime = new Date().format("YYYY-MM-DD HH:mm:ss");
           
            let db = new UsreSchema(data);
            result = await db.save();
           
        }

        res.send(requestFormat(result ? {} : null))
      
    }
     // 删除用户
     async deleteUser(req, res) {
        let id = req.params.id;
        let result = await UsreSchema.findByIdAndRemove(id);
        // 删除关联附件
        try {
            fs.unlinkSync( `./${result.avatar}`);
        } catch (error) {
            
        }
        res.send(requestFormat(result ? {} : null))
    }

     // 禁用、启用
     async updateUserStatus(req, res) {
        let id = req.params.id;
        let {status} = req.body;
        let result = await UsreSchema.findByIdAndUpdate(id, {status})
        res.send(requestFormat(result ? {} : null))
    }
      // 根据id获取文章
    async getUser(req, res) {
        let id = req.params.id;
        let result = await UsreSchema.findOne({"_id": ObjectId(id)})
        res.send(requestFormat(result))
    }
    async getUserList(req, res) {
        let {pageSize, pageNow} = req.query;
        let totalSize = await UsreSchema.countDocuments();
        let data = await UsreSchema.find({
            username: {"$regex": req.query.username || ""},
            name: {"$regex": req.query.name || ""}
        }).limit(Number(pageSize)).skip((pageNow-1) * Number(pageSize));
        let result = {
            data: data,
            totalSize,
            pageNow,
            pageSize
        }
        res.send(requestFormat(result))
    }
}

module.exports = new UserController()