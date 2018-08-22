//setting-----------------------------------
const express = require('express');
const app = express();
const fs = require('fs');

const cookie = require('cookie-parser');
app.use(cookie('암호화!!!'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

app.locals.pretty = true; //html소스 이쁘게

//get & post-----------------------------------
app.get('/count',function(req,res){
  //req.signedCookie.count 를 사용하면 암호화 활성화!
  if(req.cookies.count)
    var count = parseInt(req.cookies.count);
  else
    var count  = 0;
  res.cookie('count', ++count);
  //res.cookie('count, ++count, {signed:true});
  res.send('count : '+req.cookies.count);
})




//server-----------------------------------
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
