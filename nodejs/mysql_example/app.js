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
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ghdwo966',
  database : 'o2'
});
conn.connect(function(err){
  if (err) throw err;
});



// var sql = 'select * from student';
// conn.query(sql, function(err, rows, fields){
//   if (err) throw err;
//   else{
//     for(var i=0;i<rows.length;i++){
//       console.log(rows[i].name);
//     }
//   }
// })

// var sql = 'insert into student values(201354243,"LEE YONGJAE",4)';
// conn.query(sql,function(err,rows,fields){
//   if(err)
//     console.log(err);
//   else{
//     console.log(rows.insertId);
//   }
// })

// var sql = 'insert into student values(?,?,?)';
// var params = [201224322,'PARK SENGHYUN',2];
// conn.query(sql,params,function(err,rows,fields){
//   if(err)
//     console.log(err);
//   else{
//     console.log(rows);
//     console.log(rows.insertId);
//   }
// })
var sql = 'update student set name=?, class=? where id=?';
var params = ['SUPERHONGJAE',99,201221027];
conn.query(sql,params,function(err,rows,fields){
  if(err)
    console.log(err);
  else{
    console.log(rows);
  }
})


conn.end();

//get & post-----------------------------------
// conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// conn.end();
//
// //server-----------------------------------
// app.listen(3000, function(){
//   console.log('Connected to 3000 port!');
// })
