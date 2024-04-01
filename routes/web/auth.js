

var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
// 注册页面
router.get('/reg', (req, res) => {
    res.render('reg')
})

// 注册用户
router.post('/reg', (req, res) => {
    // 获取请求体数据
    // 表达验证
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then(data => {
        res.render('success', { msg: '注册成功', url: '/login' })
    }).catch(err => {
        res.status(500).send('注册失败')
    })
})

// 登录页面
router.get('/login', (req, res) => {
    res.render('login')
})

// 登录操作
router.post('/login', (req, res) => {
    let { username, password } = req.body
    UserModel.findOne({ username, password: md5(password) }).then(data => {
        if (data) { // 登录成功
            // 写入session
            req.session.username = data.username;
            req.session._id = data._id;
            res.render('success', { msg: '登录成功', url: '/account' })
        } else {
            // 登录失败
            alert('账号或密码错误')
            res.render('login')
        }
    }).catch(() => {
        res.status(500).send('登录失败')
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