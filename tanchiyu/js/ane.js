//game/js/ane.js 海葵
//版本一：静态海葵
//1:创建海葵类 aneObj
var aneObj = function(){
   //this.len = []; //海葵高度
   //this.x =   []; //海葵位置
   //起点坐标  控制点坐标   终点坐标   摆动幅度 alpha
   this.rootx = [];//起点坐标
   this.headx = [];//终点坐标
   this.heady = [];//终点坐标
   this.amp = []; //摆动幅度 50
   this.alpha = 0;//摆动当前位置 -1 -0.8 .. 0.6  0.8 1
   //x[200] + (50 * -0.8) 
}
aneObj.prototype.num = 50; //海葵数量
//2:为海葵类添加方法 init
aneObj.prototype.init = function(){
  //for(var i=0;i<this.num;i++){
  //  this.len[i] = 200 + Math.random()*50;
  //  this.x[i] = i * 16 + Math.random()*20;
  //}
  for(var i=0;i<this.num;i++){
     //初始 起点 终点 摆动幅度
     //起点
     this.rootx[i] = i * 16 + Math.random()*20;
     //终点
     this.headx[i] = this.rootx[i];
     this.heady[i] = canHeight - 230  + Math.random()*50;
     //摆动幅度
     this.amp[i] = 50 + Math.random()*50;
  }
}
//3:为海葵类添加方法 draw
aneObj.prototype.draw = function(){
     this.alpha += deltaTime * 0.0008;
     var l = Math.sin(this.alpha);
     //console.log(l);[-1 -0.9 -0.8 .. 0.8 0.9 1]
     //-保存画笔状态
     ctx2.save();             //保留状态
     ctx2.strokeStyle = "#3b154e";
     ctx2.globalAlpha = 0.6;  //透明度
     ctx2.lineCap = "round";  //圆角
     ctx2.lineWidth = 20;     //边线宽度
    //3.3:创建循环
    for(var i=0;i<this.num;i++){
     //3.4:开始一条新路径
     //ctx2.beginPath();
     //3.5:移动画布底端
     //ctx2.moveTo(this.x[i],canHeight);
     //3.6:向上画一条直线
     //ctx2.lineTo(this.x[i],
     // canHeight-this.len[i]);
     //3.7:描边
     //ctx2.stroke();
     //1:开始新路径
     ctx2.beginPath();
     //2:移动起始点
     ctx2.moveTo(this.rootx[i],canHeight);
     //3:重新计算终点x坐标
     //              200           + 50       * -0.8
     this.headx[i] = this.rootx[i] + this.amp[i] * l;
     //3:绘制贝赛尔曲线   控制点  终点
     ctx2.quadraticCurveTo(
       this.rootx[i],canHeight-100,
       this.headx[i],this.heady[i]);
     //4:描边
     ctx2.stroke();

    }
    //-恢复画笔状态
    ctx2.restore();
}
//4:在index.html 加载ane.js文件
//5:在main.js 创建海葵对象并且调用相应方法
