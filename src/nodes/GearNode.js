/**
 * Created by Allan on 2015/5/31.
 */
var GearNode = cc.Node.extend({
    delegate: null,
    ctor: function () {
        this._super();
        //var winSize = cc.winSize;
        var listSize = cc.size(110, 600);
        this._contentSize = listSize;
        var listView = new ccui.ListView();
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setContentSize(listSize);
        //listView.x = winSize.width - listSize.width;
        //listView.y = winSize.height - 100;
        listView.addEventListener(this.gearEvent, this);
        this.addChild(listView);

        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(cc.size(100,100));
        default_item.width = listView.width;
        //default_item.addChild(default_button);
        // set model
        listView.setItemModel(default_item);

        for (var i = 0; i < TTGears.length; ++i) {
            listView.pushBackDefaultItem();//注意这一行，相当重要！！！内部占坑用的，我就奇怪设计api的时候直接让传个参数进去内部调用不也行么？官方二不兮兮的这么封装我也是醉了
        }

        for (var i in TTGears) {
            var image = new ccui.ImageView();
            image.setTouchEnabled(true);
            image.loadTexture(TTGears[i].res);
            image.setScale(80 / image.getContentSize().width);

            //cc.log(TTGears[i].res);

            var layout = new ccui.Layout();
            layout.setContentSize(image.getContentSize());
            layout.setTouchEnabled(true);
            image.x = layout.width / 2;
            image.y = layout.height / 2;
            layout.addChild(image);

            listView.pushBackCustomItem(layout);
        }
        listView.setItemsMargin(2);
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        return true;
    },

    gearEvent: function (sender, type) {
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                if (this.delegate) {
                    var index = 0;
                    for(var key in TTGears) {
                        if (index == listViewEx.getCurSelectedIndex()) {
                            this.delegate.onGearUse(TTGears[key]);
                            break;
                        }
                        index += 1;
                    }
                }
                break;
            default :
                break;
        }
    },

    setDelegate:function(pDelegate) {
        this.delegate = pDelegate;
    }
});
