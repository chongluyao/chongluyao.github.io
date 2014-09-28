var grid = new Array(n);
for(var i = 0; i < n; i++){
	grid[i] = new Array();
}

//初始化棋盘，随机生成每个格子的生死状态，生的格子占20%
function initGrid(n){
	var thre = 0.8;
	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			if(Math.random() < thre){
				grid[i][j] = 0;
			}
			else{
				grid[i][j] = 1;
			}
		}
	}
}

//计算棋盘的下一个状态
function calcNextGridStage(n){
	var result = new Array(n);
	for(var i = 0; i < n; i++){
		result[i] = new Array();
	}

	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			result[i][j] = calcNextCellStage(i,j);
		}
	}

	grid = result;
}

//计算某个格子的下一个状态
function calcNextCellStage(row,col){
	liveNum = 0;
	var ri,rj;
	for(i = row - 1; i <= row + 1; i++){
		for(j = col - 1; j <= col + 1; j++){
			ri = (i + n) % n;
			rj = (j + n) % n;
			if(row == ri && col == rj) continue;
			liveNum += grid[ri][rj];
		}
	}

	if(liveNum == 2){
		return grid[row][col];
	}
	else if(liveNum == 3){
		return 1;
	}
	else{
		return 0;
	}
}
