var t = require("../../8462214255C842DFE2044945663685D7.js");

Page({
    data: {
        navHeight: "",
        statusHeight: "",
        menuButtonToTop: "",
        menubuttonHeight: "",
        navigation_bar_height: "",
        gold_coin_count: 0,
        getContinuousTime: "",
        day_block1: [ {
            number: 5,
            days: "",
            dateJudge: "",
            signIn: !1
        }, {
            number: 6,
            days: "",
            dateJudge: "",
            signIn: !1
        }, {
            number: 7,
            days: "",
            dateJudge: "",
            signIn: !1
        }, {
            number: 8,
            days: "",
            dateJudge: "",
            signIn: !1
        } ],
        day_block2: [ {
            number: 9,
            days: "",
            dateJudge: "",
            signIn: !1
        }, {
            number: 10,
            days: "",
            dateJudge: "",
            signIn: !1
        } ],
        day_block3: [ {
            number: 35,
            days: "",
            dateJudge: "",
            signIn: !1
        } ],
        sign_in: !0,
        overlay_show: !1,
        reward: ""
    },
    closeOverlay: function() {
        this.setData({
            overlay_show: !1
        });
    },
    onBack: function() {
        wx.navigateBack();
    },
    getWeek: function(t, e) {
        if (0 == t) var a = new Date(); else a = new Date(e);
        for (var n = a.getTime(), o = [], d = "", i = 0; i < 7; i++) {
            var s = new Date(n + 864e5 * i), g = s.getFullYear(), u = s.getMonth() + 1;
            u < 10 && (u = "0" + u);
            var c = s.getDate(), l = c.toString();
            if (1 == l.length) {
                var r = l.padStart(2, "0"), y = g + "-" + u + "-" + r;
                d = u + "-" + r;
            } else {
                y = g + "-" + u + "-" + c;
                d = u + "-" + c;
            }
            o.push({
                date: d,
                dateJudge: y
            });
        }
        return o;
    },
    setTime: function(t) {
        this.setData({
            "day_block1[0].days": t[0].date,
            "day_block1[0].dateJudge": t[0].dateJudge,
            "day_block1[1].days": t[1].date,
            "day_block1[1].dateJudge": t[1].dateJudge,
            "day_block1[2].days": t[2].date,
            "day_block1[2].dateJudge": t[2].dateJudge,
            "day_block1[3].days": t[3].date,
            "day_block1[3].dateJudge": t[3].dateJudge,
            "day_block2[0].days": t[4].date,
            "day_block2[0].dateJudge": t[4].dateJudge,
            "day_block2[1].days": t[5].date,
            "day_block2[1].dateJudge": t[5].dateJudge,
            "day_block3[0].days": t[6].date,
            "day_block3[0].dateJudge": t[6].dateJudge
        });
    },
    setAllBlockBackground: function() {
        this.setData({
            "day_block1[0].signIn": !1,
            "day_block1[1].signIn": !1,
            "day_block1[2].signIn": !1,
            "day_block1[3].signIn": !1,
            "day_block2[0].signIn": !1,
            "day_block2[1].signIn": !1,
            "day_block3[0].signIn": !1
        });
    },
    setBlockBackground: function(t) {
        for (var e = this.data.day_block1, a = this.data.day_block2, n = this.data.day_block3, o = 0; o < e.length; o++) {
            t.indexOf(e[o].dateJudge) > -1 ? (e[o].signIn = !0, this.setData({
                day_block1: e
            })) : (e[o].signIn = !1, this.setData({
                day_block1: e
            }));
        }
        for (o = 0; o < a.length; o++) {
            t.indexOf(a[o].dateJudge) > -1 ? (a[o].signIn = !0, this.setData({
                day_block2: a
            })) : (a[o].signIn = !1, this.setData({
                day_block2: a
            }));
        }
        for (o = 0; o < n.length; o++) {
            t.indexOf(n[o].dateJudge) > -1 ? (n[o].signIn = !0, this.setData({
                day_block3: n
            })) : (n[o].signIn = !1, this.setData({
                day_block3: n
            }));
        }
    },
    signIn: function() {
        wx.showLoading({
            title: "签到中"
        });
        var e = this;
        t.sign_in(function(a) {
            console.log("签到 " + JSON.stringify(a)), "今天已签到" == a && (e.setData({
                sign_in: !1
            }), wx.hideLoading()), 1 == a.status ? (e.setData({
                sign_in: !1,
                overlay_show: !0,
                reward: a.msg
            }), wx.hideLoading()) : t.showToast("签到失败！"), e.getContinuousTime(), e.checkSignIn();
        });
    },
    checkSignIn: function() {
        var e = this;
        t.checkSign(function(t) {
            console.log("签到res5555    " + JSON.stringify(t));
            var a, n = t.data;
            if (1 == t.status) if (e.getGoldCoinNumber(), "今天已签到" == t.msg && e.setData({
                sign_in: !1
            }), null == n) {
                a = 0;
                var o = new Date(), d = o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate();
                t = e.getWeek(a, d);
                e.setTime(t), e.setAllBlockBackground();
            } else {
                a = 1;
                d = t.data[0], t = e.getWeek(a, d);
                e.setTime(t), 7 == n.length && e.setAllBlockBackground(), e.setBlockBackground(n);
            }
        });
    },
    getGoldCoinNumber: function() {
        var e = this;
        t.gold_coin_count(function(t) {
            0 == t ? e.setData({
                gold_coin_count: 0
            }) : e.setData({
                gold_coin_count: t
            });
        });
    },
    getContinuousTime: function() {
        var e = this;
        t.getContinuousTime(function(t) {
            e.setData({
                getContinuousTime: t
            });
        });
    },
    onLoad: function(t) {},
    onShow: function() {
        var e = this;
        t.getNavHeight(function(t) {
            e.setData({
                navHeight: t
            });
        });
        var a = wx.getMenuButtonBoundingClientRect(), n = a.top, o = a.height;
        wx.getSystemInfo({
            success: function(t) {
                var d = t.statusBarHeight, i = d + a.height + 2 * (a.top - d);
                e.setData({
                    menuButtonToTop: n,
                    menubuttonHeight: o,
                    navigation_bar_height: i
                });
            }
        }), e.checkSignIn(), e.getContinuousTime(), e.getGoldCoinNumber();
    }
});