// //setting-----------------------------------
// const express = require('express');
// const app = express();
// const fs = require('fs');
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// app.use(express.static('public')); //static파일 디렉토리
//
// app.set('views','./views'); //templete파일 디렉토리
// app.set('view engine','pug'); //어떤 templete엔진?
//
// app.locals.pretty = true; //html소스 이쁘게
// //nodejs-mysql
const mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ghdwo966',
  database : 'o2'
});
connection.connect();

//get & post-----------------------------------
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
//
// //server-----------------------------------
// app.listen(3000, function(){
//   console.log('Connected to 3000 port!');
// })
