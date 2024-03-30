

var express = require('express');
var router = express.Router();

// 导入shortid
const shortid = require('shortid')

// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

/* 记账本的列表 */
router.get('/account', function (req, res, next) {
    // 获取所有账单信息
    AccountModel.find().sort({ time: -1 }).exec().then(data => {
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data

        })
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '读取失败',
            data: null
        })
    })
});

// 新增记录
router.post('/account', (req, res) => {

    // 插入数据库
    AccountModel.create({
        ...req.body,
        // 修改time属性
        time: moment(req.body.time).toDate()
    }).then(data => {
        res.json({
            code: '0000',
            msg: '新增成功',
            data: data
        })
    }).catch(err => {

        res.json({
            code: '1002',
            msg: '新增失败',
            data: null
        })
    })
})

// 删除记录
router.delete('/account/:id', (req, res) => {
    let id = req.params.id
    AccountModel.deleteOne({ _id: id }).then(data => {
        res.json({
            code: '0000',
            msg: '删除成功',
            data: data
        })
    }).catch(err => {
        res.json({
            code: '1003',
            msg: '删除失败',
            data: null
        })
    })

})

// 获取单个账单信息
router.get('/account/:id', (req, res, next) => {
    let id = req.params.id
    AccountModel.findById(id).then(data => {
        console.log(data);
        res.json({
            code: '0000',
            msg: '获取成功',
            data: data
        })
    }).catch(err => {
        res.json({
            code: '1004',
            msg: '获取失败',
            data: null
        })
    })
})

// 更新单个账单信息
router.patch('/account/:id', (req, res, next) => {
    // 获取 id 参数值
    let { id } = req.params
    AccountModel.updateOne({ _id: id }, req.body).then(data => {
        res.json({
            code: '0000',
            msg: '更新成功',
            data: data // 这里返回的数据不是更新后的数据，可以重新查询替换
        })
    }).catch(err => {
        res.json({
            code: '1005',
            msg: '更新失败',
            data: null
        })
    })
})
module.exports = router;
