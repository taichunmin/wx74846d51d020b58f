var a = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        gold_coin_details_data: ""
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var o = this;
        a.goldDetails(function(a) {
            var t = a.data, n = 0;
            t.forEach(function(o) {
                var t = a.data[n].commit_time.slice(0, 10);
                a.data[n].commit_time = t;
                var i = a.data[n].gold_coin_count.slice(0, 1);
                "+" == i ? a.data[n].color = "#f5a200" : "-" == i && (a.data[n].color = "#999999"), 
                n++;
            }), o.setData({
                gold_coin_details_data: a.data
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});