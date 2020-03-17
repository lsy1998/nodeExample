//demo
var mysql = require('mysql');
var express = require('express');
var app = express();
// var cors = require('cors');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var querystring = require('querystring');
var moment = require('moment');
const pathLib = require('path')
app.use(bodyParser.json());
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

app.get('/hello', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();

    var addUser = 'INSERT INTO user(userCount,userPassword,userImg,userName,userGender,userType,userDate) VALUES(?,?,?,?,?,?,?)';//sql语句
      var addSqlParams = [req.query.userCount, req.query.userPassword, '1', 0, 0, 0, moment().format('YYYY-MM-DD HH:mm:ss')];
      console.log(moment().format('YYYY-MM-DD HH:mm:ss')); 
    connection.query(addUser, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            // res.send(err)
            return ;
        } else {
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.send({
                "code":200,
                "userId":result.insertId,
                "msg":"注册成功"
            });
        }

    });
    // var selectUser = 'SELECT * FROM user where userId=12';
    // connection.query(selectUser, function (err, result) {
    //     if (err) {
    //         console.log('[SELECT ERROR] - ', err.message);
    //         return;
    //     }

    //     console.log('--------------------------SELECT----------------------------');
    //     console.log("时间", result);
    //     console.log('------------------------------------------------------------\n\n');
    // });

    connection.end();
//   res.json({code:200})
});

app.post('/login', function (req, res) {
    // console.log(req.body);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();

    var selectSQL = "select userId from user where userCount = '"+req.body.userCount+"' and userPassword = '"+req.body.userPassword+"'";
    console.log('用户名'+req.body.userCount);
    console.log('密码：'+req.body.userPassword);
    //var selectSQL = "select password from user where account='"+req.query.account+"'";
    var  addSqlParams = [req.query.account,req.query.password];
       connection.query(selectSQL,function (err, result) {
         if(err){
          console.log('[login ERROR] - ',err.message);
          return;
         }
         //console.log(result);
         if(result=='')
         {
             console.log("帐号密码错误");
             res.end("0");//如果登录失败就给客户端返回0，
         }
         else
         {
             console.log("登录成功");
             res.send({
                 code:200,
                 userId:result[0].userId,
                 msg:'登录成功'
             });//如果登录成就给客户端返回1
         }
        });
         connection.end();
//   res.json({code:200})
});

app.post('/addUser', function (req, res) {
    // console.log(req.body);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();

    var addUser = 'INSERT INTO user(userCount,userPassword,userImg,userName,userGender,userType,userDate) VALUES(?,?,?,?,?,?,?)';//sql语句
      var addSqlParams = [req.body.userCount, req.body.userPassword, '1', 0, 0, 0, moment().format('YYYY-MM-DD HH:mm:ss')];
      console.log(moment().format('YYYY-MM-DD HH:mm:ss')); 
    connection.query(addUser, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            // res.send(err)
            return ;
        } else {
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.send({
                "code":200,
                "userId":result.insertId,
                "msg":"注册成功"
            });
        }

    });
    var selectUser = 'SELECT * FROM user where userId=12';
    connection.query(selectUser, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log("时间", result);
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
});

app.post('/addUserInfo', function (req, res) {
    // console.log(req.body);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();

    // var addUser = 'INSERT INTO user(userSchool,userJob,userCompany,userPage,userSex) VALUES(?,?,?,?,?) where userId = '+req.body.userId;//sql语句
    var addUser = 'UPDATE user SET userSchool=\''+req.body.userSchool+'\',userJob=\''+req.body.userJob+'\',userCompany=\''+req.body.userCompany+'\',userPage=\''+req.body.userPage+'\',userGender=\''+req.body.userGender+'\' WHERE userId='+req.body.userId;//sql语句
    console.log(addUser)
    //   var addSqlParams = [req.body.userSchool,req.body.Job, req.body.userCompany, req.body.userPage,req.body.userSex];
    //   console.log(moment().format('YYYY-MM-DD HH:mm:ss')); 
    connection.query(addUser, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            // res.send(err)
            return ;
        } else {
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.send({
                "code":200,
                "userId":result.insertId,
                "msg":"修改个人信息成功"
            });
        }

    });

    connection.end();
});

const server = app.listen(8082, function () {
  console.log('Express app server listening on port %d', server.address().port);
});
