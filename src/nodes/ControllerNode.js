var ControllerNode = cc.Node.extend({
    ctor: function (target) {
        this._super();

        var bgScale = 1;

        this.createButton(res.button_normal_png, res.button_selected_png, bgScale, cc.p(0, 80), 0, target, target.upButtonTouchDown, true);
        this.createButton(res.button_normal_png, res.button_selected_png, bgScale, cc.p(80, 0), 90, target, target.rightButtonTouchDown, true);
        this.createButton(res.button_normal_png, res.button_selected_png, bgScale, cc.p(0, -80), 180, target, target.downButtonTouchDown, false);
        this.createButton(res.button_normal_png, res.button_selected_png, bgScale, cc.p(-80, 0), 270, target, target.leftButtonTouchDown, true);

        // controlButton.addTargetWithActionForControlEvents(this, this.touchDownAction, cc.CONTROL_EVENT_TOUCH_DOWN);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchDragInsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_INSIDE);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchDragOutsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_OUTSIDE);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchDragEnterAction, cc.CONTROL_EVENT_TOUCH_DRAG_ENTER);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchDragExitAction, cc.CONTROL_EVENT_TOUCH_DRAG_EXIT);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchUpInsideAction, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchUpOutsideAction, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
        // controlButton.addTargetWithActionForControlEvents(this, this.touchCancelAction, cc.CONTROL_EVENT_TOUCH_CANCEL);


        return true;
    },

    createButton: function (normalScale9SpriteFile, highlightedScale9SpriteFile, bgScale, pos, rotate, target, touchdownCallback, registerUpCallback) {
        var backgroundButton = new cc.Scale9Sprite(normalScale9SpriteFile);
        backgroundButton.setScale(bgScale);
        var backgroundHighlightedButton = new cc.Scale9Sprite(highlightedScale9SpriteFile);
        backgroundHighlightedButton.setScale(bgScale);
        var title = new cc.LabelTTF("", "Arial", 30);
        var button = new cc.ControlButton(title, backgroundButton);
        button.setBackgroundSpriteForState(backgroundHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
        button.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
        button.setAdjustBackgroundImage(false);
        button.setPosition(pos);
        button.setRotation(rotate);
        this.addChild(button);

        button.addTargetWithActionForControlEvents(target, touchdownCallback, cc.CONTROL_EVENT_TOUCH_DOWN);
        if (registerUpCallback) {
            button.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_CANCEL);
            button.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            button.addTargetWithActionForControlEvents(target, target.moveButtonTouchUp, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
        }

        return button;
    }
});