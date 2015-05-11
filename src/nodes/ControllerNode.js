var ControllerNode = cc.Node.extend({
	ctor:function(target) {
        	this._super();

        	var btn_size = cc.size(36, 36);
            var btn_scale = 2.4;

        	var upBackgroundButton = new cc.Scale9Sprite(res.button_normal_png);
            var upBackgroundHighlightedButton = new cc.Scale9Sprite(res.button_selected_png);
            var upTitle = new cc.LabelTTF("", "Marker Felt", 30);
            var upButton = new cc.ControlButton(upTitle, upBackgroundButton);
            upButton.setBackgroundSpriteForState(upBackgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
            upButton.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
            upButton.attr({
                x : 0,
                y : 80,
                scale : btn_scale,
                preferredSize : btn_size
            });
            this.addChild(upButton);

            var rightBackgroundButton = new cc.Scale9Sprite(res.button_normal_png);
            var rightBackgroundHighlightedButton = new cc.Scale9Sprite(res.button_selected_png);
            var rightTitle = new cc.LabelTTF("", "Marker Felt", 30);
            rightTitle.scaleX = -1.0;
            var rightButton = new cc.ControlButton(rightTitle, rightBackgroundButton);
            rightButton.setBackgroundSpriteForState(rightBackgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
            rightButton.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
            rightButton.attr({
                x : 80,
                y : 0,
                scale : btn_scale,
                rotation : 90,
                preferredSize : btn_size
            });
            this.addChild(rightButton);

            var downBackgroundButton = new cc.Scale9Sprite(res.button_normal_png);
            var downBackgroundHighlightedButton = new cc.Scale9Sprite(res.button_selected_png);
            var downTitle = new cc.LabelTTF("", "Marker Felt", 30);
            var downButton = new cc.ControlButton(downTitle, downBackgroundButton);
            downButton.setBackgroundSpriteForState(downBackgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
            downButton.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
            downButton.attr({
                x : 0,
                y : -80,
                scale : btn_scale,
                rotation : 180,
                preferredSize : btn_size
            });
            this.addChild(downButton);

            var leftBackgroundButton = new cc.Scale9Sprite(res.button_normal_png);
            var leftBackgroundHighlightedButton = new cc.Scale9Sprite(res.button_selected_png);
            var leftTitle = new cc.LabelTTF("", "Marker Felt", 30);
            var leftButton = new cc.ControlButton(leftTitle, leftBackgroundButton);
            leftButton.setBackgroundSpriteForState(leftBackgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
            leftButton.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
            leftButton.attr({
                x : -80,
                y : 0,
                scale : btn_scale,
                rotation : 270,
                preferredSize : btn_size
            });
            this.addChild(leftButton);

            rightButton.addTargetWithActionForControlEvents(target, target.rightButtonTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN);
            leftButton.addTargetWithActionForControlEvents(target, target.leftButtonTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN);
            upButton.addTargetWithActionForControlEvents(target, target.upButtonTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN);
            downButton.addTargetWithActionForControlEvents(target, target.downButtonTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN);

            rightButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            rightButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
            rightButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_CANCEL);

            leftButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            leftButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
            leftButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_CANCEL);

            upButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            upButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
            upButton.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_CANCEL);

            // controlButton.addTargetWithActionForControlEvents(this, this.touchDownAction, cc.CONTROL_EVENT_TOUCH_DOWN);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchDragInsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_INSIDE);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchDragOutsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_OUTSIDE);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchDragEnterAction, cc.CONTROL_EVENT_TOUCH_DRAG_ENTER);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchDragExitAction, cc.CONTROL_EVENT_TOUCH_DRAG_EXIT);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchUpInsideAction, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchUpOutsideAction, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
            // controlButton.addTargetWithActionForControlEvents(this, this.touchCancelAction, cc.CONTROL_EVENT_TOUCH_CANCEL);


		return true;
	}
});