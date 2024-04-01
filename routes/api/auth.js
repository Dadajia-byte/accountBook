

var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const { SECRET } = require('../../config/config');
// 导入jwt
const jwt = require('jsonwebtoken')

// 登录操作
router.post('/login', (req, res) => {
    let { username, password } = req.body
    UserModel.findOne({ username, password: md5(password) }).then(data => {
        if (data) { // 登录成功
            let token = jwt.sign(
                { // 相关数据
                    username: data.username,
                    _id: data._id
                },
                `${SECRET}`, // 加密
                {  // 有效期
                    expiresIn: 60 * 60 * 24
                })
            res.json({
                code: '2000',
                msg: '登录成功',
                data: token
            })
            res.render('success', { msg: '登录成功', url: '/account' })
        } else {
            // 登录失败
            res.json({
                code: '2002',
                msg: '用户名或密码错误',
                data: null
            })
            res.render('login')
        }
    }).catch(() => {
        res.status(500).send('登录失败')
        res.json({
            code: '2001',
            msg: '数据库读取失败',
            data: null
        })
    })
})

// 退出登录操作
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' })
    })
})


module.exports = router