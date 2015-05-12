var MenuLayer = cc.Layer.extend({
	ctor:function() {
		this._super();

		var size = cc.winSize;

		var startItem = new cc.MenuItemLabel(new cc.LabelTTF("开始游戏", "Arial", 50), this.startGame, this);

		var menu = new cc.Menu(startItem);
		menu.attr({
			x : size.width / 2,
			y : size.height / 2,
			anchorX : 0.5,
			anchorY : 0.5
		});
		this.addChild(menu);

		return true;
	}, 

	startGame:function() {
		cc.director.runScene(new cc.TransitionFade(1.2, new GameScene()));
	}
});