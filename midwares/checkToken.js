const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
// 声明token中间件
module.exports = (req, res, next) => {
    // 获取token
    let token = req.get('token');
    // 获取所有账单信息
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        })
    }
    // 注意这个函数似乎不支持promise的链式调用
    jwt.verify(token, `${SECRET}`, (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token 错误',
                data: null
            })
        }
        req.user = data
        next()
    })
}
