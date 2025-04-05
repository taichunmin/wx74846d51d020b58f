require("../../614DB8F055C842DF072BD0F70136D685.js").throwTagErrorEvent;

var r = require("../../76F8096255C842DF109E616502B6D685.js");

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