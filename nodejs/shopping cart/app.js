//setting-----------------------------------
const express = require('express');
const app = express();
const fs = require('fs');

const cookie = require('cookie-parser');
app.use(cookie('thisissecretcode!!'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); //static파일 디렉토리

app.set('views','./views'); //templete파일 디렉토리
app.set('view engine','pug'); //어떤 templete엔진?

app.locals.pretty = true; //html소스 이쁘게

var products = {
  1:{title : 'The history of Web 1'},
  2:{title : 'The Next Web'},
  3:{title : 'The Destroy'},
  4:{title : 'Legend of Darius'},
  5:{title : 'Guillotine Cutter'}
}
//get & post-----------------------------------
// app.get('/count',function(req,res){
//
//   if(req.cookies.count)
//     var count = parseInt(req.cookies.count);
//   else
//     var count  = 0;
//   res.cookie('count', ++count);
//   res.send('count : '+req.cookies.count);
// })
var test = {
  1 : {id:"1st"},
  2 : {id:"2nd"},
  3 : {id:"3rd"},
  hello : {id : "hi"},
  "hi" : {id : "hello"}
}
app.get('/test',function(req,res){
  res.send(test["hi"]);
})


app.get('/product',function(req,res){
  var output = `<h1>Product List</h1>`;
  for(var i in products){
    output +=`<li>
    <a href="/cart/${i}">${products[i].title}</a>
    </li>`
  }
  res.send(`<ol>${output}</ol> <a href="/cart">Cart</a>`);
})

app.get('/cart/:id',function(req,res){
  var id = req.params.id;

  if(req.cookies.cart)
    var cart = req.cookies.cart;
  else
    var cart = {};

  if(!cart[id])
    cart[id] = 0;
  cart[id] = cart[id] +1;

  res.cookie('cart', cart);
  res.redirect('/cart');
})

app.get('/cart',function(req,res){
  var output = `<h1>Shopping Cart</h1>`;
  var cart = req.cookies.cart;
  if(!cart)
    res.send('Empty!');
  else{
    for(var i in cart){
      output +=`<li>
        ${products[i].title}(${cart[i]})
        </li>`
    }
  }
  res.send(`<ol>${output}</ol> <a href="/product">Back</a>`);

})


//server-----------------------------------
app.listen(3000, function(){
  console.log('Connected to 3000 port!');
})
