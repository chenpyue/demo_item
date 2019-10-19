//game/js/collsion.js 完成碰撞检测
//1:创建全局函数完成大鱼与食物碰撞检测
function momFruitsCollsion(){
  //1.1:循环所有食物
  for(var i=0;i<fruit.num;i++){
    //1.2:判断当前食物是否活动状态
    if(fruit.alive[i]){
      //1.3:如果当前食物与大鱼距离小于 900 像素
      //calLength2 在文件 commonFunctions.js
      var len = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
      //1.4:当前食物状态修改不活动
      if(len < 900){
        fruit.alive[i] = false;
      }
    }
  }
} 
//2:将collsion.js 添加 index.html
//3:在main.js gameloop 调用函数