//setting
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

//routing
app.get('/',function(req,res){
  var menu = `
  <a href='/topic'>TOPIC</a>
  `
  res.send(menu);
})

app.get(['/topic','/topic/:id'],function(req,res){
  fs.readdir('data/',function(err,files){
    if(err) throw err;

    var id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf8', function(err,data){
        if(err) throw err;
        res.render('topic',{topics:files, title:id, desc:data});
      })
    }
    else res.render('topic',{topics : files});
  })
})


app.get('/topic_new',function(req,res){
  fs.readdir('data/',function(err,files){
    if(err) throw err;
    res.render('new',{topics : files});
  })

})

app.post('/topic',function(req,res){
  fs.writeFile('data/'+req.body.title, req.body.desc, function(err){
    if(err) throw err;
    res.redirect('/topic/'+req.body.title);
  })
})

//server
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
