//asynchronous vs synchronous
const fs = require('fs');


//sync
console.log(1);
let data1 = fs.readFileSync('hello.js', {encoding:'utf-8'});
console.log(data1);


//async
console.log(2);
let data2 = fs.readFile('hello.js', {encoding:'utf-8'}, function(err,data){
  console.log(3);
  console.log(data);
})
console.log(4);
