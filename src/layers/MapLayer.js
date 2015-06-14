/**
 * start pos [0, 0] direction right up
 **/
var MapLayer = GearNodeDelegate.extend({
    mapData: null,
    //mapSprites: null,
    curBlock: null,
    mapNode: null,
    mapDataService: null,
    delegate: null,
    ctor: function (pDelegate) {
        this._super();

        this.delegate = pDelegate;
        this.mapDataService = new MapDataService();

        this.mapData = new Array();
        //this.mapSprites = new Array();

        this.mapNode = new cc.Node();
        this.addChild(this.mapNode);

        var posX = 0;
        var posY = 0;
        for (var i = 0; i < DT_MAP_SIZE.height; i++) {
            this.mapData[i] = new Array();
            for (var j = 0; j < DT_MAP_SIZE.width; j++) {
                this.mapData[i][j] = 0;
                var block = new cc.Sprite(res.block_select_png);
                block.attr({
                    x: posX,
                    y: posY,
                    anchorX: 0,
                    anchorY: 0
                });
                block.scale = DTBlockSize / block.getContentSize().width;
                this.mapNode.addChild(block);
                //this.mapSprites.push(block);
                posX += DTBlockSize;
            }
            posX = 0;
            posY += DTBlockSize;
        }

        return true;
    },

    dropBlock: function () {
        var blockInfo = this.mapDataService.generateBlock();

        if (!this.curBlock) {
            this.curBlock = new BlockNode(blockInfo.block, blockInfo.transform);
            this.addChild(this.curBlock, -1);
        } else {
            this.curBlock.updateBlock(blockInfo.block, blockInfo.transform);
        }

        this.curBlock.attr({
            x: DTBlockSize * (DT_MAP_SIZE.width / 2 - Math.round(this.curBlock.curData[0].length / 2)),
            y: DTBlockSize * (DT_MAP_SIZE.height - this.getBottomY(this.curBlock.curData)),
            anchorX: 0,
            anchorY: 0
        });
    },

    checkGameOver: function (direction) {
        var result = false;
        var posInMap = this.convertPosInPixelToPosInMap(this.curBlock.getPosition());
        if (Math.round(posInMap.y) >= this.mapData.length - 1) {
            result = true;
            this.curBlock.removeFromParent(true);
        }
        return result;
    },

    rotateBlock: function () {
        var blkData = this.curBlock.getRotateData();
        var posInMap = this.convertPosInPixelToPosInMap(this.curBlock.getPosition());
        if (this.checkCollision(blkData, DT_DIRECTION_ALL, posInMap)) {
            return false;
        } else {
            this.curBlock.rotate();
        }
        return true;
    },

    checkStop: function (direction) {
        var posInMap = this.convertPosInPixelToPosInMap(this.curBlock.getPosition());
        switch (direction) {
            case DT_DIRECTION_DOWN:
            {
                posInMap.y -= 1;
                break;
            }
            case DT_DIRECTION_LEFT:
            {
                posInMap.x -= 1;
                break;
            }
            case DT_DIRECTION_RIGHT:
            {
                posInMap.x += 1;
                break;
            }
        }
        return this.checkCollision(this.curBlock.getData(), direction, posInMap);
    },

    checkCollision: function (blkData, direction, posInMap) {
        //check bottom edge
        if (direction == DT_DIRECTION_DOWN || direction == DT_DIRECTION_ALL) {
            var blkBottomPosY = this.getBottomY(blkData);
            if (posInMap.y + blkBottomPosY - (blkData.length - 1) < 0) {
                //cc.log("pos in map : [%d, %s], blk pos y : %d", posInMap.x, posInMap.y, blkBottomPosY);
                //this.drawTowDimensionArray("checkCollision blk data", blkData, 0);
                // this.drawTowDimensionArray("checkCollision map data", this.mapData, 1);
                return true;
            }
        }
        if (direction == DT_DIRECTION_LEFT || direction == DT_DIRECTION_ALL) {
            var blkLeftPosX = this.getLeftX(blkData);
            if (posInMap.x + blkLeftPosX < 0) {
                return true;
            }
        }
        if (direction == DT_DIRECTION_RIGHT || direction == DT_DIRECTION_ALL) {
            var blkRightPosX = this.getRightX(blkData);
            if (posInMap.x + blkRightPosX >= DT_MAP_SIZE.width) {
                return true;
            }
        }

        var m, n = 0;
        for (var i = blkData.length - 1; i >= 0; i--) {
            m = parseInt(posInMap.y) - i;
            if (m < 0 || m >= this.mapData.length) {
                continue;
            }
            n = 0;
            for (var j = 0; j < blkData[i].length; j++) {
                n = parseInt(posInMap.x) + j;
                if (n < 0 || n >= this.mapData[m].length) {
                    continue;
                }
                if (blkData[i][j] > 0 && this.mapData[m][n] > 0) {
                    //cc.log("pos in map : [%d, %d]", posInMap.x, posInMap.y);
                    //this.drawTowDimensionArray("checkCollision blk data", blkData, 0);
                    // this.drawTowDimensionArray("checkCollision map data", this.mapData, 1);
                    return true;
                }
            }
        }

        return false;
    },

    getBottomY: function (blkData) {
        var blkBottomPosY = 0;
        var stop = false;
        for (var i = blkData.length - 1; i >= 0; i--) {
            for (var j = 0; j < blkData[i].length; j++) {
                if (blkData[i][j] > 0) {
                    stop = true;
                    break;
                }
            }
            if (stop) {
                // cc.log("stop %d", i);
                break;
            }
            blkBottomPosY++;
        }
        return blkBottomPosY;
    },

    getLeftX: function (blkData) {
        var blkLeftPosX = blkData[0].length - 1;
        for (var i = blkData.length - 1; i >= 0; i--) {
            for (var j = 0; j < blkData[i].length; j++) {
                if (blkData[i][j] > 0 && j < blkLeftPosX) {
                    blkLeftPosX = j;
                }
            }
            if (blkLeftPosX == 0) {
                break;
            }
        }
        return blkLeftPosX;
    },

    getRightX: function (blkData) {
        var blkRightPosX = 0;
        for (var i = blkData.length - 1; i >= 0; i--) {
            for (var j = 0; j < blkData[i].length; j++) {
                if (blkData[i][j] > 0 && j > blkRightPosX) {
                    blkRightPosX = j;
                }
            }
            if (blkRightPosX == blkData[0].length - 1) {
                break;
            }
        }
        return blkRightPosX;
    },

    convertPosInPixelToPosInMap: function (pos) {
        return cc.p(Math.round(pos.x / DTBlockSize), Math.round(pos.y / DTBlockSize));
    },

    updateMapData: function () {
        var blkData = this.curBlock.getData();
        var posInMap = this.convertPosInPixelToPosInMap(this.curBlock.getPosition());

        this.drawTowDimensionArray("updateMapData blk data", blkData, 0);
        //cc.log("pos in map : [%d, %s] position : [%f, %f]", posInMap.x, posInMap.y, this.curBlock.getPosition().x, this.curBlock.getPosition().y);

        var m, n = 0;
        this.drawTowDimensionArray("updateMapData map data before", this.mapData, 1);
        for (var i = blkData.length - 1; i >= 0; i--) {
            m = parseInt(posInMap.y) - i;
            //cc.log("m : %d", m);
            if (m < 0 || m >= this.mapData.length) {
                continue;
            }
            for (var j = 0; j < blkData[i].length; j++) {
                if (blkData[i][j] <= 0) {
                    continue;
                }
                n = parseInt(posInMap.x) + j;
                //cc.log("n : %d", n);
                if (n < 0 || n >= this.mapData[m].length) {
                    continue;
                }
                this.mapData[m][n] = blkData[i][j];
                this.drawTowDimensionArray("updateMapData map data ...", this.mapData, 1);
            }
        }

        this.drawTowDimensionArray("updateMapData map data after", this.mapData, 1);

        this.redrawMap();
        this.checkEliminate();
    },

    checkEliminate: function () {
        var clearIndexes = new Array();
        var needClear = false;
        for (var i = 0; i < this.mapData.length; i++) {
            needClear = true;
            for (var j = 0; j < this.mapData[i].length; j++) {
                if (this.mapData[i][j] <= 0) {
                    needClear = false;
                    break;
                }
            }
            if (needClear) {
                clearIndexes.push(i);
            }
        }
        if (clearIndexes.length > 0) {
            this.doClearLines(clearIndexes);
        }
    },

    doClearLines: function (clearIndexes) {
        //TODO sort indexes desc
        for (var i = clearIndexes.length - 1; i >= 0; i--) {
            //cc.log("clear line : %d", clearIndexes[i]);
            for (var line = clearIndexes[i]; line < this.mapData.length - 1; line++) {
                this.mapData[line] = this.mapData[line + 1].concat();
            }
        }
        //add score
        var score = clearIndexes.length;
        this.mapDataService.addScore(score);
        if (this.delegate) {
            this.delegate.onScoreChange(score);
        }
        //gear
        var gears = this.checkGear(score);
        if (this.delegate && gears.length > 0) {
            this.delegate.onGearGot(gears);
        }
        this.redrawMap();
        this.drawTowDimensionArray("doClearLines map data after", this.mapData, 1);
    },

    checkGear: function (score) {
        var gears = [];
        for (var i in TTGearConfig.configure) {
            var condition = TTGearConfig.configure[i].condition;
            switch (condition.type) {
                case TTGearTrigger.trigger_type_clear_lines :
                {
                    if (score >= condition.value) {
                        gears.push(TTGearConfig.configure[i].gear);
                    }
                    break;
                }
                case TTGearTrigger.trigger_type_score:
                {
                    //FIXME 详细设计累计分数获得道具机制
                    //if (this.mapDataService.getScore() >= condition.value) {
                    //    gears.push(TTGearConfig.configure[i].gear);
                    //}
                    break;
                }
                case TTGearTrigger.trigger_type_combo_score:
                {
                    // TODO
                    break;
                }
            }
        }

        return gears;
    },

    onGearUse: function (gear) {
        switch (gear.type) {
            case TTGearType.gear_type_decline:
            {
                this.doClearLines([0]);
                break;
            }
            case TTGearType.gear_type_repair:
            {
                this.doRepairBlock(1);
                break;
            }
            case TTGearType.gear_type_bomb:
            {
                this.doExplosion(5);
                break;
            }
            case TTGearType.gear_type_hammer:
            {
                break;
            }
        }
    },

    doRepairBlock: function(num) {
        var cnt = 0;
        for(var i = 0; i < DT_MAP_SIZE.height; i++) {
            for (var j = 0;j < DT_MAP_SIZE.width; j++) {
                if (this.mapData[i][j] <= 0) {
                    this.mapData[i][j] = 1;//FIXME 后期可能需要分不同颜色块
                    cnt ++;
                    if (cnt >= num) {
                        break;
                    }
                }
            }
            if (cnt >= num) {
                break;
            }
        }
        this.checkEliminate();
        this.redrawMap();
    },

    //explosion block x num random
    doExplosion: function(num) {

    },

    //0 desc 1 aesc
    drawTowDimensionArray: function (description, arrayData, direction) {
        if (!DT_DEBUG) {
            return;
        }
        var desc = "";
        if (direction == 0) {
            for (var i = 0; i < arrayData.length; i++) {
                for (var j = 0; j < arrayData[i].length; j++) {
                    desc += arrayData[i][j];
                    desc += ",";
                }
                desc += "\n";
            }
        } else if (direction == 1) {
            for (var i = arrayData.length - 1; i >= 0; i--) {
                for (var j = 0; j < arrayData[i].length; j++) {
                    desc += arrayData[i][j];
                    desc += ",";
                }
                desc += "\n";
            }
        }
        //cc.log("%s array data : \n%s", description, desc);
    },

    redrawMap: function () {
        this.mapNode.removeAllChildren();
        var posX = 0;
        var posY = 0;
        for (var i = 0; i < DT_MAP_SIZE.height; i++) {
            for (var j = 0; j < DT_MAP_SIZE.width; j++) {
                // this.mapData[i][j] = 1;
                var blockRect = new cc.Sprite(res.block_select_png);
                blockRect.attr({
                    x: posX,
                    y: posY,
                    anchorX: 0,
                    anchorY: 0
                });
                blockRect.scale = DTBlockSize / blockRect.getContentSize().width;
                this.mapNode.addChild(blockRect);
                if (this.mapData[i][j] <= 0) {
                } else {
                    var blockDrop = new cc.Sprite(res.block_green_png);
                    blockDrop.attr({
                        x: posX,
                        y: posY,
                        anchorX: 0,
                        anchorY: 0,
                        opacity: 150
                    });
                    blockDrop.scale = DTBlockSize / blockDrop.getContentSize().width;
                    this.mapNode.addChild(blockDrop);
                }
                posX += DTBlockSize;
            }
            posX = 0;
            posY += DTBlockSize;
        }
    }
});