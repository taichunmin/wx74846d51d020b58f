require("../../43635B5055C842DF2505335752E585D7.js").throwTagErrorEvent;

var r = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        orderData: []
    },
    onContinueToBrowse: function() {
        wx.switchTab({
            url: "/pages/shop-application-main/shop"
        });
    },
    onViewOrder: function() {
        var r = this.data.orderData;
        wx.redirectTo({
            url: "/pages/goods-received/index?data=" + JSON.stringify(r)
        });
    },
    onLoad: function(a) {
        var e = this, o = a.db_order_number;
        r.queryOrderInfo(o, function(r) {
            e.setData({
                orderData: r
            });
        });
    },
    onShow: function() {}
});