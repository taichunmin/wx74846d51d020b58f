var a = require("../../76F8096255C842DF109E616502B6D685.js"), t = require("../../AB5D946455C842DFCD3BFC63A316D685.js");

Page({
    data: {
        avatarUrl: "",
        ranking_data: "",
        gold_coin_count: "",
        myRanking: "",
        phone: "",
        token: "",
        navHeight: "",
        imgUrl: ""
    },
    back: function() {
        wx.navigateBack();
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var n = this;
        a.getNavHeight(function(a) {
            n.setData({
                navHeight: a
            });
        });
        var e = a.getPhone(), i = a.obtain();
        n.setData({
            phone: e,
            token: i
        }), a.getHeadPortrait(function(a) {
            if (1 == a.data.status) {
                var e = t.getStorageSyncHasDefault("image_cache", {});
                Object.keys(e).length <= 0 ? (wx.setStorageSync("image_cache", a.data.data), n.setData({
                    imgUrl: a.data.data
                })) : n.setData({
                    imgUrl: e
                });
            } else n.setData({
                imgUrl: ""
            });
        }), a.gold_coin_count(function(a) {
            0 == a ? n.setData({
                gold_coin_count: 0
            }) : n.setData({
                gold_coin_count: a
            });
        }), a.myRanking(function(a) {
            var t = a.data;
            "" == t && n.setData({
                myRanking: "未上榜"
            }), "" !== t && n.setData({
                myRanking: parseInt(a.data) + 1
            });
        }), a.all_head_portrait(function(t) {
            for (var e = 0; e < t.data.length; e++) 0 == e ? t.data[0].flag = !0 : t.data[e].flag = !1;
            n.setData({
                ranking_data: t.data
            });
            a.getPhone();
        });
    }
});