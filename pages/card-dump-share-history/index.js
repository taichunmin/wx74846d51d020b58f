var a, e = (a = require("@vant/weapp/dialog/dialog")) && a.__esModule ? a : {
    default: a
};

var t = require("../../76F8096255C842DF109E616502B6D685.js"), s = require("../../614DB8F055C842DF072BD0F70136D685.js");

Page({
    data: {
        dumpList: [],
        share_data: "",
        id: "",
        userName: "",
        showShareDialog: !1,
        appendAC: !0
    },
    onShareAppMessage: function(a) {
        var e = this.data.share_data.data.data, s = this.data.id, i = e[s].code, n = e[s].password, r = this.data.userName, o = this.data.appendAC;
        return t.createShareFriendMessage(r, i, n, o);
    },
    onUserShareToFriendClick: function() {
        this.setData({
            showShareDialog: !1
        });
    },
    onUserShareToLinkChipBoardClick: function() {
        var a = this.data.share_data.data.data, s = this.data.id, i = a[s].code, n = a[s].password, r = this.data.userName, o = this.data.appendAC, d = t.createShareLinkMessage(r, i, n, o);
        wx.setClipboardData({
            data: d,
            success: function(a) {
                e.default.alert({
                    message: "链接复制成功啦，快去发送给你的好友吧~"
                }).then(function() {});
            }
        }), this.setData({
            showShareDialog: !1
        });
    },
    onUserSwitchAutoAppendAC: function(a) {
        this.setData({
            appendAC: a.detail
        });
    },
    enableShareToFriendMenu: function(a) {
        a ? wx.showShareMenu({
            menus: [ "shareAppMessage" ]
        }) : wx.hideShareMenu({
            menus: [ "shareAppMessage" ]
        });
    },
    onUserCloseShareDialog: function() {
        this.enableShareToFriendMenu(!1), this.setData({
            showShareDialog: !1
        });
    },
    onUserSendToFirendClick: function(a) {
        var e = a.currentTarget.dataset.id;
        "已过期" != this.data.dumpList[e].term_of_validity ? (this.enableShareToFriendMenu(!0), 
        this.setData({
            showShareDialog: !0,
            id: e
        })) : t.showToast("该分享已过期");
    },
    onUserDeleteShareItemClick: function(a) {
        var s = this, i = this;
        e.default.confirm({
            message: "确定要取消分享吗？"
        }).then(function() {
            var e = a.currentTarget.dataset.id, n = s.data.dumpList[e].id;
            t.deleteShareData(n, function(a) {
                1 == a.data.status ? (t.showToast("取消分享成功"), i.showData()) : t.showToast("删除失败，请重试");
            });
        }).catch(function() {});
    },
    calcDateDiff: function(a, e) {
        var t, s, i, n;
        return t = a.split("-"), i = new Date(t[1] + "/" + t[2] + "/" + t[0]), s = e.split("-"), 
        n = new Date(s[1] + "/" + s[2] + "/" + s[0]), parseInt(Math.abs(i - n) / 1e3 / 60 / 60 / 24);
    },
    showData: function() {
        var a = this;
        t.pullShareData(function(e) {
            if (e.length <= 0) a.setData({
                dumpList: ""
            }); else {
                a.setData({
                    share_data: e
                });
                for (var t = e.data.data, i = [], n = 0; n < t.length; n++) {
                    var r, o = t[n].data.tag_info.tag_type, d = t[n].password, h = t[n].id, u = t[n].name, c = t[n].date_start, l = t[n].date_stop, p = a.calcDateDiff(c, l);
                    new Date(Date.parse(l.replace(/-/g, "/"))) <= new Date() ? (console.log("小于当前时间"), 
                    p = "已过期") : console.log("大于当前时间"), r = o == s.TAG_TYPE_LF_EM410X ? "#008EF5" : "#f5a200", 
                    i.push({
                        id: h,
                        name: u,
                        type: o == s.TAG_TYPE_LF_EM410X ? "ID卡" : "IC卡",
                        color: r,
                        date: c,
                        term_of_validity: p,
                        password: d
                    });
                }
                a.setData({
                    dumpList: i
                });
            }
        });
    },
    onShow: function() {
        this.enableShareToFriendMenu(!1);
        var a = this;
        t.get_nickname(function(e) {
            a.setData({
                userName: e.data.data
            }), a.showData();
        });
    }
});