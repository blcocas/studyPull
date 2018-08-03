var express = require('express');
var app = express();

//body-parser setting
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?
app.locals.pretty = true; //html소스 이쁘게

//루트
app.get('/',function(req,res){
  res.send('<h1>homepage</h1>');
})

//route예시
app.get('/login',function(req,res){
  res.send('<h1>login plz</h1>');
})

//static 예시
app.get('/img',function(req,res){
  res.send('깜순이입니당, <img src="/ggam.jpg">');
})

//dynamic 예
app.get('/dynamic',function(req,res){
  var time = Date();
  var lis = '';
  for(var i=0;i<5;i++){
    lis = lis+ '<li>coding</li>'
  }
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>dynamic</title>
    </head>
    <body>
      <p1>hello dynamic!!</p1>
      ${lis}
      ${time}
    </body>
  </html>
  `
  res.send(output);
})

//templete(pug) 예
app.get('/templete',function(req,res){
  res.render('temp', {time:Date(), title:"pug"}) //templete 파일 불러오기
})

//query string 예
app.get('/query',function(req,res){
  var topics = [
    'Darius',
    'Orrn',
    'Nasus',
  ]

  var id = req.query.id; //query접근하기

  var output = `
  <a href="/query?">홈</a><br>
  <a href="/query?id=0">다리우스</a><br>
  <a href="/query?id=1">오른</a><br>
  <a href="/query
  ?id=2">나서스</a><br><br>
  ${topics[id]}
  `
  res.send(output);
})

//sematics url 예
app.get('/semantic/:id',function(req,res){
  var topics = [
    'Darius',
    'Orrn',
    'Nasus',
  ]
  var id = req.params.id; // semantic에 접근하기

  var output = `
  <a href="/semantic/100">홈</a><br>
  <a href="/semantic/0">다리우스</a><br>
  <a href="/semantic/1">오른</a><br>
  <a href="/semantic/2">나서스</a><br><br>
  ${topics[id]}
  `
  res.send(output);
})
app.get('/semantic/:id/:mode',function(req,res){
  res.send(req.params.id + ' and ' + req.params.mode);
})



//form with GET
app.get("/form_get",function(req,res){
  res.render('form_get');
})
app.get('/form_get/receiver',function(req,res){
  var title = req.query.title;
  var desc = req.query.desc;
  res.send("GET! <br>" + title + ' ' + desc);
})

//form with POST
app.get("/form_post",function(req,res){
  res.render('form_post');
})
app.post('/form_post/receiver',function(req,res){
  var title = req.body.title;
  var desc = req.body.desc;
  res.send("POST! <br>"+ title + ' ' + desc);
})

app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
