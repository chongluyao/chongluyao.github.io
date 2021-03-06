// JavaScript Document
var storage = window.localStorage;
if (storage.picNum == undefined) storage.picNum = Number(0);
if (storage.pageNum == undefined) storage.pageNum = Number(1);
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
		var button=document.createElement("div");
		$(button).attr("id","button"+i);
		$(button).attr("class","little-button");
		var lpic=document.createElement("img");
		if (i == storage.picNum)
		{
			$(tagPic).css("display","block");
			$(tagNews).css("display","block");
			$(lpic).attr("src","img/2.png");
		}
		else
		{
			$(tagPic).css("display","none");
			$(tagNews).css("display","none");
			$(lpic).attr("src","img/6.png");
		}
		var pic=document.createElement("img");
		$(pic).attr("src",data.img[i].url);
		$(tagPic).append(pic);
		tagNews.innerText=data.img[i].newstitle;
		$(button).append(lpic);
		$(($("ul")[0])).append(tagPic);
		$(($("ul")[1])).append(tagNews);
		$($("#pic-slide")[0]).append(button);
	}
	$(".little-button").click(ShowPic);
	$(".little-button").mouseover(ShowPic);
	$(".little-button").mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
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
function processData(data)
{
	for (var i=0;i<4;i++)
	{
		var comm=document.createElement("div");
		$(comm).attr("class","comments");
		var ph=document.createElement("div");
		$(ph).attr("class","photo");
		var img=document.createElement("img");
		$(img).attr("src",data.page[i].url);
		$(img).attr("height","100%");
		var cont=document.createElement("div");
		$(cont).attr("class","content");
		var user=document.createElement("div");
		$(user).attr("class","username");
		user.innerText=data.page[i].username;
		var chara=document.createElement("div");
		$(chara).attr("class","character");
		chara.innerText=data.page[i].comment;
		$(ph).append(img);
		$(comm).append(ph);
		$(cont).append(user);
		$(cont).append(chara);
		$(comm).append(cont);
		$(($("#next-page")[0])).before(comm);
		if (i < 3)
		{
			var line2=document.createElement("div");
			$(line2).attr("class","line2");
			$(($("#next-page")[0])).before(line2);
		}
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
					processData(JSON.parse(this.responseText));
			}
			catch(ex)
			{
				console.log(ex.message);
			}
		}
	}
	s=Number(storage.pageNum)+2+".json";
	xmlhttp.open("GET",s,true);
	xmlhttp.send();
}
function processData3(data)
{
	for (var i=0;i<4;i++)
	{
		$($(".photo")[i].children[0]).attr("src",data.page[i].url);
		$(".username")[i].innerText=data.page[i].username;
		$(".character")[i].innerText=data.page[i].comment;
	}
}
function gotoPage()
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
	s=Number(storage.pageNum)+2+".json";
	xmlhttp.open("GET",s,true);
	xmlhttp.send();
}
function ShowPic()
{
	stop=window.clearInterval(stop);
	pic = $(this).attr("id")[6];
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
	storage.picNum=pic;
}
function ShowNextPic()
{
	box = $("[id='pic-box']>ul")[0].children;
	if (storage.picNum != 6) storage.picNum=Number(storage.picNum)+1;
	else storage.picNum=0;
	for (var i=0;i < box.length;i++)
	{
		if (i == storage.picNum)
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
	if (storage.picNum != 0) storage.picNum=Number(storage.picNum)-1;
	else storage.picNum=6;
	for (var i=0;i < box.length;i++)
	{
		if (i == storage.picNum)
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
function nextpage()
{
	if (storage.pageNum < 3)
	{
		storage.pageNum=Number(storage.pageNum)+1;
		gotoPage();
	}
	else alert("已经是最后一页啦！");
}
function lastpage()
{
	if (storage.pageNum > 1)
	{
		storage.pageNum=Number(storage.pageNum)-1;
		gotoPage();
	}
	else alert("已经是第一页啦！");
}
$($("#next-pic")[0].children[0]).click(ShowNextPic);
$($("#next-pic")[0].children[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("#next-pic")[0].children[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("#last-pic")[0].children[0]).click(ShowLastPic);
$($("#last-pic")[0].children[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("#last-pic")[0].children[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("ul")[0]).mouseover(function(){stop=window.clearInterval(stop);});
$($("ul")[0]).mouseout(function(){stop=self.setInterval("ShowNextPic()",3000)});
$($("#next-page")[0]).click(nextpage);
$($("#last-page")[0]).click(lastpage);
