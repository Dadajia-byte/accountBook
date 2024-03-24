

var express = require('express');
var router = express.Router();

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)

// 导入shortid
const shortid = require('shortid')

/* 记账本的列表 */
router.get('/account', function (req, res, next) {
  // 获取所有账单信息
  let account = db.get('accounts').value();
  res.render('list', { accounts: account });
});

// 添加记录
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', (req, res) => {
  // 获取请求体的数据
  console.log(req.body);
  let id = shortid.generate()
  db.get('accounts').push({ id, ...req.body }).write()
  res.render('success', { msg: '添加成功哦~', url: '/account' })
})

// 删除记录
router.get('/account/:id', (req, res) => {
  let id = req.params.id
  db.get('accounts').remove({ id: id }).write()
  res.render('success', { msg: '删除成功哦~', url: '/account' })
})

module.exports = router;
