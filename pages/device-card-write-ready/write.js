var e = require("../../43635B5055C842DF2505335752E585D7.js"), i = require("../../275D798255C842DF413B1185FE3585D7.js"), a = require("../../A3859AB555C842DFC5E3F2B2FA5585D7.js"), t = require("../../8462214255C842DFE2044945663685D7.js");

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
        var e = this, a = t.getPhone();
        if (Object.keys(a) <= 0) wx.navigateTo({
            url: "/pages/user-login-onekey/login"
        }); else if ("svipcopy" == t.judgeDeviceType()) {
            if (!i.hasDeviceConnected()) return void t.showToast("设备断开连接,请重新连接");
            wx.navigateTo({
                url: "/pages/device-card-writing/writing"
            });
        } else t.remainNumber1(function(a, n, o) {
            if ("会员已过期" == o && 0 == a) e.setData({
                modal: !0
            }); else {
                if (!i.hasDeviceConnected()) return void t.showToast("设备断开连接,请重新连接");
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
            t.remainNumber1(function(e, i, a) {
                if ("会员已过期" == a) return n.setData({
                    expirationTime: "会员已过期",
                    remainingTimes: e
                }), !1;
                if (n.setData({
                    remainingTimes: e,
                    vip_end_date: i,
                    expirationTime: a
                }), null !== n.data.vip_end_date) {
                    var t = n.data.vip_end_date.slice(0, 2);
                    t = t >= 21 ? "永久VIP" : "", n.setData({
                        showView: !1,
                        vipNum: !0,
                        permanentVip: t
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
            var p = a.getDevice();
            if (p instanceof i.BaseBluetoothLowEnergy) {
                var c = null;
                switch (p.type) {
                  case a.DeviceType.svipCopy:
                    c = "SVIP设备";
                }
                this.setData({
                    deviceVIP: c
                });
            }
        }
    }
});