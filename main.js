// 设置画布
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Shape {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  introduceShape() {
    console.log(` this position is: (${this.x}, ${this.y} )`);
  }
}

class Ball extends Shape {
  radious;color;
  constructor(x,y,radious,color){
    super(x,y);
    this.radious = radious;
    this.color =color;
  }
  darw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radious,0,Math.PI*2,);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  introduceShape() {
    console.log(
      ` this position is: (${this.x}, ${this.y} )`,
    );
  }

}

const shape = new Shape("60", "100");
shape.introduceShape();
const ballarr = [];

for (i=0;i<5;i++){
ballarr[i] += "ball" +i
console.log(i,ballarr[i])
}

ballarr.forEach(element => {
  element = new Ball(random(10,1000),random(10,1000),random(10,80),randomColor());
  console.log(element)
  element.darw()
});



// 生成随机数的函数

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

//生成随机颜色
function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}