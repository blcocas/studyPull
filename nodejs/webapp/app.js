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

//get & post-----------------------------------
app.get('/',function(req,res){
  var list = `
  <a href="/home">Home</a><br>
  <a href="/topic">Topic<a/><br>
  <a href="/ggamsi">Ggamsi</a><br>
  `
  res.send(list);
})

app.get('/topic/new',function(req,res){
  fs.readdir('data',function(err,files){
    if(err) throw err;
    var id = req.params.id;
    res.render('new', {topics : files});
  })
})

app.post('/topic',function(req,res){
  fs.writeFile('./data/'+req.body.title , req.body.content, function(err){
    if(err) throw err;
    console.log('Write Completed!');

    fs.readdir('data',function(err,files){
      if(err) throw err;
      res.redirect('/topic/'+req.body.title);
    })
  })
})

app.get(['/topic','/topic/:id'],  function(req,res){

  fs.readdir('data',function(err,files){
    if(err) throw err;
    var id = req.params.id;
    //id값이 있을떄
    if(id){
      fs.readFile('data/'+id ,'utf8', function(err,data){
        if(err) throw err;

        res.render('view', {topics:files ,title:id, content:data});
      })
    }
    //id값이 없을,
    else res.render('view', {topics:files});
  })
})


//server-----------------------------------
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
