var DT_DEBUG = false;

var DT_MAP_SIZE = cc.size(10, 15);
var DTBlockSize = 40;
var DTBlockRotateSpeed = 0.3;
var DTBlockDownSpeed = 0.5;

var blkL0 = {
	res : res.block_blue_png, 
	data : 
		[ 
			[1, 0],
			[1, 0],
			[1, 1]
		]
	};

var blkL1 = {
	res : res.block_blue_png, 
	data : 
		[
		 	[0, 1],
		 	[0, 1],
		 	[1, 1]
		]
	};

var blkS0 = {
	res : res.block_green_png, 
	data : 
		[
		 	[0, 1],
		 	[1, 1],
		 	[1, 0]
		]
	};

var blkS1 = {
	res : res.block_green_png, 
	data : 
		[
		 	[1, 0],
		 	[1, 1],
		 	[0, 1]
		]
	};

var blkLine = {
	res : res.block_purple_png, 
	data :
		[
			[1],
			[1],
			[1],
			[1]
		]
	};

var blkSquare = {
	res : res.block_red_png, 
	data : 
		[
		 	[1, 1],
		 	[1, 1]
		]
	};

var blkT = {
	res : res.block_yellow_png,
	data :
		[
			[0, 1],
			[1, 1],
			[0, 1]
		]
	};

DT_TRANSFER_NONE = 0;
DT_TRANSFER_90 = 1;
DT_TRANSFER_180 = 2;
DT_TRANSFER_270 = 3;

DT_DIRECTION_ALL = 0;
DT_DIRECTION_DOWN = 1;
DT_DIRECTION_RIGHT = 2;
DT_DIRECTION_LEFT = 3;

var DT_BLOCKS = [blkL0, blkL1, blkS0, blkS1, blkLine, blkSquare, blkT];
var DT_TRANSFERS = [DT_TRANSFER_NONE, DT_TRANSFER_90, DT_TRANSFER_180, DT_TRANSFER_270];

var dtRndBlk = function() {
	return DT_BLOCKS[random(0, DT_BLOCKS.length - 1)];
}

var dtRndTransfer = function() {
	return DT_TRANSFERS[random(0, DT_TRANSFERS.length - 1)];
}

function random(min, max)
{   
	var range = max - min;   
	var rand = Math.random();   
	return (min + Math.round(rand * range));   
}
//长按按钮多少s后按长按键操作计算
var KEY_LONG_PRESS_DELAY = 0.5;

var KEYCODE_BACKSPACE = 8;
var KEYCODE_ENTER = 13;
var KEYCODE_ALT = 18;
var KEYCODE_SPACE = 32;//$20
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var KEYCODE_NUMPAD0 = 96;
var KEYCODE_NUMPAD1 = 97;