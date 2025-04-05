var t = require("../../76F8096255C842DF109E616502B6D685.js");

Component({
    properties: {},
    data: {
        custom_height: "",
        menuButtonToTop: "",
        menubuttonHeight: "",
        position: ""
    },
    lifetimes: {
        ready: function() {
            var t = this, e = wx.getMenuButtonBoundingClientRect(), o = e.top, i = e.height;
            wx.getSystemInfo({
                success: function(n) {
                    var s = n.statusBarHeight, u = s + e.height + 2 * (e.top - s);
                    t.setData({
                        custom_height: u,
                        menuButtonToTop: o,
                        menubuttonHeight: i
                    });
                }
            });
        }
    },
    pageLifetimes: {
        show: function() {
            "local" == t.cloudOrLocal() ? this.setData({
                position: "本地卡包"
            }) : this.setData({
                position: "云端卡包"
            });
        }
    },
    methods: {}
});