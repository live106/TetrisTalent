/**
 * Created by None on 5/11/15.
 */
var MapDataService  = cc.Class.extend({
    currentBlockInfo:null,
    nextBlockInfo:null,
    ctor:function() {
        this.currentBlockInfo = {};
        this.nextBlockInfo = {};
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
    }
});