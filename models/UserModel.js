const mongoose = require('mongoose');

// 5. 创建文档结构对象
let UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

// 6. 创建模型对象
let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;