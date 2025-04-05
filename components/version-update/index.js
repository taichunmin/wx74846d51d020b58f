var t = require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    properties: {},
    data: {
        showWindow: !1,
        upContent: ""
    },
    pageLifetimes: {
        show: function() {
            var e = this;
            t.queryLogData(function(t) {
                if (1 == t.data.status) {
                    e.setData({
                        upContent: t.data.data[0].update_content
                    });
                    var a = wx.getAccountInfoSync(), n = wx.getStorageSync("version"), o = a.miniProgram.version;
                    n == o ? e.setData({
                        showWindow: !1
                    }) : (e.setData({
                        showWindow: !0
                    }), wx.setStorageSync("version", o));
                }
            });
        }
    },
    methods: {
        onClickHide: function() {
            this.setData({
                showWindow: !1
            });
        },
        upCheck: function() {
            wx.navigateTo({
                url: "/pages/app-update-log/index"
            });
        }
    }
});