// var http = require('http');
// http.createServer(function (request, response) {

// 	// 发送 HTTP 头部 
// 	// HTTP 状态值: 200 : OK
// 	// 内容类型: text/plain
// 	response.writeHead(200, {'Content-Type': 'text/plain'});

// 	// 发送响应数据 "Hello World"
// 	response.end('Hello World\n');
// }).listen(8880);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8880/');



// var fs = require("fs");
// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
// console.log("程序执行结束!");



// // 引入 events 模块
// var events = require('events');

// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。');
  
//    // 触发 data_received 事件 
//    eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
 
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456',
//   database : 'company'
// });
 
// connection.connect();
 
// connection.query('SELECT ALL FROM message', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });







// var mysql  = require('mysql');  
 
// var connection = mysql.createConnection({     
//   host     : 'localhost',       
//   user     : 'root',              
//   password : '123456',       
//   port: '3306',                   
//   database: 'company' 
// }); 
 
// connection.connect();
 
// var  sql = 'SELECT * FROM message';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });
 
// connection.end();
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8887);
  console.log("Server has started.");
}

exports.start = start;
