/**
 * Created by None on 5/11/15.
 */
var MapDataService  = cc.Class.extend({
    currentBlockInfo:null,
    nextBlockInfo:null,
    score:0,
    _gears:null,
    ctor:function() {
        this.currentBlockInfo = {};
        this.nextBlockInfo = {};
        this._gears = [];
        return true;
    },

    generateBlock:function() {
        if (this.nextBlockInfo.block) {
            this.currentBlockInfo.block = this.nextBlockInfo.block;
            this.currentBlockInfo.transform = this.nextBlockInfo.transform;
        } else {
            this.currentBlockInfo.block = dtRndBlk();
            this.currentBlockInfo.transform = dtRndTransfer();
        }
        this.nextBlockInfo.block = dtRndBlk();
        this.nextBlockInfo.transform = dtRndTransfer();

        return this.currentBlockInfo;
    },

    getCurrentBlockInfo:function() {
        return this.currentBlockInfo;
    },

    getNextBlockInfo:function() {
        return this.nextBlockInfo;
    },

    addScore:function(scoreAdd) {
        this.score += scoreAdd;
        if (this.score < 0) {
            this.score = 0;
        }
    },

    getScore:function() {
        return this.score;
    },

    addGears:function(gears) {
        var hit = false;
        for (var i = 0; i < gears.length; i++) {
            hit = false;
            for (var j = 0; j < this._gears.length; j ++) {
                if (this._gears[j].type == gears[i].type) {
                    this._gears[j].count += gears[j].count;
                    hit = true;
                    break;
                }
            }
            if (!hit) {
                this._gears.push(gears[i]);
            }
        }
    },

    subGear:function(gear) {
        for (var i = 0; i < this._gears.length; i++) {
            if (this._gears[i].type == gear) {
                this._gears[i].count --;
                break;
            }
        }
    },

    hasGear: function(gear) {
        var result = false;
        for (var i = 0; i < this._gears.length; i++) {
           if (this._gears[i].type == gear && this._gears[i].count > 0) {
               result = true;
               break;
           }
        }
        return result;
    }
});