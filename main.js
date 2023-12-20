// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var ball = {
  x: 200,
  y: 200,
  vx: 5,
  vy: 2,
  radius: 25,
  draw: function (color) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  },
};


function runBall() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,width,height);
  ball.draw("pink");
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  window.requestAnimationFrame(runBall);
}
window.requestAnimationFrame(runBall);

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
