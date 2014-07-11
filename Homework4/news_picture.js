// JavaScript Document
var picNum=0;
stop=self.setInterval("ShowNextPic()",3000);
loadXMLDoc1();
loadXMLDoc2();
loadXMLDoc3();
function processData1(data)
{
	for (var i=0;i<7;i++)
	{
		var tagPic=document.createElement("li");
		var tagNews=document.createElement("li");
		if (i == 0)
		{
			$(tagPic).css("display","block");
			$(tagNews).css("display","block");
		}
		else
		{
			$(tagPic).css("display","none");
			$(tagNews).css("display","none");
		}
		var pic=document.createElement("img");
		$(pic).attr("src",data.img[i].url);
		$(tagPic).append(pic);
		tagNews.innerText=data.img[i].newstitle;
		$(($("ul")[0])).append(tagPic);
		$(($("ul")[1])).append(tagNews);
	}
}
function loadXMLDoc1()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			try
			{
					processData1(JSON.parse(this.responseText));
			}
			catch(ex)
			{
				console.log(ex.message);
			}
		}
	}
	xmlhttp.open("GET","1.json",true);
	xmlhttp.send();
}
function processData2(data)
{
	num=data.num/4;
}
function loadXMLDoc2()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			try
			{
					processData2(JSON.parse(this.responseText));
			}
			catch(ex)
			{
				console.log(ex.message);
			}
		}
	}
	xmlhttp.open("GET","2.json",true);
	xmlhttp.send();
}
function processData3(data)
{
	var line2=document.createElement("div");
	$(line2).attr("class","line2");
	for (var i=0;i<4;i++)
	{
		var comm=document.createElement("div");
		$(comm).attr("class","comments");
		var ph=document.createElement("div");
		$(ph).attr("class","photo");
		var img=document.createElement("img");
		$(img).attr("src",data.page1[i].url);
		$(img).attr("height","100%");
		var cont=document.createElement("div");
		$(cont).attr("class","content");
		var user=document.createElement("div");
		$(user).attr("class","username");
		var chara=document.createElement("div");
		$(chara).attr("class","character");
		$(ph).append(img);
		$(comm).append(ph);
		$(cont).append(user);
		$(cont).append(chara);
		$(comm).append(cont);
		$(($("#inside")[0])).append(comm);
		if (i != 3) $(($("#inside")[0])).append(line2);
	}
}
function loadXMLDoc3()
{
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			try
			{
					processData3(JSON.parse(this.responseText));
			}
			catch(ex)
			{
				console.log(ex.message);
			}
		}
	}
	xmlhttp.open("GET","3.json",true);
	xmlhttp.send();
}
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
