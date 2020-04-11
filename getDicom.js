var mysql = require('mysql');
var express = require('express');
var app = express();
// var cors = require('cors');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var querystring = require('querystring');
var moment = require('moment');
const path = require('path')
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const cors = require('koa2-cors');
//  app.use(cors());
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: true })
// const app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/getDicomList',function(req, res){
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'graduationproject'
})
connection.connect();
var sql = 'select * from dicompic'
connection.query(sql,function(err,result){
    if(err){
        console.log(err)
        // res.send(err)
    }else{
        // console.log({
        //     "code":res.statusCode,
        //     "userInfo":result
        //     // "msg":"获取个人信息成功"
        // })

        res.send({
            "code":res.statusCode,
            "dicomList":result
            // "msg":"获取个人信息成功"
        })
    }
})
})

const server = app.listen(8082, function () {
    console.log('Express app server listening on port %d', server.address().port);
  });