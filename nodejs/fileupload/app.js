//setting-----------------------------------
const express = require('express');
const app = express();
const fs = require('fs');

const multer = require('multer');
const upload = multer){dest : 'uploads/'};

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

app.locals.pretty = true; //html소스 이쁘게

//get & post-----------------------------------
app.get('/',function(req,res){
  let menu = `
  <a href="/upload">UPLOAD</a>
  `
  res.send(menu);
})

app.get('/upload',function(req,res){
  res.render('upload');
})

app.post('upload',function(req,res){
  res.send('uploaded!');
})


//server-----------------------------------
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
