## 记账本
### 技术栈
本项目提供两个版本：
1. express + ejs + lowdb
2. express + ejs + mongdb&mongoose
### 其他说明
就一简单的练手项目，用于熟悉 node.js 的简单使用<br/>
使用 express 框架进行构建。<br/>
还使用了落后时代的 ejs （悲）。<br/>
版本一，数据以文件的形式存储于 lowdb 中。<br/>
版本二，数据用mongdb存储，校验使用session，请求接口并无保护可以随意发送请求<br/>
版本三，校验使用jwt，同时接口有token保护。
后续可能会对进行升级。
### 更新记录
1. 将lowdb文件存储形式转化为mongdb数据库存储
2. 引入接口api
3. 引入登录、注册，session校验
4. 对接口请求使用token保护，同时修改session校验为jwt校验
