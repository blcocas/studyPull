//setting-----------------------------------
const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

app.locals.pretty = true; //html소스 이쁘게

//mysql----------------------------------
const mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ghdwo966',
  database : 'webapp'
});
conn.connect(function(err){
  if (err) throw err;
});

//get & post-----------------------------------


app.get('/topic/add',function(req,res){
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,rows,fields){
    if(err) throw err;
    res.render('add',{list : rows});
  })
})

app.get(['/topic','/topic/:id'],function(req,res){

  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,rows1,fields){
    var id = req.params.id;
    if(err) throw err;

    if(id){
      var sql = 'SELECT * FROM topic where id=?';
      conn.query(sql,id,function(err,rows2,fields){
        if(err) throw err;
        res.render('topic',{list : rows1, topic:rows2[0], topic:rows2[0]});
      })
    }
    else
      res.render('topic',{list : rows1});
    })
  })


app.post('/topic/add',function(req,res){
  var title = req.body.title;
  var desc = req.body.desc;
  var sql = 'INSERT INTO topic(title, description, author) VALUES( ?,?,"hong")';
  var params = [title,desc];
  conn.query(sql,params,function(err,rows,fields){
    if(err) throw err;

    res.redirect('/topic/'+rows.insertId);
  })
})

app.get('/topic/:id/edit',function(req,res){

  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,rows1,fields){
    var id = req.params.id;
    if(err) throw err;

    if(id){
      var sql = 'SELECT * FROM topic where id=?';
      conn.query(sql,id,function(err,rows2,fields){
        if(err) throw err;
        res.render('edit',{list : rows1, topic:rows2[0], topic:rows2[0]});
      })
    }
    else{
      console.log('There is no id');
      res.status(500),send('Internal Server Error');
    }
    })
  })

app.post('/topic/:id/edit',function(req,res){
  var title = req.body.title;
  var description = req.body.desc;
  var id = req.params.id;

  var sql = 'UPDATE topic SET title=?, description=? where id=?';
  var params = [title,description,id];
  conn.query(sql,params,function(err,rows,fields){
    if(err) throw err;
    res.redirect('/topic/'+id);
  })

})

app.get('/topic/:id/delete',function(req,res){
  var sql = 'DELETE FROM topic where id = ?'
  conn.query(sql,req.params.id,function(err,rows,fields){
    if(err) throw err;
    res.redirect('/topic')
  })
})

// var sql = 'insert into student values(201354243,"LEE YONGJAE",4)';
// conn.query(sql,function(err,rows,fields){
//   if(err)
//     console.log(err);
//   else{
//     console.log(rows.insertId);
//   }
// })



//server-----------------------------------
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
