//game/js/mom.js   
//1:创建构造方法 momObj
var momObj = function(){
  this.x;           //1.1:大鱼位置
  this.y;
  this.bigEye =  [];//1.2:大鱼眼睛
  this.bigBody = [];//1.3:大鱼身体
  this.bigTail = [];//1.4:大鱼尾巴
  this.angle;       //1.5:大鱼旋转角度

  //大鱼尾巴图片切换 0 1 2 3 4 5 6 7
  this.bigTailIdx = 0;    //大鱼尾巴下标
  //控制尾巴摆速度添加二个变量
  this.bigTailStart = 0;  //计时开始
  this.bigTailEnd = 100;  //计时结束  下标+1


  //大鱼眼睛 0 1
  this.bigEyeIdx = 0;    //大鱼眼睛下标
  this.bigEyeStart = 0;  //大鱼眼睛记时开始
  this.bigEyeEnd = 3000; //大鱼眼睛记时结束

}
//2:为构造方法添加 init方法
momObj.prototype.init = function(){
   //2.1:大鱼坐标 屏幕居中
   this.x = canWidth * 0.5;
   this.y = canHeight * 0.5;
   //2.2:大鱼角度 0
   this.angle = 0;
   //2.3:创建循环加载大鱼眼睛图片对象 2
   //bigEye0.png bigEye1.png
   for(var i=0;i<2;i++){
       this.bigEye[i] = new Image();
       this.bigEye[i].src = "src/bigEye"+i+".png";
   }
   //2.4:创建循环加载大鱼身体图片对象 8
   //bigSwim0.png .. bigSwim7.png
   for(var i=0;i<8;i++){
       this.bigBody[i] = new Image();
       this.bigBody[i].src = "src/bigSwim"+i+".png"; 
   }
   //2.5:创建循环加载大鱼尾巴图片对象 8
   //bigTail0.png  ... bigTail7.png
   for(var i=0;i<8;i++){
     this.bigTail[i] = new Image();
     this.bigTail[i].src = "src/bigTail"+i+".png";
   }
}
//3:为构造方法添加 draw方法 
momObj.prototype.draw = function(){
    //特殊要求:大鱼位置不停发生改变,旋转角度
    //        小鱼其它元素
    //0.1 mx my 鼠标坐标赋值大鱼坐标  
    this.x = lerpDistance(mx,this.x,0.99);
    this.y = lerpDistance(my,this.y,0.98);

    //最后一步:大鱼游动角度慢慢向鼠标角度游动
    //套路:
     //1:计算坐标差
     var deltaY = my - this.y;
     var deltaX = mx - this.x;
     //2:计算角度差 
     var beta = Math.atan2(deltaY,deltaX)+Math.PI;
     //3:通过函数计算新角度
     this.angle = lerpAngle(beta,this.angle,0.9);

    //1:保存画笔状态
    ctx1.save();
    //2:平移原点
    ctx1.translate(this.x,this.y);
    //3:旋转角度
    ctx1.rotate(this.angle);
    //4:绘制   将眼睛 身体 尾巴 移动中心 原点

    //大鱼眼睛记时开始 累加
    this.bigEyeStart += deltaTime;
    //大鱼眼睛开始时间大于结束时间
    if(this.bigEyeStart>this.bigEyeEnd){
      //切换下一张图片
      this.bigEyeIdx = (this.bigEyeIdx+1)%2;
      //恢复开始时间
      this.bigEyeStart = 0;
      //修改大鱼闭眼睛时间
      //1:大鱼睁眼睛时间 3000  0
      //2:大鱼闭眼睛时间 300   1
      if(this.bigEyeIdx == 0){ //下标0睁眼睛
        this.bigEyeEnd = 3000;
      }
      if(this.bigEyeIdx == 1){ //下标1闭眼睛
        this.bigEyeEnd= 300;
      }
    }
    ctx1.drawImage(this.bigEye[this.bigEyeIdx],
      -this.bigEye[this.bigEyeIdx].width*0.5,
      -this.bigEye[this.bigEyeIdx].height*0.5);

    ctx1.drawImage(this.bigBody[0],
      -this.bigBody[0].width*0.5,
      -this.bigBody[0].height*0.5);

    //累加计算尾巴记时开始  
    this.bigTailStart += deltaTime;
    //如果计时开始时间大于结束时 切换下一张图片
    if(this.bigTailStart > this.bigTailEnd){  
      this.bigTailIdx = (this.bigTailIdx+1)%8;
      //将尾巴记时开始恢复
      this.bigTailStart = 0;
    }

    ctx1.drawImage(this.bigTail[this.bigTailIdx],
      -this.bigTail[this.bigTailIdx].width*0.5 + 30,
      -this.bigTail[this.bigTailIdx].height*0.5);
    //5:恢复画笔状态
    ctx1.restore();       
}
//4:将mom.js 添加 index.html
//5:在main.js 创建大鱼对象并且调用相应方法