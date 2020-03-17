var mysql = require('mysql');
var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var querystring = require('querystring');
var moment = require('moment');
const pathLib = require('path')
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(express.static('public'));
app.use(cors());
app.use(multer({ dest: '/tmp/' }).array('image'));
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/page/" + "index.html");
})

app.all('/addUser', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
   res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   res.end(JSON.stringify({
       data: 'hello world!'
   }))
   });

// app.post('/addUser', urlencodedParser, function (req, res) {
//    res.header("Access-Control-Allow-Origin","*");
//    var connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: '123456',
//       port: '3306',
//       database: 'graduationproject'
//   });
//   connection.connect();

//   var addUser = 'INSERT INTO user(userCount,userPassword,userImg,userName,userGender,userType,userDate) VALUES(?,?,?,?,?,?,?)';//sql语句
//   var addSqlParams = [req.body.userCount, req.body.userPassword, '1', 0, 0, 0, moment().format('YYYY-MM-DD HH:mm:ss')];
//   console.log(moment().format('YYYY-MM-DD HH:mm:ss')); 
//   connection.query(addUser, addSqlParams, function (err, result) {
//       if (err) {
//           console.log('[INSERT ERROR] - ', err.message);
//           // res.send(err)
//           return ;
//       } else {
//           console.log('--------------------------INSERT----------------------------');
//           console.log('INSERT ID:', result);
//           console.log('-----------------------------------------------------------------\n\n');
//           res.send({
//               "code":200,
//               "userId":result.insertId,
//               "msg":"注册成功"
//           });
//       }

//   });
//   var selectUser = 'SELECT * FROM user where userId=12';
//   connection.query(selectUser, function (err, result) {
//       if (err) {
//           console.log('[SELECT ERROR] - ', err.message);
//           return;
//       }

//       console.log('--------------------------SELECT----------------------------');
//       console.log("时间", result);
//       console.log('------------------------------------------------------------\n\n');
//   });

//   connection.end();
   // 输出 JSON 格式
//    response = {
//        first_name:req.body.first_name,
//        last_name:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
