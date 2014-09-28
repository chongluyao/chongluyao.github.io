var n = 20;
var grid = new Array(n);
for(var i = 0; i < n; i++){
	grid[i] = new Array();
}


//---------平凡点测试--------------
module("Ordinary");

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[4][4] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 0,"dead!");
	grid[4][5] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 0,"dead!");
	grid[4][6] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 1,"live!");
	grid[5][4] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 0,"dead!");
});

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[5][5] = 1;
	grid[4][4] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 0,"dead!");
	grid[4][5] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 1,"live!");
	grid[4][6] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 1,"live!");
	grid[5][4] = 1;
	ok(calcNextCellStage(5,5,n,grid) == 0,"dead!");
});
//---------边测试--------------
module("Edge");

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[19][9] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 0,"dead!");
	grid[19][10] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 0,"dead!");
	grid[19][11] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 1,"live!");
	grid[0][9] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 0,"dead!");
});

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[0][10] = 1;
	grid[19][9] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 0,"dead!");
	grid[19][10] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 1,"live!");
	grid[19][11] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 1,"live!");
	grid[0][9] = 1;
	ok(calcNextCellStage(0,10,n,grid) == 0,"dead!");
});
//---------角测试--------------
module("Corner");

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[19][19] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 0,"dead!");
	grid[19][0] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 0,"dead!");
	grid[19][1] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 1,"live!");
	grid[0][19] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 0,"dead!");
});

test("CellStageTest",function(){
	for (var i = 0;i < n;i ++)
		for (var j = 0;j < n;j ++)
			grid[i][j] = 0;
	grid[0][0] = 1;
	grid[19][19] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 0,"dead!");
	grid[19][0] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 1,"live!");
	grid[19][1] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 1,"live!");
	grid[0][19] = 1;
	ok(calcNextCellStage(0,0,n,grid) == 0,"dead!");
});