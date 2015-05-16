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

		var background = new cc.Sprite(res.background_game_png);
		background.setNormalizedPosition(0.5, 0.5);
		this.addChild(background);

		this.curMap = new MapLayer(this);
		this.curMap.attr({
			x : (size.width - DTBlockSize * DT_MAP_SIZE.width) / 2,
			y : size.height - DTBlockSize * DT_MAP_SIZE.height
		});

		var menuItemPause = new cc.MenuItemImage(res.button_pause_png, res.button_pause_png, res.button_pause_png, this.pauseGame, this);
		var menu = new cc.Menu(menuItemPause);
		menu.attr({
			x : size.width - menuItemPause.getContentSize().width - 10,
			y : size.height - menuItemPause.getContentSize().height - 10,
			anchorX : 1,
			anchorY : 1
		});
		this.addChild(menu);

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

	pauseGame:function() {
		if (cc.director.isPaused()) {
			cc.director.resume();
		} else {
			cc.director.pause();
		}
	},

	resumeGame:function() {
		cc.director.resume();
	},

	onEnter:function() {
		this._super();
		this.dropBlock();
		cc.eventManager.addListener({
        	event: cc.EventListener.KEYBOARD, 
	        onKeyPressed: function(keyCode, event) {
	        	// cc.log("Key with keycode " + keyCode + " pressed");
                //var target = event.getCurrentTarget();
                //switch (keyCode) {
					//case KEYCODE_UP:
					//{
					//	target.upButtonTouchDown();
					//	break;
					//}
					//case KEYCODE_RIGHT:
					//{
					//	target.rightButtonTouchDown();
					//	break;
					//}
					//case KEYCODE_DOWN:
					//{
					//	target.downButtonTouchDown();
					//	break;
					//}
					//case KEYCODE_LEFT:
					//{
					//	target.leftButtonTouchDown();
					//	break;
					//}
                //}
				var target = event.getCurrentTarget();
				switch (keyCode) {
					case KEYCODE_UP:
					{
						cc.audioEngine.playEffect(sound.rotate_wav, false);
						target.upButtonTouchUpInside();
						break;
					}
					case KEYCODE_RIGHT:
					{
						cc.audioEngine.playEffect(sound.rotate_wav, false);
						target.rightButtonTouchUpInside();
						break;
					}
					case KEYCODE_DOWN:
					{
						cc.audioEngine.playEffect(sound.rotate_wav, false);
						target.downButtonTouchDown();
						break;
					}
					case KEYCODE_LEFT:
					{
						cc.audioEngine.playEffect(sound.rotate_wav, false);
						target.leftButtonTouchUpInside();
						break;
					}
				}
			},
			onKeyReleased: function(keyCode, event) {
				// cc.log("Key with keycode " + keyCode + " released");
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

	onScoreChange:function(change) {
		cc.log("GameLayer.onScoreChange()");
		cc.audioEngine.playEffect("res/sound/brickup_" + change + ".mp3", false);
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

		//this.resetTouchTime();
    },

	upButtonTouchDown:function(sender, controlEvent) {
		//this.touchUpTime = 0;
		cc.audioEngine.playEffect(sound.rotate_wav, false);
	},

	rightButtonTouchDown:function(sender, controlEvent) {
		cc.audioEngine.playEffect(sound.button_pressed_normal_mp3, false);
		this.touchRightTime = 0;
	},

	leftButtonTouchDown:function(sender, controlEvent) {
		cc.audioEngine.playEffect(sound.button_pressed_normal_mp3, false);
		this.touchLeftTime = 0;
	},

	downButtonTouchDown:function(sender, controlEvent) {
		cc.audioEngine.playEffect(sound.button_pressed_normal_mp3, false);
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
			cc.audioEngine.playEffect(sound.throwdown_wav, false);
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
			cc.audioEngine.playEffect(sound.throwdown_wav, false);
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
			cc.audioEngine.playEffect(sound.landing_mp3, false);
    		this.curMap.updateMapData();
    		if (this.curMap.checkGameOver(DT_DIRECTION_DOWN)) {
				cc.audioEngine.playEffect(sound.gameover_mp3, false);
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