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


app.post('/uploadHeadPic', multipartyMiddleware, function (req, res) {
    // console.log(req.body);

    // console.log(req.files)
    // console.log(req.files[0]);  // 上传的文件信息
    // var dataObject = querystring.parse(req.body);
    // var des_file = __dirname + "\\" + req.files[0].originalname;
    var newPath =''+ Date.now() + path.extname(req.files.files.path);
    var truePath = "C:\\Users\\hasee\\Desktop\\headPic\\" + newPath;
    fs.rename(req.files.files.path, truePath, function(err){
        if(err){
            res.send({
                code:res.statusCode,
                msg:'上传失败'
            });        
            console.log('头像文件重命名失败',err);
        }else{
            console.log('头像文件重命名成功');

            /**
             * @description 连接数据库
             */
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'graduationproject'
            });
            connection.connect();

            console.log(newPath);

            var addSql = 'update user set userImg = \'http://localhost:8082/headPic/'+newPath+'\' where userId = '+req.body.userId;//sql语句

            connection.query(addSql, function (err, result) {
                if (err) {
                    console.log('更新数据库失败：- ', err.message);
                    return;
                }
                console.log('--------------------------上传头像----------------------------');       
                console.log( result);
                console.log('-----------------------------------------------------------------\n\n');

            });

            console.log('url'+newPath.split('C:\\\\Users\\\\hasee\\\\Desktop\\\\headPic\\\\'));
            res.send({
                code:res.statusCode,
                msg:'上传成功',
                headPicUrl:'http:\/\/localhost:8082\/headPic\/'+newPath
            }); 
            connection.end();
        }
    })
});
/**
 * @description 上传md文件图片
 */
app.post('/uploadMDPic', multipartyMiddleware, function (req, res) {
    console.log(req.files);
    var newPath =''+ Date.now() + path.extname(req.files.files.path);
    var truePath = "C:\\Users\\hasee\\Desktop\\MDPic\\" + newPath;
    fs.rename(req.files.files.path, truePath, function(err){
        if(err){
            res.send({
                code:res.statusCode,
                msg:'上传失败'
            });        
            console.log('MD文件重命名失败',err);
        }else{
            console.log('MD文件重命名成功');

            /**
             * @description 连接数据库
             */
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'graduationproject'
            });
            connection.connect();

            console.log(newPath);
            var addSql = 'INSERT INTO postimg(postImgDate,postImgPath,userId) VALUES(?,?,?)';//sql语句
            var addSqlParams = [moment().format('YYYY-MM-DD HH:mm:ss'), 'http://localhost:8082/MDPic/' + newPath, req.body.userId];
            // var addSql = 'insert postimg postImgId postImgDate postImgPath postId userId  userId set userImg = \'http://localhost:8082/MDPic/'+newPath+'\' where userId = '+req.body.userId;//sql语句

            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('上传md图片失败：- ', err.message);
                    return;
                }
                console.log('--------------------------上传md图片----------------------------');       
                console.log( result);
                console.log('-----------------------------------------------------------------\n\n');

            });

            console.log('url'+newPath.split('C:\\\\Users\\\\hasee\\\\Desktop\\\\MDPic\\\\'));
            res.send({
                code:res.statusCode,
                msg:'上传成功',
                MDPicUrl:'http:\/\/localhost:8082\/MDPic\/'+newPath
            }); 
            connection.end();
        }
    })
});

/**
 * @description 获取帖子
 */
app.post('/getPost', multipartyMiddleware, function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();
   var addSql = 'select * from post where userId = '+req.body.userId;
   connection.query(addSql, function (err, result) {
    if (err) {
        console.log('获取帖子失败：- ', err.message);
        res.send({
            code:res.statusCode,
            msg:'获取帖子失败',
            // postId:result.insertId
        }); 
        return;
    }
    console.log('--------------------------获取帖子----------------------------');       
    console.log( result);
    console.log('-----------------------------------------------------------------\n\n');

    res.send({
        code:res.statusCode,
        msg:'获取成功',
        post:result
    }); 
});

connection.end();
});
/**
 * @description 上传帖子
 */
app.post('/uploadPost', multipartyMiddleware, function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();
   var addSql = 'insert into post(postValue,postDate,userId,postTitle) VALUES(?,?,?,?)';//sql语句
   var addSqlParams = [req.body.postValue, moment().format('YYYY-MM-DD HH:mm:ss'), req.body.userId, req.body.postTitle];
   connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
        console.log('上传post失败：- ', err.message);
        res.send({
            code:res.statusCode,
            msg:'上传失败',
            // postId:result.insertId
        }); 
        return;
    }
    console.log('--------------------------上传post----------------------------');       
    console.log( result);
    console.log('-----------------------------------------------------------------\n\n');

    res.send({
        code:res.statusCode,
        msg:'上传成功',
        postId:result.insertId
    }); 
});

connection.end();
});
/**
 * @description 获取头像
 */
app.get('/headPic/*', function (req, res) {
    console.log(__dirname);
    console.log(req.url);
    res.sendFile("C:\\Users\\hasee\\Desktop" + "/" + req.url );
    console.log("Request for " + req.url + " received.");
})
/**
 * @description 获取MD头像
 */
app.get('/MDPic/*', function (req, res) {
    console.log(__dirname);
    console.log(req.url);
    res.sendFile("C:\\Users\\hasee\\Desktop" + "/" + req.url );
    console.log("Request for " + req.url + " received.");
})
/**
 * @description 获取用户信息
 */
app.post('/getUserInfo', function (req, res) {
    // console.log(req.body);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'graduationproject'
    });
    connection.connect();

    var addUser = 'select userCount, userName, userId, userImg, userGender, userSchool, userCompany, userJob, userLevel, userDate, userPage from user WHERE userId='+req.body.userId;//sql语句
    console.log(addUser)
    connection.query(addUser, function (err, result) {
        if (err) {
            console.log('[获取用户信息] - ', err.message);
            res.send({
                "code":res.statusCode,
                "userId":result.insertId,
                "msg":"获取个人信息失败"
            });
            return ;
        } else {
            console.log('--------------------------获取用户信息----------------------------');
            console.log('[获取用户信息]:', result);
            console.log('-----------------------------------------------------------------\n\n');
            res.send({
                "code":res.statusCode,
                "userInfo":result,
                "msg":"获取个人信息成功"
            });
        }

    });

    connection.end();
});
const server = app.listen(8082, function () {
  console.log('Express app server listening on port %d', server.address().port);
});
