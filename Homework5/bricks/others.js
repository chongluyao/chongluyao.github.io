/*var WIDTH = 600;
var HEIGHT = 600;
var Controller = (function(){
    var FPS = 30;
    var Game = {
      ku:{},
      over:0,
      init:function(){
        this.ctx = document.getElementById("ctx").getContext("2d");
        this.stage = this.ku["Stage"](this);//构建舞台
        this.map = this.ku["Map"](this);
        this.ball = this.ku["Ball"](this);
        this.bang = this.ku["Bang"](this);
        this.ku["Control"](this);
      },
      start:function(){
        this.step();
      },
      step:function(){
        this.stage.step();//舞台步进
        if(this.over) return;
        var that = this;
        this.myTime = setTimeout(function(){that.step()},1000/FPS);
      },
      pause:function(){
        clearTimeout(this.myTime);
      },
      draw:function(){
        this.ctx.fillRect(0,0,100,100);
      }
    };
    return {
      init : function(){
        Game.init();
      },
      start : function(){
        Game.start();
      },
      pause : function(){
        Game.pause();
      },
      module : function(name,fun){
        Game.ku[name] = fun;
      }
    }
})();
Controller.module("Stage",function(Game){
    var stage = {
      drawStage:function(){
      },
      drawCurtain:function(){//擦掉舞台，重绘
        Game.ctx.clearRect(0,0,WIDTH,HEIGHT);
      },
      step:function(){//舞台步进
        this.drawCurtain();
        Game.map.step();//进图步进
        Game.ball.step();//球步进
        Game.bang.step();//球步进
      },
      gameOver:function(){
        Game.over = 1;
        this.drawCurtain();
        Game.ctx.fillText("你输了！",300,400);
      }
    };
     return stage;
});
Controller.module("Map",function(Game){
    var map = {
      map_array:[
        [2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,2],
        [5,5,5,5,5,5,5,5,5,5,5,5],
      ],
      step:function(){
        this.drawMap();
      },
      drawMap:function(){//照地图矩阵绘制地图
         this.everyWidth = WIDTH / this.map_array[0].length;
         this.everyHeight = HEIGHT / this.map_array.length;
         for(var i in this.map_array){
            for(var j in this.map_array[i]){
              if(this.map_array[i][j] == 1)//砖块style
              Game.ctx.strokeRect(j * this.everyWidth,i * this.everyHeight,this.everyWidth,this.everyHeight);
              else if(this.map_array[i][j] == 2 || this.map_array[i][j] == 3 || this.map_array[i][j] == 4 )//边界style
              Game.ctx.fillRect(j * this.everyWidth,i * this.everyHeight,this.everyWidth,this.everyHeight);
            }
         }
      }
    };
    return map;
});
Controller.module("Ball",function(Game){
    var R = 20;
    var ball = {
      ballDot:{'x':500,'y':500},//球心
      ballDirect:{x:3,y:-5},//球的方向和速度
      drawBall:function(){//根据球的坐标画球
       Game.ctx.beginPath();
       Game.ctx.arc(this.ballDot.x,this.ballDot.y,R,0,2*Math.PI,true);
       Game.ctx.fill();
      },
      step:function(){//球步进
        //判断球在地图上所处的区域位置,此游戏的关键之处
      //判断球四周是否有障碍存在
        var that = this;
        function check(x,y){
          var tempX = Math.floor(x / Game.map.everyWidth);
          var tempY = Math.floor(y / Game.map.everyHeight);
          if(Game.map.map_array[tempY][tempX] == 5){//游戏结束
            Game.stage.gameOver();
            return false;
          }
          if(Game.map.map_array[tempY][tempX] == 1) {//碰到砖块
            Game.map.map_array[tempY][tempX] = 0;
            return 1;
          }
          if(Game.map.map_array[tempY][tempX] == 2) return 1;//碰到边界
        }
        //实际上可以以四点代表这个球,只需看这四点与地图的交点就行了
        if(check(this.ballDot.x - R,this.ballDot.y)) this.ballDirect.x = -this.ballDirect.x;
        if(check(this.ballDot.x + R,this.ballDot.y)) this.ballDirect.x = -this.ballDirect.x;
        if(check(this.ballDot.x ,this.ballDot.y + R)) this.ballDirect.y = -this.ballDirect.y;
        if(check(this.ballDot.x ,this.ballDot.y - R)) this.ballDirect.y = -this.ballDirect.y;
        //棒检测
        var a = this.ballDot.x - Game.bang.zsDot.x;
        var b = this.ballDot.y + R - Game.bang.zsDot.y;
        if(a >= 0 && a <= Game.bang.width && b == 0) this.ballDirect.y = -this.ballDirect.y;
        if(Game.over) return;//如果输入了就不往下走了
        this.ballDot.x += this.ballDirect.x;
        this.ballDot.y += this.ballDirect.y;
        this.drawBall();
      }
    }
    return ball;
});
Controller.module("Bang",function(Game){
    var bang = {
      width:100,
      height:20,
      v:20,
      zsDot:{x:500,y:600},//左上点坐标
      drawBang:function(){
        if(Game.over) return;//如果输入了就不往下走了
        Game.ctx.fillRect(this.zsDot.x , this.zsDot.y , this.width , this.height);
      },
      step:function(){
        this.drawBang();
      }
    }
    return bang;
});
Controller.module("Control",function(Game){
    window.addEventListener('keydown',function(e){
      if(e.keyCode == 39) Game.bang.zsDot.x += Game.bang.v;
      if(e.keyCode == 37) Game.bang.zsDot.x -= Game.bang.v;
      if(e.keyCode == 38) Game.pause();
    },false);
});
Controller.init();
Controller.start();
$($("canvas")[0]).click(function(){Controller.init();Controller.start();});*/