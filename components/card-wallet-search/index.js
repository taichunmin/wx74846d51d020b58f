var t = require("../../8462214255C842DFE2044945663685D7.js");

Component({
    properties: {
        holderText: {
            type: String,
            value: "搜索卡片"
        }
    },
    data: {
        custom_height: "",
        menuButtonToTop: "",
        menubuttonHeight: "",
        search_to_menu_right: "",
        serach_width: "",
        inputVal: "",
        changeBtn: !1,
        position: ""
    },
    lifetimes: {
        ready: function() {
            var t = this, i = wx.getMenuButtonBoundingClientRect(), e = i.top, n = i.height, o = i.width;
            wx.getSystemInfo({
                success: function(a) {
                    var s = a.windowWidth - i.right + o + 18, u = a.statusBarHeight, h = u + i.height + 2 * (i.top - u), r = a.windowWidth - o - 65 - 14;
                    t.setData({
                        custom_height: h,
                        menuButtonToTop: e,
                        menubuttonHeight: n,
                        search_to_menu_right: s,
                        serach_width: r
                    });
                }
            });
        }
    },
    pageLifetimes: {
        show: function() {
            var i = t.cloudOrLocal();
            console.log("res是" + i), "local" == i ? this.setData({
                position: "本地卡包"
            }) : this.setData({
                position: "云端卡包"
            });
        }
    },
    methods: {
        clearInput: function() {
            this.setData({
                inputVal: ""
            }), this.triggerEvent("clear");
        },
        inputTyping: function(t) {
            this.setData({
                inputVal: t.detail.value
            }), this.triggerEvent("inputTyping", this.data.inputVal);
        }
    }
});