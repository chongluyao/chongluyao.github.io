var n = 20;

//绘制棋盘
function drawGrid(n){
	var td = $("<td/>");
	for (var i = 0;i < n;i ++){
		var tr = $("<tr/>");
		$("table").append(tr);
		for (var j = 0;j < n;j ++){
			var td = $("<td/>");
			tr.append(td);
		}
	}
}

//更新棋盘的状态
function updateGrid(n){
	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			if(grid[i][j]){
				$($('tr')[i].childNodes[j]).attr('class', 'live');
			}
			else{
				$($('tr')[i].childNodes[j]).attr('class', 'dead');
			}
		}
	}
}
