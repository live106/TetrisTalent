/**
 * Created by None on 5/11/15.
 */
var MapLayerDelegate = cc.Layer.extend({
    ctor: function () {
        this._super();

        return true;
    },

    onScoreChange: function (change) {
        cc.log("score change " + change);
    },

    onGearGot: function (gears) {
        cc.log("got gear " + gears.length);
    }

});