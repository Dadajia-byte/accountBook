/**
 * 
 * @param {*} sucess 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function (sucess, error) {

    // 判断 error 设置为默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('数据库连接失败');
        }
    }

    // 1. 安装 mongoose
    // 2. 导入 mongoose
    const mongoose = require('mongoose');

    const config = require('../config/config')

    // 3. 连接 mongodb 服务
    mongoose.connect(`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`);

    mongoose.connection.once('open', () => {
        sucess()
    })

    mongoose.connection.on('error', () => {
        error()
    })

    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    })
}