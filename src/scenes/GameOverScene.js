/**
 * Created by None on 5/10/15.
 */
var GameOverScene = cc.Scene.extend({
        onEnter:function() {
            this._super();
            var layer = new GameOverLayer();
            this.addChild(layer);
        }
    }
);