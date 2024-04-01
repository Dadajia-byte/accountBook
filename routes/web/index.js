

var express = require('express');
var router = express.Router();

// 导入shortid
const shortid = require('shortid')

// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
// 导入检测登录中间件
const checkLogin = require('../../midwares/checkLogin')

// 添加首页路由规则
router.get('/', (req, res) => {
  res.redirect('/account')
})

/* 记账本的列表 */
router.get('/account', checkLogin, function (req, res, next) {
  // 获取所有账单信息
  AccountModel.find().sort({ time: -1 }).exec().then(data => {
    res.render('list', { accounts: data, moment: moment });
  }).catch(err => {
    res.status(500).send('获取失败')
  })
});


// 访问添加记录
router.get('/account/create', checkLogin, function (req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', checkLogin, (req, res) => {

  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性
    time: moment(req.body.time).toDate()
  }).then(() => {
    res.render('success', { msg: '添加成功哦~', url: '/account' })
  }).catch(err => {
    res.status(500).send('插入失败')
  })
})

// 删除记录
router.get('/account/:id', checkLogin, (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }).then(() => {
    res.render('success', { msg: '删除成功哦~', url: '/account' })
  }).catch(err => {
    res.status(500).send('删除失败')
  })

})

module.exports = router;
