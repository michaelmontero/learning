setTimeout(()=>{
  console.log("3-From timeout")
},0);

setTimeout(()=>{
  console.log("4-From timeout")
},2);

var x = 0;
while(x<1000000){
  x++;
  if(x===1000000){
    console.log("1-finishing at => "+x);
  }
}

console.log("2-After the loop");
