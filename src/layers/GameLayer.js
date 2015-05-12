var GameLayer = MapLayerDelegate.extend({
	curMap:null,
	moveStop:true,
	touchLeftTime:-1.0,
	touchRightTime:-1.0,
	touchUpTime:-1.0,
	touchDownTime:-1.0,
	downTicker:0.0,
	gameOver:false,
	nextBlock:null,
	scoreLabel:null,
	ctor:function() {
		this._super();

		var size = cc.winSize;

		this.curMap = new MapLayer(this);
		this.curMap.attr({
			x : (size.width - DTBlockSize * DT_MAP_SIZE.width) / 2,
			y : size.height - DTBlockSize * DT_MAP_SIZE.height
		});

		this.addChild(this.curMap);

		var controller = new ControllerNode(this);
		controller.attr({
			x : size.width / 2,
			y : 170
		});
		this.addChild(controller);

		this.scheduleUpdate();

		return true;
	},

	onEnter:function() {
		this._super();
		this.dropBlock();
		cc.eventManager.addListener({
        	event: cc.EventListener.KEYBOARD, 
	        onKeyPressed: function(keyCode, event) {
	        	// cc.log("Key with keycode " + keyCode + " pressed");
	        	var target = event.getCurrentTarget();
	        	switch (keyCode) {
	        		case KEYCODE_UP:
	        		{
	        			target.upButtonTouchUpInside();
	        			break;
	        		}
	        		case KEYCODE_RIGHT:
	        		{
	        			target.rightButtonTouchUpInside();
	        			break;
	        		}
	        		case KEYCODE_DOWN:
	        		{
	        			target.downButtonTouchUpInside();
	        			break;
	        		}
	        		case KEYCODE_LEFT:
	        		{
	        			target.leftButtonTouchUpInside();
	        			break;
	        		}
	        	}
        	},
        	onKeyReleased: function(keyCode, event) {
        		// cc.log("Key with keycode " + keyCode + " released");  
        		//var target = event.getCurrentTarget();
        		//target.resetTouchTime();
	        }
        }, this);

		//score label
		var size = cc.winSize;
		this.scoreLabel = new cc.LabelTTF("score\n0", "Arial", 24);
		this.scoreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		this.scoreLabel.attr({
			x : 40,
			y : size.height - 200,
			anchorX : 0.5,
			anchorY : 0.5
		});
		this.scoreLabel.setDimensions(80, 0);
		this.addChild(this.scoreLabel);
	},

	onScoreChange:function() {
		cc.log("GameLayer.onScoreChange()");

		this.scoreLabel.setString("score\n" + this.curMap.mapDataService.getScore());
	},

	dropBlock:function() {
		this.resetTouchTime();

		this.curMap.dropBlock();

		var size = cc.winSize;

		var nextBlockInfo = this.curMap.mapDataService.getNextBlockInfo();
		if (!this.nextBlock) {
			this.nextBlock = new BlockNode(nextBlockInfo.block, nextBlockInfo.transform);
			this.addChild(this.nextBlock);
		} else {
			this.nextBlock.updateBlock(nextBlockInfo.block, nextBlockInfo.transform);
		}

		this.nextBlock.attr({
			x : 40 - 0.38 * this.nextBlock.curData[0].length * DTBlockSize / 2,
			y : size.height - 100 - 0.38 * this.curMap.getBottomY(this.nextBlock.curData),
			scale : 0.38
		});
	},

	upButtonTouchUpInside:function (sender, controlEvent) {
		if (this.gameOver) {
			return;
		}
		if (this.curMap.rotateBlock()) {
			//this.touchUpTime = 0;
		//} else {
		//	this.touchUpTime = -1.0;
		}
    },

    rightButtonTouchUpInside:function (sender, controlEvent) {
		if (this.gameOver) {
			return;
		}
		this.moveRight(false);

		this.resetTouchTime();
    },

    leftButtonTouchUpInside:function (sender, controlEvent) {
		if (this.gameOver) {
			return;
		}
		this.moveLeft(false);

		this.resetTouchTime();
    },

    downButtonTouchUpInside:function (sender, controlEvent) {
		if (this.gameOver) {
			return;
		}

		this.resetTouchTime();
    },

	upButtonTouchDown:function(sender, controlEvent) {
		//this.touchUpTime = 0;
	},

	rightButtonTouchDown:function(sender, controlEvent) {
		this.touchRightTime = 0;
	},

	leftButtonTouchDown:function(sender, controlEvent) {
		this.touchLeftTime = 0;
	},

	downButtonTouchDown:function(sender, controlEvent) {
		this.touchDownTime = 0;
	},

    moveButtonTouchUp:function (sender, controlEvent) {
    	//this.resetTouchTime();
    },

    moveRight:function(toEnd) {
    	var stop = this.curMap.checkStop(DT_DIRECTION_RIGHT);
		if (!stop) {
			this.curMap.curBlock.x += DTBlockSize;
			if (toEnd) {
				this.moveRight(toEnd);
			} else {
				this.resetTouchTime();
			}
		} else {
			this.resetTouchTime();
			return;
		}
    },

    moveLeft:function(toEnd) {
    	var stop = this.curMap.checkStop(DT_DIRECTION_LEFT);
		if (!stop) {
			this.curMap.curBlock.x -= DTBlockSize;
			if (toEnd) {
				this.moveLeft(toEnd);
			} else {
				this.resetTouchTime();
			}
		} else {
			this.resetTouchTime();
			return;
		}
    },

    moveDown:function(toEnd) {
    	var stop = this.curMap.checkStop(DT_DIRECTION_DOWN);
    	if (!stop) {
    		this.curMap.curBlock.y -= DTBlockSize;
			if (toEnd) {
				this.moveDown(toEnd);
			}
    	} else {
    		this.curMap.updateMapData();
    		if (this.curMap.checkGameOver(DT_DIRECTION_DOWN)) {
				this.gameOver = true;
				this.unscheduleUpdate();
				cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
				return;
			} else {
				this.dropBlock();
			}
			this.resetTouchTime();

			return;
    	}
    },

    resetTouchTime:function() {
    	this.touchLeftTime = -1.0;
    	this.touchRightTime = -1.0;
    	//this.touchUpTime = -1.0;
    	this.touchDownTime = -1.0;
    },

	update:function(dt) {
		if (this.gameOver) {
			return;
		}
		if (this.touchDownTime >= 0) {
			this.moveDown(true);
			return;
		} else {
			this.downTicker += dt;
			if (this.downTicker >= DTBlockDownSpeed) {
				this.downTicker = 0.0;
				this.moveDown(false);
			}
		}
		
		if (this.touchLeftTime >= 0) {
			this.touchLeftTime += dt;
		} else if (this.touchRightTime >= 0) {
			this.touchRightTime += dt;
		//} else if (this.touchUpTime >= 0) {
		//	this.touchUpTime += dt;
		//} else if (this.touchDownTime >= 0) {
		//	this.touchDownTime += dt;
		}

		if (this.touchLeftTime >= KEY_LONG_PRESS_DELAY) {
			this.moveLeft(true);
		} else if (this.touchRightTime >= KEY_LONG_PRESS_DELAY) {
			this.moveRight(true);
		//} else if (this.touchUpTime >= KEY_LONG_PRESS_DELAY + DTBlockRotateSpeed) {
			//	this.curMap.rotateBlock();
			//	this.touchUpTime = KEY_LONG_PRESS_DELAY;
			// } else if (this.touchDownTime >= 0) {
			// 	this.moveDown();
		}
	}
});