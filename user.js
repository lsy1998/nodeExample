var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var querystring = require('querystring');
var moment = require('moment');
const pathLib = require('path')
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(express.static('public'));
app.use(multer({ dest: '/tmp/' }).array('image'));
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/page/" + "index.html");
})


// app.all("*",function(req,res,next){
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin","*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers","content-type");
//     //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//     // if (req.method.toLowerCase() == 'options')
//     //     res.send(200);  //让options尝试请求快速结束
//     // else
//     //     next();
// })

/**
 * @description 添加用户（注册）  
 */
app.post('/addUser', function (req, res) {
    /**
     * @description 数据库连接配置
     */
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


    // console.log(req.files[0]);  // 上传的文件信息
    // var dataObject = querystring.parse(req.body);
    // var des_file = __dirname + "\\" + req.files[0].originalname;
    // // var newPath = "C:\\Users\\hasee\\Desktop\\headPic\\" + Date.now() + ".jpg";

    // fs.rename(req.files[0].path, newPath, function(err){
    //     if(err){
    //         res.send(err);
    //         console.log('头像文件重命名失败',err);
    //     }else{
    //         res.send('成功');
    //         console.log('头像文件重命名成功');

    //         /**
    //          * @description 连接数据库
    //          */
    //         connection.connect();
    //         var addSql = 'INSERT INTO user(userName,password,headPicture,userId,userCount,userGender,userType,createDate) VALUES(?,?,?)';//sql语句
    //         var addSqlParams = [req.body.userName, req.body.password,newPat,'1',0,0,0,0,Date.now()];

    //         connection.query(addSql, addSqlParams, function (err, result) {
    //             if (err) {
    //                 console.log('[INSERT ERROR] - ', err.message);
    //                 return;
    //             }
    //             console.log('--------------------------INSERT----------------------------');       
    //             console.log('INSERT ID:', result);
    //             console.log('-----------------------------------------------------------------\n\n');
    //         });

    //         connection.end();
    //     }
    // })
    response = {
        first_name:req.body.userCount,
        last_name:req.body.userPassword
    };
    console.log(response);
    res.end(JSON.stringify(response));

})


var server = app.listen(9999, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})