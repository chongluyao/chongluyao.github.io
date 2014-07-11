// JavaScript Document
var picNum=0;
//var stop=self.setInterval("ShowNextPic()",3000);
function loadXMLDoc()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest(); 
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		document.getElementById("pic-box").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","1.json",true);
	xmlhttp.send();
	alert(1);
}
document.getElementById("pic-box").onclick=loadXMLDoc;
function ShowPic()
{
	stop=window.clearInterval(stop);
	pic = $(this).attr("id")[6]-1;
	box = $("[id='pic-box']>ul")[0].children;
	for (var i=0;i < box.length;i++)
	{
		if (i == pic)
		{
			$($("ul")[0].children[i]).css("display","block");
			$($("ul")[1].children[i]).css("display","block");
			$($(".little-button")[i].children[0]).attr("src","img/2.png");
		}
		else 
		{
			$($("ul")[0].children[i]).css("display","none");
			$($("ul")[1].children[i]).css("display","none");
			$($(".little-button")[i].children[0]).attr("src","img/6.png");
		}
	}
}
function ShowNextPic()
{
	box = $("[id='pic-box']>ul")[0].children;
	for (var i=0;i < box.length;i++)
	{
		if ($($("ul")[0].children[i]).css("display")=="block")
		{
			pic=i;
			break;
		}
	}
	if (pic != 6) pic=pic+1;
	else pic=0;
	for (var i=0;i < box.length;i++)
	{
		if (i == pic)
		{
			$($("ul")[0].children[i]).css("display","block");
			$($("ul")[1].children[i]).css("display","block");
			$($(".little-button")[i].children[0]).attr("src","img/2.png");
		}
		else 
		{
			$($("ul")[0].children[i]).css("display","none");
			$($("ul")[1].children[i]).css("display","none");
			$($(".little-button")[i].children[0]).attr("src","img/6.png");
		}
	}
}
function ShowLastPic()
{
	box = $("[id='pic-box']>ul")[0].children;
	for (var i=0;i < box.length;i++)
	{
		if ($($("ul")[0].children[i]).css("display")=="block")
		{
			pic=i;
			break;
		}
	}
	if (pic != 0) pic=pic-1;
	else pic=6;
	for (var i=0;i < box.length;i++)
	{
		if (i == pic)
		{
			$($("ul")[0].children[i]).css("display","block");
			$($(".little-button")[i].children[0]).attr("src","img/2.png");
		}
		else 
		{
			$($("ul")[0].children[i]).css("display","none");
			$($(".little-button")[i].children[0]).attr("src","img/6.png");
		}
	}
}
$(".little-button").click(ShowPic);
$(".little-button").mouseover(ShowPic);
$(".little-button").mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("#next-pic")[0].children[0]).click(ShowNextPic);
$($("#next-pic")[0].children[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("#next-pic")[0].children[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("#last-pic")[0].children[0]).click(ShowLastPic);
$($("#last-pic")[0].children[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("#last-pic")[0].children[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("ul")[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("ul")[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
