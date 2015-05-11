/**
 * Created by None on 5/10/15.
 */
var GameOverLayer = cc.Layer.extend({
    ctor:function() {
        this._super();

        var size = cc.winSize;

        var ttfGameOver = new cc.LabelTTF("Game Over !", "Arial", 30);
        ttfGameOver.attr({
            x : size.width  / 2,
            y : size.height / 2 + 100
        });
        this.addChild(ttfGameOver);

        var restartItem = new cc.MenuItemLabel(new cc.LabelTTF("重新开始", "Arial", 38), this.startGame, this);

        var menu = new cc.Menu(restartItem);
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