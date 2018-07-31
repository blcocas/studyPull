//callback함수 예제입니다.

// var a = [3,1,2];
//
// function b(v1, v2){
//   console.log('c', v1,v2);
//   return 0;
// }
//
// a.sort(b);
// console.log(a);

var a = [3,1,2];
a.sort(function(a,b){
  return b-a;
  console.log('c',a,b);
});
console.log(a);
