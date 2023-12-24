// 设置画布
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Shape {
  x;
  y;
  vx;
  vy;
  constructor(x, y,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  introduceShape() {
    console.log(` this position is: (${this.x}, ${this.y} ),this moveLength is: (${this.vx}, ${this.vy}) `);
  }
}

class Ball extends Shape {
  radious;color;
  constructor(x,y,vx,vy,radious,color){
    super(x,y,vx,vy);
    this.radious = radious;
    this.color =color;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radious,0,Math.PI*2,);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  updated() {
    if(this.x+this.radious>width){
      this.vx = -this.vx;
    }
    if(this.x-this.radious<=0){
      this.vx = -this.vx;
    }
    if(this.y+this.radious>width){
      this.vy = -this.vy;
    }
    if(this.y-this.radious<=0){
      this.vy = -this.vy;
    }
    
  this.x += this.vx;
  this.y += this.vy;
  }
  introduceShape() {
    console.log(` this position is: (${this.x}, ${this.y} ),this moveLength is: (${this.vx}, ${this.vy}) `);
  }

}

const shape = new Shape("60", "100","3","3");
shape.introduceShape();
const ballarr = [];

//让计算机给我画25个随机颜色的球
while(ballarr.length<25){
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomColor(),
  );
  ballarr.push(ball);
  console.log(ballarr);
}

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

//绘制球形动画
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  ballarr.forEach(element => {
    element.draw();
    element.updated();
  });
 window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);