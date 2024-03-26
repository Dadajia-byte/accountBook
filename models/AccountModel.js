const mongoose = require('mongoose');

// 5. 创建文档结构对象
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    }
})

// 6. 创建模型对象
let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;