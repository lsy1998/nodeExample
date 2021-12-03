const express = require("express");
const mysql = require("mysql");
// Constants
const PORT = 8081;
const HOST = "127.0.0.1";

// App
const app = express();

// create connections pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "eform_deploy_helper",
});

connection.connect();

app.get("/api", (req, res) => {
  let data = { code: 200 };
  connection.query("select * from test", function (err, row) {
    if (err) {
      console.log("query error!");
    } else {
      console.log(row);
      console.log(data)
      return data.result=row
    }
  });
  res.send(data);
});
app.get("/api/test", (req, res) => {
  res.send("Hello World api/test");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
