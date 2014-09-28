
function calcNextCellStage(row,col,n,grid){
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
