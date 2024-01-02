// 设置画布
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

class Shape {
  x;
  y;
  vx;
  vy;
  exists;
  constructor(x, y, vx, vy,exists) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.exists = exists;
  }
  introduceShape() {
    console.log(
      ` this position is: (${this.x}, ${this.y} ),this moveLength is: (${this.vx}, ${this.vy}) `
    );
  }
}

class Ball extends Shape {
  radious;
  color;
  constructor(x, y, vx, vy,exists,radious, color) {
    super(x, y, vx, vy,exists);
    this.radious = radious;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  updated() {
    if (this.x + this.radious > width) {
      this.vx = -(this.vx);
    }
    if (this.x - this.radious <= 0) {
      this.vx = -(this.vx);
    }
    if (this.y + this.radious > height) {
      this.vy = -(this.vy);
    }
    if (this.y - this.radious <= 0) {
      this.vy = -(this.vy);
    }

    this.x += this.vx;
    this.y += this.vy;
  }
  collisionDetect(ballarr) {
    ballarr.forEach((element) => {
      if (this != element) {
        const dx = this.x - element.x;
        const dy = this.y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radious + element.radious) {
          element.color = this.color = randomColor();
        }
      }
    });
  }
  introduceShape() {
    console.log(
      ` this position is: (${this.x}, ${this.y} ),this moveLength is: (${this.vx}, ${this.vy}) `
    );
  }
}

const shape = new Shape("60", "100", "3", "3",true);
shape.introduceShape();
const ballarr = [];

// for (i=0;i<2;i++){
// ballarr[i] += "ball" +i
// console.log(i,ballarr[i])
// }

// ballarr.forEach(element => {
//   element = new Ball(random(10,1000),random(10,1000),random(-7,7),random(-7,7),random(10,50),randomColor());
//   console.log(element)
//   element.darw()
//   element.introduceShape()

// });

//让计算机给我画25个随机颜色的球
while (ballarr.length < 10) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    size,
    randomColor()
  );
  ballarr.push(ball);
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




class EvilCircle extends Shape {
  radious=10;color="white";
  constructor(x,y,vx,vy,exists){
    super(x,y,20,20,exists);
  }
  draw() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
    ctx.closePath();
   ctx.stroke();
  }
  checkBounds(){
    if (this.x + this.radious > width) {
      this.x -= this.radious;
    }
    if (this.x - this.radious <= 0) {
      this.x += this.radious;
    }
    if (this.y + this.radious > height) {
      this.y -= this.radious;
    }
    if (this.y - this.radious <= 0) {
      this.y += this.radious;
    }
  }
  setControls(){
    window.onkeydown = (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.vx;
          break;
        case "d":
          this.x += this.vx;
          break;
        case "w":
          this.y -= this.vy;
          break;
        case "s":
          this.y += this.vy;
          break;
      }
    };
  }
  collisionDetect(ballarr){
    ballarr.forEach((element,index) => {
      if (element.exists) {
        const dx = this.x - element.x;
        const dy = this.y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radious + element.radious) {
         ballarr.splice(index,1)
        }
      }
    });
  }
  }
//完成恶魔圈类的实例
  const circle = new EvilCircle(200,300,"","",true)
  console.log(circle)
//恶魔圈对象的键盘控制方法
circle.setControls();



//绘制球形动画
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  circle.draw();
  circle.checkBounds();
  circle.collisionDetect(ballarr);
  
    ballarr.forEach((element) => {
      if(element.exists){
        element.draw();
        element.updated();
        element.collisionDetect(ballarr);
      }
    });
  
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);