var MenuLayer = cc.Layer.extend({
	ctor:function() {
		this._super();

		var winSize = cc.winSize;

		var background = new cc.Sprite(res.background_game_png);
		background.setNormalizedPosition(0.5, 0.5);
		this.addChild(background);

		var levelSize = cc.size(480, 450);

		var pageView = new ccui.PageView();
		pageView.setTouchEnabled(true);
		pageView.setContentSize(levelSize);
		pageView.setPosition((winSize.width - levelSize.width) / 2, (winSize.height - levelSize.height) / 2);

		for (var i = 0; i < 3; ++i) {
			var layout = new ccui.Layout();
			layout.setContentSize(levelSize);
			var layoutRect = layout.getContentSize();

			var imageView = new ccui.ImageView();
			imageView.setTouchEnabled(true);
			imageView.setScale9Enabled(true);
			imageView.loadTexture(res.background_level_png);
			imageView.setContentSize(levelSize);
			imageView.x = layoutRect.width / 2;
			imageView.y = layoutRect.height / 2;
			layout.addChild(imageView);

			var text = new ccui.Text();
			text.string = "Level " + (i + 1);
			text.font = "60px 'Arial'";
			text.color = cc.color(192, 192, 0);
			text.x = layoutRect.width / 2;
			text.y = layoutRect.height / 2;
			layout.addChild(text);

			pageView.addPage(layout);
		}

		pageView.addEventListener(this.levelTouch, this);
		this.addChild(pageView);

		var startItem = new cc.MenuItemLabel(new cc.LabelTTF("开始游戏", "Arial", 50), this.startGame, this);
		startItem.setAnchorPoint(0.5, 1);
		var menu = new cc.Menu(startItem);
		menu.attr({
			x : winSize.width / 2,
			y : (winSize.height - levelSize.height) / 2 - 20,
			anchorX : 0.5,
			anchorY : 1
		});
		this.addChild(menu);
        //

		//test ccs node
		var fireNode = ccs.load(res.ui_particlefirenode_json);
		fireNode.node.setNormalizedPosition(cc.p(0.5, 0.5));
		this.addChild(fireNode.node);
		//

        //test pomelo chat
		var connItem = new cc.MenuItemLabel(new cc.LabelTTF("测试连接", "Arial", 40), this.testPomeloConnect, this);
		var chatItem = new cc.MenuItemLabel(new cc.LabelTTF("测试聊天", "Arial", 40), this.testChat, this);
		var testMenu = new cc.Menu(connItem, chatItem);
		testMenu.alignItemsHorizontallyWithPadding(50);
		testMenu.attr({
			x : 200,
			y : 100
		});
		this.addChild(testMenu);
		/*
		var posX = 100;
		var posY = 50;
		var connBtn = new ccui.Button();
		connBtn.setTouchEnabled(true);
		connBtn.addTouchEventListener(this.testPomeloConnect, this);
		connBtn.setTitleText("connect");
		//var title = connBtn.getTitleRenderer();
		//title.setFontSize(40);
		//title.enableShadow(cc.color.RED, cc.size(2, -2));
		//title.enableStroke(cc.color.GREEN, 2);
		//connBtn.setTitleFontSize(new cc.Size(100, 100));
		connBtn.attr({
			x : posX,
			y : posY
		});
		this.addChild(connBtn);
		posX += 150;
        //
		var testBtn = new ccui.Button();
		testBtn.setTouchEnabled(true);
		testBtn.addTouchEventListener(this.testChat, this);
		testBtn.setTitleText("chat");
		//title = testBtn.getTitleRenderer();
		//title.setFontSize(40);
		//title.enableShadow(cc.color.RED, cc.size(2, -2));
		//title.enableStroke(cc.color.GREEN, 2);
		//testBtn.setTitleFontSize(new cc.Size(100, 100));
		testBtn.attr({
			x : posX,
			y : posY
		});
		this.addChild(testBtn);
		*/
		//


		cc.error("enter menu layer.");

		return true;
	},

	testPomeloConnect:function(sender, type) {
		new pomeloHandler().pomeloConnect();
	},

	testChat:function(sender, type) {
		cc.log("test chat!");
		//require("../test/pomelo/chatHandler.js");
		new pomeloHandler().chat();
	},

	levelTouch:function(sender, type) {
		switch (type) {
			case ccui.PageView.EVENT_TURNING:
			{

			}
		}
		cc.log("level touch type : %s", type);
	},

	startGame:function() {
		cc.director.runScene(new cc.TransitionFade(1.2, new GameScene()));
	}
});