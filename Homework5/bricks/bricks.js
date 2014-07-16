var u_mode=0;
var u_level=1;
var u_balls=2;
$("#classicmode").click(function () {
  u_mode = 0;
  $($("li")[0]).css("display","none");
  $($("li")[1]).css("display","block");
  $("#levelname")[0].innerText="Level"+(u_level+1);
  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
  $(document).ready(function(){
    u_canvas=document.getElementById('ctx');
    u_ctx=u_canvas.getContext('2d');
    u_width = u_canvas.width;
    u_height = u_canvas.height;
    //w_start();
  });
});
$("#crazymode").click(function () {
  u_mode = 1;
  $($("li")[0]).css("display","none");
  $($("li")[1]).css("display","block");
  $("#levelname")[0].innerText="Level"+(u_level);
  $("#ballsleft")[0].innerText="Ball:"+(u_balls);
  $(document).ready(function(){
    u_canvas=document.getElementById('ctx');
    u_ctx=u_canvas.getContext('2d');
    u_width = u_canvas.width;
    u_height = u_canvas.height;
    //w_start();
  });
});
$("#helpbutton").click(function(){
  $($("li")[0]).css("display","none");
  $($("li")[4]).css("display","block");
});
$(".mainmenu").click(function(){
  $($("li")[2]).css("display","none");
  $($("li")[3]).css("display","none");
  $($("li")[0]).css("display","block");
  u_level=1;
  u_balls=2;
});
$("#nextlevel").click(function(){
    $($("li")[2]).css("display","none");
    $($("li")[1]).css("display", "block");
    $("#levelname")[0].innerText = "Level" + (u_level);
    $("#ballsleft")[0].innerText = "Ball:" + (u_balls);
    //w_start();
});
$("#retry").click(function(){
    $($("li")[3]).css("display","none");
    $($("li")[1]).css("display", "block");
    $("#levelname")[0].innerText = "Level" + (u_level);
    $("#ballsleft")[0].innerText = "Ball:" + (u_balls);
    //w_start();
  });
$(".littleicon").click(function(){
  if (u_soundOn == true)
  {
    $("audio")[0].pause();
    u_soundOn=false;
    $($(".littleicon")[0].children[0]).attr("src","image/7.png");
    $($(".littleicon")[1].children[0]).attr("src","image/7.png");
  }
  else
  {
    u_soundOn=true;
    $("audio")[0].play();
    $($(".littleicon")[0].children[0]).attr("src","image/6.png");
    $($(".littleicon")[1].children[0]).attr("src","image/6.png");
  }
})

function ifwin(win)
{
  if (win)
  {
    if (u_mode == 0)
    {
        clearInterval(u_gameStart);
        clearInterval(u_gameTimer);
        $(function(){
        setTimeout(function(){
          $($('li')[1]).css('display','none');
            $($("li")[2]).css("display","block");
          },1000)
        });
    }
    else
    {
        clearInterval(u_gameStart);
        clearInterval(u_gameTimer);
        $(function(){
        setTimeout(function(){
          $($('li')[1]).css('display','none');
            $($("li")[2]).css("display","block");
          },1000)
        });
    }
  }
  else
  {
    if (u_mode == 0)
    {
        u_mode.ballsleft --;
        if (u_mode.ballsleft == 0)
        {
          clearInterval(u_gameStart);
          clearInterval(u_gameTimer);
          $(function(){
          setTimeout(function(){
            $($('li')[1]).css('display','none');
              $($("li")[3]).css("display","block");
            },1000)
          });
          u_ballsLeft = 2;
        }
    }
    else
    {
        clearInterval(u_gameStart);
        clearInterval(u_gameTimer);
        $(function(){
        setTimeout(function(){
          $($('li')[1]).css('display','none');
            $($("li")[3]).css("display","block");
          },1000)
        });
    }
  }
}