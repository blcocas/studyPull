var express = require('express');
var app = express();


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

app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
