var e = require("../../614DB8F055C842DF072BD0F70136D685.js"), a = require("../../D6EF5C7155C842DFB08934760C65D685.js"), i = require("../../DFE4D8E455C842DFB982B0E32585D685.js"), t = require("../../76F8096255C842DF109E616502B6D685.js");

Page({
    data: {
        showView: !0,
        vipNum: !1,
        remainingTimes: "",
        cardType: "",
        cardList: [],
        modal: !1,
        vip_end_date: "",
        expirationTime: "",
        permanentVip: "",
        deviceVIP: null
    },
    onGotoWriteCardCall: function() {
        var e = this, i = t.getPhone();
        if (Object.keys(i) <= 0) wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        }); else if ("svipcopy" == t.judgeDeviceType()) {
            if (!a.hasDeviceConnected()) return void t.showToast("设备断开连接,请重新连接");
            wx.navigateTo({
                url: "/pages/device-card-writing/writing"
            });
        } else t.remainNumber1(function(i) {
            var n = i.data.data.remain_count;
            i.data.data.vip_end_date;
            if ("会员已过期" == i.data.data.expirationTime && 0 == n) e.setData({
                modal: !0
            }); else {
                if (!a.hasDeviceConnected()) return void t.showToast("设备断开连接,请重新连接");
                wx.navigateTo({
                    url: "/pages/device-card-writing/writing"
                });
            }
        });
    },
    onGotoTaobaoBuyCard: function() {
        wx.switchTab({
            url: "/pages/shop-application-main/shop"
        });
    },
    onGotoHelpPageCall: function() {
        wx.navigateTo({
            url: "/pages/user-device-help/help?id=1"
        });
    },
    onShow: function() {
        if (0 == t.isLogin()) console.log("未登录！"), this.setData({
            remainingTimes: 0
        }); else {
            var n = this;
            t.remainNumber1(function(e) {
                var a = e.data.data.remain_count, i = e.data.data.vip_end_date, t = e.data.data.expirationTime;
                if ("会员已过期" == t) return n.setData({
                    expirationTime: "会员已过期",
                    remainingTimes: a
                }), !1;
                if (n.setData({
                    remainingTimes: a,
                    vip_end_date: i,
                    expirationTime: t
                }), null !== n.data.vip_end_date) {
                    var o = n.data.vip_end_date.slice(0, 2);
                    o = o >= 21 ? "永久VIP" : "", n.setData({
                        showView: !1,
                        vipNum: !0,
                        permanentVip: o
                    });
                } else n.setData({
                    showView: !0,
                    vipNum: !1
                });
                "会员已过期" == n.data.expirationTime && obj.setData({
                    showView: !0,
                    vipNum: !1
                });
            });
            var o, r, s = e.getTagInformation().tag_type;
            console.log("卡的类型是" + JSON.stringify(s)), s == e.TAG_TYPE_LF_EM410X ? (o = [ "8268", "5577" ], 
            r = "ID") : (o = [ "UFUID", "FUID", "UID", "CUID" ], r = "IC"), this.setData({
                cardList: o,
                cardType: r
            });
            var d = i.getDevice();
            if (d instanceof a.BaseBluetoothLowEnergy) {
                var p = null;
                switch (d.type) {
                  case i.DeviceType.svipCopy:
                    p = "SVIP设备";
                }
                this.setData({
                    deviceVIP: p
                });
            }
        }
    }
});