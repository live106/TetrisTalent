/**
 * start pos [0, 0] direction right down
 **/
var BlockNode = cc.Node.extend({
	curBlk:null,
	curTransfer:DT_TRANSFER_NONE,
	curData:null,
	blkNode:null,
	ctor:function(block, transfer) {
		this._super();

		this.blkNode = new cc.Node();
		this.blkNode.attr({
			x : 0,
			y : 0,
			anchorX : 0,
			anchorY : 0
		});
		this.addChild(this.blkNode);

		this.updateBlock(block, transfer);

		return true;
	},

	updateBlock:function(block, transfer) {
		this.curBlk = block;
		this.curData = this.curBlk.data.concat();
		this.curTransfer = transfer;

		this.blkNode.removeAllChildren();
		this.curData = this.drawBlk(this.curBlk, this.curTransfer, true).concat();
	},

	rotate:function() {
		this.curTransfer = DT_TRANSFERS[this.getNextTransferIdx()];
		this.transfer(this.curTransfer);
	},

	getNextTransferIdx:function() {
		var nextTransIdx = 0;
		for (var i = 0; i < DT_TRANSFERS.length; i++) {
			if (this.curTransfer == DT_TRANSFERS[i]) {
				nextTransIdx = i + 1;
				break;
			}
		}
		if (nextTransIdx >= DT_TRANSFERS.length) {
			nextTransIdx = 0;
		}
		return nextTransIdx;
	},

	getRotateData:function() {
		var transIdx = this.getNextTransferIdx();
		return this.drawBlk(this.curBlk, DT_TRANSFERS[transIdx], false);
	},

	transfer:function(transfer) {
		// if (this.curTransfer == transfer) {
		// 	return;
		// }
		this.blkNode.removeAllChildren();
		this.curData = this.drawBlk(this.curBlk, transfer, true).concat();
	},

	drawBlk:function(block, transfer, doDraw) {//FIXME split it to 2 methods
		var drawData = new Array();
		var data = block.data;
		var x = 0;
		var y = 0;
		var rowLength = data.length;
		var colLength = data[0].length;
		var m = 0;
		var n = 0;
		switch (transfer) {
			case DT_TRANSFER_NONE:
			{
				//row first & (row&col forward)
				for (var i = 0; i < data.length; i++) {
					drawData[m] = new Array();
					n = 0;
					x = 0;
					for (var j = 0; j < data[i].length; j++) {
						// var verts = [cc.p(x, y), cc.p(x + DTBlockSize, y), cc.p(x + DTBlockSize, y - DTBlockSize), cc.p(x, y - DTBlockSize)];
						// if (data[i][j] > 0) {
						// 	this._drawNode.drawPoly(verts, TTBlockFillColor, TTBlockBorderWidth, TTBlockBorderColor);
						// } else {
						// 	this._drawNode.drawPoly(verts, cc.color(160, 160, 160, 255), TTBlockBorderWidth, TTBlockBorderColor);
						// }
						// cc.log("%d,%d--%d", i, j, data[i][j]);
						if (doDraw) {
							if (data[i][j] == 1) {
								var sprite = new cc.Sprite(block.res);
								sprite.attr({
									x: x,
									y: y,
									anchorX: 0,
									anchorY: 0
								});
								sprite.scale = DTBlockSize / sprite.getContentSize().width;
								this.blkNode.addChild(sprite);
							} else {

							}
							x += DTBlockSize;
						}
						drawData[m][n] = data[i][j];
						n++;
					}
					y -= DTBlockSize;
					m++;
				}
				break;
			}
			case DT_TRANSFER_90:
			{
				//col first & (col forward & row backward)
				for (var j = 0; j < colLength; j++) {
					drawData[m] = new Array();
					n = 0;
					x = 0;
					for (var i = rowLength - 1; i >= 0; i--) {
						// var verts = [cc.p(x, y), cc.p(x + DTBlockSize, y), cc.p(x + DTBlockSize, y - DTBlockSize), cc.p(x, y - DTBlockSize)];
						// if (data[i][j] > 0) {
						// 	this._drawNode.drawPoly(verts, TTBlockFillColor, TTBlockBorderWidth, TTBlockBorderColor);
						// } else {
						// 	this._drawNode.drawPoly(verts, cc.color(160, 160, 160, 255), TTBlockBorderWidth, TTBlockBorderColor);
						// }
						if (doDraw) {
							if (data[i][j] == 1) {
								var sprite = new cc.Sprite(block.res);
								sprite.attr({
									x: x,
									y: y,
									anchorX: 0,
									anchorY: 0
								});
								sprite.scale = DTBlockSize / sprite.getContentSize().width;
								this.blkNode.addChild(sprite);
							} else {

							}
							x += DTBlockSize;
						}
						drawData[m][n] = data[i][j];
						n++;
					}
					y -= DTBlockSize;
					m++;
				}
				break;
			}
			case DT_TRANSFER_180:
			{
				//row first & (row&col backward)
				for (var i = rowLength - 1; i >= 0; i--) {
					drawData[m] = new Array();
					n = 0;
					x = 0;
					for (var j = colLength - 1; j >= 0; j--) {
						// var verts = [cc.p(x, y), cc.p(x + DTBlockSize, y), cc.p(x + DTBlockSize, y - DTBlockSize), cc.p(x, y - DTBlockSize)];
						// if (data[i][j] > 0) {
						// 	this._drawNode.drawPoly(verts, TTBlockFillColor, TTBlockBorderWidth, TTBlockBorderColor);
						// } else {
						// 	this._drawNode.drawPoly(verts, cc.color(160, 160, 160, 255), TTBlockBorderWidth, TTBlockBorderColor);
						// }
						if (doDraw) {
							if (data[i][j] == 1) {
								var sprite = new cc.Sprite(block.res);
								sprite.attr({
									x: x,
									y: y,
									anchorX: 0,
									anchorY: 0
								});
								sprite.scale = DTBlockSize / sprite.getContentSize().width;
								this.blkNode.addChild(sprite);
							} else {

							}
							x += DTBlockSize;
						}
						drawData[m][n] = data[i][j];
						n++;
					}
					y -= DTBlockSize;
					m++;
				}
				break;
			}
			case DT_TRANSFER_270:
			{
				//col first & (col backward & row forward)
				for (var j = colLength - 1; j >= 0; j--) {
					drawData[m] = new Array();
					n = 0;
					x = 0;
					for (var i = 0; i < rowLength; i++) {
						// var verts = [cc.p(x, y), cc.p(x + DTBlockSize, y), cc.p(x + DTBlockSize, y - DTBlockSize), cc.p(x, y - DTBlockSize)];
						// if (data[i][j] > 0) {
						// 	this._drawNode.drawPoly(verts, TTBlockFillColor, TTBlockBorderWidth, TTBlockBorderColor);
						// } else {
						// 	this._drawNode.drawPoly(verts, cc.color(160, 160, 160, 255), TTBlockBorderWidth, TTBlockBorderColor);
						// }
						if (doDraw) {
							if (data[i][j] == 1) {
								var sprite = new cc.Sprite(block.res);
								sprite.attr({
									x: x,
									y: y,
									anchorX: 0,
									anchorY: 0
								});
								sprite.scale = DTBlockSize / sprite.getContentSize().width;
								this.blkNode.addChild(sprite);
							} else {

							}
							x += DTBlockSize;
						}
						drawData[m][n] = data[i][j];
						n++;
					}
					y -= DTBlockSize;
					m++;
				}
				break;
			}
		}
		return drawData;
	},

	getData:function() {
		return this.curData;
	}
});