var n = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        dbData: ""
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        if (0 == n.isLogin()) n.loginToast(); else {
            n.checkToken(this);
            var o = n.obtain(this), t = n.getPhone(), e = this;
            wx.request({
                url: n.getRequestUrl() + "Feedback/query",
                data: {
                    phone: t,
                    token: o
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(n) {
                    console.log("返回的数据是" + JSON.stringify(n)), e.setData({
                        dbData: n.data
                    });
                }
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});