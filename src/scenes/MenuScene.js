var MenuScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var layer = new MenuLayer();
		this.addChild(layer);
	}
});