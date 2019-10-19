//1:创建fruitObj 构造函数
var fruitObj = function(){
    this.alive = [];   //保存食物状态
    this.x = [];       //保存食物位置
    this.y = [];
    this.l = [];               //食物图片长度
    this.orange = new Image(); //橙色食物
    this.blue = new Image();   //蓝色食物 
    this.fruitType = [];       //食物类型
                               //"blue","orange"
    this.spd = [];             //食物速度
    this.aneNo = [];           //海葵下标            
}
fruitObj.prototype.num = 30;
//2:为fruitObj添加方法init
fruitObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
      //快速看结果 第一个版本 所有食物活动
      this.alive[i] = false;  
      this.x[i] = 0;
      this.y[i] = 0;
      this.l[i] = 0;
      this.spd[i] = Math.random()*0.017 + 0.003;
      this.fruitType[i] = "";
      this.aneNo[i] = 0;
    }
    this.blue.src = "src/blue.png";
    this.orange.src = "src/fruit.png";
}
//3:为fruitObj添加方法draw
fruitObj.prototype.draw = function(){
   //console.log(1);
   for(var i=0;i<this.num;i++){
     //console.log(2);
    //1:如果当前食物活动状态才绘制
    if(this.alive[i]){
      //console.log(3);
      //2:判断图片类型 "blue" "orange"
      if(this.fruitType[i] == "blue"){
        var pic = this.blue;
      }else{
        var pic = this.orange;   //15:42
      }
      //3:判断图片宽度<14宽度       l+
      //4:如果大于 14像素  向上漂浮 y-
      if(this.l[i]<14){
        this.l[i] += this.spd[i] * deltaTime;
      }else{
        this.y[i] -= this.spd[i] * 3 * deltaTime;
      }
      ctx2.drawImage(pic,
         this.x[i],this.y[i],
         this.l[i],this.l[i]);
      //如果当前食物己经漂浮出屏幕,修改不活动
      if(this.y[i]<0){
        this.alive[i] = false;
      }
    }
   }
}
//4:将fruit.js 添加index.html
//5:在main.js  创建食物对象并且调用相应方法
//6:监听画布是否有15个活动食物不够
//main.js gameloop
function fruitMonitor(){
   var sum = 0;                //累加食物状态数量
   for(var i=0;i<fruit.num;i++){
       if(fruit.alive[i])sum++;
   }
   if(sum<15){  //如果活动食物数量小于 15个
     sendFruit();//在不活动食物中挑选一个
   }
}
//7:挑一个不活动
function sendFruit(){
   for(var i=0;i<fruit.num;i++){
       if(fruit.alive[i]===false){
           fruit.born(i);          //出生
           return;                 //退出函数
       }
   }
}
//8:出生
fruitObj.prototype.born = function(i){
   //1:随机找一个海葵下标
   this.aneNo[i] = Math.floor(Math.random()*ane.num);
   //2:获取海葵终点x y
   this.x[i] = ane.headx[this.aneNo[i]];
   this.y[i] = ane.heady[this.aneNo[i]];
   //3:食物宽度
   this.l[i] = 0;
   //4:食物状态
   this.alive[i] = true;
   //5:食物类型
   this.fruitType[i] = Math.random()<0.9?"blue":"orange";
}