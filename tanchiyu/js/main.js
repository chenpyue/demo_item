//game/js/main.js
//1:声明一组全局变量
//1.1 创建变量 二个画布 二个画笔 画布宽度高度
var can1 = null;
var can2 = null;
var ctx1 = null;
var ctx2 = null;
var canWidth = 0;
var canHeight = 0;
//1.2: 创建变量保存背景图片
var bgPic = null;
//1.3: 创建变量保存海葵对象 
var ane = null;
//1.4:创建二个变量,绘制帧开始,绘制帧时间差
var lastTime = 0;
var deltaTime = 0;//时间差 10~70
//1.5:创建一个变量，保存食物对象 
var fruit = null;
//1.6: 创建一个变量，保存大鱼对象
var mom = null;
//1.7:创建二个变量，保存鼠标位置
var mx = 0;
var my = 0;

//2:创建全局函数 game init gameloop
function game(){
  init();
  lastTime = Date.now(); //记录未开始之前时间
  deltaTime = 0;         //时间差0
  gameloop();
}
//5:创建所有对象
function init(){
  //5.1:获取画布对象 获取画笔对象
  can1 = document.getElementById("canvas1");
  can2 = document.getElementById("canvas2");
  ctx1 = can1.getContext("2d");
  ctx2 = can2.getContext("2d");
  //5.2:获取画布宽度和高度
  canWidth = can1.width;
  canHeight = can1.height;
  //5.3:创建背景对象并且下载图片
  bgPic = new Image();
  bgPic.src = "src/background.jpg";
  //5.4:创建海葵对象并且调用初始化方法
  ane = new aneObj();
  ane.init();
  //5.5:创建食物对象并且调用初始化方法
  fruit = new fruitObj();
  fruit.init();
  //5.6:创建大鱼对象并且调用初始化方法 
  mom = new momObj();
  mom.init();
  //5.7:为画布绑定鼠标移动事件并且添加处理函数
  can1.addEventListener("mousemove",onMouseMove,false)
}
//获取鼠标当前位置
//e.layerX e.layerY 鼠标移动位置 旧浏览器支持
//e.offsetX e.offsetY 鼠标移动位置 新浏览器支持
function onMouseMove(e){
   if(e.offsetX || e.layerX){
    mx = e.offsetX == undefined ?e.layerX:e.offsetX;
   }
   if(e.offsetY || e.layerY){
    my = e.offsetY == undefined ?e.layerY:e.offsetY; 
   }
   //console.log(mx+":"+my); //9:27
}


//6:绘制所有角色
function gameloop(){
  requestAnimFrame(gameloop);
  var now = Date.now();      //当前绘制记录时间
  deltaTime = now - lastTime;//二帧时间差
  lastTime = now;            //上帧时间恢复
  //console.log(deltaTime);
  //6.1:调用绘制背景函数
  drawBackground();
  //6.2:调用监听画布绘制食物方法
  fruitMonitor();
  //6.3:清除画布1
  ctx1.clearRect(0,0,canWidth,canHeight);
  //6.4:大鱼与食物碰撞检测
  momFruitsCollsion();
  //6.6:绘制海葵
  ane.draw();
  //6.7:绘制食物
  fruit.draw();
  //6.8:绘制大鱼
  mom.draw();
}
//3:在网页加载成功调用game
document.body.onload = game;
//4:在 index.html 加载main.js文件