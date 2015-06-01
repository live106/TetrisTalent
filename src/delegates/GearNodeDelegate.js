/**
 * Created by Allan on 2015/6/1.
 */
var GearNodeDelegate = cc.Layer.extend({
    ctor: function () {
        this._super();

        return true;
    },

    onGearUse: function (gear) {
        cc.log("use gear" + gear);
    }
});