var nextStage;
var interval = 500;
var state = 0; //0表示暂停状态，1表示运行状态

function restartGame(){            //重置游戏
	window.clearInterval(nextStage);
	initGrid(n);
	updateGrid(n);
	state = 0;
}

function resumeOrPauseGame(){              //开始或暂停游戏
	if(state == 0){
		nextStage = window.setInterval(function(){
			calcNextGridStage(n);updateGrid(n);}, interval);
		state = 1;	
	}
	else{
		window.clearInterval(nextStage);
		state = 0;		
	}
}

function accelerate(){                  //加速
	interval *= 0.8;
	if(state == 1){
		window.clearInterval(nextStage);
		nextStage = window.setInterval(function(){
			calcNextGridStage(n);updateGrid(n);}, interval);		
	}
}

function decelerate(){                   //减速
	interval /= 0.8;
	if(state == 1){
		window.clearInterval(nextStage);
		nextStage = window.setInterval(function(){
			calcNextGridStage(n);updateGrid(n);}, interval);
	}
}

$(window).keydown(function(event){ // keyboard-down alerts
	switch (event.keyCode) {
    	case 37: // 'Left' key
        	decelerate();
        	break;
    	case 39: // 'Right' key
        	accelerate();
        	break;
		case 32: // spacebar
			resumeOrPauseGame();
			break;
		case 82: // 'R' key
			restartGame();
			break;
	}
});

